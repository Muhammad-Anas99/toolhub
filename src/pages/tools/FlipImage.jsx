import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import RotateFlipTool from '../../components/tools/image/RotateFlipTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('flip-image')

export default function FlipImage() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs['flip-image']}>
      <RotateFlipTool mode="flip" />
    </ToolLayout>
  )
}
