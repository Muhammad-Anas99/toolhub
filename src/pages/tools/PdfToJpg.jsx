import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import PdfToImageTool from '../../components/tools/pdf/PdfToImageTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('pdf-to-jpg')

export default function PdfToJpg() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <PdfToImageTool
        outputMimeType="image/jpeg"
        outputExtension="jpg"
        toolSlug={tool.slug}
        toolName={tool.name}
        category={tool.category}
      />
    </ToolLayout>
  )
}
