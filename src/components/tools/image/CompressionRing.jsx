import React from 'react'
import PropTypes from 'prop-types'

const SIZE = 128
const STROKE = 10
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/**
 * A ring showing "X% Smaller" — same stroke-dasharray technique already
 * verified working for the admin dashboard's category DonutChart.
 * `percent` is real, computed from actual before/after byte sizes by the
 * caller — never a placeholder.
 */
export default function CompressionRing({ percent }) {
  const clamped = Math.max(0, Math.min(100, percent))
  const dash = (clamped / 100) * CIRCUMFERENCE

  return (
    <div className="relative flex h-32 w-32 flex-shrink-0 items-center justify-center">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="-rotate-90">
        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" strokeWidth={STROKE} className="stroke-slate-100 dark:stroke-slate-800" />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
          strokeLinecap="round"
          className="stroke-emerald-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-900 dark:text-white">{clamped}%</span>
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Smaller!</span>
      </div>
    </div>
  )
}

CompressionRing.propTypes = {
  percent: PropTypes.number.isRequired,
}
