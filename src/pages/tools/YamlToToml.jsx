import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CodeFormatterTool from '../../components/tools/dev/CodeFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { parseYaml } from '../../lib/dataConversionUtils.js'
import { jsonToToml } from '../../lib/miscToolsUtils.js'
const tool = getToolBySlug('yaml-to-toml')
export default function YamlToToml() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CodeFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={(v) => jsonToToml(parseYaml(v))} actionLabel="YAML converted to TOML" placeholder={"name: Widget\nprice: 9.99"} /></ToolLayout>
}
