import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import TarotReaderTool from '../../components/tools/fun/TarotReaderTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('tarot-reader')
export default function TarotReader() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><TarotReaderTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
