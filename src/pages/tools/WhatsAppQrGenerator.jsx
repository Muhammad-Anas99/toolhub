import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import WhatsAppQrGeneratorTool from '../../components/tools/social/WhatsAppQrGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('whatsapp-qr-generator')

export default function WhatsAppQrGenerator() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <WhatsAppQrGeneratorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
