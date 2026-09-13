import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineSparkles, HiOutlineTrash } from 'react-icons/hi2'
import { pickRandom } from '../../../lib/randomUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function RandomNamePickerTool({ toolSlug, toolName, category }) {
  const [namesText, setNamesText] = useState('')
  const [winner, setWinner] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  const names = namesText.split('\n').map((n) => n.trim()).filter(Boolean)

  function pick() {
    const result = pickRandom(names)
    setWinner(result)
    if (result) logNow('Random name picked: ' + result)
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Names (one per line)</label>
        <textarea
          value={namesText}
          onChange={(e) => setNamesText(e.target.value)}
          rows={6}
          placeholder={'Alice\nBob\nCharlie'}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{names.length} name{names.length === 1 ? '' : 's'} entered</p>
      </div>
      <button type="button" onClick={pick} disabled={names.length === 0} className="btn-primary disabled:opacity-40">
        <HiOutlineSparkles className="h-4 w-4" />
        Pick Random Name
      </button>
      {winner && (
        <div className="flex items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 py-8 dark:border-emerald-900 dark:bg-emerald-950">
          <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">{winner}</p>
        </div>
      )}
    </div>
  )
}

RandomNamePickerTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
