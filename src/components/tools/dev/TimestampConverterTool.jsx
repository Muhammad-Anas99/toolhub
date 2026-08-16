import React, { useEffect, useState } from 'react'
import { unixToDate, dateToUnix, formatDateForDisplay } from '../../../lib/devToolsUtils.js'
import CopyButton from '../CopyButton.jsx'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'
import PropTypes from 'prop-types'

function nowUnix() {
  return Math.floor(Date.now() / 1000)
}

export default function TimestampConverterTool({ toolSlug, toolName, category }) {
  const [unixInput, setUnixInput] = useState(String(nowUnix()))
  const [dateInput, setDateInput] = useState('')
  const { logDebounced: logUnixToDate } = useHistoryLogger({ toolSlug, toolName, category })
  const { logDebounced: logDateToUnix } = useHistoryLogger({ toolSlug, toolName, category })

  const date = unixInput.trim() !== '' ? unixToDate(unixInput) : null
  const display = date ? formatDateForDisplay(date) : null

  const unixFromDate = dateInput.trim() !== '' ? dateToUnix(dateInput) : null

  useEffect(() => {
    if (display) logUnixToDate('Timestamp converted to date', unixInput)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display])

  useEffect(() => {
    if (unixFromDate !== null) logDateToUnix('Date converted to timestamp', dateInput)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unixFromDate])

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <label htmlFor="unix-input" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Unix timestamp (seconds)
          </label>
          <button
            type="button"
            onClick={() => setUnixInput(String(nowUnix()))}
            className="text-xs font-medium text-brand-600 dark:text-brand-400"
          >
            Use current time
          </button>
        </div>
        <input
          id="unix-input"
          type="text"
          inputMode="numeric"
          value={unixInput}
          onChange={(event) => setUnixInput(event.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />

        {unixInput.trim() !== '' && !date && (
          <p className="mt-2 text-sm text-rose-500">That doesn&apos;t look like a valid Unix timestamp.</p>
        )}

        {display && (
          <dl className="mt-4 space-y-2.5">
            {[
              ['Local time', display.local],
              ['UTC', display.utc],
              ['ISO 8601', display.iso],
              ['Relative', display.relative],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-3">
                <dt className="text-xs text-slate-400 dark:text-slate-500">{label}</dt>
                <div className="flex items-center gap-2">
                  <dd className="font-mono text-sm text-slate-900 dark:text-white">{value}</dd>
                  <CopyButton value={value} label="" className="px-1.5" />
                </div>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="card p-6">
        <label htmlFor="date-input" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Or convert a date to a Unix timestamp
        </label>
        <input
          id="date-input"
          type="datetime-local"
          value={dateInput}
          onChange={(event) => setDateInput(event.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
        {unixFromDate !== null && (
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="font-mono text-sm text-slate-900 dark:text-white">{unixFromDate}</span>
            <CopyButton value={String(unixFromDate)} />
          </div>
        )}
      </div>
    </div>
  )
}

TimestampConverterTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
