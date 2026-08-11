import React, { useEffect, useState } from 'react'
import { HiOutlineArrowDownTray, HiOutlineFolderOpen, HiOutlineTrash } from 'react-icons/hi2'
import ErrorMessage from '../tools/ErrorMessage.jsx'
import { api } from '../../lib/api.js'
import { downloadBlob } from '../../lib/downloadBlob.js'

function formatDateTime(dateString) {
  return new Date(dateString).toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  })
}

/**
 * Reads from the dedicated Download model (server/models/Download.js) via
 * GET /api/downloads — a genuinely different data source from History
 * (ConversionHistory), not the same records relabeled. Each item here
 * exists because the user clicked Download on a result, and references a
 * real, retained output file — so the thumbnail below is the actual
 * converted image, not a generic tool icon.
 */
export default function DownloadsList() {
  const [downloads, setDownloads] = useState(null)
  const [error, setError] = useState(null)
  const [busyId, setBusyId] = useState(null)

  useEffect(() => {
    api
      .getMyDownloads({ limit: 50 })
      .then(({ data }) => setDownloads(data))
      .catch((err) => setError(err.message || 'Could not load your downloads.'))
  }, [])

  async function handleDownloadAgain(item) {
    setBusyId(item._id)
    setError(null)
    try {
      const response = await fetch(item.fileUrl)
      if (!response.ok) throw new Error('The stored file could not be retrieved.')
      const blob = await response.blob()
      downloadBlob(blob, item.filename)
    } catch (err) {
      setError(err.message || 'Could not download this file again.')
    } finally {
      setBusyId(null)
    }
  }

  async function handleRemove(item) {
    setBusyId(item._id)
    setError(null)
    try {
      await api.deleteDownload(item._id)
      setDownloads((prev) => prev.filter((entry) => entry._id !== item._id))
    } catch (err) {
      setError(err.message || 'Could not remove this download.')
    } finally {
      setBusyId(null)
    }
  }

  if (downloads === null && !error) {
    return <p className="text-sm text-slate-400 dark:text-slate-500">Loading...</p>
  }

  if (error && downloads === null) {
    return <ErrorMessage message={error} onDismiss={() => setError(null)} />
  }

  if (downloads.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-3 p-10 text-center">
        <HiOutlineFolderOpen className="h-10 w-10 text-slate-300 dark:text-slate-700" />
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No downloads yet</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Click Download on any tool&apos;s result and it&apos;ll show up here.
        </p>
      </div>
    )
  }

  return (
    <div>
      {error && (
        <div className="mb-4">
          <ErrorMessage message={error} onDismiss={() => setError(null)} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {downloads.map((item) => (
          <div key={item._id} className="card overflow-hidden">
            <div className="flex h-40 items-center justify-center bg-slate-50 dark:bg-slate-900">
              {/* The real converted output, not a placeholder icon. */}
              <img src={item.fileUrl} alt={item.filename} className="h-full w-full object-contain" />
            </div>

            <div className="p-4">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                {item.filename}
              </p>
              <p className="mt-1 text-xs font-medium text-brand-600 dark:text-brand-400">
                {item.toolName}
              </p>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                {formatDateTime(item.downloadedAt)}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDownloadAgain(item)}
                  disabled={busyId === item._id}
                  className="btn-secondary flex-1 text-sm"
                >
                  <HiOutlineArrowDownTray className="h-4 w-4" />
                  {busyId === item._id ? 'Working...' : 'Download Again'}
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(item)}
                  disabled={busyId === item._id}
                  aria-label={`Remove ${item.filename} from downloads`}
                  className="flex-shrink-0 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800 dark:hover:text-rose-400"
                >
                  <HiOutlineTrash className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
