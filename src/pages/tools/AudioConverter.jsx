import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import AudioConverterTool from '../../components/tools/audio/AudioConverterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('audio-to-wav-converter')

export default function AudioConverter() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <AudioConverterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
