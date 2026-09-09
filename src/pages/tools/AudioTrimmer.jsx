import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import AudioTrimmerTool from '../../components/tools/audio/AudioTrimmerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('audio-trimmer')

export default function AudioTrimmer() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <AudioTrimmerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
