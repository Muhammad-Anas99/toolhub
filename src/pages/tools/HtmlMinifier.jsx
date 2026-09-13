import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CodeFormatterTool from '../../components/tools/dev/CodeFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { minifyMarkup } from '../../lib/formatterUtils.js'
const tool = getToolBySlug('html-minifier')
export default function HtmlMinifier() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CodeFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={minifyMarkup} actionLabel="HTML minified" placeholder="<div>\n  <p>Hello</p>\n</div>" /></ToolLayout>
}
