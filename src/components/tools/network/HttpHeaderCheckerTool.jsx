import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import { api } from '../../../lib/api.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function HttpHeaderCheckerTool({ toolSlug, toolName, category }) {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  async function handleCheck() {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const { data } = await api.checkHttpHeaders(url.trim())
      setResult(data)
      logNow('HTTP headers checked: ' + url)
    } catch (err) {
      setError(err.message || 'Could not check this URL.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          placeholder="example.com"
          className="flex-1 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
        <button type="button" onClick={handleCheck} disabled={!url.trim() || loading} className="btn-primary disabled:opacity-40">
          <HiOutlineMagnifyingGlass className="h-4 w-4" />
          {loading ? 'Checking...' : 'Check'}
        </button>
      </div>

      {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}

      {result && (
        <div className="space-y-3">
          <div className="card p-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">Status: <span className="font-semibold text-slate-900 dark:text-white">{result.status} {result.statusText}</span></p>
          </div>
          <div className="card divide-y divide-slate-100 dark:divide-slate-800">
            {Object.entries(result.headers).map(([key, value]) => (
              <div key={key} className="flex flex-col gap-0.5 px-5 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">{key}</p>
                <p className="break-all font-mono text-sm text-slate-900 dark:text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

HttpHeaderCheckerTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
