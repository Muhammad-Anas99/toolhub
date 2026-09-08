import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import SchemaMarkupGeneratorTool from '../../components/tools/dev/SchemaMarkupGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('schema-markup-generator')

export default function SchemaMarkupGenerator() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <SchemaMarkupGeneratorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
