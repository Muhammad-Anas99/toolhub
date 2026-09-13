import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { randomInt } from '../../../lib/randomUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function DiceRollerTool({ toolSlug, toolName, category }) {
  const [numDice, setNumDice] = useState(1)
  const [results, setResults] = useState([])
  const [rolling, setRolling] = useState(false)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  function roll() {
    setRolling(true)
    setTimeout(() => {
      const rolls = Array.from({ length: numDice }, () => randomInt(1, 6))
      setResults(rolls)
      setRolling(false)
      logNow('Dice rolled: ' + rolls.join(', '))
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Number of dice</label>
        <select value={numDice} onChange={(e) => setNumDice(Number(e.target.value))} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white">
          {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div className="flex flex-wrap justify-center gap-3 py-6">
        {(results.length ? results : Array(numDice).fill('?')).map((r, i) => (
          <div key={i} className={`flex h-16 w-16 items-center justify-center rounded-xl border-2 border-brand-400 bg-white text-2xl font-bold text-slate-900 shadow dark:bg-slate-800 dark:text-white ${rolling ? 'animate-bounce' : ''}`}>
            {rolling ? '' : r}
          </div>
        ))}
      </div>
      <button type="button" onClick={roll} disabled={rolling} className="btn-primary disabled:opacity-40">
        {rolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  )
}

DiceRollerTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
