import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowPath } from 'react-icons/hi2'
import CopyButton from '../CopyButton.jsx'
import { randomHexColor } from '../../../lib/colorUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function RandomColorGeneratorTool({ toolSlug, toolName, category }) {
  const [colors, setColors] = useState(() => Array.from({ length: 6 }, randomHexColor))
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  function regenerate() {
    const next = Array.from({ length: 6 }, randomHexColor)
    setColors(next)
    logNow('Random colors generated')
  }

  return (
    <div className="space-y-5">
      <button type="button" onClick={regenerate} className="btn-primary">
        <HiOutlineArrowPath className="h-4 w-4" />
        Generate New Colors
      </button>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {colors.map((c, i) => (
          <div key={i} className="space-y-2">
            <div className="h-24 rounded-xl border border-slate-200 dark:border-slate-700" style={{ backgroundColor: c }} />
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-slate-600 dark:text-slate-300">{c}</span>
              <CopyButton value={c} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

RandomColorGeneratorTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
