import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { countLines } from '../../../lib/textTransformUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function LineCounterTool({ toolSlug, toolName, category }) {
  const [text, setText] = useState('')
  const lineCount = countLines(text)
  const nonEmptyLines = text.split('\n').filter((l) => l.trim()).length
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  useEffect(() => {
    if (text.trim()) logDebounced('Lines counted', text)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  return (
    <div className="space-y-5">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        placeholder="Paste or type your text here..."
        className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />
      <div className="grid grid-cols-2 gap-3">
        <div className="card p-4 text-center">
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">{text ? lineCount : 0}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Total lines</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">{nonEmptyLines}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Non-empty lines</p>
        </div>
      </div>
    </div>
  )
}

LineCounterTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
