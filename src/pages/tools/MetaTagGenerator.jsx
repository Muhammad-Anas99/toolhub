import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import MetaTagGeneratorTool from '../../components/tools/dev/MetaTagGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('meta-tag-generator')

export default function MetaTagGenerator() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <MetaTagGeneratorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
