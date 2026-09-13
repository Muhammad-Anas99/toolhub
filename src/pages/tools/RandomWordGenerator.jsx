import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import RandomWordGeneratorTool from '../../components/tools/fun/RandomWordGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('random-word-generator')
export default function RandomWordGenerator() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><RandomWordGeneratorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
