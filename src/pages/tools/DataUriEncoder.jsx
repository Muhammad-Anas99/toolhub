import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import DataUriEncoderTool from '../../components/tools/dev/DataUriEncoderTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('data-uri-encoder')
export default function DataUriEncoder() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><DataUriEncoderTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
