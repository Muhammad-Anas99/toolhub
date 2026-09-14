import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import RobotsTxtValidatorTool from '../../components/tools/dev/RobotsTxtValidatorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('robots-txt-validator')

export default function RobotsTxtValidator() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <RobotsTxtValidatorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
