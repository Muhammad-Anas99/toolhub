import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import BackgroundRemoverTool from '../../components/tools/image/BackgroundRemoverTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('background-remover')

export default function BackgroundRemover() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <BackgroundRemoverTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
