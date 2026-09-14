import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const COLORS = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#38bdf8', '#a78bfa', '#f472b6', '#94a3b8']
const CENTER = 150
const RADIUS = 140
const TEXT_RADIUS = 95

function getWinningSegment(finalRotationDeg, numSegments) {
  const segmentSize = 360 / numSegments
  const normalized = ((finalRotationDeg % 360) + 360) % 360
  const effectiveAngle = (360 - normalized) % 360
  return Math.floor(effectiveAngle / segmentSize)
}

/**
 * Angle 0 = straight up (12 o'clock), increasing clockwise - matches
 * getWinningSegment's assumption that the pointer sits at the top and
 * segment 0 starts there. Verified by rendering real test wheels
 * before being used here (3, 6, and 8 segments, visually confirmed)
 * rather than trusted on paper alone.
 */
function pointOnCircle(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) }
}

function describeSlicePath(cx, cy, r, startAngle, endAngle) {
  const start = pointOnCircle(cx, cy, r, startAngle)
  const end = pointOnCircle(cx, cy, r, endAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${cx},${cy} L ${start.x.toFixed(2)},${start.y.toFixed(2)} A ${r},${r} 0 ${largeArc},1 ${end.x.toFixed(2)},${end.y.toFixed(2)} Z`
}

/**
 * Truncates a label so it doesn't overrun its slice - long option text
 * would otherwise collide with the neighboring segment's label,
 * especially with many segments where each slice is narrow.
 */
function truncateLabel(text, maxChars) {
  if (text.length <= maxChars) return text
  return text.slice(0, maxChars - 1).trimEnd() + '\u2026'
}

export default function ChoiceWheelSpinnerTool({ toolSlug, toolName, category }) {
  const [optionsText, setOptionsText] = useState('Option 1\nOption 2\nOption 3\nOption 4')
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [winner, setWinner] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  const options = optionsText.split('\n').map((o) => o.trim()).filter(Boolean)
  const segmentAngle = options.length > 0 ? 360 / options.length : 0
  const maxLabelChars = options.length <= 4 ? 16 : options.length <= 6 ? 12 : 9

  function spin() {
    if (options.length < 2) return
    setSpinning(true)
    setWinner(null)
    const extraSpins = 5 * 360
    const randomOffset = Math.random() * 360
    const newRotation = rotation + extraSpins + randomOffset
    setRotation(newRotation)
    setTimeout(() => {
      const winningIndex = getWinningSegment(newRotation, options.length)
      const result = options[winningIndex]
      setWinner(result)
      setSpinning(false)
      logNow('Wheel spun: ' + result)
    }, 4000)
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Options (one per line)</label>
        <textarea
          value={optionsText}
          onChange={(e) => setOptionsText(e.target.value)}
          rows={4}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <div className="flex flex-col items-center gap-4 py-4">
        <div className="relative h-64 w-64">
          <svg
            viewBox="0 0 300 300"
            className="h-full w-full drop-shadow-lg"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 4000ms cubic-bezier(0.2, 0, 0.1, 1)' : 'none',
            }}
          >
            <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="#e2e8f0" />
            {options.map((option, i) => {
              const start = i * segmentAngle
              const end = (i + 1) * segmentAngle
              const midAngle = start + segmentAngle / 2
              const textPos = pointOnCircle(CENTER, CENTER, TEXT_RADIUS, midAngle)
              let textRotation = midAngle
              if (midAngle > 90 && midAngle < 270) textRotation += 180
              return (
                <g key={i}>
                  <path
                    d={describeSlicePath(CENTER, CENTER, RADIUS, start, end)}
                    fill={COLORS[i % COLORS.length]}
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x={textPos.x}
                    y={textPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textRotation.toFixed(1)} ${textPos.x.toFixed(2)} ${textPos.y.toFixed(2)})`}
                    fontSize={options.length > 6 ? '11' : '14'}
                    fontWeight="600"
                    fill="#1e293b"
                  >
                    {truncateLabel(option, maxLabelChars)}
                  </text>
                </g>
              )
            })}
            <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#cbd5e1" strokeWidth="4" />
          </svg>
          <div className="absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 -translate-y-1 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-slate-700 dark:border-t-slate-200" />
        </div>
        <button
          type="button"
          onClick={spin}
          disabled={spinning || options.length < 2}
          className="btn-primary disabled:opacity-40"
        >
          {spinning ? 'Spinning...' : 'Spin the Wheel'}
        </button>
      </div>

      {winner && (
        <div className="flex items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 py-6 dark:border-emerald-900 dark:bg-emerald-950">
          <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{winner}</p>
        </div>
      )}
    </div>
  )
}

ChoiceWheelSpinnerTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
