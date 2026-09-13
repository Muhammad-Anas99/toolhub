import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { contrastRatio, getWcagLevel } from '../../../lib/colorUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function ColorContrastCheckerTool({ toolSlug, toolName, category }) {
  const [fg, setFg] = useState('#000000')
  const [bg, setBg] = useState('#ffffff')
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const validHex = (h) => /^#[0-9a-fA-F]{6}$/.test(h)
  const valid = validHex(fg) && validHex(bg)
  const ratio = valid ? contrastRatio(fg, bg) : null
  if (valid) logDebounced('Contrast checked', `${ratio}`)

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Text color</label>
          <div className="mt-1.5 flex items-center gap-2">
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-10 w-12 rounded-lg border border-slate-200 dark:border-slate-700" />
            <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Background color</label>
          <div className="mt-1.5 flex items-center gap-2">
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-10 w-12 rounded-lg border border-slate-200 dark:border-slate-700" />
            <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </div>
        </div>
      </div>

      {valid && (
        <>
          <div className="flex items-center justify-center rounded-2xl border border-slate-200 p-8 dark:border-slate-800" style={{ backgroundColor: bg, color: fg }}>
            <p className="text-2xl font-semibold">Sample Text</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="card p-4 text-center"><p className="text-2xl font-semibold text-slate-900 dark:text-white">{ratio.toFixed(2)}:1</p><p className="text-xs text-slate-400 dark:text-slate-500">Contrast ratio</p></div>
            <div className="card p-4 text-center"><p className={`text-2xl font-semibold ${getWcagLevel(ratio) === 'Fail' ? 'text-rose-600' : 'text-emerald-600'}`}>{getWcagLevel(ratio)}</p><p className="text-xs text-slate-400 dark:text-slate-500">Normal text</p></div>
            <div className="card p-4 text-center"><p className={`text-2xl font-semibold ${getWcagLevel(ratio, true) === 'Fail' ? 'text-rose-600' : 'text-emerald-600'}`}>{getWcagLevel(ratio, true)}</p><p className="text-xs text-slate-400 dark:text-slate-500">Large text</p></div>
          </div>
        </>
      )}
    </div>
  )
}

ColorContrastCheckerTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
