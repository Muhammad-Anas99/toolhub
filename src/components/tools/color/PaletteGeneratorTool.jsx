import React, { useState } from 'react'
import { generatePalette, isValidHex, normalizeHex, PALETTE_SCHEMES } from '../../../lib/colorUtils.js'
import CopyButton from '../CopyButton.jsx'

const DEFAULT_COLOR = '#3b6cf6'

export default function PaletteGeneratorTool() {
  const [baseColor, setBaseColor] = useState(DEFAULT_COLOR)
  const [scheme, setScheme] = useState('analogous')

  const effectiveColor = isValidHex(baseColor) ? normalizeHex(baseColor) : DEFAULT_COLOR
  const palette = generatePalette(effectiveColor, scheme)

  return (
    <div className="space-y-6">
      <div className="card flex flex-wrap items-center gap-4 p-6">
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={effectiveColor}
            onChange={(event) => setBaseColor(event.target.value)}
            className="h-11 w-14 flex-shrink-0 cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700"
            aria-label="Base color"
          />
          <input
            type="text"
            value={baseColor}
            onChange={(event) => setBaseColor(event.target.value)}
            placeholder="#3b6cf6"
            className="w-32 rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-mono text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {PALETTE_SCHEMES.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setScheme(option.id)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                scheme === option.id
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${scheme === 'shades' ? 'lg:grid-cols-6' : ''}`}>
        {palette.map((hex, index) => (
          <div key={`${hex}-${index}`} className="card overflow-hidden">
            <div className="h-24 w-full" style={{ backgroundColor: hex }} aria-hidden="true" />
            <div className="flex items-center justify-between gap-2 p-3">
              <span className="font-mono text-xs text-slate-700 dark:text-slate-300">{hex}</span>
              <CopyButton value={hex} label="" className="px-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
