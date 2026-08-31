import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray } from 'react-icons/hi2'
import { minifyJs, minifyCss, minifyHtml } from '../../../lib/codeMinifyUtils.js'
import { downloadBlob } from '../../../lib/downloadBlob.js'
import { formatBytes } from '../../../lib/formatBytes.js'
import CopyButton from '../CopyButton.jsx'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const LANGUAGES = [
  { id: 'js', label: 'JavaScript', minify: minifyJs, extension: 'js', mime: 'application/javascript' },
  { id: 'css', label: 'CSS', minify: minifyCss, extension: 'css', mime: 'text/css' },
  { id: 'html', label: 'HTML', minify: minifyHtml, extension: 'html', mime: 'text/html' },
]

const SAMPLES = {
  js: 'function greet(name) {\n  // says hello\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greet("ToolHub"));',
  css: '.card {\n  /* card styling */\n  padding: 16px;\n  border-radius: 8px;\n  color: #333;\n}',
  html: '<div>\n  <!-- greeting -->\n  <p>Hello, ToolHub!</p>\n</div>',
}

export default function CodeMinifierTool({ toolSlug, toolName, category }) {
  const [language, setLanguage] = useState('js')
  const [input, setInput] = useState('')
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const activeLang = LANGUAGES.find((lang) => lang.id === language)
  const output = input.trim() === '' ? '' : activeLang.minify(input)

  const originalBytes = new Blob([input]).size
  const minifiedBytes = new Blob([output]).size
  const savedPercent = originalBytes > 0 ? Math.round(((originalBytes - minifiedBytes) / originalBytes) * 100) : 0

  useEffect(() => {
    if (output) {
      logDebounced(`${activeLang.label} minified`, output)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [output])

  function handleDownload() {
    if (!output) return
    downloadBlob(new Blob([output], { type: activeLang.mime }), `minified.${activeLang.extension}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              type="button"
              onClick={() => setLanguage(lang.id)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                language === lang.id
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
        {input.trim() === '' && (
          <button
            type="button"
            onClick={() => setInput(SAMPLES[language])}
            className="text-xs font-medium text-brand-600 dark:text-brand-400"
          >
            Try an example
          </button>
        )}
      </div>

      <div>
        <label htmlFor="code-input" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Paste your {activeLang.label} code
        </label>
        <textarea
          id="code-input"
          rows={10}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={`Paste your ${activeLang.label} here...`}
          spellCheck={false}
          className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {output && (
        <>
          <div className="flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm dark:bg-emerald-950">
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              {formatBytes(originalBytes)} → {formatBytes(minifiedBytes)}
            </span>
            <span className="text-emerald-600 dark:text-emerald-500">({savedPercent}% smaller)</span>
          </div>

          <div className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Minified Output</p>
              <div className="flex gap-2">
                <CopyButton value={output} />
                <button type="button" onClick={handleDownload} className="btn-secondary text-xs">
                  <HiOutlineArrowDownTray className="h-3.5 w-3.5" />
                  Download
                </button>
              </div>
            </div>
            <pre className="max-h-96 overflow-auto whitespace-pre-wrap break-all p-4 font-mono text-sm text-slate-900 dark:text-white">
              {output}
            </pre>
          </div>
        </>
      )}
    </div>
  )
}

CodeMinifierTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
