import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineMagnifyingGlass, HiXMark } from 'react-icons/hi2'
import { tools } from '../../data/tools.js'

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const dialogRef = useRef(null)
  const previouslyFocusedRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedRef.current = document.activeElement
      setQuery('')
      // Focus the input after the open animation starts.
      const timer = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    }
    // Return focus to whatever triggered the modal (e.g. the navbar search
    // button) once it closes, so keyboard users don't lose their place.
    previouslyFocusedRef.current?.focus?.()
  }, [isOpen])

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      // Basic focus trap: keep Tab/Shift+Tab cycling within the dialog.
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return tools.slice(0, 6)

    return tools
      .filter(
        (tool) =>
          tool.name.toLowerCase().includes(normalized) ||
          tool.description.toLowerCase().includes(normalized)
      )
      .slice(0, 8)
  }, [query])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
            aria-label="Search tools"
            ref={dialogRef}
            className="fixed left-1/2 top-24 z-[70] w-[92vw] max-w-xl -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3.5 dark:border-slate-800">
                <HiOutlineMagnifyingGlass className="h-5 w-5 flex-shrink-0 text-slate-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search tools..."
                  aria-label="Search tools"
                  className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
                />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close search"
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                >
                  <HiXMark className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-2">
                {results.length > 0 ? (
                  results.map((tool) => {
                    const Icon = tool.icon
                    return (
                      <Link
                        key={tool.id}
                        to={tool.comingSoon ? '/tools' : tool.path}
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                            {tool.name}
                          </p>
                          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                            {tool.description}
                          </p>
                        </div>
                        {tool.comingSoon && (
                          <span className="ml-auto flex-shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                            Soon
                          </span>
                        )}
                      </Link>
                    )
                  })
                ) : (
                  <p className="px-3 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                    No tools found for &ldquo;{query}&rdquo;.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

SearchModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
