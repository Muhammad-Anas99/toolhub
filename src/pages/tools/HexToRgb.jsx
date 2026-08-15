import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ColorConverterTool from '../../components/tools/color/ColorConverterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('hex-to-rgb')

export default function HexToRgb() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <ColorConverterTool />
    </ToolLayout>
  )
}
