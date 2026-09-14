import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import MorseTapTransmitterTool from '../../components/tools/fun/MorseTapTransmitterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('morse-tap-transmitter')
export default function MorseTapTransmitter() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><MorseTapTransmitterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
