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
