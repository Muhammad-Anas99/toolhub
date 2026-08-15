import React, { useState } from 'react'
import { HiOutlineArrowDownTray, HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2'
import ErrorMessage from './ErrorMessage.jsx'
import { extractYoutubeVideoId, getThumbnailUrl, THUMBNAIL_QUALITIES } from '../../lib/youtubeUtils.js'
import { downloadBlob } from '../../lib/downloadBlob.js'

// YouTube returns a small gray placeholder image (120x90) at maxresdefault
// when a video has no thumbnail at that resolution, rather than a 404 —
// so a successful image load isn't proof the thumbnail is real. Anything
// this small is almost certainly that placeholder, not real content.
const PLACEHOLDER_MAX_DIMENSION = 121

export default function YoutubeThumbnailTool() {
  const [input, setInput] = useState('')
  const [videoId, setVideoId] = useState(null)
  const [error, setError] = useState(null)
  const [availability, setAvailability] = useState({}) // { [qualityId]: 'checking' | 'available' | 'unavailable' }
  const [downloadingId, setDownloadingId] = useState(null)
  const [downloadError, setDownloadError] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    const id = extractYoutubeVideoId(input)
    if (!id) {
      setError('That doesn\u2019t look like a YouTube video URL or ID. Paste a link like https://youtube.com/watch?v=...')
      setVideoId(null)
      return
    }
    setError(null)
    setDownloadError(null)
    setVideoId(id)
    setAvailability(Object.fromEntries(THUMBNAIL_QUALITIES.map((q) => [q.id, 'checking'])))
  }

  function handleImageLoad(qualityId, event) {
    const { naturalWidth, naturalHeight } = event.target
    const isPlaceholder = naturalWidth <= PLACEHOLDER_MAX_DIMENSION && naturalHeight <= PLACEHOLDER_MAX_DIMENSION && qualityId !== 'default'
    setAvailability((prev) => ({ ...prev, [qualityId]: isPlaceholder ? 'unavailable' : 'available' }))
  }

  function handleImageError(qualityId) {
    setAvailability((prev) => ({ ...prev, [qualityId]: 'unavailable' }))
  }

  async function handleDownload(qualityId) {
    setDownloadError(null)
    setDownloadingId(qualityId)
    const url = getThumbnailUrl(videoId, qualityId)
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Could not retrieve this thumbnail.')
      const blob = await response.blob()
      downloadBlob(blob, `${videoId}-${qualityId}.jpg`)
    } catch {
      // Cross-origin fetch can fail even when the image itself loads fine
      // in an <img> tag (different browser rules) — fall back to opening
      // it directly so the user can save it manually rather than leaving
      // them with no way to get the file at all.
      setDownloadError('Could not download automatically \u2014 opening the image in a new tab so you can save it manually (right-click \u2192 Save Image As).')
      window.open(url, '_blank', 'noopener,noreferrer')
    } finally {
      setDownloadingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="card flex flex-col gap-3 p-5 sm:flex-row">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="https://youtube.com/watch?v=... or a video ID"
          className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
        <button type="submit" className="btn-primary flex-shrink-0 sm:w-auto">
          Find Thumbnails
        </button>
      </form>

      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}
      {downloadError && <ErrorMessage message={downloadError} onDismiss={() => setDownloadError(null)} />}

      {videoId && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {THUMBNAIL_QUALITIES.map((quality) => {
            const state = availability[quality.id]
            if (state === 'unavailable') return null

            return (
              <div key={quality.id} className="card overflow-hidden">
                <div className="flex aspect-video items-center justify-center bg-slate-100 dark:bg-slate-900">
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <img
                    src={getThumbnailUrl(videoId, quality.id)}
                    alt={`${quality.label} thumbnail`}
                    onLoad={(event) => handleImageLoad(quality.id, event)}
                    onError={() => handleImageError(quality.id)}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 p-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{quality.label}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{quality.dimensions}</p>
                  </div>
                  <div className="flex flex-shrink-0 gap-2">
                    <a
                      href={getThumbnailUrl(videoId, quality.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open full size in a new tab"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                    >
                      <HiOutlineArrowTopRightOnSquare className="h-4 w-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDownload(quality.id)}
                      disabled={downloadingId === quality.id || state !== 'available'}
                      className="btn-secondary text-xs"
                    >
                      <HiOutlineArrowDownTray className="h-3.5 w-3.5" />
                      {downloadingId === quality.id ? 'Downloading...' : 'Download'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
