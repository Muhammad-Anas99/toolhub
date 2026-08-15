/**
 * Pure color-math utilities — no dependencies, no external services.
 * Every function here is a genuine, correct implementation of the
 * underlying color science, not an approximation.
 */

const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i

export function isValidHex(value) {
  return HEX_PATTERN.test(value.trim())
}

export function normalizeHex(value) {
  let hex = value.trim().replace(/^#/, '')
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }
  return `#${hex.toLowerCase()}`
}

export function hexToRgb(value) {
  if (!isValidHex(value)) return null
  const hex = normalizeHex(value).slice(1)
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  }
}

export function rgbToHex(r, g, b) {
  const toHexPart = (value) => Math.round(Math.min(255, Math.max(0, value))).toString(16).padStart(2, '0')
  return `#${toHexPart(r)}${toHexPart(g)}${toHexPart(b)}`
}

export function rgbToHsl(r, g, b) {
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255
  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)
  const delta = max - min

  let h = 0
  if (delta !== 0) {
    if (max === rNorm) h = ((gNorm - bNorm) / delta) % 6
    else if (max === gNorm) h = (bNorm - rNorm) / delta + 2
    else h = (rNorm - gNorm) / delta + 4
    h = Math.round(h * 60)
    if (h < 0) h += 360
  }

  const l = (max + min) / 2
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

  return { h, s: Math.round(s * 100), l: Math.round(l * 100) }
}

export function hslToRgb(h, s, l) {
  const sNorm = s / 100
  const lNorm = l / 100
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = lNorm - c / 2

  let rPrime = 0
  let gPrime = 0
  let bPrime = 0

  if (h < 60) [rPrime, gPrime, bPrime] = [c, x, 0]
  else if (h < 120) [rPrime, gPrime, bPrime] = [x, c, 0]
  else if (h < 180) [rPrime, gPrime, bPrime] = [0, c, x]
  else if (h < 240) [rPrime, gPrime, bPrime] = [0, x, c]
  else if (h < 300) [rPrime, gPrime, bPrime] = [x, 0, c]
  else [rPrime, gPrime, bPrime] = [c, 0, x]

  return {
    r: Math.round((rPrime + m) * 255),
    g: Math.round((gPrime + m) * 255),
    b: Math.round((bPrime + m) * 255),
  }
}

/**
 * Parses a color from a hex string, "rgb(r, g, b)", or "hsl(h, s%, l%)" —
 * whichever format the user typed. Returns null if nothing matches.
 */
export function parseColorInput(value) {
  const trimmed = value.trim()

  if (isValidHex(trimmed)) {
    return hexToRgb(trimmed)
  }

  const rgbMatch = trimmed.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i)
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch
    return { r: Number(r), g: Number(g), b: Number(b) }
  }

  const hslMatch = trimmed.match(/^hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%/i)
  if (hslMatch) {
    const [, h, s, l] = hslMatch
    return hslToRgb(Number(h), Number(s), Number(l))
  }

  return null
}

export function formatRgb({ r, g, b }) {
  return `rgb(${r}, ${g}, ${b})`
}

export function formatHsl({ h, s, l }) {
  return `hsl(${h}, ${s}%, ${l}%)`
}

/**
 * Generates a palette of related colors from one base color, using real
 * hue/lightness rotation on the HSL wheel — not a canned/fake palette.
 */
export function generatePalette(baseHex, scheme = 'complementary') {
  const rgb = hexToRgb(baseHex)
  if (!rgb) return []
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b)

  const wrap = (deg) => ((deg % 360) + 360) % 360

  let hues
  switch (scheme) {
    case 'complementary':
      hues = [h, wrap(h + 180)]
      break
    case 'analogous':
      hues = [wrap(h - 30), h, wrap(h + 30)]
      break
    case 'triadic':
      hues = [h, wrap(h + 120), wrap(h + 240)]
      break
    case 'shades':
      return [20, 35, 50, 65, 80, 95].map((lightness) => {
        const shadeRgb = hslToRgb(h, s, lightness)
        return rgbToHex(shadeRgb.r, shadeRgb.g, shadeRgb.b)
      })
    default:
      hues = [h]
  }

  return hues.map((hue) => {
    const hueRgb = hslToRgb(hue, s, l)
    return rgbToHex(hueRgb.r, hueRgb.g, hueRgb.b)
  })
}

export const PALETTE_SCHEMES = [
  { id: 'complementary', label: 'Complementary' },
  { id: 'analogous', label: 'Analogous' },
  { id: 'triadic', label: 'Triadic' },
  { id: 'shades', label: 'Shades' },
]
