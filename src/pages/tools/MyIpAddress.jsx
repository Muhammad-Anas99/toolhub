import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import MyIpTool from '../../components/tools/network/MyIpTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('my-ip-address')
export default function MyIpAddress() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><MyIpTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
