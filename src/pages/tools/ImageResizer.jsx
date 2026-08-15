import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import UnifiedImageTool from '../../components/tools/image/UnifiedImageTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('image-resizer')
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export default function ImageResizer() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <UnifiedImageTool
        toolSlug={tool.slug}
        toolName={tool.name}
        category={tool.category}
        acceptedTypes={ACCEPTED_TYPES}
        defaultFormatId="original"
        defaultResizeEnabled
        defaultResizeMode="pixels"
        primaryActionLabel="Resize"
        outputSuffix="-resized"
      />
    </ToolLayout>
  )
}
