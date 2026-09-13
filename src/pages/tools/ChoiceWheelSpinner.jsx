import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ChoiceWheelSpinnerTool from '../../components/tools/fun/ChoiceWheelSpinnerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('choice-wheel-spinner')
export default function ChoiceWheelSpinner() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><ChoiceWheelSpinnerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
