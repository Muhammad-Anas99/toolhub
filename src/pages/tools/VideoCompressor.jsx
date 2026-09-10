import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import VideoCompressorTool from '../../components/tools/video/VideoCompressorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('video-compressor')

export default function VideoCompressor() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <VideoCompressorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
