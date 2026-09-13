import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import SocialImageResizerTool from '../../components/tools/SocialImageResizerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('facebook-image-resizer')

const PRESETS = [
  { id: 'post', label: 'Post Image', width: 1200, height: 630 },
  { id: 'cover', label: 'Cover Photo', width: 820, height: 312 },
  { id: 'profile', label: 'Profile Picture', width: 170, height: 170 },
]

export default function FacebookImageResizer() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <SocialImageResizerTool
        toolSlug={tool.slug}
        toolName={tool.name}
        category={tool.category}
        platformName="Facebook"
        presets={PRESETS}
      />
    </ToolLayout>
  )
}
