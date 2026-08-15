import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import PdfToWordTool from '../../components/tools/pdf/PdfToWordTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('pdf-to-word')

export default function PdfToWord() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <PdfToWordTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
