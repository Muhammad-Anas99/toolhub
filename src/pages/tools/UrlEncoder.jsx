import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import UrlEncoderTool from '../../components/tools/dev/UrlEncoderTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('url-encoder')

export default function UrlEncoder() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <UrlEncoderTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
