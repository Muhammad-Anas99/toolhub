import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import PowerBiThemeGeneratorTool from '../../components/tools/color/PowerBiThemeGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('power-bi-theme-generator')

export default function PowerBiThemeGenerator() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <PowerBiThemeGeneratorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
