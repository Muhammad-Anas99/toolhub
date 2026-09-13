import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CameraScannerTool from '../../components/tools/dev/CameraScannerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('qr-code-scanner')
const FORMATS = ['qr_code']
export default function QrCodeScanner() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CameraScannerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} formats={FORMATS} label="QR Code" /></ToolLayout>
}
