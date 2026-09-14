import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { morseToText } from '../../../lib/miscToolsUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const DOT_THRESHOLD_MS = 250
const LETTER_GAP_MS = 600

export default function MorseTapTransmitterTool({ toolSlug, toolName, category }) {
  const [morse, setMorse] = useState('')
  const [pressing, setPressing] = useState(false)
  const pressStartRef = useRef(null)
  const gapTimerRef = useRef(null)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  function handlePressStart() {
    setPressing(true)
    pressStartRef.current = Date.now()
    if (gapTimerRef.current) clearTimeout(gapTimerRef.current)
  }

  function handlePressEnd() {
    if (!pressStartRef.current) return
    setPressing(false)
    const duration = Date.now() - pressStartRef.current
    const symbol = duration < DOT_THRESHOLD_MS ? '.' : '-'
    setMorse((prev) => prev + symbol)
    pressStartRef.current = null

    gapTimerRef.current = setTimeout(() => {
      setMorse((prev) => {
        if (!prev || prev.endsWith(' ')) return prev
        return prev + ' '
      })
    }, LETTER_GAP_MS)
  }

  function reset() {
    setMorse('')
    if (gapTimerRef.current) clearTimeout(gapTimerRef.current)
  }

  const decoded = morse.trim() ? morseToText(morse) : ''
  if (decoded) logDebounced('Morse tapped out', decoded)

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Tap quickly for a dot, hold briefly for a dash. Pause to separate letters.
      </p>

      <button
        type="button"
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={() => pressing && handlePressEnd()}
        onTouchStart={(e) => { e.preventDefault(); handlePressStart() }}
        onTouchEnd={(e) => { e.preventDefault(); handlePressEnd() }}
        className={`mx-auto flex h-32 w-32 select-none items-center justify-center rounded-full text-sm font-semibold text-white transition-colors ${pressing ? 'bg-brand-700' : 'bg-brand-600'}`}
      >
        TAP
      </button>

      <div className="card p-4 text-center">
        <p className="font-mono text-lg text-slate-900 dark:text-white">{morse || '\u00a0'}</p>
        {decoded && <p className="mt-2 text-2xl font-bold text-brand-600 dark:text-brand-400">{decoded}</p>}
      </div>

      <button type="button" onClick={reset} className="btn-secondary">
        Clear
      </button>
    </div>
  )
}

MorseTapTransmitterTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
