import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineLink, HiOutlineTrash, HiOutlineArrowTopRightOnSquare, HiOutlineDocumentDuplicate } from 'react-icons/hi2'
import ErrorMessage from '../tools/ErrorMessage.jsx'
import { api } from '../../lib/api.js'

function formatDate(dateString) {
  return new Date(dateString).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function ShortenedUrlsList() {
  const [urls, setUrls] = useState(null)
  const [error, setError] = useState(null)
  const [copiedId, setCopiedId] = useState(null)

  function loadUrls() {
    api
      .getMyShortUrls()
      .then(({ data }) => setUrls(data))
      .catch((err) => setError(err.message || 'Could not load your shortened URLs.'))
  }

  useEffect(() => {
    loadUrls()
  }, [])

  async function handleDelete(id) {
    try {
      await api.deleteShortUrl(id)
      setUrls((prev) => prev.filter((entry) => entry.id !== id))
    } catch (err) {
      setError(err.message || 'Could not delete this link.')
    }
  }

  function handleCopy(entry) {
    navigator.clipboard.writeText(entry.shortUrl)
    setCopiedId(entry.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div>
      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

      {urls === null && !error ? (
        <p className="text-sm text-slate-400 dark:text-slate-500">Loading...</p>
      ) : urls && urls.length > 0 ? (
        <div className="card divide-y divide-slate-100 dark:divide-slate-800">
          {urls.map((entry) => (
            <div key={entry.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                <HiOutlineLink className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{entry.shortUrl}</p>
                <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{entry.originalUrl}</p>
                <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                  {formatDate(entry.createdAt)} · {entry.clicks} {entry.clicks === 1 ? 'click' : 'clicks'}
                </p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleCopy(entry)}
                  aria-label="Copy short URL"
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                >
                  <HiOutlineDocumentDuplicate className="h-4 w-4" />
                </button>
                <a
                  href={entry.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open short URL"
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                >
                  <HiOutlineArrowTopRightOnSquare className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => handleDelete(entry.id)}
                  aria-label="Delete short URL"
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800 dark:hover:text-rose-400"
                >
                  <HiOutlineTrash className="h-4 w-4" />
                </button>
              </div>
              {copiedId === entry.id && <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Copied!</span>}
            </div>
          ))}
        </div>
      ) : (
        !error && (
          <div className="card flex flex-col items-center gap-3 p-10 text-center">
            <HiOutlineLink className="h-10 w-10 text-slate-300 dark:text-slate-700" />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              You haven&apos;t created any shortened URLs yet.
            </p>
            <Link to="/tools/url-shortener" className="btn-primary mt-2 text-sm">
              Create Short URL
            </Link>
          </div>
        )
      )}
    </div>
  )
}
