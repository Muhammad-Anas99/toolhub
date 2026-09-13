import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import SocialImageResizerTool from '../../components/tools/SocialImageResizerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('linkedin-image-resizer')

const PRESETS = [
  { id: 'post', label: 'Post Image', width: 1200, height: 627 },
  { id: 'square-post', label: 'Square Post', width: 1200, height: 1200 },
  { id: 'banner', label: 'Cover Banner', width: 1584, height: 396 },
  { id: 'profile', label: 'Profile Picture', width: 400, height: 400 },
]

export default function LinkedInImageResizer() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <SocialImageResizerTool
        toolSlug={tool.slug}
        toolName={tool.name}
        category={tool.category}
        platformName="LinkedIn"
        presets={PRESETS}
      />
    </ToolLayout>
  )
}
