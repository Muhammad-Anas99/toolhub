import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CodeFormatterTool from '../../components/tools/dev/CodeFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { formatMarkup } from '../../lib/formatterUtils.js'
const tool = getToolBySlug('xml-formatter')
export default function XmlFormatter() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CodeFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={(v) => formatMarkup(v, { isXml: true })} actionLabel="XML formatted" placeholder="<root><item>value</item></root>" /></ToolLayout>
}
