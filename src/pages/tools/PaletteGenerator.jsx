import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import PaletteGeneratorTool from '../../components/tools/color/PaletteGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('palette-generator')

export default function PaletteGenerator() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <PaletteGeneratorTool />
    </ToolLayout>
  )
}
