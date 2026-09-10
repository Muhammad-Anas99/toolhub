import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import AudioMergerTool from '../../components/tools/audio/AudioMergerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('audio-merger')

export default function AudioMerger() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <AudioMergerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
