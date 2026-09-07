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
