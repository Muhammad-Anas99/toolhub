import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { compoundInterest } from '../../../lib/calculatorUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const inputClass = 'mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white'

// Matches how people actually describe compounding frequency ("daily
// compound interest calculator" and "monthly compound interest
// calculator" are both real, high-volume searches on their own) rather
// than a raw "compounds per year" number the underlying math has always
// accepted but the UI never labeled in a way that matched how anyone
// actually searches for or thinks about this.
const FREQUENCY_OPTIONS = [
  { label: 'Daily', value: 365 },
  { label: 'Weekly', value: 52 },
  { label: 'Monthly', value: 12 },
  { label: 'Quarterly', value: 4 },
  { label: 'Semi-annually', value: 2 },
  { label: 'Annually', value: 1 },
]

export default function CompoundInterestTool({ toolSlug, toolName, category }) {
  const [principal, setPrincipal] = useState('1000')
  const [rate, setRate] = useState('5')
  const [times, setTimes] = useState('12')
  const [years, setYears] = useState('10')
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const p = parseFloat(principal), r = parseFloat(rate), n = parseFloat(times), y = parseFloat(years)
  const valid = [p, r, n, y].every((v) => !isNaN(v) && v >= 0)
  const result = valid ? compoundInterest(p, r, n, y) : null
  if (result) logDebounced('Compound interest calculated', `${result.finalAmount}`)

  // The Rule of 72 is a genuinely different question from the main
  // calculation above - not "what will this grow to," but "how long
  // until it doubles" - estimated by dividing 72 by the interest rate.
  // It's a real, well-known mental-math shortcut with its own
  // substantial, independent search volume, and a quick, honest
  // estimate (explicitly labeled as such, not a substitute for the
  // precise calculation above) belongs right alongside the calculator
  // that already has the rate on hand.
  const yearsToDouble = r > 0 ? 72 / r : null

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <div><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Principal</label><input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className={inputClass} /></div>
        <div><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Annual rate (%)</label><input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className={inputClass} /></div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Compounding frequency</label>
          <select value={times} onChange={(e) => setTimes(e.target.value)} className={inputClass}>
            {FREQUENCY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Years</label><input type="number" value={years} onChange={(e) => setYears(e.target.value)} className={inputClass} /></div>
      </div>
      {result && (
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-4 text-center"><p className="text-xs text-slate-400 dark:text-slate-500">Final amount</p><p className="text-2xl font-semibold text-slate-900 dark:text-white">{result.finalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p></div>
          <div className="card p-4 text-center"><p className="text-xs text-slate-400 dark:text-slate-500">Interest earned</p><p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">{result.interestEarned.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p></div>
        </div>
      )}
      {yearsToDouble !== null && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300">
          <strong className="text-slate-900 dark:text-white">Rule of 72 estimate:</strong> at {rate}%, your money roughly doubles every <strong className="text-slate-900 dark:text-white">{yearsToDouble.toFixed(1)} years</strong>. This is a quick mental-math approximation (72 \u00f7 rate), not the precise result above.
        </div>
      )}
    </div>
  )
}

CompoundInterestTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
