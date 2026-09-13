import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CodeFormatterTool from '../../components/tools/dev/CodeFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { xmlToJson } from '../../lib/dataConversionUtils.js'
const tool = getToolBySlug('xml-to-json')
export default function XmlToJson() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CodeFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={(v) => JSON.stringify(xmlToJson(v), null, 2)} actionLabel="XML converted to JSON" placeholder="<root><item>value</item></root>" /></ToolLayout>
}
