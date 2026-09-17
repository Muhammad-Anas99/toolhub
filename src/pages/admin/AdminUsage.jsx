import React, { useEffect, useState } from 'react'
import { HiOutlineChartBar, HiOutlineTrash, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2'
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
    second: '2-digit',
  })
}

function loadedTotal(total) {
  return typeof total === 'number' ? total.toLocaleString() : '\u2014'
}

const PAGE_SIZE = 50

export default function AdminUsage() {
  const [items, setItems] = useState(null)
  const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1 })
  const [page, setPage] = useState(1)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    setItems(null)
    api
      .adminGetAllConversions(page, PAGE_SIZE)
      .then(({ data, meta: responseMeta }) => {
        setItems(data)
        setMeta(responseMeta)
      })
      .catch((err) => setError(err.message || 'Could not load usage data.'))
  }, [page])

  async function handleDelete(id) {
    setError(null)
    setDeletingId(id)
    try {
      await api.adminDeleteConversion(id)
      setItems((prev) => prev.filter((item) => item.id !== id))
      setMeta((prev) => ({ ...prev, total: Math.max(0, prev.total - 1) }))
    } catch (err) {
      setError(err.message || 'Could not delete this conversion record.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      <SEO title="Admin — Usage" description="Every recorded conversion across the site, with tool, visitor, and timing detail." canonicalPath="/admin/usage" noIndex />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Usage</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Every individual conversion recorded site-wide, newest first — including anonymous, logged-out traffic that
            never shows up in any single user\u2019s own history.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900">
          <HiOutlineChartBar className="h-5 w-5 text-brand-500" />
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500">Total conversions</p>
            <p className="text-lg font-semibold leading-tight text-slate-900 dark:text-white">
              {loadedTotal(meta.total)}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4">
          <ErrorMessage message={error} onDismiss={() => setError(null)} />
        </div>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-400 dark:bg-slate-900/60 dark:text-slate-500">
            <tr>
              <th className="px-4 py-3">Tool</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">IP Address</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">Device</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3 text-right">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {items === null &&
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={9} className="px-4 py-3">
                    <div className="h-4 w-full animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                  </td>
                </tr>
              ))}

            {items !== null && items.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-sm text-slate-400 dark:text-slate-500">
                  No conversions recorded yet.
                </td>
              </tr>
            )}

            {items !== null &&
              items.map((item) => (
                <tr key={item.id} className="text-slate-700 dark:text-slate-300">
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{item.toolName}</td>
                  <td className="px-4 py-3 capitalize">{item.category || '\u2014'}</td>
                  <td className="px-4 py-3">{item.action || '\u2014'}</td>
                  <td className="px-4 py-3">
                    {item.user?.email ? (
                      <span>
                        {item.user.name} <span className="text-slate-400 dark:text-slate-500">({item.user.email})</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-500">Anonymous</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{item.ipAddress || 'Unknown'}</td>
                  <td className="px-4 py-3">{item.country || 'Unknown'}</td>
                  <td className="px-4 py-3 capitalize">{item.device || 'unknown'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-400 dark:text-slate-500">{formatDate(item.createdAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-40 dark:text-slate-500 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                      title="Delete this conversion record"
                    >
                      <HiOutlineTrash className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {meta.pages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <p>
            Page {meta.page} of {meta.pages} ({meta.total} total)
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
              onClick={() => setPage((p) => Math.min(meta.pages, p + 1))}
              disabled={page >= meta.pages}
              className="btn-secondary text-xs disabled:opacity-40"
            >
              Next
              <HiOutlineChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
