import { useEffect, useState } from 'react'
import { api } from '../lib/api.js'
import { resolveIcon, iconRegistry } from '../lib/iconRegistry.js'
import { tools as localTools } from '../data/tools.js'

const localToolsBySlug = new Map(localTools.map((tool) => [tool.slug, tool]))

/**
 * Normalizes an API tool document (icon as a string name) into the same
 * shape the rest of the app already expects (icon as a component
 * reference) — so ToolCard, RelatedTools, etc. never need to know whether
 * a tool came from the API or the local fallback.
 */
export function normalizeTool(apiTool) {
  return {
    id: apiTool.slug,
    name: apiTool.name,
    slug: apiTool.slug,
    path: apiTool.path,
    category: apiTool.category,
    description: apiTool.description,
    // The registry only lists a subset of icon names (about 55), but the
    // codebase already has the real icon component for every tool it ships,
    // so resolving through the registry alone gave the generic "?" icon to
    // most tools (126 of 194 at the time this was found) whenever tool data
    // came from the API rather than the local fallback. Order matters: an
    // icon name the registry knows still wins, so a deliberate choice made
    // through the admin panel isn't overridden; otherwise the codebase's own
    // icon for that tool; only a tool that exists solely in the database
    // (created through the admin panel) reaches the generic fallback.
    icon: iconRegistry[apiTool.icon] || localToolsBySlug.get(apiTool.slug)?.icon || resolveIcon(apiTool.icon),
    badge: apiTool.badge || undefined,
    comingSoon: apiTool.comingSoon,
  }
}

/**
 * Fetches tools from the API, optionally filtered by category/search/featured.
 * Falls back to the local `tools` data (src/data/tools.js) if the API is
 * unreachable or errors, so the site keeps working while the backend is
 * being stood up or during an outage. `isFallback` tells the caller which
 * source is currently in use, in case that's ever useful.
 */
export function useTools({ category, search, featured } = {}) {
  const [tools, setTools] = useState(localTools)
  const [loading, setLoading] = useState(true)
  const [isFallback, setIsFallback] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      try {
        const params = {}
        if (category && category !== 'all') params.category = category
        if (search) params.search = search
        if (featured) params.featured = 'true'

        const { data } = await api.getTools(params)
        if (!cancelled) {
          setTools(data.map(normalizeTool))
          setIsFallback(false)
        }
      } catch (error) {
        console.warn('[useTools] API unavailable, using local data:', error.message)
        if (!cancelled) {
          let fallback = localTools
          if (category && category !== 'all') {
            fallback = fallback.filter((tool) => tool.category === category)
          }
          if (featured) {
            fallback = fallback.filter((tool) => tool.badge === 'popular')
          }
          if (search) {
            const normalized = search.trim().toLowerCase()
            fallback = fallback.filter(
              (tool) =>
                tool.name.toLowerCase().includes(normalized) ||
                tool.description.toLowerCase().includes(normalized)
            )
          }
          setTools(fallback)
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
  }, [category, search, featured])

  return { tools, loading, isFallback }
}
