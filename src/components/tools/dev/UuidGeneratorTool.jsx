import React, { useState } from 'react'
import { HiOutlineArrowPath } from 'react-icons/hi2'
import { generateUuid } from '../../../lib/devToolsUtils.js'
import CopyButton from '../CopyButton.jsx'

const QUANTITIES = [1, 5, 10, 25, 50]

export default function UuidGeneratorTool() {
  const [quantity, setQuantity] = useState(5)
  const [uuids, setUuids] = useState(() => Array.from({ length: 5 }, generateUuid))

  function handleGenerate() {
    setUuids(Array.from({ length: quantity }, generateUuid))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="uuid-quantity" className="text-sm text-slate-600 dark:text-slate-400">
            How many?
          </label>
          <select
            id="uuid-quantity"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {QUANTITIES.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <CopyButton value={uuids.join('\n')} label="Copy all" />
          <button type="button" onClick={handleGenerate} className="btn-primary text-sm">
            <HiOutlineArrowPath className="h-4 w-4" />
            Generate
          </button>
        </div>
      </div>

      <div className="card divide-y divide-slate-100 dark:divide-slate-800">
        {uuids.map((uuid) => (
          <div key={uuid} className="flex items-center justify-between gap-4 px-5 py-3">
            <span className="font-mono text-sm text-slate-900 dark:text-white">{uuid}</span>
            <CopyButton value={uuid} />
          </div>
        ))}
      </div>
    </div>
  )
}
