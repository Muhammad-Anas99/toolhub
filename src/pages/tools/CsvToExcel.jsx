import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CsvToExcelTool from '../../components/tools/dev/CsvToExcelTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('csv-to-excel')
export default function CsvToExcel() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CsvToExcelTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
