import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import HabitStreakTool from '../../components/tools/fun/HabitStreakTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('habit-streak-counter')
export default function HabitStreak() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><HabitStreakTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
