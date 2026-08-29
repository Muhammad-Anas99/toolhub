import { PDFDocument } from 'pdf-lib'
import { pdfPageToImage, getPdfDocumentPageCount } from './pdfRenderUtils.js'

/**
 * Compresses a PDF entirely in the browser — no upload, no third-party
 * API. The technique: render each page to an image, recompress that
 * image as JPEG at the chosen quality (the same lever your Image
 * Compressor already uses), then rebuild a new PDF from the compressed
 * pages.
 *
 * Honest, deliberate tradeoff: this rasterizes every page, so any real
 * text in the PDF is no longer selectable or searchable in the output —
 * the whole page becomes one image. This is the right tradeoff for the
 * actual common case (image-heavy PDFs: scans, photo-heavy documents),
 * which is what makes a PDF large enough to want compressing in the
 * first place — a pure-text PDF is rarely large enough to need this.
 * The tool's UI states this plainly rather than hiding it.
 */
export async function compressPdf(file, { quality = 0.65, onProgress } = {}) {
  const pageCount = await getPdfDocumentPageCount(file)
  if (pageCount === 0) throw new Error('This PDF has no pages.')

  const pdfDoc = await PDFDocument.create()

  for (let i = 1; i <= pageCount; i++) {
    const blob = await pdfPageToImage(file, { pageNumber: i, mimeType: 'image/jpeg', scale: 1.5, quality })
    const bytes = new Uint8Array(await blob.arrayBuffer())
    const jpgImage = await pdfDoc.embedJpg(bytes)

    // Standard US Letter width in points, height scaled to match the
    // rendered page's real aspect ratio — avoids distorting any page
    // that isn't Letter proportioned.
    const targetWidth = 612
    const scale = targetWidth / jpgImage.width
    const targetHeight = jpgImage.height * scale

    const page = pdfDoc.addPage([targetWidth, targetHeight])
    page.drawImage(jpgImage, { x: 0, y: 0, width: targetWidth, height: targetHeight })

    onProgress?.(i, pageCount)
  }

  const bytes = await pdfDoc.save()
  return new Blob([bytes], { type: 'application/pdf' })
}
