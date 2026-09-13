import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import { api } from '../../../lib/api.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function DnsLookupTool({ toolSlug, toolName, category }) {
  const [domain, setDomain] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  async function handleLookup() {
    setLoading(true)
    setError(null)
    setResults(null)
    try {
      const { data } = await api.dnsLookup(domain.trim())
      setResults(data)
      logNow('DNS lookup: ' + domain)
    } catch (err) {
      setError(err.message || 'Could not look up this domain.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
          placeholder="example.com"
          className="flex-1 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
        <button type="button" onClick={handleLookup} disabled={!domain.trim() || loading} className="btn-primary disabled:opacity-40">
          <HiOutlineMagnifyingGlass className="h-4 w-4" />
          {loading ? 'Looking up...' : 'Lookup'}
        </button>
      </div>

      {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}

      {results && (
        <div className="space-y-3">
          {Object.entries(results).map(([type, records]) => (
            records.length > 0 && (
              <div key={type} className="card p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">{type} Records</p>
                <div className="mt-2 space-y-1">
                  {records.map((r, i) => (
                    <p key={i} className="break-all font-mono text-sm text-slate-900 dark:text-white">
                      {typeof r === 'object' ? JSON.stringify(r) : r}
                    </p>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  )
}

DnsLookupTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
