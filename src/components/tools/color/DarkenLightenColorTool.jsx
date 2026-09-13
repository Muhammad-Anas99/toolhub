import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CopyButton from '../CopyButton.jsx'
import { darkenColor, lightenColor } from '../../../lib/colorUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function DarkenLightenColorTool({ toolSlug, toolName, category }) {
  const [color, setColor] = useState('#3b82f6')
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })
  const valid = /^#[0-9a-fA-F]{6}$/.test(color)
  const steps = [10, 20, 30, 40, 50]

  if (valid) logDebounced('Color shades generated', color)

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <input type="color" value={valid ? color : '#3b82f6'} onChange={(e) => setColor(e.target.value)} className="h-10 w-12 rounded-lg border border-slate-200 dark:border-slate-700" />
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
      </div>

      {valid && (
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Lighter shades</p>
            <div className="flex gap-2">
              {steps.map((p) => {
                const shade = lightenColor(color, p)
                return (
                  <div key={'l' + p} className="flex-1 space-y-1 text-center">
                    <div className="h-16 rounded-lg border border-slate-200 dark:border-slate-700" style={{ backgroundColor: shade }} />
                    <CopyButton value={shade} label={shade} className="text-xs" />
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Darker shades</p>
            <div className="flex gap-2">
              {steps.map((p) => {
                const shade = darkenColor(color, p)
                return (
                  <div key={'d' + p} className="flex-1 space-y-1 text-center">
                    <div className="h-16 rounded-lg border border-slate-200 dark:border-slate-700" style={{ backgroundColor: shade }} />
                    <CopyButton value={shade} label={shade} className="text-xs" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

DarkenLightenColorTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
