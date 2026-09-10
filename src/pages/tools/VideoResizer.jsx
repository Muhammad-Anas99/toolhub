import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import VideoResizerTool from '../../components/tools/video/VideoResizerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('video-resizer')

export default function VideoResizer() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <VideoResizerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
