import React from 'react'
import SEO from '../../components/ui/SEO.jsx'
import DownloadsList from '../../components/dashboard/DownloadsList.jsx'

export default function Downloads() {
  return (
    <>
      <SEO title="Downloads" description="Your ToolHub downloads library." canonicalPath="/dashboard/downloads" />

      <h2 className="text-base font-semibold text-slate-900 dark:text-white">Downloads</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Files you&apos;ve downloaded from a tool result. Unlike History, only results you actually
        clicked Download for appear here — and each one is retained so you can grab it again later.
      </p>

      <div className="mt-6">
        <DownloadsList />
      </div>
    </>
  )
}
