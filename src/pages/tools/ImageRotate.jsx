import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import UnifiedImageTool from '../../components/tools/image/UnifiedImageTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('image-rotate')
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export default function ImageRotate() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <UnifiedImageTool
        toolSlug={tool.slug}
        toolName={tool.name}
        category={tool.category}
        acceptedTypes={ACCEPTED_TYPES}
        defaultFormatId="original"
        defaultRotate={90}
        primaryActionLabel="Rotate"
        outputSuffix="-rotated"
      />
    </ToolLayout>
  )
}
