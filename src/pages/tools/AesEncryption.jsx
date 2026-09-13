import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import AesEncryptionTool from '../../components/tools/security/AesEncryptionTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('aes-encryption')
export default function AesEncryption() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><AesEncryptionTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
