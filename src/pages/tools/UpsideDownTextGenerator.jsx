import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import TextTransformTool from '../../components/tools/text/TextTransformTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { upsideDownText } from '../../lib/textTransformUtils.js'

const tool = getToolBySlug('upside-down-text-generator')

export default function UpsideDownTextGenerator() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <TextTransformTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={upsideDownText} actionLabel="Text flipped upside down" />
    </ToolLayout>
  )
}
