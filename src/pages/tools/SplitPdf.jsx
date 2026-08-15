import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import SplitPdfTool from '../../components/tools/pdf/SplitPdfTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('split-pdf')

export default function SplitPdf() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <SplitPdfTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
