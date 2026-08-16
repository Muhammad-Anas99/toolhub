import React from 'react'
import PropTypes from 'prop-types'
import { HiArrowTrendingUp, HiArrowTrendingDown, HiMinus } from 'react-icons/hi2'

/**
 * Renders nothing when `percentChange` is null — the backend only omits
 * this when there's genuinely no prior-period data to compare against
 * (see analyticsService.percentChange), so there's never a fabricated
 * "+0%" or misleading placeholder shown here.
 */
export default function TrendBadge({ percentChange }) {
  if (percentChange === null || percentChange === undefined) return null

  const isUp = percentChange > 0
  const isFlat = percentChange === 0
  const Icon = isFlat ? HiMinus : isUp ? HiArrowTrendingUp : HiArrowTrendingDown

  const colorClasses = isFlat
    ? 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
    : isUp
      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
      : 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400'

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${colorClasses}`}>
      <Icon className="h-3 w-3" />
      {isFlat ? 'No change' : `${isUp ? '+' : ''}${percentChange}%`}
    </span>
  )
}

TrendBadge.propTypes = {
  percentChange: PropTypes.number,
}
