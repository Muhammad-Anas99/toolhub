import React, { useEffect, useState } from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineGlobeAlt } from 'react-icons/hi2'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import { api } from '../../lib/api.js'

function formatDate(dateString) {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function AdminPageViews() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setError(null)
    api
      .adminGetRecentPageViews({ page, limit: 50 })
      .then(({ data: result }) => setData(result))
      .catch((err) => setError(err.message || 'Could not load page views.'))
  }, [page])

  return (
    <>
      <SEO title="Admin \u2014 Page Views" description="Recent page views across the site." canonicalPath="/admin/pageviews" noIndex />

      <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Page Views</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Every page landed on across the site, newest first \u2014 not just tool usage. Only recorded for visitors who've
        accepted cookies, and kept for 90 days.
      </p>

      {error && (
        <div className="mt-4">
          <ErrorMessage message={error} onDismiss={() => setError(null)} />
        </div>
      )}

      {!data && !error && <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">Loading page views...</p>}

      {data && data.views.length === 0 && (
        <div className="mt-6 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-slate-200 py-12 text-center dark:border-slate-800">
          <HiOutlineGlobeAlt className="h-8 w-8 text-slate-300 dark:text-slate-600" />
          <p className="text-sm text-slate-500 dark:text-slate-400">No page views recorded yet.</p>
        </div>
      )}

      {data && data.views.length > 0 && (
        <>
          <div className="mt-6 card overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800 dark:text-slate-500">
                  <th className="px-5 py-3 font-medium">Page</th>
                  <th className="px-5 py-3 font-medium">Country</th>
                  <th className="px-5 py-3 font-medium">City</th>
                  <th className="px-5 py-3 font-medium">IP Address</th>
                  <th className="px-5 py-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {data.views.map((view) => (
                  <tr key={view._id}>
                    <td className="max-w-xs truncate px-5 py-3 font-mono text-xs text-slate-700 dark:text-slate-300">{view.path}</td>
                    <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{view.country}</td>
                    <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{view.city}</td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">{view.ipAddress}</td>
                    <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{formatDate(view.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.pages > 1 && (
            <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
              <p>
                Page {data.page} of {data.pages} ({data.total} total)
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="btn-secondary text-xs disabled:opacity-40"
                >
                  <HiOutlineChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(data.pages, p + 1))}
                  disabled={page >= data.pages}
                  className="btn-secondary text-xs disabled:opacity-40"
                >
                  Next
                  <HiOutlineChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
