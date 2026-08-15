import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ColorPickerTool from '../../components/tools/color/ColorPickerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('color-picker')

export default function ColorPicker() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <ColorPickerTool />
    </ToolLayout>
  )
}
