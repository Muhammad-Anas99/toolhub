import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ImageUpscalerTool from '../../components/tools/image/ImageUpscalerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('image-upscaler')

export default function ImageUpscaler() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <ImageUpscalerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
