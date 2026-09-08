import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CronExpressionGeneratorTool from '../../components/tools/dev/CronExpressionGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('cron-expression-generator')

export default function CronExpressionGenerator() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <CronExpressionGeneratorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
