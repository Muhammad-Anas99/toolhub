import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as XLSX from 'xlsx'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import CopyButton from '../CopyButton.jsx'
import { useDocumentUpload } from '../../../hooks/useDocumentUpload.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const ACCEPTED_TYPES = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
const ACCEPTED_EXTENSIONS = ['.xlsx', '.xls']

export default function ExcelToJsonTool({ toolSlug, toolName, category }) {
  const upload = useDocumentUpload({ acceptedTypes: ACCEPTED_TYPES, acceptedExtensions: ACCEPTED_EXTENSIONS, maxSizeMB: 25 })
  const [json, setJson] = useState('')
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  useEffect(() => {
    if (!upload.file) {
      setJson('')
      return
    }
    let cancelled = false
    upload.file
      .arrayBuffer()
      .then((buffer) => {
        if (cancelled) return
        const workbook = XLSX.read(buffer, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
        setJson(JSON.stringify(rows, null, 2))
        logNow('Excel converted to JSON')
      })
      .catch(() => {
        if (!cancelled) upload.setError('This file couldn\u2019t be read as a spreadsheet.')
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upload.file])

  function handleReset() {
    upload.reset()
    setJson('')
  }

  return (
    <div className="space-y-5">
      {upload.error && <ErrorMessage message={upload.error} onDismiss={() => upload.setError(null)} />}
      {!upload.file ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={ACCEPTED_TYPES}
          maxSizeMB={25}
          isDragActive={upload.isDragActive}
          label="Drag & drop an Excel file here"
          uploadLabel="Upload Spreadsheet"
        />
      ) : (
        <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900/40">
          <p className="min-w-0 flex-1 truncate text-sm font-medium text-slate-900 dark:text-white">{upload.file.name}</p>
          <button type="button" onClick={handleReset} className="btn-secondary text-xs">Reset</button>
        </div>
      )}
      {json && (
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">JSON result</label>
            <CopyButton value={json} />
          </div>
          <textarea value={json} readOnly rows={12} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900/40 dark:text-white" />
        </div>
      )}
    </div>
  )
}

ExcelToJsonTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
