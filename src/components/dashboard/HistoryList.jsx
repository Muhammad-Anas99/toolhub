import React, { useEffect, useMemo, useState } from 'react'
import { HiOutlineTrash, HiOutlineClock } from 'react-icons/hi2'
import ErrorMessage from '../tools/ErrorMessage.jsx'
import { api } from '../../lib/api.js'
import { getToolBySlug } from '../../data/tools.js'
import { getCategoryBySlug, categoryColorClasses } from '../../data/categories.js'

function formatDate(dateString) {
  return new Date(dateString).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

/**
 * Every conversion the user has made. There is no separate "Downloads"
 * view of this data — History is the single record of tools/conversions
 * used (tool name, category, action, date/time).
 */
export default function HistoryList({ emptyTitle, emptyDescription }) {
  const [entries, setEntries] = useState(null)
  const [error, setError] = useState(null)
  const [isClearing, setIsClearing] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('all')

  function loadHistory() {
    api
      .getMyHistory({ limit: 50 })
      .then(({ data }) => setEntries(data))
      .catch((err) => setError(err.message || 'Could not load your history.'))
  }

  useEffect(() => {
    loadHistory()
  }, [])

  async function handleDeleteEntry(id) {
    try {
      await api.deleteHistoryEntry(id)
      setEntries((prev) => prev.filter((entry) => entry._id !== id))
    } catch (err) {
      setError(err.message || 'Could not delete this entry.')
    }
  }

  async function handleClearAll() {
    setIsClearing(true)
    try {
      await api.clearMyHistory()
      setEntries([])
    } catch (err) {
      setError(err.message || 'Could not clear your history.')
    } finally {
      setIsClearing(false)
    }
  }

  // Only categories that actually appear in this user's history — no
  // point offering a filter pill for a category they've never touched.
  const availableCategories = useMemo(() => {
    if (!entries) return []
    const slugs = [...new Set(entries.map((entry) => entry.category).filter(Boolean))]
    return slugs.map((slug) => getCategoryBySlug(slug)).filter(Boolean)
  }, [entries])

  const filteredEntries = useMemo(() => {
    if (!entries) return null
    if (categoryFilter === 'all') return entries
    return entries.filter((entry) => entry.category === categoryFilter)
  }, [entries, categoryFilter])

  return (
    <div>
      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

      {entries === null && !error ? (
        <p className="text-sm text-slate-400 dark:text-slate-500">Loading...</p>
      ) : entries && entries.length > 0 ? (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            {availableCategories.length > 1 ? (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setCategoryFilter('all')}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    categoryFilter === 'all'
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  All
                </button>
                {availableCategories.map((category) => (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => setCategoryFilter(category.slug)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      categoryFilter === category.slug
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            ) : (
              <div />
            )}
            <button
              type="button"
              onClick={handleClearAll}
              disabled={isClearing}
              className="text-sm font-medium text-slate-500 hover:text-rose-600 disabled:opacity-60 dark:text-slate-400 dark:hover:text-rose-400"
            >
              Clear all
            </button>
          </div>

          <div className="card divide-y divide-slate-100 dark:divide-slate-800">
            {filteredEntries.map((entry) => {
              const category = getCategoryBySlug(entry.category)
              const Icon = getToolBySlug(entry.toolSlug)?.icon || category?.icon || HiOutlineClock
              const colors = categoryColorClasses[category?.color] || categoryColorClasses.brand

              return (
                <div key={entry._id} className="flex items-center gap-4 px-5 py-4">
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                        {entry.toolName}
                      </p>
                      {category && (
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${colors.bg} ${colors.text}`}>
                          {category.name}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                      {entry.action || 'Used'}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                      {formatDate(entry.createdAt)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteEntry(entry._id)}
                    aria-label={`Delete history entry for ${entry.toolName}`}
                    className="flex-shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800 dark:hover:text-rose-400"
                  >
                    <HiOutlineTrash className="h-4 w-4" />
                  </button>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        !error && (
          <div className="card flex flex-col items-center gap-3 p-10 text-center">
            <HiOutlineClock className="h-10 w-10 text-slate-300 dark:text-slate-700" />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{emptyTitle}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{emptyDescription}</p>
          </div>
        )
      )}
    </div>
  )
}
