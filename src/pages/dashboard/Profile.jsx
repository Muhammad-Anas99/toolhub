import React, { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { HiOutlineCamera, HiOutlineTrash } from 'react-icons/hi2'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { api } from '../../lib/api.js'

const ACCEPTED_AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_AVATAR_SIZE_MB = 4

export default function Profile() {
  const { user, refreshUser } = useAuth()
  const fileInputRef = useRef(null)

  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' })
  const [status, setStatus] = useState('idle') // idle | saving | saved
  const [error, setError] = useState(null)

  const [avatarPreview, setAvatarPreview] = useState(null) // local object URL while uploading
  const [avatarStatus, setAvatarStatus] = useState('idle') // idle | uploading | removing
  const [avatarError, setAvatarError] = useState(null)

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

  function handleAvatarButtonClick() {
    fileInputRef.current?.click()
  }

  async function handleAvatarChange(event) {
    const file = event.target.files?.[0]
    event.target.value = '' // allow re-selecting the same file later
    if (!file) return

    setAvatarError(null)

    if (!ACCEPTED_AVATAR_TYPES.includes(file.type)) {
      setAvatarError('Please choose a JPG, PNG, WEBP, or GIF image.')
      return
    }
    if (file.size > MAX_AVATAR_SIZE_MB * 1024 * 1024) {
      setAvatarError(`Image must be under ${MAX_AVATAR_SIZE_MB} MB.`)
      return
    }

    const localPreviewUrl = URL.createObjectURL(file)
    setAvatarPreview(localPreviewUrl)
    setAvatarStatus('uploading')

    try {
      await api.uploadAvatar(file)
      await refreshUser()
    } catch (err) {
      setAvatarError(err.message || 'Could not upload your profile picture. Please try again.')
    } finally {
      URL.revokeObjectURL(localPreviewUrl)
      setAvatarPreview(null)
      setAvatarStatus('idle')
    }
  }

  async function handleAvatarRemove() {
    setAvatarError(null)
    setAvatarStatus('removing')
    try {
      await api.removeAvatar()
      await refreshUser()
    } catch (err) {
      setAvatarError(err.message || 'Could not remove your profile picture.')
    } finally {
      setAvatarStatus('idle')
    }
  }

  const displayedAvatar = avatarPreview || user?.avatar
  const isAvatarBusy = avatarStatus !== 'idle'

  return (
    <>
      <SEO title="Profile" description="Edit your ToolHub profile." canonicalPath="/dashboard/profile" noIndex />

      <div className="space-y-6">
        <div className="card p-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Profile picture
          </h2>

          <div className="mt-4">
            {avatarError && (
              <div className="mb-4">
                <ErrorMessage message={avatarError} onDismiss={() => setAvatarError(null)} />
              </div>
            )}

            <div className="flex items-center gap-5">
              <div className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-100 text-2xl font-semibold text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                {displayedAvatar ? (
                  <img src={displayedAvatar} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  (user?.name || user?.email || '?').charAt(0).toUpperCase()
                )}
                {avatarStatus === 'uploading' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAvatarButtonClick}
                  disabled={isAvatarBusy}
                  className="btn-secondary text-sm"
                >
                  <HiOutlineCamera className="h-4 w-4" />
                  {user?.avatar ? 'Change photo' : 'Upload photo'}
                </button>
                {user?.avatar && (
                  <button
                    type="button"
                    onClick={handleAvatarRemove}
                    disabled={isAvatarBusy}
                    className="btn-secondary text-sm text-rose-600 hover:text-rose-700 dark:text-rose-400"
                  >
                    <HiOutlineTrash className="h-4 w-4" />
                    {avatarStatus === 'removing' ? 'Removing...' : 'Remove'}
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED_AVATAR_TYPES.join(',')}
                  onChange={handleAvatarChange}
                  className="sr-only"
                  aria-label="Upload profile picture"
                />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
              JPG, PNG, WEBP or GIF. Max {MAX_AVATAR_SIZE_MB} MB.
            </p>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">Profile</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Update your name and email.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <AnimatePresence>
              {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}
            </AnimatePresence>

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
      </div>
    </>
  )
}
