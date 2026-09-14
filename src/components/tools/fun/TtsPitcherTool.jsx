import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlinePlay, HiOutlineStop } from 'react-icons/hi2'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function TtsPitcherTool({ toolSlug, toolName, category }) {
  const [text, setText] = useState('Hello, this is a pitched voice test.')
  const [pitch, setPitch] = useState(1)
  const [rate, setRate] = useState(1)
  const [speaking, setSpeaking] = useState(false)
  const [supported, setSupported] = useState(true)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  useEffect(() => {
    if (!('speechSynthesis' in window)) setSupported(false)
  }, [])

  function speak() {
    if (!text.trim()) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.pitch = pitch
    utterance.rate = rate
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
    setSpeaking(true)
    logNow('Text spoken with pitch ' + pitch)
  }

  function stop() {
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }

  if (!supported) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
        Your browser doesn&apos;t support the Web Speech API this tool relies on.
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Text to speak</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Pitch: {pitch.toFixed(1)}</label>
          <input type="range" min="0" max="2" step="0.1" value={pitch} onChange={(e) => setPitch(Number(e.target.value))} className="mt-2 w-full" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Rate: {rate.toFixed(1)}</label>
          <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-2 w-full" />
        </div>
      </div>

      <button type="button" onClick={speaking ? stop : speak} disabled={!text.trim()} className="btn-primary disabled:opacity-40">
        {speaking ? <HiOutlineStop className="h-4 w-4" /> : <HiOutlinePlay className="h-4 w-4" />}
        {speaking ? 'Stop' : 'Speak'}
      </button>
    </div>
  )
}

TtsPitcherTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
