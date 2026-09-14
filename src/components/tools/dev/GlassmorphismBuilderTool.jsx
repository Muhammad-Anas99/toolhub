import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CopyButton from '../CopyButton.jsx'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function GlassmorphismBuilderTool({ toolSlug, toolName, category }) {
  const [blur, setBlur] = useState(10)
  const [opacity, setOpacity] = useState(20)
  const [borderOpacity, setBorderOpacity] = useState(30)
  const [radius, setRadius] = useState(16)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const css = `background: rgba(255, 255, 255, ${(opacity / 100).toFixed(2)});
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: 1px solid rgba(255, 255, 255, ${(borderOpacity / 100).toFixed(2)});
border-radius: ${radius}px;`

  logDebounced('Glassmorphism CSS generated', css)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Blur: {blur}px</label>
          <input type="range" min="0" max="30" value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="mt-2 w-full" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Background opacity: {opacity}%</label>
          <input type="range" min="0" max="100" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="mt-2 w-full" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Border opacity: {borderOpacity}%</label>
          <input type="range" min="0" max="100" value={borderOpacity} onChange={(e) => setBorderOpacity(Number(e.target.value))} className="mt-2 w-full" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Border radius: {radius}px</label>
          <input type="range" min="0" max="40" value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="mt-2 w-full" />
        </div>
      </div>

      <div
        className="flex h-56 items-center justify-center rounded-2xl bg-cover bg-center p-8"
        style={{ backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f59e0b 100%)' }}
      >
        <div
          className="flex h-32 w-full max-w-xs items-center justify-center text-center text-sm font-medium text-white"
          style={{
            background: `rgba(255, 255, 255, ${opacity / 100})`,
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            border: `1px solid rgba(255, 255, 255, ${borderOpacity / 100})`,
            borderRadius: `${radius}px`,
          }}
        >
          Glass panel preview
        </div>
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">CSS</p>
          <CopyButton value={css} />
        </div>
        <pre className="mt-2 overflow-x-auto font-mono text-sm text-slate-900 dark:text-white">{css}</pre>
      </div>
    </div>
  )
}

GlassmorphismBuilderTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
