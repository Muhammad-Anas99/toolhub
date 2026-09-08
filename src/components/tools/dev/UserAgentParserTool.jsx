import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineMagnifyingGlass, HiOutlineDocumentDuplicate, HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { parseUserAgent } from '../../../lib/uaParserUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const EXAMPLE_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'

const FIELDS = [
  { key: 'browser', label: 'Browser' },
  { key: 'browserVersion', label: 'Browser version' },
  { key: 'os', label: 'Operating system' },
  { key: 'osVersion', label: 'OS version' },
  { key: 'deviceType', label: 'Device type' },
  { key: 'engine', label: 'Rendering engine' },
  { key: 'architecture', label: 'Architecture' },
]

export default function UserAgentParserTool({ toolSlug, toolName, category }) {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  function handleParse() {
    if (!input.trim()) return
    const parsed = parseUserAgent(input.trim())
    setResult(parsed)
    logNow('User-Agent parsed')
  }

  function handleDetectMine() {
    const mine = navigator.userAgent
    setInput(mine)
    setResult(parseUserAgent(mine))
    logNow('User-Agent parsed')
  }

  function handleExample() {
    setInput(EXAMPLE_UA)
    setResult(parseUserAgent(EXAMPLE_UA))
  }

  function handleClear() {
    setInput('')
    setResult(null)
  }

  function handleCopy() {
    if (!result) return
    const text = FIELDS.map(({ label, key }) => `${label}: ${result[key]}`).join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="ua-input" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          User-Agent string
        </label>
        <textarea
          id="ua-input"
          rows={3}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Paste a User-Agent string here..."
          spellCheck={false}
          className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-xs text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={handleParse} className="btn-primary text-sm">
          <HiOutlineMagnifyingGlass className="h-4 w-4" />
          Parse
        </button>
        <button type="button" onClick={handleDetectMine} className="btn-secondary text-sm">
          Detect My User-Agent
        </button>
        <button type="button" onClick={handleExample} className="btn-secondary text-sm">
          Example
        </button>
        <button type="button" onClick={handleClear} className="btn-secondary text-sm">
          Clear
        </button>
      </div>

      {result && (
        <>
          {result.isBot && (
            <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              This looks like a bot or crawler: <strong>{result.botName}</strong>
            </div>
          )}

          {result.warnings.length > 0 && (
            <div className="space-y-2 rounded-xl bg-blue-50 p-4 dark:bg-blue-950">
              {result.warnings.map((warning, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-blue-800 dark:text-blue-300">
                  <HiOutlineExclamationTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>{warning}</span>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FIELDS.map(({ key, label }) => (
              <div key={key} className="rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-900/40">
                <p className="text-xs text-slate-400 dark:text-slate-500">{label}</p>
                <p className="mt-0.5 text-sm font-medium text-slate-900 dark:text-white">{result[key]}</p>
              </div>
            ))}
          </div>

          <button type="button" onClick={handleCopy} className="btn-secondary text-sm">
            <HiOutlineDocumentDuplicate className="h-4 w-4" />
            {copied ? 'Copied!' : 'Copy Results'}
          </button>
        </>
      )}
    </div>
  )
}

UserAgentParserTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
