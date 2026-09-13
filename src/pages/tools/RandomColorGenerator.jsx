import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import RandomColorGeneratorTool from '../../components/tools/color/RandomColorGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('random-color-generator')
export default function RandomColorGenerator() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><RandomColorGeneratorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
