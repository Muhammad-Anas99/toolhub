import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { profitMargin, markup } from '../../../lib/calculatorUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const inputClass = 'mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white'

export default function ProfitMarginTool({ toolSlug, toolName, category }) {
  const [revenue, setRevenue] = useState('')
  const [cost, setCost] = useState('')
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const rev = parseFloat(revenue), c = parseFloat(cost)
  const valid = !isNaN(rev) && !isNaN(c) && rev > 0
  const margin = valid ? profitMargin(rev, c) : null
  const mkup = valid ? markup(rev, c) : null
  if (valid) logDebounced('Profit margin calculated', `${margin}`)

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <div><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Revenue (selling price)</label><input type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} className={inputClass} /></div>
        <div><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Cost</label><input type="number" value={cost} onChange={(e) => setCost(e.target.value)} className={inputClass} /></div>
      </div>
      {valid && (
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-4 text-center"><p className="text-xs text-slate-400 dark:text-slate-500">Profit margin</p><p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">{margin.toFixed(2)}%</p></div>
          <div className="card p-4 text-center"><p className="text-xs text-slate-400 dark:text-slate-500">Markup</p><p className="text-2xl font-semibold text-slate-900 dark:text-white">{mkup.toFixed(2)}%</p></div>
        </div>
      )}
    </div>
  )
}

ProfitMarginTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
