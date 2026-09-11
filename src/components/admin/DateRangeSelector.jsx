import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineCalendarDays, HiChevronDown } from 'react-icons/hi2'

const RANGE_OPTIONS = [
  { value: 'today', label: 'Today' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '1y', label: 'Last year' },
  { value: 'lifetime', label: 'Lifetime' },
]

export default function DateRangeSelector({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const activeLabel = RANGE_OPTIONS.find((option) => option.value === value)?.label || 'Last 30 days'

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select date range"
        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <HiOutlineCalendarDays className="h-4 w-4 text-slate-400 dark:text-slate-500" />
        {activeLabel}
        <HiChevronDown className={`h-4 w-4 text-slate-400 transition-transform dark:text-slate-500 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-30 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          {RANGE_OPTIONS.map((option) => (
            <li key={option.value} role="option" aria-selected={value === option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`flex w-full items-center px-3.5 py-2 text-left text-sm transition-colors ${
                  value === option.value
                    ? 'bg-brand-50 font-medium text-brand-600 dark:bg-brand-950 dark:text-brand-400'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

DateRangeSelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
