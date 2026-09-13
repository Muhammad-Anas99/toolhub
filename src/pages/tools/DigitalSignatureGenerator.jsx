import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import DigitalSignatureTool from '../../components/tools/fun/DigitalSignatureTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('digital-signature-generator')
export default function DigitalSignatureGenerator() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><DigitalSignatureTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
