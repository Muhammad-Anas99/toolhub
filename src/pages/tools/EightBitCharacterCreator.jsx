import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import EightBitCharacterCreatorTool from '../../components/tools/fun/EightBitCharacterCreatorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('8bit-character-creator')
export default function EightBitCharacterCreator() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><EightBitCharacterCreatorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
