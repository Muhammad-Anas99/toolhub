import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CodeFormatterTool from '../../components/tools/dev/CodeFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { sqlInsertToMarkdown } from '../../lib/miscToolsUtils.js'
const tool = getToolBySlug('sql-to-markdown-table')
export default function SqlToMarkdownTable() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CodeFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={sqlInsertToMarkdown} actionLabel="SQL converted to Markdown table" placeholder="INSERT INTO users (id, name) VALUES (1, 'Alice');" /></ToolLayout>
}
