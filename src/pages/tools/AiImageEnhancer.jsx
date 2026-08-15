import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ComingSoonTool from '../../components/tools/ComingSoonTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('ai-image-enhancer')

export default function AiImageEnhancer() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <ComingSoonTool
        toolName={tool.name}
        whatItWillDo="Automatically sharpen, reduce noise, and improve the overall quality of a photo using AI — useful for old, blurry, or low-quality images."
        whyNotYet="Real photo enhancement like this needs a trained AI model running on a server, not something that can run entirely in your browser. Adding this properly means connecting a paid AI service, which hasn't been activated yet."
      />
    </ToolLayout>
  )
}
