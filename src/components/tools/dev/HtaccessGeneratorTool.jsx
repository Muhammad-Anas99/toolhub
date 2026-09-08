import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineDocumentDuplicate, HiOutlineArrowDownTray, HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { OPTIONS, generateHtaccess } from '../../../lib/htaccessUtils.js'
import { downloadBlob } from '../../../lib/downloadBlob.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function HtaccessGeneratorTool({ toolSlug, toolName, category }) {
  const [selected, setSelected] = useState({})
  const [values, setValues] = useState({})
  const [copied, setCopied] = useState(false)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  function toggleOption(option) {
    setSelected((prev) => {
      const next = { ...prev, [option.key]: !prev[option.key] }
      // Redirecting both www->non-www and non-www->www at once is a
      // contradictory, broken configuration - selecting one turns the
      // other off automatically rather than letting both apply.
      if (next[option.key] && option.excludesKey) next[option.excludesKey] = false
      return next
    })
  }

  function handleInputChange(optionKey, inputName, value) {
    setValues((prev) => ({ ...prev, [optionKey]: { ...prev[optionKey], [inputName]: value } }))
  }

  const output = generateHtaccess(selected, values)

  useEffect(() => {
    if (output) logDebounced('.htaccess generated')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [output])

  function handleCopy() {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    if (!output) return
    downloadBlob(new Blob([output], { type: 'text/plain' }), '.htaccess')
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-300">
        <HiOutlineExclamationTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
        <span>
          .htaccess rules depend on your Apache configuration and hosting environment. Test changes before using
          them on a production website.
        </span>
      </div>

      <div className="space-y-2">
        {OPTIONS.map((option) => (
          <div key={option.key} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
            <label className="flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={!!selected[option.key]}
                onChange={() => toggleOption(option)}
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              {option.label}
            </label>
            {selected[option.key] && option.hasInput && (
              <div className="mt-2.5 flex flex-wrap gap-2 pl-6.5">
                {option.inputs.map((input) => (
                  <input
                    key={input.name}
                    type="text"
                    placeholder={input.placeholder}
                    value={values[option.key]?.[input.name] || ''}
                    onChange={(event) => handleInputChange(option.key, input.name, event.target.value)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {output && (
        <>
          <div className="flex gap-2">
            <button type="button" onClick={handleCopy} className="btn-primary text-sm">
              <HiOutlineDocumentDuplicate className="h-4 w-4" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button type="button" onClick={handleDownload} className="btn-secondary text-sm">
              <HiOutlineArrowDownTray className="h-4 w-4" />
              Download .htaccess
            </button>
          </div>

          <div className="rounded-xl bg-slate-900 p-4 dark:bg-slate-950">
            <pre className="overflow-x-auto whitespace-pre-wrap text-xs text-slate-200">
              <code>{output}</code>
            </pre>
          </div>
        </>
      )}
    </div>
  )
}

HtaccessGeneratorTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
