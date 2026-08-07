import React from 'react'
import SEO from '../../components/ui/SEO.jsx'
import HistoryList from '../../components/dashboard/HistoryList.jsx'

export default function History() {
  return (
    <>
      <SEO title="Conversion History" description="Your ToolHub conversion history." canonicalPath="/dashboard/history" />

      <h2 className="text-base font-semibold text-slate-900 dark:text-white">Conversion history</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        A record of the tools you&apos;ve used. Files themselves are never sent to our servers — every
        tool processes images entirely in your browser — so this is a log of activity, not stored files.
      </p>

      <div className="mt-6">
        <HistoryList
          emptyTitle="No conversions yet"
          emptyDescription="Use any tool and it'll show up here."
        />
      </div>
    </>
  )
}
