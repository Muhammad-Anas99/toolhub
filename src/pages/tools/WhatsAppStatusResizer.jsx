import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import SocialImageResizerTool from '../../components/tools/SocialImageResizerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('whatsapp-status-resizer')

const PRESETS = [
  { id: 'status', label: 'Status Image', width: 1080, height: 1920 },
  { id: 'profile', label: 'Profile Picture (DP)', width: 640, height: 640 },
]

export default function WhatsAppStatusResizer() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <SocialImageResizerTool
        toolSlug={tool.slug}
        toolName={tool.name}
        category={tool.category}
        platformName="WhatsApp"
        presets={PRESETS}
      />
    </ToolLayout>
  )
}
