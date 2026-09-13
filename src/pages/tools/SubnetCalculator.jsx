import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import SubnetCalculatorTool from '../../components/tools/dev/SubnetCalculatorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('subnet-calculator')
export default function SubnetCalculator() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><SubnetCalculatorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
