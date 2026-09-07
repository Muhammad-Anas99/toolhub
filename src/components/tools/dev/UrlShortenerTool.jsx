import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineLink, HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2'
import { api } from '../../../lib/api.js'
import CopyButton from '../CopyButton.jsx'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function UrlShortenerTool({ toolSlug, toolName, category }) {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  async function handleSubmit(event) {
    event.preventDefault()
    if (!url.trim()) return

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await api.createShortUrl(url.trim())
      setResult(response.data)
      logNow('Short URL created')
    } catch (err) {
      setError(err.message || 'Could not shorten that URL. Please check it and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleReset() {
    setUrl('')
    setResult(null)
    setError(null)
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-300">
        Unlike other ToolHub tools, this one genuinely needs a server — a short link has to keep working for
        anyone who clicks it later, which means the destination URL is stored on ToolHub's server, not just in
        your browser.
      </div>

      {!result && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="url-input" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Long URL
            </label>
            <input
              id="url-input"
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://example.com/a/very/long/url/that/needs/shortening"
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

          <button type="submit" disabled={isLoading || !url.trim()} className="btn-primary w-full sm:w-auto">
            <HiOutlineLink className="h-4 w-4" />
            {isLoading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>
      )}

      {result && (
        <div className="space-y-4 rounded-xl bg-emerald-50 p-5 dark:bg-emerald-950">
          <div>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">Your short link</p>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={result.shortUrl}
                className="w-full rounded-lg border border-emerald-200 bg-white px-3.5 py-2.5 text-sm font-medium text-emerald-800 dark:border-emerald-800 dark:bg-slate-900 dark:text-emerald-300"
              />
              <CopyButton value={result.shortUrl} />
              <a
                href={result.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open short URL"
                className="btn-secondary flex-shrink-0 px-3 py-2.5"
              >
                <HiOutlineArrowTopRightOnSquare className="h-4 w-4" />
              </a>
            </div>
          </div>
          <p className="truncate text-xs text-emerald-700 dark:text-emerald-500">Redirects to: {result.originalUrl}</p>
          <button type="button" onClick={handleReset} className="btn-secondary text-sm">
            Shorten another URL
          </button>
        </div>
      )}
    </div>
  )
}

UrlShortenerTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
