import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import SilenceTrimmerTool from '../../components/tools/audio/SilenceTrimmerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('silence-trimmer')

export default function SilenceTrimmer() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <SilenceTrimmerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
