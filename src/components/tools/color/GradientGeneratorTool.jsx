import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlinePlus, HiOutlineTrash, HiOutlineSparkles, HiOutlineArrowDownTray } from 'react-icons/hi2'
import CopyButton from '../CopyButton.jsx'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'
import { randomPleasantColor, getGradientCanvasLine, PRESET_GRADIENTS } from '../../../lib/gradientUtils.js'
import { downloadBlob } from '../../../lib/downloadBlob.js'

const QUICK_ANGLES = [
  { value: 90, label: '\u2192' },
  { value: 270, label: '\u2190' },
  { value: 180, label: '\u2193' },
  { value: 0, label: '\u2191' },
  { value: 135, label: '\u2198' },
]

const HEX_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/

/**
 * A free-typing hex input decoupled from the committed stop color, so a
 * partial or invalid in-progress value (typing "#3b" on the way to
 * "#3b6cf6") doesn't snap back or break the live gradient preview -
 * only a syntactically valid, complete hex value gets committed via
 * onCommit. Re-syncs its own draft when the color changes from
 * elsewhere (the native color picker, Random, or a preset), so it
 * never shows a stale value after one of those.
 */
function HexInput({ color, onCommit }) {
  const [draft, setDraft] = useState(color)

  useEffect(() => {
    setDraft(color)
  }, [color])

  function handleChange(event) {
    const value = event.target.value
    setDraft(value)
    if (HEX_PATTERN.test(value)) onCommit(value)
  }

  return (
    <input
      type="text"
      value={draft}
      onChange={handleChange}
      maxLength={9}
      className="w-24 flex-shrink-0 rounded-lg border border-slate-200 bg-white px-2 py-1.5 font-mono text-xs text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      aria-label="Stop color hex value"
    />
  )
}

HexInput.propTypes = {
  color: PropTypes.string.isRequired,
  onCommit: PropTypes.func.isRequired,
}

let nextStopId = 3

export default function GradientGeneratorTool({ toolSlug, toolName, category }) {
  const [type, setType] = useState('linear') // linear | radial
  const [angle, setAngle] = useState(90)
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
    type === 'linear' ? `linear-gradient(${angle}deg, ${stopsCss})` : `radial-gradient(circle, ${stopsCss})`

  // Watches the final computed CSS rather than each individual control
  // (type, angle, per-stop color/position, add/remove stop) — any
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

  function applyRandomGradient() {
    const stopCount = stops.length
    const newStops = stops.map((stop, index) => ({
      ...stop,
      color: randomPleasantColor(),
      position: stopCount === 2 ? index * 100 : Math.round((index / (stopCount - 1)) * 100),
    }))
    setStops(newStops)
    if (type === 'linear') setAngle(Math.floor(Math.random() * 360))
  }

  function applyPreset(preset) {
    setType('linear')
    setAngle(preset.angle)
    setStops(preset.stops.map((stop, index) => ({ id: index + 1, ...stop })))
    nextStopId = preset.stops.length + 1
  }

  function handleDownloadPng() {
    const width = 1200
    const height = 800
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')

    const sortedStops = [...stops].sort((a, b) => a.position - b.position)
    let canvasGradient
    if (type === 'linear') {
      const { x0, y0, x1, y1 } = getGradientCanvasLine(angle, width, height)
      canvasGradient = ctx.createLinearGradient(x0, y0, x1, y1)
    } else {
      const cx = width / 2
      const cy = height / 2
      // Matches CSS radial-gradient's default 'farthest-corner' sizing
      // (the CSS here has no explicit size keyword) - the distance from
      // center to a corner, not simply half of whichever side is
      // longer, which would make the downloaded PNG look more "zoomed
      // in" than the live preview on any non-square canvas.
      const radius = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2)
      canvasGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
    }
    sortedStops.forEach((stop) => canvasGradient.addColorStop(stop.position / 100, stop.color))

    ctx.fillStyle = canvasGradient
    ctx.fillRect(0, 0, width, height)

    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, 'gradient.png')
    }, 'image/png')
  }

  return (
    <div className="space-y-6">
      <div
        className="h-48 w-full rounded-2xl border border-slate-200 dark:border-slate-800"
        style={{ background: gradientCss }}
        aria-hidden="true"
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={applyRandomGradient}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          <HiOutlineSparkles className="h-4 w-4" />
          Random
        </button>
        <div className="flex flex-wrap gap-2">
          {PRESET_GRADIENTS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(preset)}
              title={preset.name}
              aria-label={`Apply ${preset.name} preset`}
              className="h-8 w-8 flex-shrink-0 rounded-full border border-slate-200 transition-transform hover:scale-110 dark:border-slate-700"
              style={{
                background: `linear-gradient(${preset.angle}deg, ${preset.stops.map((s) => s.color).join(', ')})`,
              }}
            />
          ))}
        </div>
      </div>

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
            <div className="flex flex-1 flex-wrap items-center gap-3">
              <div className="flex gap-1">
                {QUICK_ANGLES.map((quick) => (
                  <button
                    key={quick.value}
                    type="button"
                    onClick={() => setAngle(quick.value)}
                    aria-label={`Set angle to ${quick.value} degrees`}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-base transition-colors ${
                      angle === quick.value
                        ? 'bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-400'
                        : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {quick.label}
                  </button>
                ))}
              </div>
              <input
                type="range"
                min={0}
                max={359}
                value={angle}
                onChange={(event) => setAngle(Number(event.target.value))}
                aria-label="Gradient angle"
                className="h-2 min-w-[8rem] flex-1 cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
              />
              <span className="w-12 flex-shrink-0 text-right font-mono text-xs text-slate-500 dark:text-slate-400">
                {angle}{'\u00b0'}
              </span>
            </div>
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
              <HexInput color={stop.color} onCommit={(value) => updateStop(stop.id, { color: value })} />
              <input
                type="range"
                min={0}
                max={100}
                value={stop.position}
                onChange={(event) => updateStop(stop.id, { position: Number(event.target.value) })}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
                aria-label="Stop position"
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
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadPng}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <HiOutlineArrowDownTray className="h-3.5 w-3.5" />
              Download PNG
            </button>
            <CopyButton value={`background: ${gradientCss};`} />
          </div>
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
