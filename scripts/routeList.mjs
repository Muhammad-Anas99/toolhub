import { tools } from '../src/data/tools.js'
import { blogPosts } from '../src/data/blog.js'

const STATIC_ROUTES = ['/', '/about', '/blog', '/contact', '/privacy-policy', '/terms', '/tools']

export function getAllPublicRoutes() {
  const toolRoutes = tools.map((t) => t.path)
  const blogRoutes = blogPosts.map((p) => `/blog/${p.slug}`)
  return [...STATIC_ROUTES, ...toolRoutes, ...blogRoutes]
}
