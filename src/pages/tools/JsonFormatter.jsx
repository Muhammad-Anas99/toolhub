import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import JsonFormatterTool from '../../components/tools/dev/JsonFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('json-formatter')

export default function JsonFormatter() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <JsonFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
