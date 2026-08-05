import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ImageConverterTool from '../../components/tools/ImageConverterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('webp-to-jpg')

export default function WebpToJpg() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs['webp-to-jpg']}>
      <ImageConverterTool
        acceptedTypes={['image/webp']}
        outputMimeType="image/jpeg"
        outputExtension="jpg"
      />
    </ToolLayout>
  )
}
