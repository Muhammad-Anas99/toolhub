import React from 'react'
import SEO from '../../components/ui/SEO.jsx'
import HistoryList from '../../components/dashboard/HistoryList.jsx'

export default function Downloads() {
  return (
    <>
      <SEO title="Downloads" description="Your ToolHub download activity." canonicalPath="/dashboard/downloads" />

      <h2 className="text-base font-semibold text-slate-900 dark:text-white">Downloads</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Since every tool processes your files entirely in your browser, we never receive or store the
        files themselves — there's nothing on our end to re-download. This is a log of what you've
        downloaded, by tool and date, for your own reference.
      </p>

      <div className="mt-6">
        <HistoryList
          mode="downloads"
          emptyTitle="No downloads yet"
          emptyDescription="Click Download on any tool's result and it'll show up here."
        />
      </div>
    </>
  )
}
