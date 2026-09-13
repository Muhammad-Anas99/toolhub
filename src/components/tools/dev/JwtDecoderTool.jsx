import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CopyButton from '../CopyButton.jsx'
import { decodeJwt } from '../../../lib/encodingUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function JwtDecoderTool({ toolSlug, toolName, category }) {
  const [token, setToken] = useState('')
  const [error, setError] = useState(null)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  let decoded = null
  if (token.trim()) {
    try {
      decoded = decodeJwt(token.trim())
      if (error) setError(null)
    } catch (err) {
      if (!error) setError(err.message)
    }
  }
  if (decoded) logDebounced('JWT decoded', token)

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">JWT token</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          rows={4}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          spellCheck={false}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-xs text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}

      {decoded && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Header</p>
              <CopyButton value={JSON.stringify(decoded.header, null, 2)} />
            </div>
            <pre className="mt-1.5 overflow-x-auto rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-900 dark:bg-slate-900/40 dark:text-white">{JSON.stringify(decoded.header, null, 2)}</pre>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Payload</p>
              <CopyButton value={JSON.stringify(decoded.payload, null, 2)} />
            </div>
            <pre className="mt-1.5 overflow-x-auto rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-900 dark:bg-slate-900/40 dark:text-white">{JSON.stringify(decoded.payload, null, 2)}</pre>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            This shows the header and payload only. The signature isn&apos;t verified here, since that would require the issuer&apos;s secret or public key.
          </p>
        </div>
      )}
    </div>
  )
}

JwtDecoderTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
