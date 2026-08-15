import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ComingSoonTool from '../../components/tools/ComingSoonTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('ai-image-upscaler')

export default function AiImageUpscaler() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <ComingSoonTool
        toolName={tool.name}
        whatItWillDo="Increase your image's resolution using AI, adding realistic detail rather than just stretching and blurring existing pixels the way a simple resize does."
        whyNotYet="Real AI upscaling needs a trained model running on a server — this isn't something that can run entirely in your browser like ToolHub's other image tools. Adding this properly means connecting a paid AI service, which hasn't been activated yet."
      />
    </ToolLayout>
  )
}
