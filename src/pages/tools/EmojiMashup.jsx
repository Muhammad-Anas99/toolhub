import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import EmojiMashupTool from '../../components/tools/fun/EmojiMashupTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('emoji-mashup')
export default function EmojiMashup() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><EmojiMashupTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
