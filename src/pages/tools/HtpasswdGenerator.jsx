import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import HtpasswdGeneratorTool from '../../components/tools/security/HtpasswdGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('htpasswd-generator')
export default function HtpasswdGenerator() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><HtpasswdGeneratorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
