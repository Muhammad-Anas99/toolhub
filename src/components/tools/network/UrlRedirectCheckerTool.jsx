import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineMagnifyingGlass, HiOutlineArrowRight } from 'react-icons/hi2'
import { api } from '../../../lib/api.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function UrlRedirectCheckerTool({ toolSlug, toolName, category }) {
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
      const { data } = await api.checkRedirects(url.trim())
      setResult(data)
      logNow('Redirect chain checked: ' + url)
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
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {result.hopCount} hop{result.hopCount === 1 ? '' : 's'} to final destination
          </p>
          {result.chain.map((hop, i) => (
            <div key={i} className="card flex items-center gap-3 p-4">
              <span className={`flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${hop.status >= 300 && hop.status < 400 ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'}`}>
                {hop.status}
              </span>
              <p className="min-w-0 flex-1 truncate break-all font-mono text-sm text-slate-900 dark:text-white">{hop.url}</p>
              {i < result.chain.length - 1 && <HiOutlineArrowRight className="h-4 w-4 flex-shrink-0 text-slate-300" />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

UrlRedirectCheckerTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
