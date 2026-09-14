import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import TextTransformTool from '../../components/tools/text/TextTransformTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { cleanShippingAddress } from '../../lib/miscToolsUtils.js'
const tool = getToolBySlug('address-cleaner')
export default function AddressCleaner() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><TextTransformTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={cleanShippingAddress} actionLabel="Address cleaned" placeholder="123 Main Street, Apartment 4B" /></ToolLayout>
}
