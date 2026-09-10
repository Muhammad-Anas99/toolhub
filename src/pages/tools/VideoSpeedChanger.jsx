import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import VideoSpeedChangerTool from '../../components/tools/video/VideoSpeedChangerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('video-speed-changer')

export default function VideoSpeedChanger() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <VideoSpeedChangerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
