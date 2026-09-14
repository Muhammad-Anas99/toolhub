import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowPath } from 'react-icons/hi2'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const PRESETS = ['Loading...', 'Installing Updates...', 'Preparing Your Surprise...', 'Calculating Awesomeness...', 'Almost There...']

export default function FakeLoadingScreenTool({ toolSlug, toolName, category }) {
  const [message, setMessage] = useState(PRESETS[0])
  const [speed, setSpeed] = useState(2)
  const [progress, setProgress] = useState(0)
  const [running, setRunning] = useState(false)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  useEffect(() => {
    if (!running) return
    if (progress >= 100) {
      setRunning(false)
      return
    }
    const timer = setTimeout(() => setProgress((p) => Math.min(100, p + 1)), 1000 / (speed * 10))
    return () => clearTimeout(timer)
  }, [running, progress, speed])

  function start() {
    setProgress(0)
    setRunning(true)
    logNow('Fake loading screen started')
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} list="loading-presets" className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          <datalist id="loading-presets">
            {PRESETS.map((p) => <option key={p} value={p} />)}
          </datalist>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Speed</label>
          <input type="range" min="0.5" max="5" step="0.5" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="mt-3 w-full" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-2xl bg-slate-900 p-10 text-center">
        <p className="text-lg font-medium text-white">{message}</p>
        <div className="h-3 w-full max-w-sm overflow-hidden rounded-full bg-slate-700">
          <div className="h-full rounded-full bg-brand-500 transition-all duration-150" style={{ width: `${progress}%` }} />
        </div>
        <p className="font-mono text-sm text-slate-400">{progress}%</p>
      </div>

      <button type="button" onClick={start} disabled={running} className="btn-primary disabled:opacity-40">
        <HiOutlineArrowPath className="h-4 w-4" />
        {running ? 'Loading...' : 'Start'}
      </button>
    </div>
  )
}

FakeLoadingScreenTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
