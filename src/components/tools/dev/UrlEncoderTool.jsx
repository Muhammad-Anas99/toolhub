import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { encodeUrl, decodeUrl } from '../../../lib/devToolsUtils.js'
import CopyButton from '../CopyButton.jsx'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function UrlEncoderTool({ toolSlug, toolName, category }) {
  const [mode, setMode] = useState('encode')
  const [input, setInput] = useState('')
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  let output = ''
  let error = null
  if (input !== '') {
    try {
      output = mode === 'encode' ? encodeUrl(input) : decodeUrl(input)
    } catch {
      error = 'That doesn\u2019t look like validly encoded text.'
    }
  }

  useEffect(() => {
    if (output && !error) {
      logDebounced(mode === 'encode' ? 'URL encoded' : 'URL decoded', output)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [output, error])

  function handleModeChange(nextMode) {
    setMode(nextMode)
    setInput('')
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleModeChange('encode')}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
            mode === 'encode' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          Encode
        </button>
        <button
          type="button"
          onClick={() => handleModeChange('decode')}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
            mode === 'decode' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          Decode
        </button>
      </div>

      <div>
        <label htmlFor="url-input" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {mode === 'encode' ? 'Text or URL to encode' : 'Encoded URL to decode'}
        </label>
        <textarea
          id="url-input"
          rows={4}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={mode === 'encode' ? 'https://example.com/search?q=hello world' : 'https%3A%2F%2Fexample.com'}
          spellCheck={false}
          className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {error && <p className="text-sm text-rose-500">{error}</p>}

      {output && !error && (
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Result</p>
            <CopyButton value={output} />
          </div>
          <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-all p-4 font-mono text-sm text-slate-900 dark:text-white">
            {output}
          </pre>
        </div>
      )}
    </div>
  )
}

UrlEncoderTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
