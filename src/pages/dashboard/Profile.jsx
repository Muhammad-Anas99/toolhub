import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { api } from '../../lib/api.js'

export default function Profile() {
  const { user, refreshUser } = useAuth()
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
  })
  const [status, setStatus] = useState('idle') // idle | saving | saved
  const [error, setError] = useState(null)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setStatus('saving')
    try {
      await api.updateProfile(form)
      await refreshUser()
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2000)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setStatus('idle')
    }
  }

  return (
    <>
      <SEO title="Profile" description="Edit your ToolHub profile." canonicalPath="/dashboard/profile" />

      <div className="card p-6">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">Profile</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Update your name, email, and avatar.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <AnimatePresence>
            {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}
          </AnimatePresence>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-100 text-lg font-semibold text-brand-700 dark:bg-brand-900 dark:text-brand-300">
              {form.avatar ? (
                <img src={form.avatar} alt="Avatar preview" className="h-full w-full object-cover" />
              ) : (
                (form.name || user?.email || '?').charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="avatar" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Avatar URL
              </label>
              <input
                id="avatar"
                name="avatar"
                type="text"
                value={form.avatar}
                onChange={handleChange}
                placeholder="https://..."
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            {form.email !== user?.email && (
              <p className="mt-1.5 text-xs text-amber-600 dark:text-amber-400">
                Changing your email will require re-verifying it.
              </p>
            )}
          </div>

          <button type="submit" disabled={status === 'saving'} className="btn-primary">
            {status === 'saving' ? 'Saving...' : status === 'saved' ? 'Saved!' : 'Save changes'}
          </button>
        </form>
      </div>
    </>
  )
}
