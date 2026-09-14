import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { SOUNDBOARD_SOUNDS, getAudioContext } from '../../../lib/audioSynthUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function SoundboardTool({ toolSlug, toolName, category }) {
  const ctxRef = useRef(null)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  function ensureContext() {
    if (!ctxRef.current) ctxRef.current = getAudioContext()
    return ctxRef.current
  }

  function play(sound) {
    const ctx = ensureContext()
    sound.play(ctx)
    logDebounced('Soundboard played', sound.id)
  }

  useEffect(() => {
    function handleKey(e) {
      const sound = SOUNDBOARD_SOUNDS.find((s) => s.key === e.key)
      if (sound) play(sound)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-500 dark:text-slate-400">Click a button, or use keys 1\u20136.</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {SOUNDBOARD_SOUNDS.map((sound) => (
          <button
            key={sound.id}
            type="button"
            onClick={() => play(sound)}
            className="flex aspect-video flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-brand-500 to-fuchsia-500 text-white shadow-lg transition-transform active:scale-95"
          >
            <span className="text-base font-bold">{sound.label}</span>
            <span className="rounded-md bg-white/20 px-2 py-0.5 text-xs font-mono">{sound.key}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

SoundboardTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
