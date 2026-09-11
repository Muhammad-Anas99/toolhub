import React, { useEffect, useState } from 'react'
import { HiOutlineCheckCircle } from 'react-icons/hi2'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import { api } from '../../lib/api.js'

const EMPTY_SETTINGS = {
  siteName: '',
  tagline: '',
  logo: '',
  seo: { title: '', description: '', keywords: [] },
  social: { github: '', twitter: '', linkedin: '' },
  contactEmail: '',
}

export default function AdminSettings() {
  const [settings, setSettings] = useState(EMPTY_SETTINGS)
  const [keywordsInput, setKeywordsInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [savedAt, setSavedAt] = useState(null)

  useEffect(() => {
    api
      .getSettings()
      .then(({ data }) => {
        setSettings({ ...EMPTY_SETTINGS, ...data, seo: { ...EMPTY_SETTINGS.seo, ...data.seo }, social: { ...EMPTY_SETTINGS.social, ...data.social } })
        setKeywordsInput((data.seo?.keywords || []).join(', '))
      })
      .catch((err) => setError(err.message || 'Could not load settings.'))
      .finally(() => setLoading(false))
  }, [])

  function updateField(field, value) {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  function updateNestedField(group, field, value) {
    setSettings((prev) => ({ ...prev, [group]: { ...prev[group], [field]: value } }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setError(null)
    setSavedAt(null)
    try {
      const keywords = keywordsInput
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean)
      const payload = { ...settings, seo: { ...settings.seo, keywords } }
      const { data } = await api.adminUpdateSettings(payload)
      setSettings({ ...EMPTY_SETTINGS, ...data, seo: { ...EMPTY_SETTINGS.seo, ...data.seo }, social: { ...EMPTY_SETTINGS.social, ...data.social } })
      setSavedAt(new Date())
    } catch (err) {
      setError(err.message || 'Could not save settings.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-400 dark:text-slate-500">Loading settings...</p>
  }

  return (
    <>
      <SEO title="Admin \u2014 Settings" description="ToolHub site settings." canonicalPath="/admin/settings" noIndex />

      <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Site Settings</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        These values apply across the whole site, not just the admin panel.
      </p>

      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

      <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-6">
        <div className="card space-y-4 p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">General</h2>
          <div>
            <label htmlFor="site-name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Site name
            </label>
            <input
              id="site-name"
              type="text"
              value={settings.siteName}
              onChange={(event) => updateField('siteName', event.target.value)}
              maxLength={100}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="tagline" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Tagline
            </label>
            <input
              id="tagline"
              type="text"
              value={settings.tagline}
              onChange={(event) => updateField('tagline', event.target.value)}
              maxLength={200}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="logo" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Logo URL
            </label>
            <input
              id="logo"
              type="text"
              value={settings.logo}
              onChange={(event) => updateField('logo', event.target.value)}
              placeholder="https://..."
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Contact email
            </label>
            <input
              id="contact-email"
              type="email"
              value={settings.contactEmail}
              onChange={(event) => updateField('contactEmail', event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div className="card space-y-4 p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Default SEO</h2>
          <div>
            <label htmlFor="seo-title" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Default title
            </label>
            <input
              id="seo-title"
              type="text"
              value={settings.seo.title}
              onChange={(event) => updateNestedField('seo', 'title', event.target.value)}
              maxLength={160}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="seo-description" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Default description
            </label>
            <textarea
              id="seo-description"
              value={settings.seo.description}
              onChange={(event) => updateNestedField('seo', 'description', event.target.value)}
              maxLength={300}
              rows={3}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="seo-keywords" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Keywords (comma separated)
            </label>
            <input
              id="seo-keywords"
              type="text"
              value={keywordsInput}
              onChange={(event) => setKeywordsInput(event.target.value)}
              placeholder="online tools, pdf converter, image compressor"
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div className="card space-y-4 p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Social links</h2>
          {['github', 'twitter', 'linkedin'].map((platform) => (
            <div key={platform}>
              <label htmlFor={`social-${platform}`} className="text-sm font-medium capitalize text-slate-700 dark:text-slate-300">
                {platform}
              </label>
              <input
                id={`social-${platform}`}
                type="url"
                value={settings.social[platform]}
                onChange={(event) => updateNestedField('social', platform, event.target.value)}
                placeholder="https://..."
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
          {savedAt && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
              <HiOutlineCheckCircle className="h-4 w-4" />
              Saved
            </span>
          )}
        </div>
      </form>
    </>
  )
}
