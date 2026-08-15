import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import BatchImageEditorTool from '../../components/tools/image/BatchImageEditorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('image-editor')

export default function ImageEditor() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <BatchImageEditorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
