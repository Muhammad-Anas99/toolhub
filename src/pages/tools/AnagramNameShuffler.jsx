import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import TextTransformTool from '../../components/tools/text/TextTransformTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { shuffleToAnagram } from '../../lib/miscToolsUtils.js'
const tool = getToolBySlug('anagram-name-shuffler')
export default function AnagramNameShuffler() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><TextTransformTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={shuffleToAnagram} actionLabel="Name shuffled" placeholder="Type a name..." /></ToolLayout>
}
