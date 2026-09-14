import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import WhiteNoiseMixerTool from '../../components/tools/fun/WhiteNoiseMixerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('white-noise-mixer')
export default function WhiteNoiseMixer() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><WhiteNoiseMixerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
