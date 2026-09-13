import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import TextTransformTool from '../../components/tools/text/TextTransformTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { slugify } from '../../lib/textTransformUtils.js'

const tool = getToolBySlug('slug-generator')

export default function SlugGenerator() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <TextTransformTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={slugify} actionLabel="Slug generated" placeholder="Enter a title, like 'My Blog Post Title'" />
    </ToolLayout>
  )
}
