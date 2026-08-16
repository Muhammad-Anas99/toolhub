import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import JsonValidatorTool from '../../components/tools/dev/JsonValidatorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('json-validator')

export default function JsonValidator() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <JsonValidatorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
