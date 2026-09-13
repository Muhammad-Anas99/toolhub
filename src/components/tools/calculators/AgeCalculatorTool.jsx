import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { calculateAge } from '../../../lib/calculatorUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const inputClass = 'mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white'

export default function AgeCalculatorTool({ toolSlug, toolName, category }) {
  const [birthDate, setBirthDate] = useState('')
  const [refDate, setRefDate] = useState(new Date().toISOString().slice(0, 10))
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  let result = null
  if (birthDate && refDate) {
    const b = new Date(birthDate + 'T00:00:00')
    const r = new Date(refDate + 'T00:00:00')
    if (r >= b) {
      result = calculateAge(b, r)
      logDebounced('Age calculated', `${result.years} years`)
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <div><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date of birth</label><input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className={inputClass} /></div>
        <div><label className="text-sm font-medium text-slate-700 dark:text-slate-300">As of date</label><input type="date" value={refDate} onChange={(e) => setRefDate(e.target.value)} className={inputClass} /></div>
      </div>
      {result && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="card p-4 text-center"><p className="text-2xl font-semibold text-slate-900 dark:text-white">{result.years}</p><p className="text-xs text-slate-400 dark:text-slate-500">Years</p></div>
          <div className="card p-4 text-center"><p className="text-2xl font-semibold text-slate-900 dark:text-white">{result.months}</p><p className="text-xs text-slate-400 dark:text-slate-500">Months</p></div>
          <div className="card p-4 text-center"><p className="text-2xl font-semibold text-slate-900 dark:text-white">{result.days}</p><p className="text-xs text-slate-400 dark:text-slate-500">Days</p></div>
          <div className="card p-4 text-center"><p className="text-2xl font-semibold text-slate-900 dark:text-white">{result.totalDays.toLocaleString()}</p><p className="text-xs text-slate-400 dark:text-slate-500">Total days</p></div>
        </div>
      )}
    </div>
  )
}

AgeCalculatorTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
