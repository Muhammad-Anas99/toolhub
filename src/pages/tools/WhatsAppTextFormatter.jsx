import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import WhatsAppTextFormatterTool from '../../components/tools/social/WhatsAppTextFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('whatsapp-text-formatter')

export default function WhatsAppTextFormatter() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <WhatsAppTextFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
