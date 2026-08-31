import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CodeMinifierTool from '../../components/tools/dev/CodeMinifierTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('code-minifier')

export default function CodeMinifier() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <CodeMinifierTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
