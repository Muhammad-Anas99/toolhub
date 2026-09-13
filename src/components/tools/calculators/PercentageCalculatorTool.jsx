import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { percentOf, whatPercent, percentChange } from '../../../lib/calculatorUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const inputClass = 'mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white'

export default function PercentageCalculatorTool({ toolSlug, toolName, category }) {
  const [mode, setMode] = useState('percentOf')
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const numA = parseFloat(a)
  const numB = parseFloat(b)
  const valid = !isNaN(numA) && !isNaN(numB)
  let result = null
  let label = ''
  if (valid) {
    if (mode === 'percentOf') { result = percentOf(numA, numB); label = `${numA}% of ${numB}` }
    else if (mode === 'whatPercent') { result = whatPercent(numA, numB); label = `${numA} is what % of ${numB}` }
    else { result = percentChange(numA, numB); label = `Change from ${numA} to ${numB}` }
    logDebounced('Percentage calculated', `${label} = ${result}`)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'percentOf', label: 'X% of Y' },
          { id: 'whatPercent', label: 'X is what % of Y' },
          { id: 'percentChange', label: '% change X to Y' },
        ].map((m) => (
          <button key={m.id} type="button" onClick={() => setMode(m.id)} className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${mode === m.id ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'}`}>
            {m.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-sm font-medium text-slate-700 dark:text-slate-300">X</label><input type="number" value={a} onChange={(e) => setA(e.target.value)} className={inputClass} /></div>
        <div><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Y</label><input type="number" value={b} onChange={(e) => setB(e.target.value)} className={inputClass} /></div>
      </div>
      {valid && (
        <div className="card p-4 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">{label}</p>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">{result.toLocaleString(undefined, { maximumFractionDigits: 4 })}{mode !== 'percentOf' ? '%' : ''}</p>
        </div>
      )}
    </div>
  )
}

PercentageCalculatorTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
