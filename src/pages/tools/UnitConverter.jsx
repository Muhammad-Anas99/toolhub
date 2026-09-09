import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import UnitConverterTool from '../../components/tools/dev/UnitConverterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('unit-converter')

export default function UnitConverter() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <UnitConverterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
