import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowPath } from 'react-icons/hi2'
import { randomWord } from '../../../lib/randomUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function RandomWordGeneratorTool({ toolSlug, toolName, category }) {
  const [count, setCount] = useState(1)
  const [words, setWords] = useState([])
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  function generate() {
    const result = Array.from({ length: count }, randomWord)
    setWords(result)
    logNow('Random words generated')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">How many words</label>
        <select value={count} onChange={(e) => setCount(Number(e.target.value))} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white">
          {[1, 3, 5, 10].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <button type="button" onClick={generate} className="btn-primary">
        <HiOutlineArrowPath className="h-4 w-4" />
        Generate
      </button>
      {words.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 py-4">
          {words.map((w, i) => (
            <span key={i} className="rounded-full bg-brand-50 px-4 py-2 text-lg font-medium text-brand-700 dark:bg-brand-950 dark:text-brand-400">{w}</span>
          ))}
        </div>
      )}
    </div>
  )
}

RandomWordGeneratorTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
