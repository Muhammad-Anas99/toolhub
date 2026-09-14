import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import AsciiArtTool from '../../components/tools/image/AsciiArtTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('ascii-art')
export default function AsciiArt() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><AsciiArtTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
