import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CopyButton from '../CopyButton.jsx'
import { csvToJson, jsonToCsv } from '../../../lib/dataConversionUtils.js'
import { filterCsvRows, extractColumns } from '../../../lib/miscToolsUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function CsvFilterTool({ toolSlug, toolName, category }) {
  const [csv, setCsv] = useState('')
  const [filterColumn, setFilterColumn] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [selectedColumns, setSelectedColumns] = useState([])
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  let rows = []
  let headers = []
  let error = null
  try {
    if (csv.trim()) {
      rows = csvToJson(csv)
      headers = rows.length ? Object.keys(rows[0]) : []
    }
  } catch (err) {
    error = 'Could not parse this as CSV.'
  }

  const filtered = filterCsvRows(rows, filterColumn, filterValue)
  const extracted = extractColumns(filtered, selectedColumns)
  const resultCsv = extracted.length ? jsonToCsv(extracted) : ''

  if (resultCsv) logDebounced('CSV filtered', resultCsv)

  function toggleColumn(col) {
    setSelectedColumns((prev) => (prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]))
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">CSV data (with header row)</label>
        <textarea
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          rows={6}
          placeholder={'name,city,age\nAlice,NYC,30\nBob,LA,25'}
          spellCheck={false}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}

      {headers.length > 0 && (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Filter column</label>
              <select value={filterColumn} onChange={(e) => setFilterColumn(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                <option value="">None</option>
                {headers.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Contains value</label>
              <input type="text" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} disabled={!filterColumn} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Columns to keep (none selected = all)</label>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {headers.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => toggleColumn(h)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${selectedColumns.includes(h) ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Result ({filtered.length} rows)</label>
              <CopyButton value={resultCsv} />
            </div>
            <textarea value={resultCsv} readOnly rows={8} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900/40 dark:text-white" />
          </div>
        </>
      )}
    </div>
  )
}

CsvFilterTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
