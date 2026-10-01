import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import CopyButton from '../CopyButton.jsx'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'
import {
  parseFiletime,
  describeFiletime,
  describeSpecialValue,
  describeSuspiciousValue,
  millisToFiletime,
  dateInputToMillis,
  currentFiletime,
  convertBatch,
  toHex,
} from '../../../lib/filetimeUtils.js'

// 2025-01-01 00:00:00 UTC. A fixed example rather than "right now" so the
// prerendered page and the browser render identical text on load.
const EXAMPLE_FILETIME = '133801632000000000'

// A result appearing is a genuine feedback moment - it happens once per
// conversion, not on every keystroke, since these blocks only mount when
// the relevant result first becomes non-null (React doesn't replay this on
// later re-renders where the same block stays mounted and only its content
// changes). Values match the ui-animation skill's enter curve and the
// "keep routine UI animation under 300ms" rule.
const resultReveal = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
}

const inputClass =
  'mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white'

function ResultRow({ label, value }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
      <dt className="text-xs text-slate-500 dark:text-slate-400">{label}</dt>
      <div className="flex min-w-0 items-center gap-2">
        <dd className="truncate font-mono text-sm text-slate-900 dark:text-white">{value}</dd>
        <CopyButton value={value} label="" className="flex-shrink-0 px-1.5" />
      </div>
    </div>
  )
}

ResultRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default function FiletimeConverterTool({ toolSlug, toolName, category }) {
  const [input, setInput] = useState(EXAMPLE_FILETIME)
  const [dateText, setDateText] = useState('')
  const [dateMode, setDateMode] = useState('utc')
  const [batchText, setBatchText] = useState('')
  const [mounted, setMounted] = useState(false)

  // The first section starts pre-filled with an example, so the hook's
  // default (treat the first value as a silent baseline) is right for it.
  // The date and batch sections start blank, so the user's first real
  // conversion there has to count - startsEmpty tells the hook that.
  const { logDebounced: logFiletimeToDate } = useHistoryLogger({ toolSlug, toolName, category })
  const { logDebounced: logDateToFiletime } = useHistoryLogger({ toolSlug, toolName, category, startsEmpty: true })
  const { logDebounced: logBatch } = useHistoryLogger({ toolSlug, toolName, category, startsEmpty: true })

  // FILETIME -> date
  const parsed = parseFiletime(input)
  const info = parsed.ok ? describeFiletime(parsed.value) : null
  const specialNote = parsed.ok ? describeSpecialValue(parsed.value) : null
  const suspiciousNote = parsed.ok ? describeSuspiciousValue(parsed.value) : null
  const readAsLdapTime = parsed.ok && parsed.format === 'generalized'

  // date -> FILETIME
  const dateResult =
    dateText.trim() !== '' ? millisToFiletime(dateInputToMillis(dateText, dateMode)) : null
  const dateInfo = dateResult && dateResult.ok ? describeFiletime(dateResult.value) : null

  // batch
  const batch = batchText.trim() !== '' ? convertBatch(batchText) : null
  const batchOkCount = batch ? batch.rows.filter((row) => row.ok).length : 0
  const batchKey = batch ? batch.rows.map((row) => row.iso || row.error).join('|') : ''

  // Local time depends on the viewer's timezone, so it's only rendered after
  // mount - otherwise the prerendered HTML (built on a server in some other
  // timezone) wouldn't match what the browser renders on hydration.
  useEffect(() => {
    setMounted(true)
  }, [])

  // Each effect watches the actual computed output for its own section, not
  // just one shared input - so a change to the UTC/local toggle, which
  // changes the resulting FILETIME without touching the date text, is
  // logged too.
  useEffect(() => {
    if (info) logFiletimeToDate('FILETIME converted to date', info.decimal)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info && info.decimal])

  useEffect(() => {
    if (dateInfo) logDateToFiletime('Date converted to FILETIME', dateInfo.decimal)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateInfo && dateInfo.decimal])

  useEffect(() => {
    if (batchOkCount > 0) logBatch(`Batch of ${batchOkCount} FILETIME values converted`, batchKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchKey])

  const batchClipboard = batch
    ? batch.rows.map((row) => `${row.input}\t${row.ok ? row.iso : '(invalid)'}`).join('\n')
    : ''

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <label htmlFor="filetime-input" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Windows FILETIME, hex, or LDAP time
          </label>
          <button
            type="button"
            onClick={() => setInput(currentFiletime().toString())}
            className="text-xs font-medium text-brand-600 dark:text-brand-400"
          >
            Use current time
          </button>
        </div>
        <input
          id="filetime-input"
          type="text"
          inputMode="text"
          spellCheck={false}
          autoComplete="off"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="e.g. 133801632000000000, 0x01DB5BE019BA4000 or 20250101120000.0Z"
          className={inputClass}
        />

        {!parsed.ok && !parsed.empty && <p className="mt-2 text-sm text-rose-500">{parsed.error}</p>}

        {readAsLdapTime && (
          <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            Read as LDAP Generalized Time, the text format Active Directory uses for whenCreated and whenChanged,
            and converted to a FILETIME below.
          </p>
        )}

        {suspiciousNote && (
          <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            {suspiciousNote}
          </p>
        )}

        {specialNote && (
          <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            {specialNote}
          </p>
        )}

        {info && (
          <motion.dl {...resultReveal} className="mt-4 space-y-2.5">
            <ResultRow label="UTC (ISO 8601, 100 ns precision)" value={info.iso} />
            {mounted && (
              <ResultRow
                label="Local time"
                value={info.date.toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'long' })}
              />
            )}
            <ResultRow label="Unix time (seconds)" value={info.unixSeconds} />
            <ResultRow label="Unix time (milliseconds)" value={info.unixMs} />
            <div className="border-t border-slate-100 pt-2.5 dark:border-slate-800" />
            <ResultRow label="Hexadecimal" value={info.hex} />
            <ResultRow label="dwHighDateTime" value={info.highDword.toString()} />
            <ResultRow label="dwLowDateTime" value={info.lowDword.toString()} />
            <ResultRow label=".NET DateTime ticks" value={info.dotNetTicks} />
          </motion.dl>
        )}
      </div>

      <div className="card p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="min-w-0 flex-1">
            <label htmlFor="filetime-date-input" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Or convert a date to a FILETIME
            </label>
            <input
              id="filetime-date-input"
              type="datetime-local"
              step="1"
              value={dateText}
              onChange={(event) => setDateText(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="filetime-date-mode" className="text-xs text-slate-500 dark:text-slate-400">
              Treat this date as
            </label>
            <select
              id="filetime-date-mode"
              value={dateMode}
              onChange={(event) => setDateMode(event.target.value)}
              className="mt-1.5 block rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              <option value="utc">UTC</option>
              <option value="local">My local time</option>
            </select>
          </div>
        </div>

        {dateResult && !dateResult.ok && <p className="mt-2 text-sm text-rose-500">{dateResult.error}</p>}

        {dateInfo && (
          <motion.dl {...resultReveal} className="mt-4 space-y-2.5">
            <ResultRow label="FILETIME (decimal)" value={dateInfo.decimal} />
            <ResultRow label="Hexadecimal" value={toHex(dateInfo.value)} />
            <ResultRow label="dwHighDateTime" value={dateInfo.highDword.toString()} />
            <ResultRow label="dwLowDateTime" value={dateInfo.lowDword.toString()} />
          </motion.dl>
        )}
      </div>

      <div className="card p-6">
        <label htmlFor="filetime-batch" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Convert many at once (one FILETIME per line)
        </label>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Handy for a column of lastLogon, pwdLastSet, accountExpires or whenCreated values from an Active Directory export. FILETIME, hex and LDAP time can be mixed.
        </p>
        <textarea
          id="filetime-batch"
          rows={5}
          spellCheck={false}
          value={batchText}
          onChange={(event) => setBatchText(event.target.value)}
          placeholder={'133801632000000000\n133801635600000000\n9223372036854775807'}
          className={inputClass}
        />

        {batch && batch.rows.length > 0 && (
          <motion.div {...resultReveal} className="mt-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {batchOkCount} of {batch.rows.length} converted
                {batch.truncated && ' \u00b7 only the first 500 lines are converted'}
              </p>
              <CopyButton value={batchClipboard} label="Copy all" />
            </div>
            <div className="mt-2 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <tr>
                    <th className="px-3 py-2 font-medium">FILETIME</th>
                    <th className="px-3 py-2 font-medium">UTC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono dark:divide-slate-800">
                  {batch.rows.map((row, index) => (
                    <tr key={`${row.input}-${index}`}>
                      <td className="whitespace-nowrap px-3 py-2 text-slate-700 dark:text-slate-300">{row.input}</td>
                      <td
                        className={`whitespace-nowrap px-3 py-2 ${
                          row.ok ? 'text-slate-900 dark:text-white' : 'text-rose-500'
                        }`}
                      >
                        {row.ok ? row.iso : row.error}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

FiletimeConverterTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
