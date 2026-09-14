import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CodeFormatterTool from '../../components/tools/dev/CodeFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { srtToVtt } from '../../lib/miscToolsUtils.js'
const tool = getToolBySlug('srt-to-vtt')
export default function SrtToVtt() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CodeFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={srtToVtt} actionLabel="SRT converted to VTT" placeholder={"1\n00:00:01,000 --> 00:00:04,000\nHello world"} /></ToolLayout>
}
