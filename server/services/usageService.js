import User from '../models/User.js'
import ConversionHistory from '../models/ConversionHistory.js'

/**
 * Foundation for future usage limits and AI credits (Phase 7 prep) — not
 * wired into any enforcement path yet. Nothing here blocks a tool, denies
 * a request, or deducts anything; every function is read-only.
 *
 * Deliberately built on top of the existing ConversionHistory collection
 * rather than introducing a second, separate usage-tracking mechanism —
 * ConversionHistory already records exactly what's needed (user, tool,
 * category, timestamp) for every conversion, on both free and any future
 * paid tool. Adding a duplicate counter that has to be kept in sync with
 * it would just be another way for the numbers to drift apart, the same
 * class of bug fixed for the tools data (see server/utils/seedData.js).
 */

function startOfToday() {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

function startOfMonth() {
  const date = new Date()
  date.setDate(1)
  date.setHours(0, 0, 0, 0)
  return date
}

/**
 * A given user's own usage — total, today, and this month — plus their
 * current plan and credit balance. Intended for a future "usage" panel
 * in the user dashboard and for future rate-limiting logic once AI tools
 * actually go live; not read by anything active today.
 */
export async function getUserUsageStats(userId) {
  const [user, total, today, month] = await Promise.all([
    User.findById(userId).select('plan credits'),
    ConversionHistory.countDocuments({ user: userId }),
    ConversionHistory.countDocuments({ user: userId, createdAt: { $gte: startOfToday() } }),
    ConversionHistory.countDocuments({ user: userId, createdAt: { $gte: startOfMonth() } }),
  ])

  return {
    plan: user?.plan || 'free',
    credits: user?.credits || 0,
    usage: { total, today, month },
  }
}

/**
 * Per-tool usage for one user — which tools they actually use and how
 * often. Useful for a future "your most-used tools" panel, and for
 * per-tool rate limiting once that's needed.
 */
export async function getUserToolUsage(userId) {
  return ConversionHistory.aggregate([
    { $match: { user: userId } },
    { $group: { _id: { slug: '$toolSlug', name: '$toolName' }, count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $project: { _id: 0, toolSlug: '$_id.slug', toolName: '$_id.name', count: 1 } },
  ])
}
