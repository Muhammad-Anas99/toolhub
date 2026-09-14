import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import TailwindGridGeneratorTool from '../../components/tools/dev/TailwindGridGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('tailwind-grid-generator')
export default function TailwindGridGenerator() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><TailwindGridGeneratorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
