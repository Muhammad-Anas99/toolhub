import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const COLORS = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#38bdf8', '#a78bfa', '#f472b6', '#94a3b8']

function getWinningSegment(finalRotationDeg, numSegments) {
  const segmentSize = 360 / numSegments
  const normalized = ((finalRotationDeg % 360) + 360) % 360
  const effectiveAngle = (360 - normalized) % 360
  return Math.floor(effectiveAngle / segmentSize)
}

export default function ChoiceWheelSpinnerTool({ toolSlug, toolName, category }) {
  const [optionsText, setOptionsText] = useState('Option 1\nOption 2\nOption 3\nOption 4')
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [winner, setWinner] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  const options = optionsText.split('\n').map((o) => o.trim()).filter(Boolean)
  const segmentAngle = options.length > 0 ? 360 / options.length : 0

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
        <textarea value={optionsText} onChange={(e) => setOptionsText(e.target.value)} rows={4} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
      </div>

      <div className="flex flex-col items-center gap-4 py-4">
        <div className="relative h-64 w-64">
          <div
            className="h-full w-full overflow-hidden rounded-full border-4 border-slate-300 shadow-lg transition-transform dark:border-slate-600"
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionDuration: spinning ? '4000ms' : '0ms',
              transitionTimingFunction: 'cubic-bezier(0.2, 0, 0.1, 1)',
              background: options.length
                ? `conic-gradient(${options.map((_, i) => `${COLORS[i % COLORS.length]} ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`).join(', ')})`
                : '#e2e8f0',
            }}
          />
          <div className="absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 -translate-y-1 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-slate-700 dark:border-t-slate-200" />
        </div>
        <button type="button" onClick={spin} disabled={spinning || options.length < 2} className="btn-primary disabled:opacity-40">
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
