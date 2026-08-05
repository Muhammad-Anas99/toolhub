import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ImageConverterTool from '../../components/tools/ImageConverterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('convert-to-webp')

export default function ConvertToWebp() {
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs['convert-to-webp']}>
      <ImageConverterTool
        acceptedTypes={['image/jpeg', 'image/png']}
        outputMimeType="image/webp"
        outputExtension="webp"
      />
    </ToolLayout>
  )
}
