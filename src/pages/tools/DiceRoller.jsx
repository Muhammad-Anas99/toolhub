import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import DiceRollerTool from '../../components/tools/fun/DiceRollerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('dice-roller')
export default function DiceRoller() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><DiceRollerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
