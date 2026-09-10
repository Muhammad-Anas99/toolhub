import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import AudioReverserTool from '../../components/tools/audio/AudioReverserTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('audio-reverser')

export default function AudioReverser() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <AudioReverserTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
