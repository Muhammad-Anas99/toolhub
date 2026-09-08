import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineDocumentDuplicate, HiOutlineCalendarDays } from 'react-icons/hi2'
import { parseCronExpression, getNextRuns, explainCron } from '../../../lib/cronUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const PRESETS = [
  { label: 'Every minute', expression: '* * * * *' },
  { label: 'Every 5 minutes', expression: '*/5 * * * *' },
  { label: 'Every 15 minutes', expression: '*/15 * * * *' },
  { label: 'Every hour', expression: '0 * * * *' },
  { label: 'Every day at midnight', expression: '0 0 * * *' },
  { label: 'Every week (Sunday midnight)', expression: '0 0 * * 0' },
  { label: 'Every month (1st, midnight)', expression: '0 0 1 * *' },
  { label: 'Every weekday at 9am', expression: '0 9 * * 1-5' },
]

const FIELD_LABELS = ['Minute', 'Hour', 'Day of month', 'Month', 'Day of week']

function formatRunTime(date) {
  return date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

export default function CronExpressionGeneratorTool({ toolSlug, toolName, category }) {
  const [fields, setFields] = useState(['0', '0', '*', '*', '*'])
  const [copied, setCopied] = useState(false)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const expression = fields.join(' ')

  const { explanation, nextRuns, error } = useMemo(() => {
    try {
      parseCronExpression(expression)
      const runs = getNextRuns(expression, 5)
      const text = explainCron(fields)
      logDebounced('Cron expression generated')
      return { explanation: text, nextRuns: runs, error: null }
    } catch (err) {
      return { explanation: null, nextRuns: [], error: err.message }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expression])

  function handleFieldChange(index, value) {
    setFields((prev) => prev.map((f, i) => (i === index ? value : f)))
  }

  function applyPreset(presetExpression) {
    setFields(presetExpression.split(' '))
  }

  function handlePaste(event) {
    const pasted = event.clipboardData.getData('text').trim()
    const parts = pasted.split(/\s+/)
    if (parts.length === 5) {
      event.preventDefault()
      setFields(parts)
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(expression)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleReset() {
    setFields(['0', '0', '*', '*', '*'])
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Presets</p>
        <div className="mt-1.5 flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => applyPreset(preset.expression)}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Custom schedule</p>
        <div className="mt-1.5 grid grid-cols-5 gap-2" onPaste={handlePaste}>
          {fields.map((value, i) => (
            <div key={i}>
              <input
                type="text"
                value={value}
                onChange={(event) => handleFieldChange(i, event.target.value)}
                aria-label={FIELD_LABELS[i]}
                className="w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-center font-mono text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <p className="mt-1 text-center text-[11px] text-slate-400 dark:text-slate-500">{FIELD_LABELS[i]}</p>
            </div>
          ))}
        </div>
        <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
          You can also paste a full 5-field cron expression into any field above.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 dark:bg-slate-950">
        <code className="flex-1 font-mono text-sm text-white">{expression}</code>
        <button type="button" onClick={handleCopy} className="text-slate-300 hover:text-white">
          <HiOutlineDocumentDuplicate className="h-4 w-4" />
        </button>
      </div>
      {copied && <p className="text-xs text-emerald-600 dark:text-emerald-400">Copied!</p>}

      <button type="button" onClick={handleReset} className="btn-secondary text-sm">
        Reset
      </button>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : (
        <>
          <div className="rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-800 dark:bg-brand-950 dark:text-brand-300">
            {explanation}
          </div>

          {nextRuns.length > 0 && (
            <div>
              <p className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                <HiOutlineCalendarDays className="h-4 w-4" />
                Next 5 scheduled runs
              </p>
              <ul className="mt-1.5 space-y-1">
                {nextRuns.map((run, i) => (
                  <li key={i} className="text-sm text-slate-500 dark:text-slate-400">
                    {formatRunTime(run)}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                Calculated in your browser's local time zone.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

CronExpressionGeneratorTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
