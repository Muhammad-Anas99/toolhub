import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import TtsPitcherTool from '../../components/tools/fun/TtsPitcherTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('tts-pitcher')
export default function TtsPitcher() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><TtsPitcherTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
