import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CodeFormatterTool from '../../components/tools/dev/CodeFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { jsonToYaml } from '../../lib/dataConversionUtils.js'
const tool = getToolBySlug('json-to-yaml')
export default function JsonToYaml() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CodeFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={(v) => jsonToYaml(JSON.parse(v))} actionLabel="JSON converted to YAML" placeholder='{"name": "Widget", "price": 9.99}' /></ToolLayout>
}
