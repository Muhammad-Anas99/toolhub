import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import SocialImageResizerTool from '../../components/tools/SocialImageResizerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('pinterest-pin-resizer')

const PRESETS = [
  { id: 'standard-pin', label: 'Standard Pin', width: 1000, height: 1500 },
  { id: 'square-pin', label: 'Square Pin', width: 1000, height: 1000 },
  { id: 'profile', label: 'Profile Picture', width: 165, height: 165 },
]

export default function PinterestPinResizer() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <SocialImageResizerTool
        toolSlug={tool.slug}
        toolName={tool.name}
        category={tool.category}
        platformName="Pinterest"
        presets={PRESETS}
      />
    </ToolLayout>
  )
}
