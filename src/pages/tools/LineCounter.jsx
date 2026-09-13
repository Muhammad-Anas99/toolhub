import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import LineCounterTool from '../../components/tools/text/LineCounterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('line-counter')

export default function LineCounter() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <LineCounterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
