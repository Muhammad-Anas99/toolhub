import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowPath } from 'react-icons/hi2'
import CopyButton from '../CopyButton.jsx'
import { generateFantasyText } from '../../../lib/miscToolsUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function LoremIpsumFantasyTool({ toolSlug, toolName, category }) {
  const [paragraphs, setParagraphs] = useState(3)
  const [text, setText] = useState(() => generateFantasyText(3))
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  function regenerate() {
    setText(generateFantasyText(paragraphs))
    logNow('Fantasy placeholder text generated')
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Paragraphs</label>
        <select value={paragraphs} onChange={(e) => setParagraphs(Number(e.target.value))} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white">
          {[1, 2, 3, 5, 8].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
        <button type="button" onClick={regenerate} className="btn-primary text-sm">
          <HiOutlineArrowPath className="h-4 w-4" />
          Generate
        </button>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Result</label>
          <CopyButton value={text} />
        </div>
        <textarea value={text} readOnly rows={12} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900/40 dark:text-white" />
      </div>
    </div>
  )
}

LoremIpsumFantasyTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
