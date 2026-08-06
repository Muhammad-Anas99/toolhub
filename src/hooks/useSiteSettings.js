import { useEffect, useState } from 'react'
import { api } from '../lib/api.js'

// Mirrors the schema defaults in server/models/SiteSettings.js — used
// whenever the API is unreachable so the site still renders correctly.
const DEFAULT_SETTINGS = {
  siteName: 'ToolHub',
  tagline: 'Free online tools that work right in your browser.',
  logo: '',
  seo: {
    title: 'ToolHub — Free Online Tools',
    description:
      'ToolHub — Free online tools to convert, compress, resize, crop and rotate your images.',
    keywords: [],
  },
  social: { github: '', twitter: '', linkedin: '' },
  contactEmail: '',
}

/**
 * Fetches site-wide settings from the API, falling back to sane defaults
 * if the API is unreachable. Intended for things like the site name, SEO
 * defaults, and social links once components are wired up to read them
 * (currently most of the UI still uses hardcoded "ToolHub" text — this
 * hook is the foundation for replacing that incrementally).
 */
export function useSiteSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [isFallback, setIsFallback] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      try {
        const { data } = await api.getSettings()
        if (!cancelled) {
          setSettings(data)
          setIsFallback(false)
        }
      } catch (error) {
        console.warn('[useSiteSettings] API unavailable, using default settings:', error.message)
        if (!cancelled) {
          setSettings(DEFAULT_SETTINGS)
          setIsFallback(true)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { settings, loading, isFallback }
}
