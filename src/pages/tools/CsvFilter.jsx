import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CsvFilterTool from '../../components/tools/dev/CsvFilterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('csv-filter')
export default function CsvFilter() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CsvFilterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
