import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ImageConverterTool from '../../components/tools/image/ImageConverterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('webp-to-png')

export default function WebpToPng() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs['webp-to-png']}>
      <ImageConverterTool
        acceptedTypes={['image/webp']}
        outputMimeType="image/png"
        outputExtension="png"
      />
    </ToolLayout>
  )
}
