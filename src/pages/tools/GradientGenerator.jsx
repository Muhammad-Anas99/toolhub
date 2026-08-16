import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import GradientGeneratorTool from '../../components/tools/color/GradientGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('gradient-generator')

export default function GradientGenerator() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <GradientGeneratorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
