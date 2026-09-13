import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CoinFlipperTool from '../../components/tools/fun/CoinFlipperTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('coin-flipper')
export default function CoinFlipper() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CoinFlipperTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
