import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import HtaccessGeneratorTool from '../../components/tools/dev/HtaccessGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('htaccess-generator')

export default function HtaccessGenerator() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <HtaccessGeneratorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
