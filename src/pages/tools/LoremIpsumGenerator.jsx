import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import LoremIpsumTool from '../../components/tools/text/LoremIpsumTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('lorem-ipsum-generator')

export default function LoremIpsumGenerator() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <LoremIpsumTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
