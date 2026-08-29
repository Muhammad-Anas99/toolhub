import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CompressPdfTool from '../../components/tools/pdf/CompressPdfTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('compress-pdf')

export default function CompressPdf() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <CompressPdfTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
