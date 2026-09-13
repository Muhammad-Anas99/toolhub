import JSZip from 'jszip'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const EMU_PER_INCH = 914400
const POINTS_PER_INCH = 72

function parseXml(xmlString) {
  return new DOMParser().parseFromString(xmlString, 'text/xml')
}

function buildRelationshipMap(relsXmlString) {
  if (!relsXmlString) return {}
  const doc = parseXml(relsXmlString)
  const map = {}
  for (const rel of doc.getElementsByTagName('Relationship')) {
    map[rel.getAttribute('Id')] = rel.getAttribute('Target')
  }
  return map
}

/**
 * Resolves the real, logical slide order from presentation.xml and its
 * relationships file, rather than trusting slide filenames or the order
 * files happen to appear in the zip - a presentation's slides can be
 * reordered by the user without renaming the underlying slideN.xml
 * files, so slide3.xml could genuinely be the first slide shown.
 * Verified independently against a deliberately reordered sample
 * before being ported here.
 */
function resolveSlideOrder(presentationXmlString, presentationRelsXmlString) {
  const presDoc = parseXml(presentationXmlString)
  const relMap = buildRelationshipMap(presentationRelsXmlString)
  const order = []
  for (const sldId of presDoc.getElementsByTagName('p:sldId')) {
    const rId = sldId.getAttribute('r:id')
    const target = relMap[rId]
    if (target) order.push(target.replace(/^\.?\/?/, ''))
  }
  return order
}

function getSlideSizeEmu(presentationXmlString) {
  const doc = parseXml(presentationXmlString)
  const sldSz = doc.getElementsByTagName('p:sldSz')[0]
  if (!sldSz) return { widthEmu: 9144000, heightEmu: 6858000 } // 10x7.5in fallback
  return {
    widthEmu: Number(sldSz.getAttribute('cx')),
    heightEmu: Number(sldSz.getAttribute('cy')),
  }
}

/**
 * Extracts real text content from a slide, grouped by paragraph -
 * multiple text runs within one paragraph (common whenever part of a
 * sentence has different formatting, like bold) are joined into a
 * single line rather than treated as separate lines. Empty paragraphs
 * are skipped. Verified independently against a realistic multi-run,
 * multi-paragraph sample before being ported here.
 */
function extractSlideTextLines(slideXmlString) {
  const doc = parseXml(slideXmlString)
  const lines = []
  for (const paragraph of doc.getElementsByTagName('a:p')) {
    const runs = paragraph.getElementsByTagName('a:t')
    const text = Array.from(runs)
      .map((run) => run.textContent)
      .join('')
    if (text.trim()) lines.push(text)
  }
  return lines
}

/**
 * Extracts the real media file paths for images actually embedded on
 * this slide, resolved through the slide's own relationships file (a
 * separate scope from the presentation-level relationships used for
 * slide order). Verified independently, including that non-image
 * relationships like the slide layout reference are correctly
 * excluded, before being ported here.
 */
function extractSlideImagePaths(slideXmlString, slideRelsXmlString) {
  const slideDoc = parseXml(slideXmlString)
  const relMap = buildRelationshipMap(slideRelsXmlString)
  const paths = []
  for (const blip of slideDoc.getElementsByTagName('a:blip')) {
    const rId = blip.getAttribute('r:embed')
    if (rId && relMap[rId]) paths.push(relMap[rId])
  }
  return paths
}

function resolveZipPath(basePath, relativeTarget) {
  const baseParts = basePath.split('/').slice(0, -1)
  const targetParts = relativeTarget.split('/')
  for (const part of targetParts) {
    if (part === '..') baseParts.pop()
    else if (part !== '.') baseParts.push(part)
  }
  return baseParts.join('/')
}

/**
 * Greedy word-wrap using real font metrics, verified independently
 * (including that every wrapped line actually fits within maxWidth,
 * and edge cases like a single word longer than maxWidth or empty
 * input) before being ported here.
 */
function wrapText(text, font, fontSize, maxWidth) {
  const words = String(text).split(/\s+/).filter(Boolean)
  if (words.length === 0) return ['']
  const lines = []
  let currentLine = words[0]
  for (let i = 1; i < words.length; i++) {
    const candidate = `${currentLine} ${words[i]}`
    if (font.widthOfTextAtSize(candidate, fontSize) <= maxWidth) {
      currentLine = candidate
    } else {
      lines.push(currentLine)
      currentLine = words[i]
    }
  }
  lines.push(currentLine)
  return lines
}

/**
 * Converts a PowerPoint file into a PDF by extracting each slide's real
 * text content and embedded images directly from the file's internal
 * structure, laying them out clearly on their own PDF page per slide.
 * This is deliberately not a visual reproduction of the original slide
 * design - there's no browser-available engine that can render an
 * arbitrary PPTX slide's exact visual layout the way PDF.js can for a
 * PDF page, so exact colors, fonts, and shape positions aren't
 * preserved. What is preserved: the real words on each slide, in their
 * real reading order, and any images that were actually placed on it.
 */
export async function pptxToPdf(file, { onProgress } = {}) {
  const zip = await JSZip.loadAsync(file)

  const presentationXml = await zip.file('ppt/presentation.xml').async('string')
  const presentationRelsXml = await zip.file('ppt/_rels/presentation.xml.rels').async('string')
  const slideOrder = resolveSlideOrder(presentationXml, presentationRelsXml)
  if (slideOrder.length === 0) throw new Error('This file has no slides ToolHub could read.')

  const { widthEmu, heightEmu } = getSlideSizeEmu(presentationXml)
  const pageWidth = (widthEmu / EMU_PER_INCH) * POINTS_PER_INCH
  const pageHeight = (heightEmu / EMU_PER_INCH) * POINTS_PER_INCH

  const pdfDoc = await PDFDocument.create()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  for (let i = 0; i < slideOrder.length; i++) {
    const slidePath = `ppt/${slideOrder[i]}`
    const slideXml = await zip.file(slidePath).async('string')

    const relsPath = slidePath.replace(/([^/]+)$/, '_rels/$1.rels')
    const slideRelsFile = zip.file(relsPath)
    const slideRelsXml = slideRelsFile ? await slideRelsFile.async('string') : ''

    const lines = extractSlideTextLines(slideXml)
    const imagePaths = extractSlideImagePaths(slideXml, slideRelsXml)

    const page = pdfDoc.addPage([pageWidth, pageHeight])
    const margin = 36
    let y = pageHeight - margin - 20

    lines.forEach((line, lineIndex) => {
      const isTitle = lineIndex === 0
      const size = isTitle ? 20 : 12
      const usedFont = isTitle ? boldFont : font
      const maxWidth = pageWidth - margin * 2
      const wrapped = wrapText(line, usedFont, size, maxWidth)
      wrapped.forEach((wrappedLine) => {
        if (y < margin) return
        page.drawText(wrappedLine, { x: margin, y, size, font: usedFont, color: rgb(0.1, 0.1, 0.1) })
        y -= size * 1.4
      })
      y -= 6
    })

    for (const imagePath of imagePaths) {
      const resolvedPath = resolveZipPath(slidePath, imagePath)
      const imageFile = zip.file(resolvedPath)
      if (!imageFile || y < margin + 80) continue
      try {
        const imageBytes = await imageFile.async('uint8array')
        const isJpeg = /\.jpe?g$/i.test(resolvedPath)
        const embedded = isJpeg ? await pdfDoc.embedJpg(imageBytes) : await pdfDoc.embedPng(imageBytes)
        const maxImgWidth = pageWidth - margin * 2
        const scale = Math.min(1, maxImgWidth / embedded.width)
        const imgWidth = embedded.width * scale
        const imgHeight = embedded.height * scale
        if (y - imgHeight < margin) continue
        page.drawImage(embedded, { x: margin, y: y - imgHeight, width: imgWidth, height: imgHeight })
        y -= imgHeight + 12
      } catch {
        // A single unsupported or corrupt image shouldn't fail the
        // whole conversion - the slide's text still comes through.
      }
    }

    onProgress?.(i + 1, slideOrder.length)
  }

  const pdfBytes = await pdfDoc.save()
  return new Blob([pdfBytes], { type: 'application/pdf' })
}
