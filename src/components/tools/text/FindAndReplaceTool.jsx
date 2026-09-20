import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import CopyButton from '../CopyButton.jsx'
import { findAndReplace } from '../../../lib/textTransformUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function FindAndReplaceTool({ toolSlug, toolName, category }) {
  const [text, setText] = useState('')
  const [find, setFind] = useState('')
  const [replace, setReplace] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [wholeWord, setWholeWord] = useState(false)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const output = findAndReplace(text, find, replace, { caseSensitive, wholeWord })
  const matchCount = find ? (text.match(new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), caseSensitive ? 'g' : 'gi')) || []).length : 0

  // Watches the actual output, derived from every input that genuinely
  // affects it (text, find, replace, caseSensitive, wholeWord) — the
  // previous approach only logged on the textarea's own onChange with
  // the raw typed text as the logged value, meaning changing find,
  // replace, or either checkbox after the first paste never triggered
  // a log at all, even though each of those changes produces a
  // genuinely different, copyable result.
  useEffect(() => {
    if (text.trim() && find) logDebounced('Find and replace applied', output)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [output])

  return (
    <div className="space-y-5">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Paste or type your text here..."
        className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Find</label>
          <input type="text" value={find} onChange={(e) => setFind(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Replace with</label>
          <input type="text" value={replace} onChange={(e) => setReplace(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
        </div>
      </div>
      <div className="flex gap-4 text-sm text-slate-600 dark:text-slate-300">
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} /> Case sensitive</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={wholeWord} onChange={(e) => setWholeWord(e.target.checked)} /> Whole word only</label>
      </div>
      {find && <p className="text-xs text-slate-400 dark:text-slate-500">{matchCount} match{matchCount === 1 ? '' : 'es'} found</p>}
      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Result</label>
          {output && <CopyButton value={output} />}
        </div>
        <textarea value={output} readOnly rows={6} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900/40 dark:text-white" />
      </div>
    </div>
  )
}

FindAndReplaceTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
