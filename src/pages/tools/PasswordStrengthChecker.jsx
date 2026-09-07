import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import PasswordStrengthCheckerTool from '../../components/tools/security/PasswordStrengthCheckerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('password-strength-checker')

export default function PasswordStrengthChecker() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <PasswordStrengthCheckerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
