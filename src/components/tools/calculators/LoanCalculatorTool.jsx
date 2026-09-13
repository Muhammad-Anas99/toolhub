import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { loanMonthlyPayment } from '../../../lib/calculatorUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const inputClass = 'mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white'

export default function LoanCalculatorTool({ toolSlug, toolName, category }) {
  const [principal, setPrincipal] = useState('200000')
  const [rate, setRate] = useState('4')
  const [years, setYears] = useState('30')
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const p = parseFloat(principal), r = parseFloat(rate), y = parseFloat(years)
  const valid = [p, r, y].every((v) => !isNaN(v) && v > 0)
  const result = valid ? loanMonthlyPayment(p, r, y) : null
  if (result) logDebounced('Loan payment calculated', `${result.monthlyPayment}`)

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <div><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Loan amount</label><input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className={inputClass} /></div>
        <div><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Annual rate (%)</label><input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className={inputClass} /></div>
        <div><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Term (years)</label><input type="number" value={years} onChange={(e) => setYears(e.target.value)} className={inputClass} /></div>
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-3">
          <div className="card p-4 text-center"><p className="text-xs text-slate-400 dark:text-slate-500">Monthly payment</p><p className="text-xl font-semibold text-slate-900 dark:text-white">{result.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p></div>
          <div className="card p-4 text-center"><p className="text-xs text-slate-400 dark:text-slate-500">Total paid</p><p className="text-xl font-semibold text-slate-900 dark:text-white">{result.totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
          <div className="card p-4 text-center"><p className="text-xs text-slate-400 dark:text-slate-500">Total interest</p><p className="text-xl font-semibold text-amber-600 dark:text-amber-400">{result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
        </div>
      )}
    </div>
  )
}

LoanCalculatorTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
