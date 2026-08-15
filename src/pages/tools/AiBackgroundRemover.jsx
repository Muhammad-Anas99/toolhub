import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ComingSoonTool from '../../components/tools/ComingSoonTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('ai-background-remover')

export default function AiBackgroundRemover() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <ComingSoonTool
        toolName={tool.name}
        whatItWillDo="Automatically detect the subject in your photo and remove the background, leaving a transparent PNG you can drop onto any new background."
        whyNotYet="Background removal like this needs a trained AI model — the kind of processing that can't run in your browser. ToolHub is built so every existing tool works without sending your files anywhere; adding this properly means connecting a paid AI service, which hasn't been activated yet."
      />
    </ToolLayout>
  )
}
