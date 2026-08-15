import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import Base64Tool from '../../components/tools/dev/Base64Tool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('base64-encoder')

export default function Base64Encoder() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <Base64Tool />
    </ToolLayout>
  )
}
