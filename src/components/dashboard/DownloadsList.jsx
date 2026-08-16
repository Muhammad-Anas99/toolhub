import React, { useEffect, useState } from 'react'
import { HiOutlineTrash, HiOutlineArrowDownTray, HiOutlineClock } from 'react-icons/hi2'
import ErrorMessage from '../tools/ErrorMessage.jsx'
import { api } from '../../lib/api.js'
import { getToolBySlug } from '../../data/tools.js'
import { getCategoryBySlug, categoryColorClasses } from '../../data/categories.js'
import { formatBytes } from '../../lib/formatBytes.js'

function formatDate(dateString) {
  return new Date(dateString).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
}

function daysRemaining(expiresAt) {
  const days = Math.ceil((new Date(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  return Math.max(0, days)
}

export default function DownloadsList() {
  const [downloads, setDownloads] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .getMyDownloads()
      .then(({ data }) => setDownloads(data))
      .catch((err) => setError(err.message || 'Could not load your downloads.'))
  }, [])

  async function handleDelete(id) {
    try {
      await api.deleteDownload(id)
      setDownloads((prev) => prev.filter((d) => d._id !== id))
    } catch (err) {
      setError(err.message || 'Could not delete this download.')
    }
  }

  return (
    <div>
      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

      {downloads === null && !error ? (
        <p className="text-sm text-slate-400 dark:text-slate-500">Loading...</p>
      ) : downloads && downloads.length > 0 ? (
        <div className="card divide-y divide-slate-100 dark:divide-slate-800">
          {downloads.map((entry) => {
            const category = getCategoryBySlug(entry.category)
            const Icon = getToolBySlug(entry.toolSlug)?.icon || category?.icon || HiOutlineArrowDownTray
            const colors = categoryColorClasses[category?.color] || categoryColorClasses.brand

            return (
              <div key={entry._id} className="flex items-center gap-4 px-5 py-4">
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{entry.toolName}</p>
                    {category && (
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${colors.bg} ${colors.text}`}>
                        {category.name}
                      </span>
                    )}
                  </div>
                  {entry.action && (
                    <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{entry.action}</p>
                  )}
                  <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                    {formatBytes(entry.fileSize)} &middot; {formatDate(entry.createdAt)}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                    <HiOutlineClock className="h-3 w-3" />
                    {daysRemaining(entry.expiresAt)} day{daysRemaining(entry.expiresAt) === 1 ? '' : 's'} left
                  </p>
                </div>
                <div className="flex flex-shrink-0 gap-1">
                  <a
                    href={entry.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={entry.fileName}
                    aria-label={`Download ${entry.toolName} result`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-slate-800 dark:hover:text-brand-400"
                  >
                    <HiOutlineArrowDownTray className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDelete(entry._id)}
                    aria-label={`Delete ${entry.toolName} download`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800 dark:hover:text-rose-400"
                  >
                    <HiOutlineTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        !error && (
          <div className="card flex flex-col items-center gap-3 p-10 text-center">
            <HiOutlineArrowDownTray className="h-10 w-10 text-slate-300 dark:text-slate-700" />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No downloads yet</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Results from tools you use while signed in will show up here for 14 days.
            </p>
          </div>
        )
      )}
    </div>
  )
}
