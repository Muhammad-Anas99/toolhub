import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import DumbPhoneFormatterTool from '../../components/tools/fun/DumbPhoneFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('dumb-phone-formatter')
export default function DumbPhoneFormatter() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><DumbPhoneFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
