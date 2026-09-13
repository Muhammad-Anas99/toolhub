import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CodeFormatterTool from '../../components/tools/dev/CodeFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { xmlToJson, jsonToCsv } from '../../lib/dataConversionUtils.js'
const tool = getToolBySlug('xml-to-csv')
export default function XmlToCsv() {
  function transform(v) {
    const parsed = xmlToJson(v)
    const rootKey = Object.keys(parsed)[0]
    const rootVal = parsed[rootKey]
    const rows = Array.isArray(rootVal) ? rootVal : Object.values(rootVal)[0]
    return jsonToCsv(Array.isArray(rows) ? rows : [rows])
  }
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><CodeFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={transform} actionLabel="XML converted to CSV" placeholder="<rows><row><name>Alice</name></row></rows>" /></ToolLayout>
}
