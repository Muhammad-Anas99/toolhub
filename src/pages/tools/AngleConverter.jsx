import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import SingleUnitConverterTool from '../../components/tools/converters/SingleUnitConverterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('angle-converter')

export default function AngleConverter() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <SingleUnitConverterTool
        categoryId="angle"
        defaultFrom="deg"
        defaultTo="rad"
        toolSlug={tool.slug}
        toolName={tool.name}
        category={tool.category}
      />
    </ToolLayout>
  )
}
