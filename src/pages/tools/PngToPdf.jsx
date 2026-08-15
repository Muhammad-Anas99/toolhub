import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ImageToPdfTool from '../../components/tools/pdf/ImageToPdfTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('png-to-pdf')
const ACCEPTED_TYPES = ['image/png']

export default function PngToPdf() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <ImageToPdfTool acceptedTypes={ACCEPTED_TYPES} toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
