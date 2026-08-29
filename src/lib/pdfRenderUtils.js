import * as pdfjsLib from 'pdfjs-dist'
// The `?url` suffix is Vite's syntax for importing an asset's final bundled
// URL rather than its contents — required here because pdf.js loads its
// worker as a separate script at runtime, not as regular imported code.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

async function loadDocument(file) {
  const arrayBuffer = await file.arrayBuffer()
  return pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise
}

export async function getPdfDocumentPageCount(file) {
  const doc = await loadDocument(file)
  const count = doc.numPages
  await doc.destroy()
  return count
}

/**
 * Renders one page of a PDF to a real raster image (JPG or PNG) via
 * Canvas — genuine pixel rendering of the page's actual content, not a
 * placeholder or a text extraction. `scale` controls output resolution;
 * 2 (the default) roughly matches a good screen-reading quality without
 * producing an excessively large file.
 */
export async function pdfPageToImage(file, { pageNumber = 1, mimeType = 'image/png', scale = 2, quality = 0.92 } = {}) {
  const doc = await loadDocument(file)
  try {
    const page = await doc.getPage(pageNumber)
    const viewport = page.getViewport({ scale })

    const canvas = document.createElement('canvas')
    canvas.width = viewport.width
    canvas.height = viewport.height
    const ctx = canvas.getContext('2d')

    await page.render({ canvasContext: ctx, viewport }).promise

    return await new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Could not create an image from this page.'))),
        mimeType,
        mimeType === 'image/jpeg' ? quality : undefined
      )
    })
  } finally {
    await doc.destroy()
  }
}
