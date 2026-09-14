import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import Base64ToImageTool from '../../components/tools/dev/Base64ToImageTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('base64-to-image')
export default function Base64ToImage() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><Base64ToImageTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
