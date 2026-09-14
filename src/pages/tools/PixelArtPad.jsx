import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import PixelArtPadTool from '../../components/tools/fun/PixelArtPadTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('pixel-art-pad')
export default function PixelArtPad() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><PixelArtPadTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
