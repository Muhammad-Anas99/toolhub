import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CopyButton from '../CopyButton.jsx'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const GAP_OPTIONS = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12]

export default function TailwindGridGeneratorTool({ toolSlug, toolName, category }) {
  const [cols, setCols] = useState(3)
  const [rows, setRows] = useState(2)
  const [gap, setGap] = useState(4)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const classes = `grid grid-cols-${cols} grid-rows-${rows} gap-${gap}`
  logDebounced('Tailwind grid generated', classes)

  const cellCount = cols * rows

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Columns: {cols}</label>
          <input type="range" min="1" max="12" value={cols} onChange={(e) => setCols(Number(e.target.value))} className="mt-2 w-full" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Rows: {rows}</label>
          <input type="range" min="1" max="8" value={rows} onChange={(e) => setRows(Number(e.target.value))} className="mt-2 w-full" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Gap</label>
          <select value={gap} onChange={(e) => setGap(Number(e.target.value))} className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white">
            {GAP_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
        {/* Preview uses inline styles rather than relying on the dynamic
            Tailwind class names below, since Tailwind's build-time class
            scanner can't detect classes assembled from a template
            literal - the copyable output text is still correct, real
            Tailwind syntax for pasting into a project where those
            classes appear as literal strings. */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${rows}, 50px)`, gap: `${gap * 0.25}rem` }}>
          {Array.from({ length: cellCount }).map((_, i) => (
            <div key={i} className="flex items-center justify-center rounded-lg bg-brand-200 text-xs font-medium text-brand-800 dark:bg-brand-900 dark:text-brand-300">
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="card flex items-center justify-between gap-4 p-4">
        <code className="min-w-0 flex-1 truncate font-mono text-sm text-slate-900 dark:text-white">{classes}</code>
        <CopyButton value={classes} />
      </div>
    </div>
  )
}

TailwindGridGeneratorTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
