import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import RandomNumberGeneratorTool from '../../components/tools/fun/RandomNumberGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('random-number-generator')
export default function RandomNumberGenerator() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><RandomNumberGeneratorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
