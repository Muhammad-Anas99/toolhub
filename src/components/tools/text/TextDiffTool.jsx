import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineDocumentMagnifyingGlass } from 'react-icons/hi2'
import { diffLines, getDiffStats, MAX_LINES } from '../../../lib/textDiffUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function TextDiffTool({ toolSlug, toolName, category }) {
  const [textA, setTextA] = useState('')
  const [textB, setTextB] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  function handleCompare() {
    setError(null)
    try {
      const diff = diffLines(textA, textB)
      setResult(diff)
      logNow('Text compared')
    } catch (err) {
      setError(err.message)
      setResult(null)
    }
  }

  function handleReset() {
    setTextA('')
    setTextB('')
    setResult(null)
    setError(null)
  }

  const stats = result ? getDiffStats(result) : null

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="diff-text-a" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Original
          </label>
          <textarea
            id="diff-text-a"
            rows={10}
            value={textA}
            onChange={(event) => setTextA(event.target.value)}
            spellCheck={false}
            className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="diff-text-b" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Changed
          </label>
          <textarea
            id="diff-text-b"
            rows={10}
            value={textB}
            onChange={(event) => setTextB(event.target.value)}
            spellCheck={false}
            className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500">Supports up to {MAX_LINES.toLocaleString()} lines per side.</p>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={handleCompare} className="btn-primary text-sm">
          <HiOutlineDocumentMagnifyingGlass className="h-4 w-4" />
          Compare
        </button>
        <button type="button" onClick={handleReset} className="btn-secondary text-sm">
          Reset
        </button>
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      {stats && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          <span className="font-medium text-emerald-600 dark:text-emerald-400">+{stats.added}</span> added,{' '}
          <span className="font-medium text-red-600 dark:text-red-400">-{stats.removed}</span> removed,{' '}
          {stats.unchanged} unchanged
        </p>
      )}

      {result && (
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <pre className="font-mono text-xs leading-relaxed">
            {result.map((line, i) => (
              <div
                key={i}
                className={
                  line.type === 'added'
                    ? 'bg-emerald-50 px-3 py-0.5 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : line.type === 'removed'
                      ? 'bg-red-50 px-3 py-0.5 text-red-800 dark:bg-red-950 dark:text-red-300'
                      : 'px-3 py-0.5 text-slate-600 dark:text-slate-400'
                }
              >
                {line.type === 'added' ? '+ ' : line.type === 'removed' ? '- ' : '  '}
                {line.text || ' '}
              </div>
            ))}
          </pre>
        </div>
      )}
    </div>
  )
}

TextDiffTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
