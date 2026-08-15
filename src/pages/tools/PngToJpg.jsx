import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import UnifiedImageTool from '../../components/tools/image/UnifiedImageTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('png-to-jpg')
const ACCEPTED_TYPES = ['image/png']

export default function PngToJpg() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <UnifiedImageTool
        toolSlug={tool.slug}
        toolName={tool.name}
        category={tool.category}
        acceptedTypes={ACCEPTED_TYPES}
        defaultFormatId="jpg"
        primaryActionLabel="Convert to JPG"
      />
    </ToolLayout>
  )
}
