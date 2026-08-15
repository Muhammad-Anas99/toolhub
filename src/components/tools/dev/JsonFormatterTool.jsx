import React, { useState } from 'react'
import { HiOutlineArrowDownTray } from 'react-icons/hi2'
import { formatJson, minifyJson } from '../../../lib/devToolsUtils.js'
import { downloadBlob } from '../../../lib/downloadBlob.js'
import CopyButton from '../CopyButton.jsx'

const SAMPLE = '{\n  "name": "ToolHub",\n  "free": true,\n  "tools": ["image", "pdf", "color", "dev"]\n}'

export default function JsonFormatterTool() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState('format') // format | minify

  const result = input.trim() === '' ? null : mode === 'format' ? formatJson(input) : minifyJson(input)

  function handleDownload() {
    if (!result?.valid) return
    downloadBlob(new Blob([result.formatted], { type: 'application/json' }), 'formatted.json')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode('format')}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              mode === 'format'
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            Format
          </button>
          <button
            type="button"
            onClick={() => setMode('minify')}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              mode === 'minify'
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            Minify
          </button>
        </div>
        {input.trim() === '' && (
          <button type="button" onClick={() => setInput(SAMPLE)} className="text-xs font-medium text-brand-600 dark:text-brand-400">
            Try an example
          </button>
        )}
      </div>

      <div>
        <label htmlFor="json-input" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Paste JSON
        </label>
        <textarea
          id="json-input"
          rows={10}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Paste your JSON here..."
          spellCheck={false}
          className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {result && !result.valid && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-400">
          Invalid JSON{result.line ? ` at line ${result.line}, column ${result.column}` : ''}: {result.error}
        </div>
      )}

      {result && result.valid && (
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Result</p>
            <div className="flex gap-2">
              <CopyButton value={result.formatted} />
              <button type="button" onClick={handleDownload} className="btn-secondary text-xs">
                <HiOutlineArrowDownTray className="h-3.5 w-3.5" />
                Download
              </button>
            </div>
          </div>
          <pre className="max-h-96 overflow-auto p-4 font-mono text-sm text-slate-900 dark:text-white">
            {result.formatted}
          </pre>
        </div>
      )}
    </div>
  )
}
