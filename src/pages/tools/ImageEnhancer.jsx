import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ImageEnhancerTool from '../../components/tools/image/ImageEnhancerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('image-enhancer')

export default function ImageEnhancer() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <ImageEnhancerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
