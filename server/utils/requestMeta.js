/**
 * x-forwarded-for is the standard header Vercel (and virtually every
 * reverse proxy) sets to the real client IP, since the connection
 * reaching the server itself is from the proxy, not the visitor
 * directly. It can contain a comma-separated chain if multiple proxies
 * were involved — the first entry is the original client. Falls back
 * to the raw socket address for local development, where there's no
 * proxy in front of the server at all.
 */
export function getClientIp(req) {
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
