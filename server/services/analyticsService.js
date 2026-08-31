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

function daysAgo(n) {
  const d = startOfToday()
  d.setDate(d.getDate() - n)
  return d
}

/**
 * Real per-day conversion counts for the last `days` days (including
 * today) — powers the usage-over-time chart on the admin dashboard.
 * Days with zero conversions are filled in explicitly (rather than
 * omitted) so the chart has a consistent number of points.
 */
async function getDailyActivity(days = 7) {
  const since = daysAgo(days - 1)
  const rows = await ConversionHistory.aggregate([
    { $match: { createdAt: { $gte: since } } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
  ])
  const countByDate = Object.fromEntries(rows.map((row) => [row._id, row.count]))

  const result = []
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = daysAgo(i)
    const key = date.toISOString().slice(0, 10)
    result.push({ date: key, count: countByDate[key] || 0 })
  }
  return result
}

/**
 * Real percentage change between two equal-length periods (this week vs
 * the week before it) — computed from actual counts, never a placeholder
 * or a hardcoded direction. Returns null when there's no prior-period
 * data to compare against (division by zero), so the UI can hide the
 * indicator rather than show a misleading "0%" or "+Infinity%".
 */
function percentChange(current, previous) {
  if (previous === 0) return null
  return Math.round(((current - previous) / previous) * 100)
}

async function getConversionTrend() {
  const thisWeekStart = startOfWeek()
  const lastWeekStart = daysAgo(startOfToday().getDay() + 7)
  const [thisWeek, lastWeek] = await Promise.all([
    ConversionHistory.countDocuments({ createdAt: { $gte: thisWeekStart } }),
    ConversionHistory.countDocuments({ createdAt: { $gte: lastWeekStart, $lt: thisWeekStart } }),
  ])
  return { thisWeek, lastWeek, percentChange: percentChange(thisWeek, lastWeek) }
}

async function getNewUserTrend() {
  const thisWeekStart = startOfWeek()
  const lastWeekStart = daysAgo(startOfToday().getDay() + 7)
  const [thisWeek, lastWeek] = await Promise.all([
    User.countDocuments({ createdAt: { $gte: thisWeekStart } }),
    User.countDocuments({ createdAt: { $gte: lastWeekStart, $lt: thisWeekStart } }),
  ])
  return { thisWeek, lastWeek, percentChange: percentChange(thisWeek, lastWeek) }
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
/**
 * Public-safe subset of the admin analytics — just aggregate counts and
 * which tools are most used, nothing that identifies any individual user.
 * Powers the homepage's Popular Tools and Trust sections with real data
 * instead of a hardcoded selection or invented numbers.
 */
export async function getPublicStats() {
  const [topTools, totalConversions, totalUsers] = await Promise.all([
    getMostUsedTools(8),
    ConversionHistory.countDocuments({}),
    User.countDocuments({}),
  ])

  return { topTools, totalConversions, totalUsers }
}

export async function getDashboardOverview() {
  const [users, newUsers, conversions, topTools, topCategories, countries, devices, dailyActivity, conversionTrend, newUserTrend] =
    await Promise.all([
      getUserCounts(),
      getNewUserCounts(),
      getConversionCounts(),
      getMostUsedTools(),
      getMostUsedCategories(),
      getCountryBreakdown(),
      getDeviceBreakdown(),
      getDailyActivity(30),
      getConversionTrend(),
      getNewUserTrend(),
    ])

  return {
    users,
    newUsers,
    conversions,
    topTools,
    topCategories,
    countries,
    devices,
    dailyActivity,
    conversionTrend,
    newUserTrend,
  }
}
