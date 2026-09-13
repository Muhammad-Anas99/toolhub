import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import SocialImageResizerTool from '../../components/tools/SocialImageResizerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('twitter-image-resizer')

const PRESETS = [
  { id: 'post', label: 'Post Image', width: 1200, height: 675 },
  { id: 'header', label: 'Header', width: 1500, height: 500 },
  { id: 'profile', label: 'Profile Picture', width: 400, height: 400 },
]

export default function TwitterImageResizer() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <SocialImageResizerTool
        toolSlug={tool.slug}
        toolName={tool.name}
        category={tool.category}
        platformName="X (Twitter)"
        presets={PRESETS}
      />
    </ToolLayout>
  )
}
