import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { generateHash, HASH_ALGORITHMS } from '../../../lib/devToolsUtils.js'
import CopyButton from '../CopyButton.jsx'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function HashGeneratorTool({ toolSlug, toolName, category }) {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState({})
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  useEffect(() => {
    if (input === '') {
      setHashes({})
      return
    }

    let cancelled = false
    Promise.all(HASH_ALGORITHMS.map(({ id }) => generateHash(input, id).then((hash) => [id, hash]))).then(
      (results) => {
        if (!cancelled) setHashes(Object.fromEntries(results))
      }
    )
    return () => {
      cancelled = true
    }
  }, [input])

  useEffect(() => {
    if (Object.keys(hashes).length > 0) {
      logDebounced('Hashes generated', input)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hashes])

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="hash-input" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Text to hash
        </label>
        <textarea
          id="hash-input"
          rows={5}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type or paste text..."
          spellCheck={false}
          className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {input !== '' && (
        <div className="card divide-y divide-slate-100 dark:divide-slate-800">
          {HASH_ALGORITHMS.map(({ id, label }) => (
            <div key={id} className="flex items-center justify-between gap-4 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  {label}
                </p>
                <p className="mt-0.5 truncate font-mono text-sm text-slate-900 dark:text-white">
                  {hashes[id] || '...'}
                </p>
              </div>
              {hashes[id] && <CopyButton value={hashes[id]} />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

HashGeneratorTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
