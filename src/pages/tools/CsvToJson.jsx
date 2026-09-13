import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CodeFormatterTool from '../../components/tools/dev/CodeFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { csvToJson } from '../../lib/dataConversionUtils.js'
const tool = getToolBySlug('csv-to-json')
export default function CsvToJson() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CodeFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={(v) => JSON.stringify(csvToJson(v), null, 2)} actionLabel="CSV converted to JSON" placeholder="name,age\nAlice,30" /></ToolLayout>
}
