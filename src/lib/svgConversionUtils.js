import { loadImage, canvasToBlob } from './imageProcessing.js'
import { buildFaviconIco } from './faviconUtils.js'

export const PNG_OUTPUT_SIZES = [16, 32, 48, 64, 128, 192, 256, 512, 1024]

/**
 * Renders an SVG (or any image) onto a square canvas at the given
 * pixel size, preserving transparency. The output size is always
 * explicitly chosen by the caller rather than inferred from the SVG's
 * own dimensions, since an SVG's "natural" size is often meaningless
 * or missing entirely (SVGs are scalable by design) - asking the user
 * for the size they actually want avoids a 300x150 default-sized
 * surprise that some browsers fall back to for SVGs with no width,
 * height, or viewBox.
 */
async function renderSvgToCanvas(img, size) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, size, size)
  ctx.drawImage(img, 0, 0, size, size)
  return canvas
}

export async function convertSvgToPng(file, size) {
  const { img, url } = await loadImage(file)
  try {
    const canvas = await renderSvgToCanvas(img, size)
    return await canvasToBlob(canvas, 'image/png')
  } finally {
    URL.revokeObjectURL(url)
  }
}

/**
 * Converts an SVG into a real, multi-resolution .ico file, reusing the
 * same buildFaviconIco function already independently verified against
 * Python's Pillow library elsewhere in this codebase, rather than
 * reimplementing the ICO container format's binary layout a second
 * time.
 */
export async function convertSvgToIco(file) {
  const { img, url } = await loadImage(file)
  try {
    const icoSizes = [16, 32, 48]
    const results = []
    for (const size of icoSizes) {
      const canvas = await renderSvgToCanvas(img, size)
      const blob = await canvasToBlob(canvas, 'image/png')
      results.push({ size, blob })
    }
    return await buildFaviconIco(results)
  } finally {
    URL.revokeObjectURL(url)
  }
}
