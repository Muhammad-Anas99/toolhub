import * as pdfjsLib from 'pdfjs-dist'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { Document, Packer, Paragraph, TextRun } from 'docx'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

/**
 * What this genuinely does: extracts the actual text content from each
 * page (via pdf.js's getTextContent — real text, not OCR or a guess) and
 * reconstructs paragraph breaks from the vertical spacing between lines,
 * then builds a real, valid .docx from that.
 *
 * What this does NOT do, on purpose, because it can't be done honestly
 * with a lightweight client-side approach: preserve the original PDF's
 * exact layout, fonts, images, tables, columns, or page design. True
 * layout-preserving PDF-to-Word conversion is a hard document-layout-
 * analysis problem that even commercial tools don't solve perfectly —
 * faking that here would produce a "working" tool that quietly loses or
 * garbles content, which is worse than being upfront about what this
 * actually is: a text extractor that hands you an editable starting
 * point, not a pixel-perfect clone.
 *
 * Scanned/image-only PDFs (no real text layer, just pictures of text)
 * have nothing for getTextContent to extract — see hasExtractableText.
 */

function groupLines(items) {
  // Items on the same visual line share (almost) the same y-coordinate;
  // small differences are normal font-rendering noise, not a new line.
  const Y_TOLERANCE = 3
  const lines = []

  for (const item of items) {
    if (!item.str.trim()) continue
    const y = item.transform[5]
    const x = item.transform[4]
    // item.height is the actual rendered font size for this text run —
    // a direct, per-line signal for "how tall is a normal line here,"
    // used below to judge whether the gap to the next line is a simple
    // line wrap or a real paragraph break. Falls back to a reasonable
    // default on the rare item that doesn't report one.
    const height = item.height || 12
    let line = lines.find((candidate) => Math.abs(candidate.y - y) <= Y_TOLERANCE)
    if (!line) {
      line = { y, height, parts: [] }
      lines.push(line)
    } else {
      line.height = Math.max(line.height, height)
    }
    line.parts.push({ x, str: item.str })
  }

  // PDF y-coordinates increase upward, so the top of the page is the
  // largest y — sort descending to read top-to-bottom.
  lines.sort((a, b) => b.y - a.y)
  return lines.map((line) => ({
    y: line.y,
    height: line.height,
    text: line.parts
      .sort((a, b) => a.x - b.x)
      .map((part) => part.str)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim(),
  }))
}

function linesToParagraphs(lines) {
  const nonEmpty = lines.filter((line) => line.text)
  if (nonEmpty.length === 0) return []

  const paragraphs = []
  let current = nonEmpty[0].text

  for (let i = 1; i < nonEmpty.length; i += 1) {
    const gap = nonEmpty[i - 1].y - nonEmpty[i].y
    // A gap noticeably larger than this line's own font height means
    // more space than a normal single-spaced line wrap would leave —
    // verified against real extracted PDF text: a same-paragraph
    // wrapped line typically leaves a gap close to its font height
    // (roughly 1.1–1.3x), while an actual paragraph or heading break
    // leaves distinctly more.
    const expectedLineGap = nonEmpty[i].height * 1.6
    if (gap > expectedLineGap) {
      paragraphs.push(current)
      current = nonEmpty[i].text
    } else {
      current += ` ${nonEmpty[i].text}`
    }
  }
  paragraphs.push(current)
  return paragraphs
}

/**
 * Quick check for whether a PDF has any real extractable text at all —
 * used to give a clear, specific error for scanned/image-only PDFs
 * instead of silently producing an empty-looking Word document.
 */
export async function hasExtractableText(file) {
  const arrayBuffer = await file.arrayBuffer()
  const doc = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise
  try {
    const maxPagesToCheck = Math.min(doc.numPages, 3)
    for (let pageNum = 1; pageNum <= maxPagesToCheck; pageNum += 1) {
      const page = await doc.getPage(pageNum)
      const textContent = await page.getTextContent()
      if (textContent.items.some((item) => item.str.trim())) return true
    }
    return false
  } finally {
    await doc.destroy()
  }
}

export async function pdfToWord(file) {
  const arrayBuffer = await file.arrayBuffer()
  const doc = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise

  const pageParagraphs = []
  try {
    for (let pageNum = 1; pageNum <= doc.numPages; pageNum += 1) {
      const page = await doc.getPage(pageNum)
      const textContent = await page.getTextContent()
      const lines = groupLines(textContent.items)
      const paragraphs = linesToParagraphs(lines)
      pageParagraphs.push(paragraphs)
    }
  } finally {
    await doc.destroy()
  }

  const allEmpty = pageParagraphs.every((page) => page.length === 0)
  if (allEmpty) {
    throw new Error(
      'No text could be found in this PDF \u2014 it looks like a scanned document (an image of text rather than real text). This tool extracts existing text, so there\u2019s nothing here to convert.'
    )
  }

  const docChildren = []
  pageParagraphs.forEach((paragraphs, pageIndex) => {
    paragraphs.forEach((text, paragraphIndex) => {
      docChildren.push(
        new Paragraph({
          children: [new TextRun(text)],
          pageBreakBefore: pageIndex > 0 && paragraphIndex === 0,
        })
      )
    })
  })

  const wordDoc = new Document({
    sections: [{ children: docChildren }],
  })

  return Packer.toBlob(wordDoc)
}
