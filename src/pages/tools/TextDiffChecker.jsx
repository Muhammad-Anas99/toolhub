import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import TextDiffTool from '../../components/tools/text/TextDiffTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('text-diff-checker')

export default function TextDiffChecker() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <TextDiffTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
