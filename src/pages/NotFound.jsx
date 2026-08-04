import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import SEO from '../components/ui/SEO.jsx'

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." />
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-slate-500 dark:text-slate-400">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link to="/" className="btn-primary mt-8">
          Back to home
        </Link>
      </Container>
    </>
  )
}
