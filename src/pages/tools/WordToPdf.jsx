import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import WordToPdfTool from '../../components/tools/pdf/WordToPdfTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('word-to-pdf')

export default function WordToPdf() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <WordToPdfTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
