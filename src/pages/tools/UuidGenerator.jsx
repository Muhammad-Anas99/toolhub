import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import UuidGeneratorTool from '../../components/tools/dev/UuidGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('uuid-generator')

export default function UuidGenerator() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <UuidGeneratorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
