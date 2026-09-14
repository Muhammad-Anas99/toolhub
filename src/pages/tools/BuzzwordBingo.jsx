import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import BuzzwordBingoTool from '../../components/tools/fun/BuzzwordBingoTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('buzzword-bingo')
export default function BuzzwordBingo() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><BuzzwordBingoTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
