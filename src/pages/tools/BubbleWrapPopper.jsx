import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import BubbleWrapPopperTool from '../../components/tools/fun/BubbleWrapPopperTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('bubble-wrap-popper')
export default function BubbleWrapPopper() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><BubbleWrapPopperTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
