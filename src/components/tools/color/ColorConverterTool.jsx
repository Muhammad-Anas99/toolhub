import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, formatRgb, formatHsl, parseColorInput } from '../../../lib/colorUtils.js'
import CopyButton from '../CopyButton.jsx'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const DEFAULT_COLOR = '#3b6cf6'

/**
 * A single color, entered in any format (hex, rgb(), hsl(), or the
 * native color picker), converted to and displayed in every other
 * format at once. This genuinely is what "HEX to RGB", "RGB to HEX",
 * "HEX to HSL" and "Color Converter" all reduce to — one real converter,
 * reused across four routes with different names/descriptions, the same
 * pattern already used for image format conversion.
 */
export default function ColorConverterTool({ toolSlug, toolName, category }) {
  const [inputValue, setInputValue] = useState(DEFAULT_COLOR)
  const [error, setError] = useState(null)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const rgb = parseColorInput(inputValue) || hexToRgb(DEFAULT_COLOR)
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  function handleTextChange(value) {
    setInputValue(value)
    if (value.trim() === '') {
      setError(null)
      return
    }
    const isValid = Boolean(parseColorInput(value))
    setError(isValid ? null : 'Enter a color as hex (#3b6cf6), rgb(59, 108, 246), or hsl(225, 90%, 60%).')
    if (isValid) logDebounced('Color converted', value)
  }

  function handlePickerChange(value) {
    setInputValue(value)
    setError(null)
    logDebounced('Color converted', value)
  }

  const formats = [
    { label: 'HEX', value: hex },
    { label: 'RGB', value: formatRgb(rgb) },
    { label: 'HSL', value: formatHsl(hsl) },
  ]

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <label htmlFor="color-input" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Enter a color
        </label>
        <div className="mt-2 flex items-center gap-3">
          <input
            type="color"
            value={hex}
            onChange={(event) => handlePickerChange(event.target.value)}
            className="h-11 w-14 flex-shrink-0 cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700"
            aria-label="Pick a color"
          />
          <input
            id="color-input"
            type="text"
            value={inputValue}
            onChange={(event) => handleTextChange(event.target.value)}
            placeholder="#3b6cf6, rgb(59, 108, 246), or hsl(225, 90%, 60%)"
            className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
        {error && <p className="mt-2 text-xs text-rose-500">{error}</p>}
      </div>

      <div className="card overflow-hidden">
        <div className="h-28 w-full" style={{ backgroundColor: hex }} aria-hidden="true" />
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {formats.map((format) => (
            <div key={format.label} className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  {format.label}
                </p>
                <p className="mt-0.5 font-mono text-sm text-slate-900 dark:text-white">{format.value}</p>
              </div>
              <CopyButton value={format.value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

ColorConverterTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
