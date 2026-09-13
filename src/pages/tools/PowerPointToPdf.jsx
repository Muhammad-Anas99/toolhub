import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import PowerPointToPdfTool from '../../components/tools/pdf/PowerPointToPdfTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('powerpoint-to-pdf')

export default function PowerPointToPdf() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <PowerPointToPdfTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
