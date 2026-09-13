import dns from 'dns'
import { ApiError } from '../utils/ApiError.js'

const dnsPromises = dns.promises

const RECORD_TYPES = ['A', 'AAAA', 'MX', 'TXT', 'NS', 'CNAME']

/**
 * Looks up multiple DNS record types for a domain. Each record type is
 * queried independently and a type simply not existing for a domain
 * (a very normal, common case - most domains don't have every record
 * type) is treated as an empty result for that type, not an error for
 * the whole lookup.
 */
export async function lookupDns(domain) {
  const results = {}
  await Promise.all(
    RECORD_TYPES.map(async (type) => {
      try {
        if (type === 'A') results.A = await dnsPromises.resolve4(domain)
        else if (type === 'AAAA') results.AAAA = await dnsPromises.resolve6(domain)
        else if (type === 'MX') results.MX = await dnsPromises.resolveMx(domain)
        else if (type === 'TXT') results.TXT = (await dnsPromises.resolveTxt(domain)).map((t) => t.join(''))
        else if (type === 'NS') results.NS = await dnsPromises.resolveNs(domain)
        else if (type === 'CNAME') results.CNAME = await dnsPromises.resolveCname(domain)
      } catch {
        results[type] = []
      }
    })
  )
  const hasAnyRecords = Object.values(results).some((r) => r.length > 0)
  if (!hasAnyRecords) throw ApiError.badRequest('No DNS records found for this domain \u2014 check that it\u2019s spelled correctly.')
  return results
}

function normalizeUrl(url) {
  const trimmed = url.trim()
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`
  return trimmed
}

/**
 * Fetches a URL's response headers. A HEAD request is tried first
 * since it's lighter (no response body transferred), falling back to
 * GET for servers that don't support HEAD correctly, which is a real,
 * common enough case to handle rather than just failing.
 */
export async function checkHttpHeaders(url) {
  const targetUrl = normalizeUrl(url)
  let response
  try {
    response = await fetch(targetUrl, { method: 'HEAD', redirect: 'follow' })
  } catch {
    try {
      response = await fetch(targetUrl, { method: 'GET', redirect: 'follow' })
    } catch (err) {
      throw ApiError.badRequest('Could not reach this URL \u2014 check that it\u2019s correct and publicly accessible.')
    }
  }
  const headers = {}
  response.headers.forEach((value, key) => {
    headers[key] = value
  })
  return { status: response.status, statusText: response.statusText, finalUrl: response.url, headers }
}

/**
 * Follows a URL's redirect chain manually (one hop at a time, rather
 * than letting fetch silently follow them all) so every intermediate
 * hop and its status code can be reported, not just the final
 * destination.
 */
export async function checkRedirectChain(url) {
  const chain = []
  let currentUrl = normalizeUrl(url)
  const maxHops = 10

  for (let i = 0; i < maxHops; i++) {
    let response
    try {
      response = await fetch(currentUrl, { method: 'HEAD', redirect: 'manual' })
    } catch (err) {
      throw ApiError.badRequest('Could not reach this URL \u2014 check that it\u2019s correct and publicly accessible.')
    }
    chain.push({ url: currentUrl, status: response.status })
    const location = response.headers.get('location')
    if (response.status >= 300 && response.status < 400 && location) {
      currentUrl = new URL(location, currentUrl).toString()
    } else {
      break
    }
  }
  return { chain, finalUrl: currentUrl, hopCount: chain.length }
}
