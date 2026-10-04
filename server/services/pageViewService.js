import PageView from '../models/PageView.js'

export async function logPageView({ path, country, city, ipAddress }) {
  return PageView.create({ path, country, city, ipAddress })
}

/**
 * Most recent page views, newest first, for the admin panel's live
 * list - a cursor-style page (skip/limit) rather than any aggregation,
 * since the admin view here is "what are people looking at right now",
 * not a rollup.
 */
export async function getRecentPageViews({ page = 1, limit = 50 } = {}) {
  const skip = (page - 1) * limit
  const [views, total] = await Promise.all([
    PageView.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    PageView.countDocuments(),
  ])
  return { views, total, page, limit, pages: Math.max(1, Math.ceil(total / limit)) }
}
