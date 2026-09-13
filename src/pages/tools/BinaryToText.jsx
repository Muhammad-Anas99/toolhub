import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import TextTransformTool from '../../components/tools/text/TextTransformTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { binaryToText } from '../../lib/textTransformUtils.js'

const tool = getToolBySlug('binary-to-text')

export default function BinaryToText() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <TextTransformTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={binaryToText} actionLabel="Binary converted to text" placeholder="01001000 01101001" />
    </ToolLayout>
  )
}
