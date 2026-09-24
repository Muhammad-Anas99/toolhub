/**
 * ToolHub service worker — provides offline access to pages you've
 * already visited, plus the static app shell needed to render anything
 * at all. Deliberately does NOT precache all ~193 tool pages upfront —
 * that would mean a large forced download before the site even
 * finishes its first real load, working against the same "loads
 * instantly" priority every tool on this site is built around.
 * Instead, pages are cached progressively as you actually visit them,
 * so "the tools I've actually used" become available offline over
 * time, without a heavy upfront cost for pages you may never open.
 *
 * Three deliberately different strategies, by request type:
 *
 * 1. API requests (same-origin /api/... or the configured backend
 *    origin) — network-only, never cached. Auth, history logging, and
 *    admin data must always be live-or-fail, never silently served
 *    stale from a cache — that's a correctness and security concern,
 *    not just a freshness preference.
 *
 * 2. Navigation requests (loading a page/tool/blog post) —
 *    network-first, falling back to cache only when the network
 *    genuinely fails (offline, or a request timeout). This site's
 *    content changes often (new tools, content fixes), so a visitor
 *    who's online should always get the current version; the cache
 *    exists specifically for when there's no network at all, not as a
 *    speed shortcut that could serve outdated content over fresh.
 *
 * 3. Static assets (JS/CSS bundles, fonts, icons) — cache-first. Vite
 *    fingerprints these filenames by content hash, so a cached asset
 *    is guaranteed to still be correct for whatever HTML references
 *    it; there's no staleness risk the way there is for HTML/API data.
 */

const CACHE_NAME = 'toolhub-cache-v1'

// Bumping CACHE_NAME on a future deploy (v2, v3, ...) is the deliberate
// mechanism for invalidating old cached assets - the activate handler
// below deletes any cache whose name doesn't match the current one.
const STATIC_ASSET_EXTENSIONS = [
  '.js',
  '.css',
  '.woff',
  '.woff2',
  '.ttf',
  '.png',
  '.jpg',
  '.jpeg',
  '.svg',
  '.ico',
  '.webp',
]

function isApiRequest(url) {
  return url.pathname.startsWith('/api/')
}

function isStaticAsset(url) {
  return STATIC_ASSET_EXTENSIONS.some((ext) => url.pathname.endsWith(ext))
}

self.addEventListener('install', (event) => {
  // Activate this new service worker immediately rather than waiting
  // for every open tab to close first - appropriate here since this
  // worker doesn't do any one-time setup that could conflict with an
  // already-running previous version mid-request.
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)

  // Only ever handle same-origin GET requests - anything else (a
  // cross-origin request to an external API, a POST, etc.) is left
  // completely untouched, passing through to the network exactly as it
  // would with no service worker installed at all.
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return
  }

  if (isApiRequest(url)) {
    // Network-only, explicitly not cached - see the file header for why.
    return
  }

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstWithCacheFallback(request))
    return
  }

  if (isStaticAsset(url)) {
    event.respondWith(cacheFirstWithNetworkFallback(request))
  }
})

async function networkFirstWithCacheFallback(request) {
  try {
    const response = await fetch(request)
    if (response && response.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    const cached = await caches.match(request)
    if (cached) return cached
    // Genuinely offline, and this exact page was never visited before
    // (so there's nothing cached for it) - there's no meaningful
    // fallback beyond letting the browser show its own default offline
    // error, since fabricating a fake "page" here would be more
    // confusing than the browser's own standard offline message.
    throw new Error('Offline and no cached version of this page is available.')
  }
}

async function cacheFirstWithNetworkFallback(request) {
  const cached = await caches.match(request)
  if (cached) return cached

  const response = await fetch(request)
  if (response && response.ok) {
    const cache = await caches.open(CACHE_NAME)
    cache.put(request, response.clone())
  }
  return response
}
