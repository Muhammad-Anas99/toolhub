import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CompoundInterestTool from '../../components/tools/calculators/CompoundInterestTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('compound-interest-calculator')
export default function CompoundInterestCalculator() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CompoundInterestTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
