import { loadImage, canvasToBlob } from './imageProcessing.js'

// The standard set of favicon sizes modern browsers and platforms expect.
// 16/32/48 are traditional browser favicon sizes; 180 is Apple Touch Icon;
// 192/512 are the sizes referenced by a web app manifest for Android/PWA.
export const FAVICON_SIZES = [
  { size: 16, filename: 'favicon-16x16.png', label: '16\u00d716' },
  { size: 32, filename: 'favicon-32x32.png', label: '32\u00d732' },
  { size: 48, filename: 'favicon-48x48.png', label: '48\u00d748 (used inside favicon.ico)' },
  { size: 180, filename: 'apple-touch-icon.png', label: '180\u00d7180 (Apple Touch Icon)' },
  { size: 192, filename: 'android-chrome-192x192.png', label: '192\u00d7192 (Android/PWA)' },
  { size: 512, filename: 'android-chrome-512x512.png', label: '512\u00d7512 (Android/PWA)' },
]

// favicon.ico traditionally bundles the smaller, browser-tab-relevant
// sizes together in one multi-resolution file - not every generated size,
// since 180/192/512 are referenced directly via their own <link> tags for
// their specific platforms instead.
const ICO_SIZES = [16, 32, 48]

/**
 * Renders the source image onto a square canvas at the given size,
 * preserving transparency (no background fill) - a transparent PNG input
 * stays transparent in the output, which matters since many real favicons
 * rely on transparency against browser tab backgrounds.
 */
async function renderToSize(image, size) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, size, size)
  ctx.drawImage(image, 0, 0, size, size)
  return canvas
}

/**
 * Generates every standard favicon size as a PNG blob, from a single
 * source image (loaded once, reused across all sizes rather than
 * re-decoding the file for each one).
 */
export async function generateFaviconSet(file) {
  const { img, url } = await loadImage(file)
  try {
    const results = []
    for (const { size, filename, label } of FAVICON_SIZES) {
      const canvas = await renderToSize(img, size)
      const blob = await canvasToBlob(canvas, 'image/png')
      results.push({ size, filename, label, blob })
    }
    return results
  } finally {
    URL.revokeObjectURL(url)
  }
}

/**
 * Builds a real, valid .ico file using the modern PNG-in-ICO approach
 * (embedding full PNG data per size, rather than legacy uncompressed BMP
 * data) - supported since Windows Vista and universally supported by
 * browsers. Verified independently against Python's Pillow library
 * before this logic was ported here: correct format, correct sizes,
 * correct pixel data, not just "the code ran without error."
 */
export async function buildFaviconIco(faviconResults) {
  const icoEntries = ICO_SIZES.map((size) => faviconResults.find((r) => r.size === size)).filter(Boolean)

  const pngBuffers = await Promise.all(icoEntries.map((entry) => entry.blob.arrayBuffer()))

  const numImages = icoEntries.length
  const headerSize = 6
  const dirEntrySize = 16
  const dirSize = dirEntrySize * numImages
  let offset = headerSize + dirSize

  const header = new DataView(new ArrayBuffer(headerSize))
  header.setUint16(0, 0, true) // reserved
  header.setUint16(2, 1, true) // type: 1 = icon
  header.setUint16(4, numImages, true)

  const dirBuffers = []
  for (let i = 0; i < numImages; i++) {
    const size = icoEntries[i].size
    const pngLength = pngBuffers[i].byteLength
    const entry = new DataView(new ArrayBuffer(dirEntrySize))
    entry.setUint8(0, size >= 256 ? 0 : size)
    entry.setUint8(1, size >= 256 ? 0 : size)
    entry.setUint8(2, 0)
    entry.setUint8(3, 0)
    entry.setUint16(4, 1, true)
    entry.setUint16(6, 32, true)
    entry.setUint32(8, pngLength, true)
    entry.setUint32(12, offset, true)
    dirBuffers.push(new Uint8Array(entry.buffer))
    offset += pngLength
  }

  const totalSize = offset
  const output = new Uint8Array(totalSize)
  let pos = 0
  output.set(new Uint8Array(header.buffer), pos)
  pos += headerSize
  for (const dirBuf of dirBuffers) {
    output.set(dirBuf, pos)
    pos += dirEntrySize
  }
  for (const pngBuf of pngBuffers) {
    output.set(new Uint8Array(pngBuf), pos)
    pos += pngBuf.byteLength
  }

  return new Blob([output], { type: 'image/x-icon' })
}

export function buildWebManifest(appName = 'My App') {
  return JSON.stringify(
    {
      name: appName,
      short_name: appName,
      icons: [
        { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
    },
    null,
    2
  )
}

export function buildFaviconHtml() {
  return [
    '<link rel="icon" type="image/x-icon" href="/favicon.ico">',
    '<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">',
    '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">',
    '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">',
    '<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">',
    '<link rel="manifest" href="/site.webmanifest">',
  ].join('\n')
}
