import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import PdfToPptxTool from '../../components/tools/pdf/PdfToPptxTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('pdf-to-powerpoint')

export default function PdfToPowerpoint() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <PdfToPptxTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
