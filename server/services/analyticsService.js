import User from '../models/User.js'
import ConversionHistory from '../models/ConversionHistory.js'

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

async function getUserCounts() {
  const [total, daily, monthly] = await Promise.all([
    User.countDocuments({}),
    User.countDocuments({ lastActiveAt: { $gte: startOfToday() } }),
    User.countDocuments({ lastActiveAt: { $gte: startOfMonth() } }),
  ])
  return { total, daily, monthly }
}

async function getConversionCounts() {
  return ConversionHistory.countDocuments({})
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
  const [users, totalConversions, topTools, topCategories, countries, devices] = await Promise.all([
    getUserCounts(),
    getConversionCounts(),
    getMostUsedTools(),
    getMostUsedCategories(),
    getCountryBreakdown(),
    getDeviceBreakdown(),
  ])

  return {
    users,
    conversions: { total: totalConversions },
    topTools,
    topCategories,
    countries,
    devices,
  }
}
