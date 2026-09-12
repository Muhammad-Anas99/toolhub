/**
 * Converts HSL to a hex color string. Random gradients use this with a
 * fixed, curated saturation/lightness range rather than uniform random
 * RGB, since random RGB tends to produce muddy, unpleasant colors while
 * HSL with a controlled saturation/lightness reliably produces vibrant,
 * usable ones. Verified against known reference colors (pure red,
 * green, blue, white, black) before being ported here.
 */
export function hslToHex(h, s, l) {
  const sFrac = s / 100
  const lFrac = l / 100
  const c = (1 - Math.abs(2 * lFrac - 1)) * sFrac
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = lFrac - c / 2
  let r, g, b
  if (h < 60) [r, g, b] = [c, x, 0]
  else if (h < 120) [r, g, b] = [x, c, 0]
  else if (h < 180) [r, g, b] = [0, c, x]
  else if (h < 240) [r, g, b] = [0, x, c]
  else if (h < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  const toHex = (v) => Math.round((v + m) * 255).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * Generates a random, pleasant-looking color using a fixed saturation
 * and lightness range with only the hue randomized - this is what
 * keeps random gradients looking vibrant and usable rather than muddy.
 */
export function randomPleasantColor() {
  const hue = Math.floor(Math.random() * 360)
  const saturation = 65 + Math.random() * 20 // 65-85%
  const lightness = 50 + Math.random() * 15 // 50-65%
  return hslToHex(hue, saturation, lightness)
}

/**
 * Computes canvas gradient line endpoints for a given CSS-style angle
 * (0deg points up, rotating clockwise - the actual CSS linear-gradient
 * convention, not standard math angle convention) and box dimensions,
 * matching how a CSS linear-gradient would actually render. Verified
 * against all 4 cardinal keyword directions (to top/right/bottom/left)
 * before being ported here.
 */
export function getGradientCanvasLine(angleDeg, width, height) {
  const rad = (angleDeg * Math.PI) / 180
  const dx = Math.sin(rad)
  const dy = -Math.cos(rad)
  const halfLength = Math.abs((width / 2) * dx) + Math.abs((height / 2) * dy)
  const cx = width / 2
  const cy = height / 2
  return {
    x0: cx - halfLength * dx,
    y0: cy - halfLength * dy,
    x1: cx + halfLength * dx,
    y1: cy + halfLength * dy,
  }
}

// A small, curated set of generic (non-branded) gradient combinations
// for one-click starting points - not meant to be exhaustive, just a
// reasonable set of genuinely pleasant, commonly-liked color pairings.
export const PRESET_GRADIENTS = [
  { name: 'Sunset', angle: 90, stops: [{ color: '#ff6b6b', position: 0 }, { color: '#feca57', position: 100 }] },
  { name: 'Ocean', angle: 90, stops: [{ color: '#0575e6', position: 0 }, { color: '#00f2fe', position: 100 }] },
  { name: 'Purple Haze', angle: 135, stops: [{ color: '#7f00ff', position: 0 }, { color: '#e100ff', position: 100 }] },
  { name: 'Forest', angle: 90, stops: [{ color: '#134e5e', position: 0 }, { color: '#71b280', position: 100 }] },
  { name: 'Fire', angle: 90, stops: [{ color: '#f83600', position: 0 }, { color: '#f9d423', position: 100 }] },
  { name: 'Cotton Candy', angle: 90, stops: [{ color: '#ffafbd', position: 0 }, { color: '#ffc3a0', position: 100 }] },
  { name: 'Midnight', angle: 135, stops: [{ color: '#232526', position: 0 }, { color: '#414345', position: 100 }] },
  { name: 'Peach', angle: 90, stops: [{ color: '#ed4264', position: 0 }, { color: '#ffedbc', position: 100 }] },
]
