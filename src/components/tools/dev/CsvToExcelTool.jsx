import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as XLSX from 'xlsx'
import { HiOutlineArrowDownTray } from 'react-icons/hi2'
import { csvToJson } from '../../../lib/dataConversionUtils.js'
import { downloadBlob } from '../../../lib/downloadBlob.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function CsvToExcelTool({ toolSlug, toolName, category }) {
  const [csv, setCsv] = useState('')
  const [error, setError] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  function handleDownload() {
    setError(null)
    try {
      const rows = csvToJson(csv)
      const worksheet = XLSX.utils.json_to_sheet(rows)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
      const arrayBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' })
      downloadBlob(new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'converted.xlsx')
      logNow('CSV converted to Excel')
    } catch (err) {
      setError('This doesn\u2019t look like valid CSV.')
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">CSV input</label>
        <textarea
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          rows={10}
          placeholder={'name,age\nAlice,30\nBob,25'}
          spellCheck={false}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}

      <button type="button" onClick={handleDownload} disabled={!csv.trim()} className="btn-primary disabled:opacity-40">
        <HiOutlineArrowDownTray className="h-4 w-4" />
        Download as Excel
      </button>
    </div>
  )
}

CsvToExcelTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
