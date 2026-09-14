import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ExifScrubberTool from '../../components/tools/image/ExifScrubberTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('exif-scrubber')
export default function ExifScrubber() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><ExifScrubberTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
