import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi2'
import { validateJson } from '../../../lib/devToolsUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function JsonValidatorTool({ toolSlug, toolName, category }) {
  const [input, setInput] = useState('')
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const result = input.trim() === '' ? null : validateJson(input)

  useEffect(() => {
    if (result) {
      logDebounced(result.valid ? 'JSON validated (valid)' : 'JSON validated (invalid)', input)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.valid, input])

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="json-validate-input" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Paste JSON to validate
        </label>
        <textarea
          id="json-validate-input"
          rows={12}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Paste your JSON here..."
          spellCheck={false}
          className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {result && (
        <div
          className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 text-sm ${
            result.valid
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400'
              : 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-400'
          }`}
        >
          {result.valid ? (
            <HiOutlineCheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          ) : (
            <HiOutlineXCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          )}
          <div>
            <p className="font-medium">{result.valid ? 'Valid JSON' : 'Invalid JSON'}</p>
            {!result.valid && (
              <p className="mt-0.5">
                {result.line ? `Line ${result.line}, column ${result.column}: ` : ''}
                {result.error}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

JsonValidatorTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
