import User from '../models/User.js'
import ConversionHistory from '../models/ConversionHistory.js'

function startOfToday() {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

function startOfWeek() {
  const date = startOfToday()
  const day = date.getDay() // 0 = Sunday
  date.setDate(date.getDate() - day)
  return date
}

function startOfMonth() {
  const date = new Date()
  date.setDate(1)
  date.setHours(0, 0, 0, 0)
  return date
}

async function getUserCounts() {
  const [total, daily, monthly] = await Promise.all([
    User.countDocuments({}),
    User.countDocuments({ lastActiveAt: { $gte: startOfToday() } }),
    User.countDocuments({ lastActiveAt: { $gte: startOfMonth() } }),
  ])
  return { total, daily, monthly }
}

/**
 * New account registrations — distinct from getUserCounts() above, which
 * measures *activity* (lastActiveAt), not signups. Both are useful for
 * different reasons: activity shows how many people are currently using
 * the site, this shows how fast the user base itself is growing.
 */
async function getNewUserCounts() {
  const [today, week, month] = await Promise.all([
    User.countDocuments({ createdAt: { $gte: startOfToday() } }),
    User.countDocuments({ createdAt: { $gte: startOfWeek() } }),
    User.countDocuments({ createdAt: { $gte: startOfMonth() } }),
  ])
  return { today, week, month }
}

async function getConversionCounts() {
  const [total, today, week, month] = await Promise.all([
    ConversionHistory.countDocuments({}),
    ConversionHistory.countDocuments({ createdAt: { $gte: startOfToday() } }),
    ConversionHistory.countDocuments({ createdAt: { $gte: startOfWeek() } }),
    ConversionHistory.countDocuments({ createdAt: { $gte: startOfMonth() } }),
  ])
  return { total, today, week, month }
}

async function getMostUsedTools(limit = 5) {
  return ConversionHistory.aggregate([
    { $group: { _id: { slug: '$toolSlug', name: '$toolName' }, count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: limit },
    { $project: { _id: 0, toolSlug: '$_id.slug', toolName: '$_id.name', count: 1 } },
  ])
}

async function getMostUsedCategories(limit = 5) {
  return ConversionHistory.aggregate([
    { $match: { category: { $ne: null, $ne: '' } } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: limit },
    { $project: { _id: 0, category: '$_id', count: 1 } },
  ])
}

async function getCountryBreakdown(limit = 10) {
  return ConversionHistory.aggregate([
    { $group: { _id: '$country', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: limit },
    { $project: { _id: 0, country: '$_id', count: 1 } },
  ])
}

async function getDeviceBreakdown() {
  return ConversionHistory.aggregate([
    { $group: { _id: '$device', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $project: { _id: 0, device: '$_id', count: 1 } },
  ])
}

/**
 * One combined call for the admin Analytics Dashboard — runs every
 * aggregation in parallel rather than making the frontend fire off six
 * separate requests.
 */
export async function getDashboardOverview() {
  const [users, newUsers, conversions, topTools, topCategories, countries, devices] = await Promise.all([
    getUserCounts(),
    getNewUserCounts(),
    getConversionCounts(),
    getMostUsedTools(),
    getMostUsedCategories(),
    getCountryBreakdown(),
    getDeviceBreakdown(),
  ])

  return {
    users,
    newUsers,
    conversions,
    topTools,
    topCategories,
    countries,
    devices,
  }
}
