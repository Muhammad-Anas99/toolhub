import QRCode from './vendor/qrcode/index.js'
import QRErrorCorrectLevel from './vendor/qrcode/QRErrorCorrectLevel.js'

// The QR spec requires a "quiet zone" - a border of empty space around the
// code - for reliable scanning. 4 modules is the spec-recommended minimum.
const QUIET_ZONE_MODULES = 4

const ERROR_CORRECTION_LEVELS = [
  { id: 'L', label: 'Low (7%)', value: QRErrorCorrectLevel.L },
  { id: 'M', label: 'Medium (15%)', value: QRErrorCorrectLevel.M },
  { id: 'Q', label: 'Quartile (25%)', value: QRErrorCorrectLevel.Q },
  { id: 'H', label: 'High (30%)', value: QRErrorCorrectLevel.H },
]

/**
 * Encodes text into a QR matrix. Uses automatic version (size) selection
 * and automatic best-mask-pattern selection - both handled correctly by
 * the underlying verified encoder, not something this wrapper needs to
 * compute itself.
 */
function encode(text, errorCorrectionLevel = 'M') {
  const level = ERROR_CORRECTION_LEVELS.find((l) => l.id === errorCorrectionLevel)?.value ?? QRErrorCorrectLevel.M
  const qr = new QRCode(-1, level)
  qr.addData(text)
  qr.make()
  return qr
}

/**
 * Renders a QR matrix onto a canvas element, with the quiet zone included
 * and configurable foreground/background colors.
 */
function renderToCanvas(qr, canvas, { moduleSize = 8, foreground = '#000000', background = '#ffffff' } = {}) {
  const count = qr.getModuleCount()
  const size = (count + QUIET_ZONE_MODULES * 2) * moduleSize
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = background
  ctx.fillRect(0, 0, size, size)

  ctx.fillStyle = foreground
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (qr.isDark(row, col)) {
        const x = (col + QUIET_ZONE_MODULES) * moduleSize
        const y = (row + QUIET_ZONE_MODULES) * moduleSize
        ctx.fillRect(x, y, moduleSize, moduleSize)
      }
    }
  }
  return size
}

/**
 * Generates real SVG markup for a QR matrix - one <rect> per dark module,
 * scalable to any size with zero quality loss, which matters for QR codes
 * specifically since they're often printed large (posters, signage).
 */
function renderToSvg(qr, { moduleSize = 8, foreground = '#000000', background = '#ffffff' } = {}) {
  const count = qr.getModuleCount()
  const size = (count + QUIET_ZONE_MODULES * 2) * moduleSize

  let rects = ''
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (qr.isDark(row, col)) {
        const x = (col + QUIET_ZONE_MODULES) * moduleSize
        const y = (row + QUIET_ZONE_MODULES) * moduleSize
        rects += `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" fill="${foreground}"/>`
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="${background}"/>${rects}</svg>`
}

export { encode, renderToCanvas, renderToSvg, ERROR_CORRECTION_LEVELS }

/**
 * Builds the correct payload string to encode for each QR type. Phone,
 * SMS and email use their real, standard URI schemes (RFC 3966 for
 * tel:, the widely-recognized sms: scheme, RFC 6068 for mailto:) rather
 * than raw text, since these are what actually trigger a phone's call,
 * message, or email app when the code is scanned - a real number or
 * address alone isn't recognized as a specific action to take.
 */
export function buildQrPayload(type, fields) {
  switch (type) {
    case 'link': {
      const url = (fields.url || '').trim()
      if (!url) return ''
      // Auto-prepend https:// if the user typed a bare domain, since a
      // QR code encoding "example.com" (no scheme) won't reliably open
      // as a link when scanned - most scanners need a real URI scheme.
      if (/^https?:\/\//i.test(url)) return url
      return `https://${url}`
    }

    case 'text':
      return (fields.text || '').trim()

    case 'email': {
      const address = (fields.address || '').trim()
      if (!address) return ''
      // RFC 6068 (the mailto: URI scheme) expects percent-encoding for
      // query values (%20 for a space) - not URLSearchParams' HTML
      // form-encoding convention (+ for a space), which a strict mail
      // client could read back as a literal plus sign instead of a space.
      const parts = []
      if (fields.subject?.trim()) parts.push(`subject=${encodeURIComponent(fields.subject.trim())}`)
      if (fields.body?.trim()) parts.push(`body=${encodeURIComponent(fields.body.trim())}`)
      const query = parts.join('&')
      return `mailto:${address}${query ? '?' + query : ''}`
    }

    case 'phone': {
      const number = (fields.number || '').trim()
      if (!number) return ''
      return `tel:${number}`
    }

    case 'sms': {
      const number = (fields.number || '').trim()
      if (!number) return ''
      const message = fields.message?.trim()
      return message ? `sms:${number}?body=${encodeURIComponent(message)}` : `sms:${number}`
    }

    default:
      return ''
  }
}

/**
 * Checks whether input genuinely looks like a URL, using the built-in
 * URL constructor for real syntactic validation rather than a fragile
 * custom regex. Also requires an actual dot in the hostname, since the
 * URL constructor alone accepts a bare single word (e.g.
 * "https://helloworld") as a syntactically legal hostname - not what
 * anyone means by "a link".
 */
export function looksLikeUrl(input) {
  const trimmed = (input || '').trim()
  if (!trimmed) return false

  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`

  let parsed
  try {
    parsed = new URL(candidate)
  } catch {
    return false
  }

  return parsed.hostname.includes('.')
}

/**
 * A practical, not fully RFC 5322-compliant, email check - the full
 * spec is notoriously complex to validate against client-side. This
 * catches the real, common mistake (no @, no domain) without rejecting
 * valid-but-unusual real addresses.
 */
export function looksLikeEmail(input) {
  const trimmed = (input || '').trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
}

/**
 * Strips anything that isn't a digit or a common phone-formatting
 * character (+, spaces, hyphens, parentheses) from input as the user
 * types, so letters can't be entered into a phone number field at all.
 */
export function filterPhoneInput(input) {
  return (input || '').replace(/[^\d+\-() ]/g, '')
}
