import React from 'react'
import PropTypes from 'prop-types'

const HEIGHT = 220
const PADDING_LEFT = 32
const PADDING_RIGHT = 8
const PADDING_TOP = 10
const PADDING_BOTTOM = 24
const GRID_LINES = 5

/**
 * Picks a "nice" round number at or just above the data's real max, so
 * the Y-axis reads like 0/10/20/30/40/50 rather than an arbitrary value
 * like 0/8.6/17.2/... - the same rounding approach most charting
 * libraries use for axis ticks.
 */
function niceMax(rawMax) {
  if (rawMax <= 0) return GRID_LINES
  const magnitude = 10 ** Math.floor(Math.log10(rawMax))
  const normalized = rawMax / magnitude
  let niceNormalized
  if (normalized <= 1) niceNormalized = 1
  else if (normalized <= 2) niceNormalized = 2
  else if (normalized <= 5) niceNormalized = 5
  else niceNormalized = 10
  return niceNormalized * magnitude
}

export default function ActivityChart({ points, labels, width = 760 }) {
  if (!points || points.length < 2) {
    return (
      <div className="flex h-[220px] items-center justify-center text-sm text-slate-400 dark:text-slate-500">
        Not enough data yet to show a chart.
      </div>
    )
  }

  const rawMax = Math.max(...points)
  const axisMax = niceMax(rawMax)
  const plotWidth = width - PADDING_LEFT - PADDING_RIGHT
  const plotHeight = HEIGHT - PADDING_TOP - PADDING_BOTTOM
  const stepX = plotWidth / (points.length - 1)

  const coords = points.map((value, index) => {
    const x = PADDING_LEFT + index * stepX
    const y = PADDING_TOP + plotHeight - (value / axisMax) * plotHeight
    return [x, y]
  })

  const linePath = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
  const areaPath = `${linePath} L${coords[coords.length - 1][0]},${PADDING_TOP + plotHeight} L${coords[0][0]},${PADDING_TOP + plotHeight} Z`

  const gridValues = Array.from({ length: GRID_LINES + 1 }, (_, i) => Math.round((axisMax / GRID_LINES) * i))

  // Show at most ~7 x-axis labels regardless of how many points there
  // are, so a 90-point chart doesn't render 90 illegibly cramped labels
  // - the line itself still plots every real data point either way.
  const labelEvery = Math.max(1, Math.ceil(points.length / 7))

  return (
    <svg
      viewBox={`0 0 ${width} ${HEIGHT}`}
      className="h-[220px] w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="Site activity over the selected period"
    >
      <defs>
        <linearGradient id="activity-area-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" className="text-brand-500" stopColor="currentColor" stopOpacity="0.18" />
          <stop offset="100%" className="text-brand-500" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      {gridValues.map((value) => {
        const y = PADDING_TOP + plotHeight - (value / axisMax) * plotHeight
        return (
          <g key={value}>
            <line
              x1={PADDING_LEFT}
              x2={width - PADDING_RIGHT}
              y1={y}
              y2={y}
              className="stroke-slate-100 dark:stroke-slate-800"
              strokeWidth="1"
            />
            <text x={PADDING_LEFT - 8} y={y + 3} textAnchor="end" className="fill-slate-400 text-[10px] dark:fill-slate-500">
              {value}
            </text>
          </g>
        )
      })}

      <path d={areaPath} fill="url(#activity-area-fill)" />
      <path
        d={linePath}
        className="text-brand-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {labels &&
        labels.map((label, index) =>
          label && (index % labelEvery === 0 || index === labels.length - 1) ? (
            <text
              key={index}
              x={coords[index][0]}
              y={HEIGHT - 6}
              textAnchor="middle"
              className="fill-slate-400 text-[10px] dark:fill-slate-500"
            >
              {label}
            </text>
          ) : null
        )}
    </svg>
  )
}

ActivityChart.propTypes = {
  points: PropTypes.arrayOf(PropTypes.number),
  labels: PropTypes.arrayOf(PropTypes.string),
  width: PropTypes.number,
}
