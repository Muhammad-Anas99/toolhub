import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CodeFormatterTool from '../../components/tools/dev/CodeFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { formatMarkup } from '../../lib/formatterUtils.js'
const tool = getToolBySlug('html-formatter')
export default function HtmlFormatter() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CodeFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={(v) => formatMarkup(v)} actionLabel="HTML formatted" placeholder="<div><p>Hello</p></div>" /></ToolLayout>
}
