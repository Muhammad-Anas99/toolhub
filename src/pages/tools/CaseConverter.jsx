import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CaseConverterTool from '../../components/tools/text/CaseConverterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('case-converter')

export default function CaseConverter() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <CaseConverterTool />
    </ToolLayout>
  )
}
