import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import QrCodeGeneratorTool from '../../components/tools/dev/QrCodeGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('qr-code-generator')

export default function QrCodeGenerator() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <QrCodeGeneratorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
