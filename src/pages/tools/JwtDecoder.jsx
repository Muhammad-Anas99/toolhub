import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import JwtDecoderTool from '../../components/tools/dev/JwtDecoderTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('jwt-decoder')
export default function JwtDecoder() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><JwtDecoderTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
