import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import TextTransformTool from '../../components/tools/text/TextTransformTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { encodeHtmlEntities } from '../../lib/encodingUtils.js'
const tool = getToolBySlug('html-entities-encoder')
export default function HtmlEntitiesEncoder() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><TextTransformTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={encodeHtmlEntities} actionLabel="HTML entities encoded" placeholder='<div class="a">A & B</div>' /></ToolLayout>
}
