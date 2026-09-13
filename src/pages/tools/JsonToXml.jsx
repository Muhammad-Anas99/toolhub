import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CodeFormatterTool from '../../components/tools/dev/CodeFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { jsonToXml } from '../../lib/dataConversionUtils.js'
const tool = getToolBySlug('json-to-xml')
export default function JsonToXml() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CodeFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={(v) => jsonToXml(JSON.parse(v))} actionLabel="JSON converted to XML" placeholder='{"root": {"item": "value"}}' /></ToolLayout>
}
