import React from 'react'
import SEO from '../../components/ui/SEO.jsx'
import DownloadsList from '../../components/dashboard/DownloadsList.jsx'

export default function Downloads() {
  return (
    <>
      <SEO title="Downloads" description="Your saved ToolHub results." canonicalPath="/dashboard/downloads" noIndex />

      <h2 className="text-base font-semibold text-slate-900 dark:text-white">Downloads</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Results from tools you use while signed in are automatically kept here for 14 days, so you
        can come back for them later without redoing the work. Only the result is saved — never
        your original file — and it&apos;s permanently deleted once it expires.
      </p>

      <div className="mt-6">
        <DownloadsList />
      </div>
    </>
  )
}
