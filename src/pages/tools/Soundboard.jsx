import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import SoundboardTool from '../../components/tools/fun/SoundboardTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('soundboard')
export default function Soundboard() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><SoundboardTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
