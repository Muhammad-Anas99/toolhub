import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CameraScannerTool from '../../components/tools/dev/CameraScannerTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('barcode-scanner')
const FORMATS = ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39']
export default function BarcodeScanner() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CameraScannerTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} formats={FORMATS} label="Barcode" /></ToolLayout>
}
