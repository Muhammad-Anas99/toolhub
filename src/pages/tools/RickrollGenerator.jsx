import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import RickrollGeneratorTool from '../../components/tools/fun/RickrollGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('rickroll-generator')
export default function RickrollGenerator() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><RickrollGeneratorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
