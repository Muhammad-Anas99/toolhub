import React from 'react'

/**
 * Shown by the top-level Suspense boundary in App.jsx while a lazy-loaded
 * route's JS chunk downloads. Kept intentionally minimal since it's usually
 * only visible for a fraction of a second on a fast connection.
 */
export default function PageLoader() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="flex min-h-[60vh] items-center justify-center"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-brand-600 dark:border-slate-800 dark:border-t-brand-400" />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
