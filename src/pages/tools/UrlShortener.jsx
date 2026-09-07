import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import UrlShortenerTool from '../../components/tools/dev/UrlShortenerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('url-shortener')

export default function UrlShortener() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <UrlShortenerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
