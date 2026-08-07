import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { HiOutlineCheckCircle, HiOutlineExclamationTriangle } from 'react-icons/hi2'
import Container from '../../components/ui/Container.jsx'
import SEO from '../../components/ui/SEO.jsx'
import ProgressBar from '../../components/tools/ProgressBar.jsx'
import { api } from '../../lib/api.js'

export default function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState('verifying') // verifying | success | error
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setErrorMessage('This verification link is missing its token.')
      return
    }

    let cancelled = false
    api
      .verifyEmail(token)
      .then(() => {
        if (!cancelled) setStatus('success')
      })
      .catch((error) => {
        if (!cancelled) {
          setStatus('error')
          setErrorMessage(error.message || 'This verification link is invalid or has expired.')
        }
      })

    return () => {
      cancelled = true
    }
  }, [token])

  return (
    <>
      <SEO title="Verify Email" description="Verify your ToolHub email address." canonicalPath="/verify-email" />

      <Container className="py-16">
        <div className="card mx-auto flex max-w-md flex-col items-center gap-3 p-10 text-center">
          {status === 'verifying' && (
            <>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Verifying your email...
              </p>
              <div className="w-full max-w-xs">
                <ProgressBar label="Verifying" />
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              <HiOutlineCheckCircle className="h-12 w-12 text-emerald-500" />
              <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Email verified</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Your email address has been confirmed.
              </p>
              <Link to="/dashboard" className="btn-primary mt-2">
                Go to dashboard
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <HiOutlineExclamationTriangle className="h-12 w-12 text-amber-500" />
              <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Verification failed</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">{errorMessage}</p>
              <Link to="/dashboard/settings" className="btn-secondary mt-2">
                Go to settings to resend
              </Link>
            </>
          )}
        </div>
      </Container>
    </>
  )
}
