import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import UrlRedirectCheckerTool from '../../components/tools/network/UrlRedirectCheckerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('url-redirect-checker')
export default function UrlRedirectChecker() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><UrlRedirectCheckerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
