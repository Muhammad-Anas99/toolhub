import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import FakeLoadingScreenTool from '../../components/tools/fun/FakeLoadingScreenTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('fake-loading-screen')
export default function FakeLoadingScreen() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><FakeLoadingScreenTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
