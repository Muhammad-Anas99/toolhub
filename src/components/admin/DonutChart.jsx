import React from 'react'
import PropTypes from 'prop-types'

const SIZE = 120
const STROKE = 16
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// A small, distinct palette cycled across segments — not tied to each
// category's own brand color (categories.js), since several categories
// can share a color there and a donut chart needs every segment to be
// visually distinguishable from its neighbors.
const SEGMENT_COLORS = ['#3b82f6', '#8b5cf6', '#f43f5e', '#f59e0b', '#10b981', '#06b6d4', '#ec4899', '#84cc16']

export default function DonutChart({ segments }) {
  if (!segments || segments.length === 0) return null

  const total = segments.reduce((sum, segment) => sum + segment.value, 0)
  if (total === 0) return null

  let offset = 0
  const arcs = segments.map((segment, index) => {
    const fraction = segment.value / total
    const dash = fraction * CIRCUMFERENCE
    const arc = { dash, gap: CIRCUMFERENCE - dash, offset, color: SEGMENT_COLORS[index % SEGMENT_COLORS.length] }
    offset += dash
    return arc
  })

  return (
    <div className="flex items-center gap-5">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="flex-shrink-0 -rotate-90">
        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" strokeWidth={STROKE} className="stroke-slate-100 dark:stroke-slate-800" />
        {arcs.map((arc, index) => (
          <circle
            key={index}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={arc.color}
            strokeWidth={STROKE}
            strokeDasharray={`${arc.dash} ${arc.gap}`}
            strokeDashoffset={-arc.offset}
            strokeLinecap="butt"
          />
        ))}
      </svg>
      <div className="min-w-0 flex-1 space-y-1.5">
        {segments.map((segment, index) => (
          <div key={segment.label} className="flex items-center gap-2 text-xs">
            <span
              className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
              style={{ backgroundColor: SEGMENT_COLORS[index % SEGMENT_COLORS.length] }}
              aria-hidden="true"
            />
            <span className="truncate text-slate-600 dark:text-slate-300">{segment.label}</span>
            <span className="ml-auto flex-shrink-0 text-slate-400 dark:text-slate-500">
              {Math.round((segment.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

DonutChart.propTypes = {
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
}
