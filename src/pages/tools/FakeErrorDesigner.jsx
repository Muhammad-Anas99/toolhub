import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import FakeErrorDesignerTool from '../../components/tools/fun/FakeErrorDesignerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('fake-error-designer')
export default function FakeErrorDesigner() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><FakeErrorDesignerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
