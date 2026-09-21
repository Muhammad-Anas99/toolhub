/**
 * Generates public/sitemap.xml from the same route list the prerender
 * script uses (scripts/routeList.mjs), which itself derives tool and
 * blog routes directly from src/data/tools.js and src/data/blog.js.
 *
 * This is the fix for a real, recurring problem: the sitemap used to be
 * a hand-maintained static file, so every new tool added silently never
 * made it in unless someone remembered to update this file by hand (the
 * exact same class of bug that previously hit server/utils/seedData.js
 * falling out of sync with tools.js). Deriving it from the same source
 * used for prerendering means the two can never drift apart again.
 *
 * Run as part of `npm run build`, before `vite build` — the freshly
 * generated public/sitemap.xml then gets copied into dist/ by Vite's
 * normal handling of the public/ directory.
 *
 * Known remaining gap, same one the old file already documented: blog
 * posts published live through the Admin Blog CMS (stored in MongoDB)
 * aren't picked up here, since this reads the static src/data/blog.js
 * file, not the live database. A fully dynamic sitemap would need a
 * backend route querying the Blog collection at request time instead of
 * a static generated file — a genuine further improvement, not done
 * here since it's a larger change than the immediate gap being fixed
 * (tools silently missing from the sitemap).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getAllPublicRoutes } from './routeList.mjs'
import { tools } from '../src/data/tools.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE_URL = 'https://trytoolhub.net'
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml')

// Routes routeList.mjs doesn't know about (auth entry points aren't part
// of prerendering, but the previous sitemap included them deliberately —
// see the comment on their <url> entry below for why).
const EXTRA_ROUTES = ['/login', '/register']

/**
 * Priority and change frequency, matching the scheme the original
 * hand-written sitemap already established — reproduced here exactly
 * rather than invented fresh, so this change doesn't silently alter
 * how any existing URL is weighted.
 */
function metaFor(route) {
  if (route === '/') return { priority: '1.0', changefreq: 'weekly' }
  if (route === '/tools') return { priority: '0.9', changefreq: 'weekly' }
  if (route === '/blog') return { priority: '0.7', changefreq: 'weekly' }
  if (route === '/about') return { priority: '0.5', changefreq: 'monthly' }
  if (route === '/contact') return { priority: '0.4', changefreq: 'yearly' }
  if (route === '/privacy-policy' || route === '/terms') return { priority: '0.2', changefreq: 'yearly' }
  if (route === '/login' || route === '/register') return { priority: '0.3', changefreq: 'yearly' }
  if (route.startsWith('/blog/')) return { priority: '0.6', changefreq: 'monthly' }
  if (route.startsWith('/tools/')) return { priority: '0.8', changefreq: 'monthly' }
  // Anything genuinely new and unrecognized still gets included, rather
  // than silently dropped, with a conservative default weighting.
  return { priority: '0.5', changefreq: 'monthly' }
}

function buildSitemap(routes) {
  const urlEntries = routes
    .map((route) => {
      const { priority, changefreq } = metaFor(route)
      return `  <url>\n    <loc>${SITE_URL}${route}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<!--
  Generated automatically by scripts/generate-sitemap.mjs from
  scripts/routeList.mjs — do not hand-edit; add or change tools in
  src/data/tools.js and re-run \`npm run build\` instead.

  Excluded on purpose:
    - /dashboard/* (requires login, marked noindex in-page too)
    - /verify-email, /reset-password, /check-email (token-based/transactional,
      marked noindex in-page)

  /login and /register are included deliberately: the forms themselves
  are fine to index (someone searching "toolhub login" should find this
  page); it's only the token-based pages above that are excluded.

  Known gap: blog posts published live through the Admin Blog CMS
  (stored in MongoDB) aren't included here yet, since this reads the
  static src/data/blog.js file, not the live database. See the comment
  at the top of generate-sitemap.mjs.
-->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`
}

function main() {
  // Tools individually flagged noIndex: true in tools.js (currently the
  // handful of pure-novelty fun tools with a <meta name="robots"
  // content="noindex"> tag of their own) are deliberately left out of
  // the sitemap — including a URL here is Google-facing "please index
  // this," which would directly contradict that page's own noindex
  // meta tag. They're still prerendered and fully functional for
  // anyone who visits directly; they're just not being submitted for
  // indexing alongside everything else.
  const noIndexedPaths = new Set(tools.filter((t) => t.noIndex).map((t) => t.path))
  const routes = [...new Set([...getAllPublicRoutes(), ...EXTRA_ROUTES])].filter((route) => !noIndexedPaths.has(route))
  const xml = buildSitemap(routes)
  fs.writeFileSync(OUTPUT_PATH, xml, 'utf-8')
  console.log(`Sitemap generated: ${routes.length} URLs written to public/sitemap.xml`)
}

main()
