import React, { useState } from 'react'
import { CASE_OPTIONS } from '../../../lib/textToolsUtils.js'
import CopyButton from '../CopyButton.jsx'

export default function CaseConverterTool() {
  const [text, setText] = useState('')

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="case-converter-input" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Enter text
        </label>
        <textarea
          id="case-converter-input"
          rows={4}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Type or paste text here..."
          className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {text.trim() !== '' && (
        <div className="card divide-y divide-slate-100 dark:divide-slate-800">
          {CASE_OPTIONS.map((option) => {
            const converted = option.fn(text)
            return (
              <div key={option.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    {option.label}
                  </p>
                  <p className="mt-0.5 truncate text-sm text-slate-900 dark:text-white">{converted}</p>
                </div>
                <CopyButton value={converted} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
