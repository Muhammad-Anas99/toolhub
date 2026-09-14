import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import DrumPadTool from '../../components/tools/fun/DrumPadTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('drum-pad')
export default function DrumPad() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><DrumPadTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
