import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import LoremIpsumFantasyTool from '../../components/tools/fun/LoremIpsumFantasyTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('lorem-ipsum-fantasy')
export default function LoremIpsumFantasy() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><LoremIpsumFantasyTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
