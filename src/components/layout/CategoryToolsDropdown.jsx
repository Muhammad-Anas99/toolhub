import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi2'
import { getCategoryBySlug } from '../../data/categories.js'
import { getToolsByCategory } from '../../data/tools.js'

/**
 * Navbar item for a single category (e.g. "Image Tools", "PDF Tools") that
 * shows its tools in a hover dropdown — same interaction pattern as
 * MegaMenu (hover on desktop, click toggle, Escape/outside-click to
 * close), just scoped to one category's tool list instead of the full
 * category browser.
 *
 * Deliberately caps how many tools it shows rather than scrolling — a
 * dropdown with a scrollbar is a poor hover experience (it fights the
 * mouse leaving the area). "View all" below always covers the rest.
 */
const MAX_VISIBLE_TOOLS = 6

export default function CategoryToolsDropdown({ categorySlug, label, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  const category = getCategoryBySlug(categorySlug)
  const allTools = getToolsByCategory(categorySlug)
  const visibleTools = allTools.slice(0, MAX_VISIBLE_TOOLS)
  const hiddenCount = allTools.length - visibleTools.length

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  if (!category) return null

  function handleClose() {
    setIsOpen(false)
    onNavigate?.()
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
      >
        {label}
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.15 }}>
          <HiChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 top-full z-40 mt-3 w-72 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
          >
            {visibleTools.length > 0 ? (
              <div>
                {visibleTools.map((tool) => {
                  const Icon = tool.icon
                  return (
                    <Link
                      key={tool.id}
                      to={tool.comingSoon ? `/tools?category=${categorySlug}` : tool.path}
                      onClick={handleClose}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-900 dark:text-white">
                        {tool.name}
                      </span>
                      {tool.comingSoon && (
                        <span className="flex-shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                          Soon
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            ) : (
              <p className="px-3 py-6 text-center text-sm text-slate-400 dark:text-slate-500">
                No tools in this category yet.
              </p>
            )}

            <div className="mt-1 border-t border-slate-100 pt-2 dark:border-slate-800">
              <Link
                to={`/tools?category=${categorySlug}`}
                onClick={handleClose}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-brand-950"
              >
                View all {category.name}
                {hiddenCount > 0 ? ` (${allTools.length})` : ''} &rarr;
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

CategoryToolsDropdown.propTypes = {
  categorySlug: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onNavigate: PropTypes.func,
}
