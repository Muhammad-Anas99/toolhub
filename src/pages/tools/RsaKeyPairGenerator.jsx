import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import RsaKeyPairGeneratorTool from '../../components/tools/security/RsaKeyPairGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('rsa-key-pair-generator')
export default function RsaKeyPairGenerator() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><RsaKeyPairGeneratorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
