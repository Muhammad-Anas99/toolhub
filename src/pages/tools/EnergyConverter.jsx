import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import SingleUnitConverterTool from '../../components/tools/converters/SingleUnitConverterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('energy-converter')

export default function EnergyConverter() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <SingleUnitConverterTool
        categoryId="energy"
        defaultFrom="kcal"
        defaultTo="kj"
        toolSlug={tool.slug}
        toolName={tool.name}
        category={tool.category}
      />
    </ToolLayout>
  )
}
