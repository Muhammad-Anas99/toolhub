import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CodeFormatterTool from '../../components/tools/dev/CodeFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { jsonToHtmlTable } from '../../lib/miscToolsUtils.js'
const tool = getToolBySlug('json-to-html-table')
export default function JsonToHtmlTable() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CodeFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={(v) => jsonToHtmlTable(JSON.parse(v))} actionLabel="JSON converted to HTML table" placeholder='[{"name": "Alice", "age": 30}]' /></ToolLayout>
}
