import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowPath } from 'react-icons/hi2'
import { generateLoremIpsum, LOREM_UNITS } from '../../../lib/textToolsUtils.js'
import CopyButton from '../CopyButton.jsx'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function LoremIpsumTool({ toolSlug, toolName, category }) {
  const [unit, setUnit] = useState('paragraphs')
  const [count, setCount] = useState(3)
  const [output, setOutput] = useState(() => generateLoremIpsum({ unit: 'paragraphs', count: 3 }))
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  function handleGenerate() {
    setOutput(generateLoremIpsum({ unit, count }))
    logNow(`Lorem ipsum generated (${count} ${unit})`)
  }

  return (
    <div className="space-y-5">
      <div className="card flex flex-wrap items-end gap-4 p-5">
        <div>
          <label htmlFor="lorem-count" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            How many?
          </label>
          <input
            id="lorem-count"
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(event) => setCount(Math.max(1, Math.min(50, Number(event.target.value) || 1)))}
            className="mt-1.5 w-20 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="flex gap-2">
          {LOREM_UNITS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setUnit(option.id)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                unit === option.id
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <button type="button" onClick={handleGenerate} className="btn-primary">
          <HiOutlineArrowPath className="h-4 w-4" />
          Generate
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Result</p>
          <CopyButton value={output} />
        </div>
        <div className="max-h-96 overflow-auto whitespace-pre-line p-4 text-sm leading-relaxed text-slate-900 dark:text-white">
          {output}
        </div>
      </div>
    </div>
  )
}

LoremIpsumTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
