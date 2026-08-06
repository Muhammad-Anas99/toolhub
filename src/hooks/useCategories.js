import { useEffect, useState } from 'react'
import { api } from '../lib/api.js'
import { resolveIcon } from '../lib/iconRegistry.js'
import { categories as localCategories } from '../data/categories.js'

function normalizeCategory(apiCategory) {
  return {
    id: apiCategory.slug,
    name: apiCategory.name,
    slug: apiCategory.slug,
    description: apiCategory.description,
    icon: resolveIcon(apiCategory.icon),
    color: apiCategory.color || 'brand',
  }
}

/**
 * Fetches categories from the API, falling back to the local `categories`
 * data (src/data/categories.js) if the API is unreachable — same pattern
 * as useTools, so the mega menu / category grids never break.
 */
export function useCategories() {
  const [categories, setCategories] = useState(localCategories)
  const [loading, setLoading] = useState(true)
  const [isFallback, setIsFallback] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      try {
        const { data } = await api.getCategories()
        if (!cancelled) {
          setCategories(data.map(normalizeCategory))
          setIsFallback(false)
        }
      } catch (error) {
        console.warn('[useCategories] API unavailable, using local data:', error.message)
        if (!cancelled) {
          setCategories(localCategories)
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

  return { categories, loading, isFallback }
}
