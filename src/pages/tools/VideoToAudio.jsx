import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import VideoToAudioTool from '../../components/tools/video/VideoToAudioTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('video-to-audio')

export default function VideoToAudio() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <VideoToAudioTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
