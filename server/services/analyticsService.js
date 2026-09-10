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

const RANGE_DAYS = { today: 1, '7d': 7, '30d': 30, '90d': 90, '1y': 365 }

/**
 * Real hour-by-hour conversion counts for today (00:00 through the
 * current hour) — used specifically for the 'today' range, where a
 * single daily bucket would be too little detail to chart meaningfully.
 * Every hour up to the current one is filled in explicitly, including
 * zero-count hours, same reasoning as getDailyActivity below.
 */
async function getHourlyActivityToday() {
  const since = startOfToday()
  const rows = await ConversionHistory.aggregate([
    { $match: { createdAt: { $gte: since } } },
    { $group: { _id: { $hour: '$createdAt' }, count: { $sum: 1 } } },
  ])
  const countByHour = Object.fromEntries(rows.map((row) => [row._id, row.count]))
  const currentHour = new Date().getHours()

  const result = []
  for (let h = 0; h <= currentHour; h += 1) {
    result.push({ date: `${String(h).padStart(2, '0')}:00`, count: countByHour[h] || 0 })
  }
  return result
}

/**
 * Real per-week conversion counts for the last `weeks` 7-day buckets —
 * used for the '1y' range, where 365 individual daily points would be
 * too cluttered to read on a line chart. Built from the same daily
 * query as getDailyActivity, summed into 7-day buckets in application
 * code (simpler and more reliable than grouping by ISO week number in
 * the database, which has its own edge cases at year boundaries).
 */
async function getWeeklyActivity(weeks) {
  const totalDays = weeks * 7
  const daily = await getDailyActivity(totalDays)
  const result = []
  for (let i = 0; i < weeks; i += 1) {
    const bucket = daily.slice(i * 7, i * 7 + 7)
    const count = bucket.reduce((sum, d) => sum + d.count, 0)
    const label = bucket[0]?.date
    result.push({ date: label, count })
  }
  return result
}

/**
 * Picks the right bucketing (hourly/daily/weekly) for a given range
 * key, so the chart stays readable regardless of how wide a span is
 * selected — this is a UX judgment call, not a fixed backend contract:
 * 'today' needs hour-level detail to show anything at all, '1y' needs
 * weekly summarizing to avoid 365 illegibly-packed points, and
 * everything in between reads fine as daily points.
 */
async function getActivityForRange(range) {
  if (range === 'today') return getHourlyActivityToday()
  if (range === '1y') return getWeeklyActivity(52)
  const days = RANGE_DAYS[range] || 30
  return getDailyActivity(days)
}

/**
 * Real percentage change between the selected range and the equal-length
 * period immediately before it — generalizes the week-over-week /
 * month-over-month comparisons below to work for any selected range.
 * 'today' compares today-so-far against the same hours yesterday, so
 * the comparison is genuinely apples-to-apples rather than comparing a
 * partial day against a full one.
 */
async function getActivityTrendForRange(range) {
  if (range === 'today') {
    const now = new Date()
    const todayStart = startOfToday()
    const yesterdayStart = daysAgo(1)
    const [today, yesterdaySoFar] = await Promise.all([
      ConversionHistory.countDocuments({ createdAt: { $gte: todayStart } }),
      ConversionHistory.countDocuments({
        createdAt: { $gte: yesterdayStart, $lt: new Date(yesterdayStart.getTime() + (now - todayStart)) },
      }),
    ])
    return { current: today, previous: yesterdaySoFar, percentChange: percentChange(today, yesterdaySoFar) }
  }

  const days = range === '1y' ? 365 : RANGE_DAYS[range] || 30
  const currentStart = daysAgo(days - 1)
  const previousStart = daysAgo(days * 2 - 1)
  const [current, previous] = await Promise.all([
    ConversionHistory.countDocuments({ createdAt: { $gte: currentStart } }),
    ConversionHistory.countDocuments({ createdAt: { $gte: previousStart, $lt: currentStart } }),
  ])
  return { current, previous, percentChange: percentChange(current, previous) }
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
 * Real per-day new-user signup counts, mirroring getDailyActivity
 * above exactly but against the User collection's own createdAt -
 * powers genuinely real KPI card sparklines (Total Users, New This
 * Week) instead of decorative fabricated data. Active-user history
 * isn't included here since that would need a separate day-by-day
 * lastActiveAt tracking mechanism the current schema doesn't keep.
 */
async function getDailyNewUsers(days = 7) {
  const since = daysAgo(days - 1)
  const rows = await User.aggregate([
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

/**
 * Month-over-month equivalent of getConversionTrend above - kept
 * separate rather than reused, since the "Conversions This Month" KPI
 * card needs a trend that's actually accurate to its own stated period,
 * not a week-based number relabeled as monthly.
 */
async function getConversionMonthTrend() {
  const thisMonthStart = startOfMonth()
  const lastMonthStart = new Date(thisMonthStart)
  lastMonthStart.setMonth(lastMonthStart.getMonth() - 1)
  const [thisMonth, lastMonth] = await Promise.all([
    ConversionHistory.countDocuments({ createdAt: { $gte: thisMonthStart } }),
    ConversionHistory.countDocuments({ createdAt: { $gte: lastMonthStart, $lt: thisMonthStart } }),
  ])
  return { thisMonth, lastMonth, percentChange: percentChange(thisMonth, lastMonth) }
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

/**
 * Usage counts for every tool that has at least one recorded use, with a
 * toggleable sort direction - powers the admin Tools table's sortable
 * "Recent usage" column, which needs the full ranking (not just a top-N
 * slice like getMostUsedTools above) so the list can be reordered without
 * hiding anything.
 */
export async function getAllToolsUsage(direction = 'desc') {
  const sortOrder = direction === 'asc' ? 1 : -1
  return ConversionHistory.aggregate([
    { $group: { _id: { slug: '$toolSlug', name: '$toolName' }, count: { $sum: 1 } } },
    { $sort: { count: sortOrder } },
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

const VALID_RANGES = ['today', '7d', '30d', '90d', '1y']

export async function getDashboardOverview(range = '30d') {
  const safeRange = VALID_RANGES.includes(range) ? range : '30d'

  const [
    users,
    newUsers,
    conversions,
    topTools,
    topCategories,
    countries,
    devices,
    dailyActivity,
    activityTrend,
    newUserTrend,
    conversionTrend,
    conversionMonthTrend,
    dailyNewUsers,
    fixed30DayActivity,
  ] = await Promise.all([
    getUserCounts(),
    getNewUserCounts(),
    getConversionCounts(),
    getMostUsedTools(),
    getMostUsedCategories(),
    getCountryBreakdown(),
    getDeviceBreakdown(),
    getActivityForRange(safeRange),
    getActivityTrendForRange(safeRange),
    getNewUserTrend(),
    getConversionTrend(),
    getConversionMonthTrend(),
    getDailyNewUsers(30),
    getDailyActivity(30),
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
    dailyNewUsers,
    // Fixed 30-day conversion history for the "Conversions This Month"
    // KPI card sparkline specifically - kept independent of the range
    // selector above, since that card's own stated period ("This
    // Month") doesn't change just because the main chart's range does.
    fixed30DayActivity,
    range: safeRange,
    // conversionTrend is kept for backward compatibility with anything
    // still reading the old week-over-week field name; activityTrend is
    // the new range-aware equivalent the redesigned chart badge uses.
    conversionTrend,
    conversionMonthTrend,
    activityTrend,
    newUserTrend,
  }
}
