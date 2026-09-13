import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import AudioSpeedChangerTool from '../../components/tools/audio/AudioSpeedChangerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('audio-speed-changer')

export default function AudioSpeedChanger() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <AudioSpeedChangerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
