import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import RandomNamePickerTool from '../../components/tools/fun/RandomNamePickerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('random-name-picker')
export default function RandomNamePicker() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><RandomNamePickerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
