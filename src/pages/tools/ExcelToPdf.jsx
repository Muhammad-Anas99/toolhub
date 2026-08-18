import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ExcelToPdfTool from '../../components/tools/pdf/ExcelToPdfTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('excel-to-pdf')

export default function ExcelToPdf() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <ExcelToPdfTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
