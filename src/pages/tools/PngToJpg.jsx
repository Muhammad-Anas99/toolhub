import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ImageConverterTool from '../../components/tools/image/ImageConverterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('png-to-jpg')

export default function PngToJpg() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs['png-to-jpg']}>
      <ImageConverterTool
        acceptedTypes={['image/png']}
        outputMimeType="image/jpeg"
        outputExtension="jpg"
        toolSlug={tool.slug}
        toolName={tool.name}
        category={tool.category}
      />
    </ToolLayout>
  )
}
