import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import HexCodeScrollerTool from '../../components/tools/color/HexCodeScrollerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('hex-code-scroller')
export default function HexCodeScroller() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><HexCodeScrollerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
