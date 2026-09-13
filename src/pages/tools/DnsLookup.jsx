import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import DnsLookupTool from '../../components/tools/network/DnsLookupTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('dns-lookup')
export default function DnsLookup() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><DnsLookupTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
