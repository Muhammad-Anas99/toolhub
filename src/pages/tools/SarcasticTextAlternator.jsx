import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import TextTransformTool from '../../components/tools/text/TextTransformTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { toSarcasticCase } from '../../lib/miscToolsUtils.js'
const tool = getToolBySlug('sarcastic-text-alternator')
export default function SarcasticTextAlternator() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><TextTransformTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={toSarcasticCase} actionLabel="Text converted to sarcastic case" placeholder="Type something sarcastic..." /></ToolLayout>
}
