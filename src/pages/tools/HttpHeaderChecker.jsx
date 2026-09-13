import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import HttpHeaderCheckerTool from '../../components/tools/network/HttpHeaderCheckerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('http-header-checker')
export default function HttpHeaderChecker() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><HttpHeaderCheckerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
