import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import FindAndReplaceTool from '../../components/tools/text/FindAndReplaceTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('find-and-replace')

export default function FindAndReplace() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <FindAndReplaceTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
