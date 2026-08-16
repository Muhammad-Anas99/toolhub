import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import RegexTesterTool from '../../components/tools/dev/RegexTesterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('regex-tester')

export default function RegexTester() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <RegexTesterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
