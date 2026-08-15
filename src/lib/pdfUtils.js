import { PDFDocument } from 'pdf-lib'

/**
 * Every function here uses pdf-lib, a pure-JavaScript PDF library that
 * runs entirely in the browser main thread — no server round-trip, no
 * web worker to configure (unlike pdf.js, used for PDF *rendering*,
 * which ToolHub doesn't yet use — see src/data/tools.js for the
 * PDF-to-image tools currently marked comingSoon and why).
 */

async function fileToArrayBuffer(file) {
  return file.arrayBuffer()
}

/**
 * Embeds one image into a new single-page PDF, sized to the image's own
 * pixel dimensions (at 72 DPI, matching how the image would print at
 * "actual size" — the standard, unsurprising default).
 */
export async function imageToPdf(file) {
  const pdfDoc = await PDFDocument.create()
  const imageBytes = await fileToArrayBuffer(file)

  const isPng = file.type === 'image/png'
  const image = isPng ? await pdfDoc.embedPng(imageBytes) : await pdfDoc.embedJpg(imageBytes)

  const page = pdfDoc.addPage([image.width, image.height])
  page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height })

  const bytes = await pdfDoc.save()
  return new Blob([bytes], { type: 'application/pdf' })
}

/**
 * Merges multiple PDF files into one, in the order given — every page
 * from every file, copied faithfully (copyPages preserves the original
 * page content exactly, it doesn't re-render or flatten anything).
 */
export async function mergePdfs(files) {
  const mergedPdf = await PDFDocument.create()

  for (const file of files) {
    const bytes = await fileToArrayBuffer(file)
    const sourcePdf = await PDFDocument.load(bytes)
    const pageIndices = sourcePdf.getPageIndices()
    const copiedPages = await mergedPdf.copyPages(sourcePdf, pageIndices)
    copiedPages.forEach((page) => mergedPdf.addPage(page))
  }

  const bytes = await mergedPdf.save()
  return new Blob([bytes], { type: 'application/pdf' })
}

export async function getPdfPageCount(file) {
  const bytes = await fileToArrayBuffer(file)
  const pdfDoc = await PDFDocument.load(bytes)
  return pdfDoc.getPageCount()
}

/**
 * Parses a page-range string like "1-3, 5, 8-10" into a zero-indexed,
 * de-duplicated, sorted array of page indices, clamped to the document's
 * actual page count. Returns null if the string doesn't parse to at
 * least one valid page — the caller shows a validation error in that case
 * rather than silently producing an empty PDF.
 */
export function parsePageRanges(rangeString, pageCount) {
  const indices = new Set()
  const parts = rangeString
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)

  if (parts.length === 0) return null

  for (const part of parts) {
    const rangeMatch = part.match(/^(\d+)\s*-\s*(\d+)$/)
    const singleMatch = part.match(/^(\d+)$/)

    if (rangeMatch) {
      let start = Number(rangeMatch[1])
      let end = Number(rangeMatch[2])
      if (start > end) [start, end] = [end, start]
      for (let page = start; page <= end; page += 1) {
        if (page >= 1 && page <= pageCount) indices.add(page - 1)
      }
    } else if (singleMatch) {
      const page = Number(singleMatch[1])
      if (page >= 1 && page <= pageCount) indices.add(page - 1)
    } else {
      return null // unrecognized token — treat the whole input as invalid
    }
  }

  return indices.size > 0 ? Array.from(indices).sort((a, b) => a - b) : null
}

/**
 * Extracts the given zero-indexed pages from a PDF into a new document,
 * preserving their original order in `pageIndices` (not necessarily
 * ascending — a caller could intentionally reorder).
 */
export async function extractPdfPages(file, pageIndices) {
  const bytes = await fileToArrayBuffer(file)
  const sourcePdf = await PDFDocument.load(bytes)
  const newPdf = await PDFDocument.create()

  const copiedPages = await newPdf.copyPages(sourcePdf, pageIndices)
  copiedPages.forEach((page) => newPdf.addPage(page))

  const outputBytes = await newPdf.save()
  return new Blob([outputBytes], { type: 'application/pdf' })
}
