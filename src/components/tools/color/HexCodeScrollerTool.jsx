import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowPath } from 'react-icons/hi2'
import CopyButton from '../CopyButton.jsx'
import { randomHexColor } from '../../../lib/colorUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

function generateColors(count) {
  return Array.from({ length: count }, randomHexColor)
}

export default function HexCodeScrollerTool({ toolSlug, toolName, category }) {
  const [colors, setColors] = useState(() => generateColors(30))
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  function loadMore() {
    setColors((prev) => [...prev, ...generateColors(20)])
    logNow('Loaded more hex colors')
  }

  return (
    <div className="space-y-4">
      <div className="max-h-[28rem] space-y-1.5 overflow-y-auto rounded-2xl border border-slate-200 p-2 dark:border-slate-800">
        {colors.map((c, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-900/40">
            <div className="h-8 w-8 flex-shrink-0 rounded-md border border-slate-200 dark:border-slate-700" style={{ backgroundColor: c }} />
            <span className="flex-1 font-mono text-sm text-slate-700 dark:text-slate-300">{c}</span>
            <CopyButton value={c} />
          </div>
        ))}
      </div>
      <button type="button" onClick={loadMore} className="btn-secondary w-full justify-center">
        <HiOutlineArrowPath className="h-4 w-4" />
        Load More Colors
      </button>
    </div>
  )
}

HexCodeScrollerTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
