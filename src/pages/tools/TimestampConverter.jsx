import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import TimestampConverterTool from '../../components/tools/dev/TimestampConverterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('timestamp-converter')

export default function TimestampConverter() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <TimestampConverterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
