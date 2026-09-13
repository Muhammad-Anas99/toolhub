import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CodeFormatterTool from '../../components/tools/dev/CodeFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { jsonToCsv } from '../../lib/dataConversionUtils.js'
const tool = getToolBySlug('json-to-csv')
export default function JsonToCsv() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CodeFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={(v) => jsonToCsv(JSON.parse(v))} actionLabel="JSON converted to CSV" placeholder='[{"name": "Alice", "age": 30}]' /></ToolLayout>
}
