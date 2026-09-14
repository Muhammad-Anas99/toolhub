import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import MorseAudioPlayerTool from '../../components/tools/fun/MorseAudioPlayerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('morse-audio-player')
export default function MorseAudioPlayer() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><MorseAudioPlayerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
