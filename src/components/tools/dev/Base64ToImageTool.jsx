import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray } from 'react-icons/hi2'
import { downloadBlob } from '../../../lib/downloadBlob.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

function normalizeToDataUri(input) {
  const trimmed = input.trim()
  if (trimmed.startsWith('data:')) return trimmed
  return `data:image/png;base64,${trimmed}`
}

export default function Base64ToImageTool({ toolSlug, toolName, category }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(null)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  let dataUri = null
  if (input.trim()) {
    dataUri = normalizeToDataUri(input)
    logDebounced('Base64 decoded to image', input)
  }

  function handleDownload() {
    if (!dataUri) return
    fetch(dataUri)
      .then((res) => res.blob())
      .then((blob) => downloadBlob(blob, 'decoded-image.png'))
      .catch(() => setError('This doesn\u2019t look like a valid base64-encoded image.'))
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Base64 string or data URI</label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(null) }}
          rows={8}
          placeholder="iVBORw0KGgoAAAANSUhEUgAA... or data:image/png;base64,..."
          spellCheck={false}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}

      {dataUri && (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <img
            src={dataUri}
            alt="Decoded preview"
            className="max-h-64 rounded-lg object-contain"
            onError={() => setError('This doesn\u2019t look like a valid base64-encoded image.')}
          />
          <button type="button" onClick={handleDownload} className="btn-primary text-sm">
            <HiOutlineArrowDownTray className="h-4 w-4" />
            Download Image
          </button>
        </div>
      )}
    </div>
  )
}

Base64ToImageTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
