import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import UniversalImageConverterTool from '../../components/tools/image/UniversalImageConverterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('image-converter')

export default function ImageConverter() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <UniversalImageConverterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
