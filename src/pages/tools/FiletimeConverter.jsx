import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import FiletimeConverterTool from '../../components/tools/dev/FiletimeConverterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('filetime-converter')

export default function FiletimeConverter() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <FiletimeConverterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
