import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CodeFormatterTool from '../../components/tools/dev/CodeFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { parseYaml } from '../../lib/dataConversionUtils.js'
const tool = getToolBySlug('yaml-to-json')
export default function YamlToJson() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CodeFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={(v) => JSON.stringify(parseYaml(v), null, 2)} actionLabel="YAML converted to JSON" placeholder="name: Widget\nprice: 9.99" /></ToolLayout>
}
