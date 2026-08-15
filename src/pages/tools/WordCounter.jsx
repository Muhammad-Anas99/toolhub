import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import WordCounterTool from '../../components/tools/text/WordCounterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('word-counter')

export default function WordCounter() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <WordCounterTool />
    </ToolLayout>
  )
}
