import { tools } from '../src/data/tools.js'
import { blogPosts } from '../src/data/blog.js'

const STATIC_ROUTES = ['/', '/about', '/blog', '/contact', '/privacy-policy', '/terms', '/tools']

// Standalone pages that aren't part of the tools.js catalog (won't appear
// in the Tools grid, category pages, search, or RelatedTools) but are
// still genuinely indexable pages of their own, needing prerendering and
// a sitemap entry the same as any tool or blog post. Currently just the
// Discord Timestamp Generator - a focused, separately-indexable page
// built around one specific feature of the Timestamp Converter tool,
// reusing its actual conversion logic rather than duplicating it.
const STANDALONE_PAGES = ['/tools/discord-timestamp-generator']

export function getAllPublicRoutes() {
  const toolRoutes = tools.map((t) => t.path)
  const blogRoutes = blogPosts.map((p) => `/blog/${p.slug}`)
  return [...STATIC_ROUTES, ...toolRoutes, ...blogRoutes, ...STANDALONE_PAGES]
}
