import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CopyButton from '../CopyButton.jsx'
import { generateHtpasswd } from '../../../lib/securityUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function HtpasswdGeneratorTool({ toolSlug, toolName, category }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState('')
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  async function handleGenerate() {
    const output = await generateHtpasswd(username, password)
    setResult(output)
    logNow('Htpasswd entry generated')
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
        </div>
      </div>
      <button type="button" onClick={handleGenerate} disabled={!username || !password} className="btn-primary disabled:opacity-40">
        Generate
      </button>
      {result && (
        <div className="card flex items-center justify-between gap-4 p-4">
          <p className="min-w-0 flex-1 break-all font-mono text-sm text-slate-900 dark:text-white">{result}</p>
          <CopyButton value={result} />
        </div>
      )}
    </div>
  )
}

HtpasswdGeneratorTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
