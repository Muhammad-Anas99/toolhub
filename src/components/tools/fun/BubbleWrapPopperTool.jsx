import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowPath } from 'react-icons/hi2'
import { getAudioContext } from '../../../lib/audioSynthUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const ROWS = 8
const COLS = 8

function createGrid() {
  return Array.from({ length: ROWS * COLS }, () => false)
}

export default function BubbleWrapPopperTool({ toolSlug, toolName, category }) {
  const [popped, setPopped] = useState(createGrid)
  const ctxRef = useRef(null)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  function playPop() {
    if (!ctxRef.current) ctxRef.current = getAudioContext()
    const ctx = ctxRef.current
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(300, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08)
    osc.connect(gain)
    gain.connect(ctx.destination)
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
    osc.start()
    osc.stop(ctx.currentTime + 0.1)
  }

  function pop(index) {
    if (popped[index]) return
    setPopped((prev) => {
      const next = [...prev]
      next[index] = true
      return next
    })
    playPop()
    logDebounced('Bubble wrap popped', String(index))
  }

  function reset() {
    setPopped(createGrid())
  }

  const poppedCount = popped.filter(Boolean).length

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">{poppedCount} / {ROWS * COLS} popped</p>
        <button type="button" onClick={reset} className="btn-secondary text-sm">
          <HiOutlineArrowPath className="h-4 w-4" />
          Reset Sheet
        </button>
      </div>
      <div className="mx-auto grid max-w-md gap-2" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
        {popped.map((isPopped, i) => (
          <button
            key={i}
            type="button"
            onClick={() => pop(i)}
            className={`aspect-square rounded-full transition-all duration-150 ${
              isPopped
                ? 'scale-75 bg-slate-200 shadow-inner dark:bg-slate-800'
                : 'scale-100 bg-gradient-to-br from-sky-200 to-sky-300 shadow-md active:scale-90 dark:from-sky-800 dark:to-sky-900'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

BubbleWrapPopperTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
