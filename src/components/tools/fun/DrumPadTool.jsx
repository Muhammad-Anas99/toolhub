import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { DRUM_SOUNDS, getAudioContext } from '../../../lib/audioSynthUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function DrumPadTool({ toolSlug, toolName, category }) {
  const ctxRef = useRef(null)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  function ensureContext() {
    if (!ctxRef.current) ctxRef.current = getAudioContext()
    return ctxRef.current
  }

  function hit(sound) {
    const ctx = ensureContext()
    sound.play(ctx)
    logDebounced('Drum pad played', sound.id)
  }

  useEffect(() => {
    function handleKey(e) {
      const sound = DRUM_SOUNDS.find((s) => s.key.toLowerCase() === e.key.toLowerCase())
      if (sound) hit(sound)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-500 dark:text-slate-400">Click a pad, or use your keyboard: A, S, D, F.</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {DRUM_SOUNDS.map((sound) => (
          <button
            key={sound.id}
            type="button"
            onClick={() => hit(sound)}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl bg-brand-600 text-white shadow-lg transition-transform active:scale-95"
          >
            <span className="text-lg font-bold">{sound.label}</span>
            <span className="rounded-md bg-white/20 px-2 py-0.5 text-xs font-mono">{sound.key}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

DrumPadTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
