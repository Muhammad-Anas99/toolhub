import React from 'react'
import PropTypes from 'prop-types'

const WIDTH = 240
const HEIGHT = 56
const PADDING = 4

/**
 * A small line chart built from plain SVG — no charting library needed
 * for a single-series 7-point sparkline. Renders whatever data it's
 * given; the caller is responsible for making sure that data is real
 * (see analyticsService.getDailyActivity on the backend).
 */
export default function Sparkline({ points, colorClassName = 'stroke-brand-500' }) {
  if (!points || points.length < 2) return null

  const max = Math.max(...points, 1)
  const min = Math.min(...points, 0)
  const range = max - min || 1
  const stepX = (WIDTH - PADDING * 2) / (points.length - 1)

  const coords = points.map((value, index) => {
    const x = PADDING + index * stepX
    const y = HEIGHT - PADDING - ((value - min) / range) * (HEIGHT - PADDING * 2)
    return [x, y]
  })

  const linePath = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
  const areaPath = `${linePath} L${coords[coords.length - 1][0]},${HEIGHT} L${coords[0][0]},${HEIGHT} Z`

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="h-14 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={areaPath} className={colorClassName} fill="currentColor" opacity="0.08" />
      <path d={linePath} className={colorClassName} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {coords.map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r={index === coords.length - 1 ? 2.5 : 0} className={colorClassName} fill="currentColor" />
      ))}
    </svg>
  )
}

Sparkline.propTypes = {
  points: PropTypes.arrayOf(PropTypes.number),
  colorClassName: PropTypes.string,
}
