import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import MemeOverlayTool from '../../components/tools/fun/MemeOverlayTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('meme-overlay')
export default function MemeOverlay() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><MemeOverlayTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
