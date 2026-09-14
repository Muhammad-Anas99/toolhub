import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CopyButton from '../CopyButton.jsx'
import { cleanForDumbPhone, contactsToCsv } from '../../../lib/miscToolsUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function DumbPhoneFormatterTool({ toolSlug, toolName, category }) {
  const [input, setInput] = useState('')
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const lines = input.split('\n').map((l) => l.trim()).filter(Boolean)
  const cleaned = lines.map((line) => {
    const [name, phone] = line.split(',').map((p) => (p || '').trim())
    return cleanForDumbPhone(name || '', phone || '')
  })
  const csv = cleaned.length ? contactsToCsv(cleaned) : ''
  if (input.trim()) logDebounced('Contacts cleaned for dumb phone', input)

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Contacts (Name, Phone \u2014 one per line)</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          placeholder={'José García, +1 (555) 123-4567\nMax Müller, 555.987.6543'}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {cleaned.length > 0 && (
        <div className="space-y-3">
          <div className="card divide-y divide-slate-100 dark:divide-slate-800">
            {cleaned.map((c, i) => (
              <div key={i} className="flex items-center justify-between gap-4 px-4 py-2.5">
                <span className="text-sm font-medium text-slate-900 dark:text-white">{c.name}</span>
                <span className="font-mono text-sm text-slate-500 dark:text-slate-400">{c.phone}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400 dark:text-slate-500">CSV, ready to import</p>
            <CopyButton value={csv} />
          </div>
        </div>
      )}
    </div>
  )
}

DumbPhoneFormatterTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
