import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import VideoMuterTool from '../../components/tools/video/VideoMuterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('video-muter')

export default function VideoMuter() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <VideoMuterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
