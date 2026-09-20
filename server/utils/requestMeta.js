/**
 * cf-connecting-ip is the header Cloudflare itself sets to the genuine
 * visitor IP, and Cloudflare's own documentation explicitly recommends
 * reading it in preference to x-forwarded-for specifically because it's
 * a single, authoritative value Cloudflare sets itself — never a chain
 * to parse or trust a position within. x-forwarded-for, by contrast,
 * can already contain earlier hops from before the request ever reached
 * Cloudflare, and Cloudflare appends the confirmed client IP to the END
 * of that existing chain rather than the front, meaning code that
 * blindly takes the first entry (a reasonable assumption for a simple,
 * single-hop reverse proxy with no CDN involved) can end up reading an
 * earlier, less trustworthy hop instead of the address Cloudflare
 * itself just confirmed. Falls back to the original x-forwarded-for
 * parsing, and finally the raw socket address, for any request that
 * doesn't arrive through Cloudflare at all (local development, or if
 * the proxy setup ever changes).
 */
export function getClientIp(req) {
  const cfConnectingIp = req.headers['cf-connecting-ip']
  if (cfConnectingIp) return cfConnectingIp.trim()

  const forwarded = req.headers['x-forwarded-for']
  if (forwarded) return forwarded.split(',')[0].trim()

  return req.socket?.remoteAddress || 'Unknown'
}

/**
 * Vercel automatically sets `x-vercel-ip-country` on every request that
 * reaches a serverless function — no external geolocation service needed.
 * Falls back to 'Unknown' when running elsewhere (local dev, other hosts).
 */
export function getCountry(req) {
  return req.headers['x-vercel-ip-country'] || 'Unknown'
}

/**
 * Lightweight User-Agent sniffing — good enough for rough analytics
 * (desktop vs mobile vs tablet breakdown), not meant to be bulletproof
 * device detection. Deliberately dependency-free.
 */
export function getDeviceType(req) {
  const ua = req.headers['user-agent'] || ''

  if (/tablet|ipad/i.test(ua)) return 'tablet'
  if (/mobile|android|iphone/i.test(ua)) return 'mobile'
  if (ua) return 'desktop'
  return 'unknown'
}

/**
 * Matches User-Agent strings against well-known search engine crawlers,
 * social-media link-preview fetchers, SEO/monitoring bots, and common
 * scripting-library default User-Agents — used to exclude this traffic
 * from being logged as a genuine tool "use" at all. A crawler rendering
 * a tool page (which Google's indexer genuinely does, to see the same
 * content a visitor would) looks identical to a real visitor at the
 * page-load level; the only reliable signal available server-side to
 * tell them apart is the User-Agent string itself declaring what it is,
 * which every well-behaved crawler does honestly, precisely so sites
 * can identify and, when appropriate, treat it differently from real
 * visitor traffic. This can't catch a crawler that deliberately spoofs
 * a real browser's User-Agent (a minority, and mostly the kind of bad
 * actor no User-Agent check would stop anyway), but it correctly
 * excludes the overwhelming majority of legitimate, honestly-identified
 * crawler and bot traffic that would otherwise inflate usage numbers.
 */
const BOT_USER_AGENT_PATTERN =
  /bot|crawler|spider|slurp|googlebot|bingbot|yandexbot|duckduckbot|baiduspider|sogou|exabot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|slackbot|ahrefsbot|semrushbot|mj12bot|dotbot|petalbot|applebot|pinterest|redditbot|headlesschrome|phantomjs|puppeteer|playwright|python-requests|python-urllib|curl\/|wget\/|go-http-client|okhttp|java\/|libwww-perl|scrapy|node-fetch|axios\/|postmanruntime/i

export function isLikelyBot(req) {
  const ua = req.headers['user-agent'] || ''
  // No User-Agent at all is itself a strong signal — every real browser
  // sends one; its absence is far more common in scripted requests than
  // in genuine visits.
  if (!ua) return true
  return BOT_USER_AGENT_PATTERN.test(ua)
}
