import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CodeFormatterTool from '../../components/tools/dev/CodeFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { formatCss } from '../../lib/formatterUtils.js'
const tool = getToolBySlug('css-formatter')
export default function CssFormatter() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CodeFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={formatCss} actionLabel="CSS formatted" placeholder=".class { color: red; }" /></ToolLayout>
}
