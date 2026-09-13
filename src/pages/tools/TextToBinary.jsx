import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import TextTransformTool from '../../components/tools/text/TextTransformTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { textToBinary } from '../../lib/textTransformUtils.js'

const tool = getToolBySlug('text-to-binary')

export default function TextToBinary() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <TextTransformTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={textToBinary} actionLabel="Text converted to binary" />
    </ToolLayout>
  )
}
