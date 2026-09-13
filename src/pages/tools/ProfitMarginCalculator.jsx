import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ProfitMarginTool from '../../components/tools/calculators/ProfitMarginTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('profit-margin-calculator')
export default function ProfitMarginCalculator() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><ProfitMarginTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
