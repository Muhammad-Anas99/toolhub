import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import LoanCalculatorTool from '../../components/tools/calculators/LoanCalculatorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('loan-calculator')
export default function LoanCalculator() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><LoanCalculatorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
