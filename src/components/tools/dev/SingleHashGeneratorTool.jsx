import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { generateHash } from '../../../lib/devToolsUtils.js'
import CopyButton from '../CopyButton.jsx'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function SingleHashGeneratorTool({ toolSlug, toolName, category, algorithm }) {
  const [input, setInput] = useState('')
  const [hash, setHash] = useState('')
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  useEffect(() => {
    if (!input) {
      setHash('')
      return
    }
    let cancelled = false
    generateHash(input, algorithm).then((result) => {
      if (!cancelled) {
        setHash(result)
        logDebounced(`${algorithm} hash generated`, input)
      }
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input])

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Text to hash</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          placeholder="Type or paste text..."
          spellCheck={false}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>
      {hash && (
        <div className="card flex items-center justify-between gap-4 p-4">
          <p className="min-w-0 flex-1 truncate font-mono text-sm text-slate-900 dark:text-white">{hash}</p>
          <CopyButton value={hash} />
        </div>
      )}
    </div>
  )
}

SingleHashGeneratorTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
  algorithm: PropTypes.string.isRequired,
}
