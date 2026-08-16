import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import PasswordGeneratorTool from '../../components/tools/security/PasswordGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('password-generator')

export default function PasswordGenerator() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <PasswordGeneratorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
