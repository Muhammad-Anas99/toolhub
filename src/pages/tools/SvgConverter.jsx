import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import SvgConverterTool from '../../components/tools/image/SvgConverterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('svg-converter')

export default function SvgConverter() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <SvgConverterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
