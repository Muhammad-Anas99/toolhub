import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowPath } from 'react-icons/hi2'
import { randomInt } from '../../../lib/randomUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function RandomNumberGeneratorTool({ toolSlug, toolName, category }) {
  const [min, setMin] = useState('1')
  const [max, setMax] = useState('100')
  const [result, setResult] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  const minNum = parseInt(min, 10)
  const maxNum = parseInt(max, 10)
  const valid = !isNaN(minNum) && !isNaN(maxNum) && minNum <= maxNum

  function generate() {
    if (!valid) return
    setResult(randomInt(minNum, maxNum))
    logNow('Random number generated')
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Min</label><input type="number" value={min} onChange={(e) => setMin(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" /></div>
        <div><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Max</label><input type="number" value={max} onChange={(e) => setMax(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" /></div>
      </div>
      <button type="button" onClick={generate} disabled={!valid} className="btn-primary disabled:opacity-40">
        <HiOutlineArrowPath className="h-4 w-4" />
        Generate
      </button>
      {result !== null && (
        <div className="flex items-center justify-center rounded-2xl border border-slate-200 py-10 dark:border-slate-800">
          <p className="text-6xl font-bold text-brand-600 dark:text-brand-400">{result}</p>
        </div>
      )}
    </div>
  )
}

RandomNumberGeneratorTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
