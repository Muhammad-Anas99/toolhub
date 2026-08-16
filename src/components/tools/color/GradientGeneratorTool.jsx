import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2'
import CopyButton from '../CopyButton.jsx'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const DIRECTIONS = [
  { value: 'to right', label: '\u2192 Right' },
  { value: 'to left', label: '\u2190 Left' },
  { value: 'to bottom', label: '\u2193 Down' },
  { value: 'to top', label: '\u2191 Up' },
  { value: 'to bottom right', label: '\u2198 Diagonal' },
  { value: '135deg', label: '135\u00b0' },
]

let nextStopId = 3

export default function GradientGeneratorTool({ toolSlug, toolName, category }) {
  const [type, setType] = useState('linear') // linear | radial
  const [direction, setDirection] = useState('to right')
  const [stops, setStops] = useState([
    { id: 1, color: '#3b6cf6', position: 0 },
    { id: 2, color: '#8b5cf6', position: 100 },
  ])
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const stopsCss = [...stops]
    .sort((a, b) => a.position - b.position)
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(', ')

  const gradientCss =
    type === 'linear' ? `linear-gradient(${direction}, ${stopsCss})` : `radial-gradient(circle, ${stopsCss})`

  // Watches the final computed CSS rather than each individual control
  // (type, direction, per-stop color/position, add/remove stop) — any
  // change to any of those ends up changing this one string, so this
  // covers every mutation path with a single debounced log call instead
  // of wiring logging into half a dozen separate handlers.
  useEffect(() => {
    logDebounced('Gradient generated', gradientCss)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradientCss])

  function updateStop(id, changes) {
    setStops((prev) => prev.map((stop) => (stop.id === id ? { ...stop, ...changes } : stop)))
  }

  function addStop() {
    if (stops.length >= 5) return
    setStops((prev) => [...prev, { id: nextStopId++, color: '#ffffff', position: 50 }])
  }

  function removeStop(id) {
    if (stops.length <= 2) return
    setStops((prev) => prev.filter((stop) => stop.id !== id))
  }

  return (
    <div className="space-y-6">
      <div
        className="h-48 w-full rounded-2xl border border-slate-200 dark:border-slate-800"
        style={{ background: gradientCss }}
        aria-hidden="true"
      />

      <div className="card space-y-5 p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            {['linear', 'radial'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setType(option)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium capitalize transition-colors ${
                  type === option
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {type === 'linear' && (
            <select
              value={direction}
              onChange={(event) => setDirection(event.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {DIRECTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="space-y-3">
          {stops.map((stop) => (
            <div key={stop.id} className="flex items-center gap-3">
              <input
                type="color"
                value={stop.color}
                onChange={(event) => updateStop(stop.id, { color: event.target.value })}
                className="h-10 w-12 flex-shrink-0 cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700"
                aria-label="Stop color"
              />
              <input
                type="range"
                min={0}
                max={100}
                value={stop.position}
                onChange={(event) => updateStop(stop.id, { position: Number(event.target.value) })}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
              />
              <span className="w-10 flex-shrink-0 text-right text-xs text-slate-400 dark:text-slate-500">
                {stop.position}%
              </span>
              <button
                type="button"
                onClick={() => removeStop(stop.id)}
                disabled={stops.length <= 2}
                aria-label="Remove color stop"
                className="flex-shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rose-600 disabled:opacity-30 dark:hover:bg-slate-800 dark:hover:text-rose-400"
              >
                <HiOutlineTrash className="h-4 w-4" />
              </button>
            </div>
          ))}
          {stops.length < 5 && (
            <button
              type="button"
              onClick={addStop}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400"
            >
              <HiOutlinePlus className="h-4 w-4" />
              Add color stop
            </button>
          )}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">CSS</p>
          <CopyButton value={`background: ${gradientCss};`} />
        </div>
        <pre className="whitespace-pre-wrap break-all p-4 font-mono text-sm text-slate-900 dark:text-white">
          background: {gradientCss};
        </pre>
      </div>
    </div>
  )
}

GradientGeneratorTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
