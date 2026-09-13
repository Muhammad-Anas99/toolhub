import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CopyButton from '../CopyButton.jsx'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function CodeFormatterTool({ toolSlug, toolName, category, transformFn, actionLabel, placeholder }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(null)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  let output = ''
  if (input) {
    try {
      output = transformFn(input)
      if (error) setError(null)
    } catch {
      if (!error) setError('Could not process this input \u2014 check that it\u2019s well-formed.')
    }
  }

  function handleChange(event) {
    const value = event.target.value
    setInput(value)
    if (value.trim()) logDebounced(actionLabel, value)
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Input</label>
        <textarea
          value={input}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          spellCheck={false}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}

      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Result</label>
          {output && <CopyButton value={output} />}
        </div>
        <textarea
          value={output}
          readOnly
          rows={10}
          spellCheck={false}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900/40 dark:text-white"
        />
      </div>
    </div>
  )
}

CodeFormatterTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
  transformFn: PropTypes.func.isRequired,
  actionLabel: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
}

CodeFormatterTool.defaultProps = {
  placeholder: 'Paste your code here...',
}
