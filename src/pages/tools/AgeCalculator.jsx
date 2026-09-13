import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import AgeCalculatorTool from '../../components/tools/calculators/AgeCalculatorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('age-calculator')
export default function AgeCalculator() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><AgeCalculatorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
