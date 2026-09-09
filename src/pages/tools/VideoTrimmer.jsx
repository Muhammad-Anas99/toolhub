import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import VideoTrimmerTool from '../../components/tools/video/VideoTrimmerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('video-trimmer')

export default function VideoTrimmer() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <VideoTrimmerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
