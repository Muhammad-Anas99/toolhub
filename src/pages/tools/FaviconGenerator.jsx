import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import FaviconGeneratorTool from '../../components/tools/image/FaviconGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('favicon-generator')

export default function FaviconGenerator() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <FaviconGeneratorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
