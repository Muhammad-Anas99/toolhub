import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import DarkenLightenColorTool from '../../components/tools/color/DarkenLightenColorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('darken-lighten-color')
export default function DarkenLightenColor() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><DarkenLightenColorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
