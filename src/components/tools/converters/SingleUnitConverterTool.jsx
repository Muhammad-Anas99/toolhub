import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowsRightLeft } from 'react-icons/hi2'
import { UNIT_CATEGORIES, convert } from '../../../lib/unitConversionUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function SingleUnitConverterTool({ categoryId, defaultFrom, defaultTo, toolSlug, toolName, category }) {
  const [fromUnit, setFromUnit] = useState(defaultFrom)
  const [toUnit, setToUnit] = useState(defaultTo)
  const [inputValue, setInputValue] = useState('1')
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const activeCategory = UNIT_CATEGORIES[categoryId]

  const result = useMemo(() => {
    const numericValue = parseFloat(inputValue)
    if (isNaN(numericValue)) return null
    const converted = convert(categoryId, numericValue, fromUnit, toUnit)
    logDebounced('Unit converted')
    return converted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, fromUnit, toUnit])

  function handleSwap() {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <div>
          <label htmlFor="unit-from" className="text-xs text-slate-500 dark:text-slate-400">
            From
          </label>
          <select
            id="unit-from"
            value={fromUnit}
            onChange={(event) => setFromUnit(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {Object.entries(activeCategory.units).map(([id, unit]) => (
              <option key={id} value={id}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleSwap}
          aria-label="Swap units"
          className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <HiOutlineArrowsRightLeft className="h-4 w-4" />
        </button>

        <div>
          <label htmlFor="unit-to" className="text-xs text-slate-500 dark:text-slate-400">
            To
          </label>
          <select
            id="unit-to"
            value={toUnit}
            onChange={(event) => setToUnit(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {Object.entries(activeCategory.units).map(([id, unit]) => (
              <option key={id} value={id}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="unit-input" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Value
        </label>
        <input
          id="unit-input"
          type="number"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {result != null && (
        <div className="rounded-xl bg-brand-50 px-5 py-4 dark:bg-brand-950">
          <p className="text-2xl font-semibold text-brand-700 dark:text-brand-300">
            {Number(result.toPrecision(10)).toString()} {activeCategory.units[toUnit].label}
          </p>
        </div>
      )}
    </div>
  )
}

SingleUnitConverterTool.propTypes = {
  categoryId: PropTypes.string.isRequired,
  defaultFrom: PropTypes.string.isRequired,
  defaultTo: PropTypes.string.isRequired,
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
