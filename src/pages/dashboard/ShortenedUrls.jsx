import React from 'react'
import SEO from '../../components/ui/SEO.jsx'
import ShortenedUrlsList from '../../components/dashboard/ShortenedUrlsList.jsx'

export default function ShortenedUrls() {
  return (
    <>
      <SEO title="Shortened URLs" description="Your ToolHub shortened URLs." canonicalPath="/dashboard/shortened-urls" noIndex />

      <h2 className="text-base font-semibold text-slate-900 dark:text-white">Shortened URLs</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Every link you&apos;ve shortened while signed in, with its click count. Links created while
        signed out aren&apos;t tied to your account and won&apos;t appear here.
      </p>

      <div className="mt-6">
        <ShortenedUrlsList />
      </div>
    </>
  )
}
