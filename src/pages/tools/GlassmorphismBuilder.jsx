import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import GlassmorphismBuilderTool from '../../components/tools/dev/GlassmorphismBuilderTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('glassmorphism-builder')
export default function GlassmorphismBuilder() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><GlassmorphismBuilderTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
