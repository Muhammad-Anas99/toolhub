import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ColorConverterTool from '../../components/tools/color/ColorConverterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('color-converter')

export default function ColorConverter() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <ColorConverterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
