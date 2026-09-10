import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import AudioVolumeChangerTool from '../../components/tools/audio/AudioVolumeChangerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('audio-volume-changer')

export default function AudioVolumeChanger() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <AudioVolumeChangerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
