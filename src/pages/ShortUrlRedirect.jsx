import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import SEO from '../components/ui/SEO.jsx'
import { api } from '../lib/api.js'

export default function ShortUrlRedirect() {
  const { code } = useParams()
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    api
      .resolveShortUrl(code)
      .then((result) => {
        if (cancelled) return
        window.location.replace(result.data.originalUrl)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message || 'This short link doesn\u2019t exist or may have been removed.')
      })

    return () => {
      cancelled = true
    }
  }, [code])

  return (
    <>
      <SEO title="Redirecting..." description="Redirecting to the destination link." noIndex />
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        {error ? (
          <>
            <p className="text-sm font-semibold text-red-600 dark:text-red-400">Link not found</p>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              {error}
            </h1>
            <Link to="/tools/url-shortener" className="btn-primary mt-8">
              Create a short link
            </Link>
          </>
        ) : (
          <>
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Redirecting...</p>
          </>
        )}
      </Container>
    </>
  )
}
