import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import RotateFlipTool from '../../components/tools/image/RotateFlipTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('image-rotate')

export default function ImageRotate() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs['image-rotate']}>
      <RotateFlipTool mode="rotate" toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
