import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import UserAgentParserTool from '../../components/tools/dev/UserAgentParserTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('user-agent-parser')

export default function UserAgentParser() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <UserAgentParserTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
