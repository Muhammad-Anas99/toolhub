import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import TextTransformTool from '../../components/tools/text/TextTransformTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { decodeHtmlEntities } from '../../lib/encodingUtils.js'
const tool = getToolBySlug('html-entities-decoder')
export default function HtmlEntitiesDecoder() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><TextTransformTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={decodeHtmlEntities} actionLabel="HTML entities decoded" placeholder="&lt;div&gt;A &amp; B&lt;/div&gt;" /></ToolLayout>
}
