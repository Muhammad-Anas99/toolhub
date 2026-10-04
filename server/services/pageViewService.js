import PageView from '../models/PageView.js'
import { createdAtMatchForRange } from './analyticsService.js'
import {
  uniqueVisitorsPipeline,
  topPagesPipeline,
  topCountriesPipeline,
  visitorsPipeline,
} from './pageViewPipelines.js'

export async function logPageView({ path, country, city, ipAddress }) {
  return PageView.create({ path, country, city, ipAddress })
}

// Page views are deleted after 90 days (see the TTL index on the model),
// so "last year" and "lifetime" would silently show at most 90 days of
// data under a label promising more - they're deliberately not offered.
export const PAGE_VIEW_RANGES = ['today', 'yesterday', '7d', '30d', '90d']

export function normalizeRange(range) {
  return PAGE_VIEW_RANGES.includes(range) ? range : '7d'
}

export async function getPageViewSummary(range) {
  const match = createdAtMatchForRange(range)
  const [totalViews, visitorRows, topPages, topCountries] = await Promise.all([
    PageView.countDocuments(match),
    PageView.aggregate(uniqueVisitorsPipeline(match)),
    PageView.aggregate(topPagesPipeline(match)),
    PageView.aggregate(topCountriesPipeline(match)),
  ])
  return {
    totalViews,
    uniqueVisitors: visitorRows[0]?.n || 0,
    topPages,
    topCountries,
  }
}

export async function getVisitors(range, { page = 1, limit = 25 } = {}) {
  const match = createdAtMatchForRange(range)
  const skip = (page - 1) * limit
  const [result] = await PageView.aggregate(visitorsPipeline(match, { skip, limit }))
  const total = result?.total?.[0]?.n || 0
  return {
    visitors: result?.rows || [],
    total,
    page,
    limit,
    pages: Math.max(1, Math.ceil(total / limit)),
  }
}
