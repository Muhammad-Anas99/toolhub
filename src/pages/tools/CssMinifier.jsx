import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CodeFormatterTool from '../../components/tools/dev/CodeFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { minifyCss } from '../../lib/formatterUtils.js'
const tool = getToolBySlug('css-minifier')
export default function CssMinifier() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CodeFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={minifyCss} actionLabel="CSS minified" placeholder=".class {\n  color: red;\n}" /></ToolLayout>
}
