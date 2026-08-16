import React, { useEffect, useState } from 'react'
import { HiOutlineTrash, HiOutlineArrowDownTray, HiOutlineClock } from 'react-icons/hi2'
import ErrorMessage from '../tools/ErrorMessage.jsx'
import { api } from '../../lib/api.js'
import { getToolBySlug } from '../../data/tools.js'
import { getCategoryBySlug, categoryColorClasses } from '../../data/categories.js'
import { formatBytes } from '../../lib/formatBytes.js'

const IMAGE_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', { dateStyle: 'medium' })
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {downloads.map((entry) => {
            const category = getCategoryBySlug(entry.category)
            const Icon = getToolBySlug(entry.toolSlug)?.icon || category?.icon || HiOutlineArrowDownTray
            const colors = categoryColorClasses[category?.color] || categoryColorClasses.brand
            const isImage = IMAGE_MIME_TYPES.has(entry.mimeType)
            const remaining = daysRemaining(entry.expiresAt)

            return (
              <div key={entry._id} className="card group overflow-hidden">
                <div className="relative aspect-square bg-slate-50 dark:bg-slate-900">
                  {isImage ? (
                    <img src={entry.fileUrl} alt={entry.toolName} className="h-full w-full object-contain" />
                  ) : (
                    <div className={`flex h-full w-full items-center justify-center ${colors.bg} ${colors.text}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(entry._id)}
                    aria-label={`Delete ${entry.toolName} download`}
                    className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
                  >
                    <HiOutlineTrash className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="p-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md ${colors.bg} ${colors.text}`}>
                      <Icon className="h-3 w-3" />
                    </div>
                    <p className="truncate text-xs font-semibold text-slate-900 dark:text-white">{entry.toolName}</p>
                  </div>
                  <p className="mt-1 truncate text-[11px] text-slate-400 dark:text-slate-500">
                    {formatBytes(entry.fileSize)} &middot; {formatDate(entry.createdAt)}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-1">
                    <span className="inline-flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400">
                      <HiOutlineClock className="h-2.5 w-2.5" />
                      {remaining}d left
                    </span>
                    <a
                      href={entry.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={entry.fileName}
                      aria-label={`Download ${entry.toolName} result`}
                      className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-slate-800 dark:hover:text-brand-400"
                    >
                      <HiOutlineArrowDownTray className="h-3.5 w-3.5" />
                    </a>
                  </div>
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
