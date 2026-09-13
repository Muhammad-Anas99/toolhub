import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import SingleHashGeneratorTool from '../../components/tools/dev/SingleHashGeneratorTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('sha1-hash-generator')
export default function Sha1HashGenerator() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><SingleHashGeneratorTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} algorithm="SHA-1" /></ToolLayout>
}
