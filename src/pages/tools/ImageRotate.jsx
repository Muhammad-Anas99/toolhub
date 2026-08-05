import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import RotateFlipTool from '../../components/tools/RotateFlipTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('image-rotate')

export default function ImageRotate() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs['image-rotate']}>
      <RotateFlipTool mode="rotate" />
    </ToolLayout>
  )
}
