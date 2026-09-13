import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CodeFormatterTool from '../../components/tools/dev/CodeFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { minifyJs } from '../../lib/formatterUtils.js'
const tool = getToolBySlug('javascript-minifier')
export default function JavascriptMinifier() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CodeFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={minifyJs} actionLabel="JavaScript minified" placeholder="function greet() {\n  // says hello\n  return 'hi';\n}" /></ToolLayout>
}
