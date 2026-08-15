import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import InstagramResizerTool from '../../components/tools/InstagramResizerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('instagram-post-resizer')

export default function InstagramPostResizer() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <InstagramResizerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
