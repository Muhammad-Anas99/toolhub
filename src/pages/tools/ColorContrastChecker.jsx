import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ColorContrastCheckerTool from '../../components/tools/color/ColorContrastCheckerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('color-contrast-checker')
export default function ColorContrastChecker() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><ColorContrastCheckerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
