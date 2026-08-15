import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import YoutubeThumbnailTool from '../../components/tools/YoutubeThumbnailTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('youtube-thumbnail-downloader')

export default function YoutubeThumbnailDownloader() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <YoutubeThumbnailTool />
    </ToolLayout>
  )
}
