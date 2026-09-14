import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlinePlay, HiOutlineStop } from 'react-icons/hi2'
import CopyButton from '../CopyButton.jsx'
import { textToMorse, morseToToneSequence } from '../../../lib/miscToolsUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function MorseAudioPlayerTool({ toolSlug, toolName, category }) {
  const [text, setText] = useState('SOS')
  const [playing, setPlaying] = useState(false)
  const audioCtxRef = useRef(null)
  const stopRef = useRef(false)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  const morse = text ? textToMorse(text) : ''

  async function play() {
    if (!morse || playing) return
    setPlaying(true)
    stopRef.current = false
    logNow('Morse code played: ' + text)

    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    audioCtxRef.current = ctx
    const events = morseToToneSequence(morse)

    for (const event of events) {
      if (stopRef.current) break
      if (event.on) {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.frequency.value = 600
        osc.connect(gain)
        gain.connect(ctx.destination)
        gain.gain.value = 0.3
        osc.start()
        await new Promise((resolve) => setTimeout(resolve, event.duration))
        osc.stop()
      } else {
        await new Promise((resolve) => setTimeout(resolve, event.duration))
      }
    }
    ctx.close()
    setPlaying(false)
  }

  function stop() {
    stopRef.current = true
    if (audioCtxRef.current) audioCtxRef.current.close()
    setPlaying(false)
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {morse && (
        <div className="card flex items-center justify-between gap-4 p-4">
          <code className="min-w-0 flex-1 break-all font-mono text-sm text-slate-900 dark:text-white">{morse}</code>
          <CopyButton value={morse} />
        </div>
      )}

      <button type="button" onClick={playing ? stop : play} disabled={!morse} className="btn-primary disabled:opacity-40">
        {playing ? <HiOutlineStop className="h-4 w-4" /> : <HiOutlinePlay className="h-4 w-4" />}
        {playing ? 'Stop' : 'Play Morse Code'}
      </button>
    </div>
  )
}

MorseAudioPlayerTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
