import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CodeFormatterTool from '../../components/tools/dev/CodeFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { csvToJson, jsonToXml } from '../../lib/dataConversionUtils.js'
const tool = getToolBySlug('csv-to-xml')
export default function CsvToXml() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CodeFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={(v) => jsonToXml({ rows: { row: csvToJson(v) } })} actionLabel="CSV converted to XML" placeholder="name,age\nAlice,30" /></ToolLayout>
}
