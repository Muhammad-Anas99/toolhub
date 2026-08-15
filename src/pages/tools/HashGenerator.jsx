import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import HashGeneratorTool from '../../components/tools/dev/HashGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('hash-generator')

export default function HashGenerator() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <HashGeneratorTool />
    </ToolLayout>
  )
}
