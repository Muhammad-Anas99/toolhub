import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import SingleUnitConverterTool from '../../components/tools/converters/SingleUnitConverterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('power-converter')

export default function PowerConverter() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <SingleUnitConverterTool
        categoryId="power"
        defaultFrom="hp"
        defaultTo="kw"
        toolSlug={tool.slug}
        toolName={tool.name}
        category={tool.category}
      />
    </ToolLayout>
  )
}
