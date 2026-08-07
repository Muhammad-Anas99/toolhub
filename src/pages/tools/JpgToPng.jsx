import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ImageConverterTool from '../../components/tools/image/ImageConverterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('jpg-to-png')

export default function JpgToPng() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs['jpg-to-png']}>
      <ImageConverterTool
        acceptedTypes={['image/jpeg']}
        outputMimeType="image/png"
        outputExtension="png"
        toolSlug={tool.slug}
        toolName={tool.name}
        category={tool.category}
      />
    </ToolLayout>
  )
}
