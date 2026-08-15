import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import MergePdfTool from '../../components/tools/pdf/MergePdfTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('merge-pdf')

export default function MergePdf() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <MergePdfTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
