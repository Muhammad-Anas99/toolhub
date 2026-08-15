import React, { useState } from 'react'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import { api } from '../../lib/api.js'

export default function Settings() {
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' })
  const [passwordStatus, setPasswordStatus] = useState('idle') // idle | saving | saved
  const [passwordError, setPasswordError] = useState(null)

  function handlePasswordChange(event) {
    const { name, value } = event.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handlePasswordSubmit(event) {
    event.preventDefault()
    setPasswordError(null)
    setPasswordStatus('saving')
    try {
      await api.changePassword(passwordForm)
      setPasswordForm({ currentPassword: '', newPassword: '' })
      setPasswordStatus('saved')
      setTimeout(() => setPasswordStatus('idle'), 2500)
    } catch (err) {
      setPasswordError(err.message || 'Something went wrong. Please try again.')
      setPasswordStatus('idle')
    }
  }

  return (
    <>
      <SEO title="Settings" description="Manage your ToolHub account settings." canonicalPath="/dashboard/settings" noIndex />

      {/* Email verification reminder now lives in DashboardLayout, shown on
          every dashboard page rather than just here. */}

      <div className="card p-6">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">Change password</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Changing your password signs you out on other devices.
        </p>

        <form onSubmit={handlePasswordSubmit} className="mt-5 space-y-4">
          {passwordError && (
            <ErrorMessage message={passwordError} onDismiss={() => setPasswordError(null)} />
          )}

          <div>
            <label htmlFor="currentPassword" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Current password
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              required
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              autoComplete="current-password"
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              New password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              autoComplete="new-password"
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
              At least 8 characters, including a number.
            </p>
          </div>

          <button type="submit" disabled={passwordStatus === 'saving'} className="btn-primary">
            {passwordStatus === 'saving'
              ? 'Updating...'
              : passwordStatus === 'saved'
                ? 'Password updated!'
                : 'Update password'}
          </button>
        </form>
      </div>
    </>
  )
}
