import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import PercentageCalculatorTool from '../../components/tools/calculators/PercentageCalculatorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('percentage-calculator')
export default function PercentageCalculator() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><PercentageCalculatorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
