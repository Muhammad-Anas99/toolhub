import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineTrash, HiOutlineClock } from 'react-icons/hi2'
import ErrorMessage from '../tools/ErrorMessage.jsx'
import { api } from '../../lib/api.js'

function formatDate(dateString) {
  return new Date(dateString).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function HistoryList({ emptyTitle, emptyDescription }) {
  const [entries, setEntries] = useState(null)
  const [error, setError] = useState(null)
  const [isClearing, setIsClearing] = useState(false)

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

  return (
    <div>
      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

      {entries === null && !error ? (
        <p className="text-sm text-slate-400 dark:text-slate-500">Loading...</p>
      ) : entries && entries.length > 0 ? (
        <>
          <div className="mb-4 flex justify-end">
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
            {entries.map((entry) => (
              <div key={entry._id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                    {entry.toolName}
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
            ))}
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

HistoryList.propTypes = {
  emptyTitle: PropTypes.string.isRequired,
  emptyDescription: PropTypes.string.isRequired,
}
