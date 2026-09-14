import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import PromptRouletteTool from '../../components/tools/fun/PromptRouletteTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('prompt-roulette')
export default function PromptRoulette() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><PromptRouletteTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
