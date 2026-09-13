import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import BarcodeGeneratorTool from '../../components/tools/dev/BarcodeGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('barcode-generator')

export default function BarcodeGenerator() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <BarcodeGeneratorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} />
    </ToolLayout>
  )
}
