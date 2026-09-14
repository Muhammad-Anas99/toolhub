import React, { useState } from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import CodeFormatterTool from '../../components/tools/dev/CodeFormatterTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
import { escapeJsonString, unescapeJsonString } from '../../lib/miscToolsUtils.js'
const tool = getToolBySlug('json-string-escape')
export default function JsonStringEscape() {
  const [mode, setMode] = useState('escape')
  return (
    <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}>
      <div className="mb-4 flex gap-2">
        {['escape', 'unescape'].map((m) => (
          <button key={m} type="button" onClick={() => setMode(m)} className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${mode === m ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>{m}</button>
        ))}
      </div>
      <CodeFormatterTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} transformFn={mode === 'escape' ? escapeJsonString : unescapeJsonString} actionLabel={mode === 'escape' ? 'JSON string escaped' : 'JSON string unescaped'} placeholder={mode === 'escape' ? 'Line one\nLine "two"' : 'Line one\\nLine \\"two\\"'} />
    </ToolLayout>
  )
}
