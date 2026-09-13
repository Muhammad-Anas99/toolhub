import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import SingleUnitConverterTool from '../../components/tools/converters/SingleUnitConverterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('pressure-converter')

export default function PressureConverter() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <SingleUnitConverterTool
        categoryId="pressure"
        defaultFrom="psi"
        defaultTo="bar"
        toolSlug={tool.slug}
        toolName={tool.name}
        category={tool.category}
      />
    </ToolLayout>
  )
}
