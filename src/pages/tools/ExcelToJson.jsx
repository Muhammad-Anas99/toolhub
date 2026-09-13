import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ExcelToJsonTool from '../../components/tools/dev/ExcelToJsonTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('excel-to-json')
export default function ExcelToJson() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><ExcelToJsonTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
