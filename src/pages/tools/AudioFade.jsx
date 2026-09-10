import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import AudioFadeTool from '../../components/tools/audio/AudioFadeTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('audio-fade')

export default function AudioFade() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <AudioFadeTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
