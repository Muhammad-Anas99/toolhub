import React, { useEffect, useState } from 'react'
import {
  HiOutlineUsers,
  HiOutlineChartBarSquare,
  HiOutlineGlobeAmericas,
  HiOutlineDevicePhoneMobile,
  HiOutlineComputerDesktop,
  HiOutlineDeviceTablet,
  HiOutlineSparkles,
  HiOutlineBolt,
  HiOutlineWrenchScrewdriver,
  HiOutlineLightBulb,
  HiOutlineSwatch,
} from 'react-icons/hi2'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import Sparkline from '../../components/admin/Sparkline.jsx'
import ActivityChart from '../../components/admin/ActivityChart.jsx'
import TrendBadge from '../../components/admin/TrendBadge.jsx'
import DonutChart from '../../components/admin/DonutChart.jsx'
import DateRangeSelector from '../../components/admin/DateRangeSelector.jsx'
import { api } from '../../lib/api.js'
import { getCategoryBySlug } from '../../data/categories.js'
import { getToolBySlug } from '../../data/tools.js'
import { getCountryName, getCountryFlagEmoji } from '../../lib/countryUtils.js'

const ACCENTS = {
  brand: { bg: 'bg-brand-50 dark:bg-brand-950', text: 'text-brand-600 dark:text-brand-400', stroke: 'stroke-brand-500 text-brand-500' },
  violet: { bg: 'bg-violet-50 dark:bg-violet-950', text: 'text-violet-600 dark:text-violet-400', stroke: 'stroke-violet-500 text-violet-500' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-950', text: 'text-amber-600 dark:text-amber-400', stroke: 'stroke-amber-500 text-amber-500' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950', text: 'text-emerald-600 dark:text-emerald-400', stroke: 'stroke-emerald-500 text-emerald-500' },
}

const RANGE_LABELS = {
  today: 'today',
  '7d': 'the last 7 days',
  '30d': 'the last 30 days',
  '90d': 'the last 90 days',
  '1y': 'the last year',
}

function KpiCard({ label, value, icon: Icon, sublabel, accent, trend, sparklinePoints }) {
  const colors = ACCENTS[accent]
  return (
    <article className="card p-5">
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}>
          <Icon className="h-5 w-5" />
        </div>
        {trend !== undefined && trend !== null && <TrendBadge percentChange={trend} />}
      </div>
      <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{value ?? '\u2014'}</p>
      <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">{label}</p>
      {sublabel && <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{sublabel}</p>}
      {sparklinePoints && sparklinePoints.length >= 2 && (
        <div className="mt-2">
          <Sparkline points={sparklinePoints} colorClassName={colors.stroke} />
        </div>
      )}
    </article>
  )
}

function DeviceIcon({ device }) {
  if (device === 'mobile') return <HiOutlineDevicePhoneMobile className="h-4 w-4" />
  if (device === 'tablet') return <HiOutlineDeviceTablet className="h-4 w-4" />
  return <HiOutlineComputerDesktop className="h-4 w-4" />
}

export default function AdminOverview() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [range, setRange] = useState('30d')

  useEffect(() => {
    setData(null)
    api
      .adminGetAnalyticsOverview(range)
      .then(({ data: overview }) => setData(overview))
      .catch((err) => setError(err.message || 'Could not load analytics.'))
  }, [range])

  const categorySegments = data?.topCategories?.map((row) => ({
    label: getCategoryBySlug(row.category)?.name || row.category,
    value: row.count,
  }))
  const categoryTotal = categorySegments?.reduce((sum, s) => sum + s.value, 0)

  const dailyPoints = data?.dailyActivity?.map((d) => d.count)
  const labelEvery = data?.dailyActivity ? Math.max(1, Math.ceil(data.dailyActivity.length / 7)) : 1
  const dayLabels = data?.dailyActivity?.map((d, i) =>
    i % labelEvery === 0 || i === data.dailyActivity.length - 1
      ? range === 'today'
        ? d.date
        : new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : ''
  )

  // Genuinely real cumulative growth line for the Total Users card,
  // derived from actual daily signups (not a fabricated trend) -
  // running sums never decrease, which is an accurate visual shape for
  // "how many total users existed on each of the last 30 days".
  let running = 0
  const totalUsersSparkline = data?.dailyNewUsers?.map((d) => (running += d.count))
  const newUsersWeekSparkline = data?.dailyNewUsers?.slice(-7).map((d) => d.count)
  const conversionsMonthSparkline = data?.fixed30DayActivity?.map((d) => d.count)

  const devicesWithPercent = data?.devices?.length
    ? (() => {
        const total = data.devices.reduce((sum, d) => sum + d.count, 0) || 1
        return data.devices.map((d) => ({ ...d, percent: Math.round((d.count / total) * 100) }))
      })()
    : []
  const topDevice = devicesWithPercent.length
    ? devicesWithPercent.reduce((max, d) => (d.count > max.count ? d : max), devicesWithPercent[0])
    : null

  return (
    <>
      <SEO title="Admin — Overview" description="ToolHub admin analytics." canonicalPath="/admin" noIndex />

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Here&rsquo;s what&rsquo;s happening with your ToolHub platform.
          </p>
        </div>
        <DateRangeSelector value={range} onChange={setRange} />
      </div>

      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

      {!data && !error && <p className="text-sm text-slate-400 dark:text-slate-500">Loading analytics...</p>}

      {data && (
        <div className="space-y-6">
          <section aria-label="Key metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              label="Total Users"
              value={data.users.total}
              icon={HiOutlineUsers}
              accent="brand"
              sublabel="All-time"
              sparklinePoints={totalUsersSparkline}
            />
            <KpiCard
              label="New This Week"
              value={data.newUsers.week}
              icon={HiOutlineSparkles}
              accent="violet"
              trend={data.newUserTrend?.percentChange}
              sublabel={`${data.newUsers.today} today`}
              sparklinePoints={newUsersWeekSparkline}
            />
            <KpiCard
              label="Active This Month"
              value={data.users.monthly}
              icon={HiOutlineBolt}
              accent="amber"
              sublabel="Signed in this month"
            />
            <KpiCard
              label="Conversions This Month"
              value={data.conversions.month}
              icon={HiOutlineChartBarSquare}
              accent="emerald"
              trend={data.conversionMonthTrend?.percentChange}
              sublabel={`${data.conversions.today} today \u00b7 ${data.conversions.week} this week`}
              sparklinePoints={conversionsMonthSparkline}
            />
          </section>

          <section aria-label="Site activity and most-used tools" className="grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]">
            <article className="card overflow-hidden p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                    <HiOutlineChartBarSquare className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Site Activity</h2>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Total visits over {RANGE_LABELS[range] || 'the selected period'}
                    </p>
                  </div>
                </div>
                <TrendBadge percentChange={data.activityTrend?.percentChange} />
              </div>
              <div className="mt-4">
                <ActivityChart points={dailyPoints} labels={dayLabels} />
              </div>
            </article>

            <article className="card p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HiOutlineWrenchScrewdriver className="h-4 w-4 text-slate-400" />
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Most-used Tools</h2>
                </div>
                <a href="/admin/tools" className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-400">
                  View All
                </a>
              </div>
              {data.topTools && data.topTools.length > 0 ? (
                <ul className="mt-4 space-y-4">
                  {data.topTools.map((row, index) => {
                    const max = data.topTools[0].count || 1
                    const percent = Math.round((row.count / max) * 100)
                    const Icon = getToolBySlug(row.toolSlug)?.icon
                    return (
                      <li key={row.toolSlug || index} className="flex items-center gap-3">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          {index + 1}
                        </span>
                        {Icon && (
                          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="truncate font-medium text-slate-700 dark:text-slate-300">{row.toolName || 'Unknown'}</span>
                            <span className="flex-shrink-0 text-slate-400 dark:text-slate-500">{row.count}</span>
                          </div>
                          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                            <div className="h-full rounded-full bg-brand-500" style={{ width: `${percent}%` }} />
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-slate-400 dark:text-slate-500">No conversions logged yet.</p>
              )}
            </article>
          </section>

          <section aria-label="Categories, countries and devices" className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <article className="card p-5">
              <div className="flex items-center gap-2">
                <HiOutlineSwatch className="h-4 w-4 text-slate-400" />
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Most-used Categories</h2>
              </div>
              {categorySegments && categorySegments.length > 0 ? (
                <div className="mt-5">
                  <DonutChart segments={categorySegments} centerValue={categoryTotal} centerLabel="conversions" />
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-400 dark:text-slate-500">No conversions logged yet.</p>
              )}
            </article>

            <article className="card p-5">
              <div className="flex items-center gap-2">
                <HiOutlineGlobeAmericas className="h-4 w-4 text-slate-400" />
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Top Countries</h2>
              </div>
              {data.countries?.length > 0 ? (
                <ul className="mt-4 space-y-2.5">
                  {data.countries.map((row) => {
                    const name = getCountryName(row.country)
                    const flag = getCountryFlagEmoji(row.country)
                    return (
                      <li key={row.country || 'unknown'} className="flex items-center gap-2.5 text-sm">
                        {flag ? (
                          <span aria-hidden="true" className="text-base leading-none">
                            {flag}
                          </span>
                        ) : (
                          <HiOutlineGlobeAmericas className="h-4 w-4 flex-shrink-0 text-slate-300 dark:text-slate-600" aria-hidden="true" />
                        )}
                        <span className="min-w-0 flex-1 truncate text-slate-600 dark:text-slate-300">{name}</span>
                        <span className="flex-shrink-0 text-slate-400 dark:text-slate-500">{row.count}</span>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-slate-400 dark:text-slate-500">No data yet.</p>
              )}
            </article>

            <article className="card p-5">
              <div className="flex items-center gap-2">
                <HiOutlineDevicePhoneMobile className="h-4 w-4 text-slate-400" />
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Devices</h2>
              </div>
              {devicesWithPercent.length > 0 ? (
                <>
                  <div className="mt-4 space-y-4">
                    {devicesWithPercent.map((row) => (
                      <div key={row.device || 'unknown'}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 capitalize text-slate-600 dark:text-slate-300">
                            <DeviceIcon device={row.device} />
                            {row.device || 'Unknown'}
                          </span>
                          <span className="text-slate-400 dark:text-slate-500">
                            {row.count} <span className="ml-1 text-xs">({row.percent}%)</span>
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                          <div className="h-full rounded-full bg-brand-500" style={{ width: `${row.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {topDevice && (
                    <div className="mt-4 flex gap-2.5 rounded-xl bg-brand-50/70 p-3.5 dark:bg-brand-950/40">
                      <HiOutlineLightBulb className="h-4.5 w-4.5 flex-shrink-0 text-brand-500" />
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        <span className="font-semibold text-slate-800 dark:text-white">Great engagement! </span>
                        <span className="capitalize">{topDevice.device}</span> users are your largest audience (
                        {topDevice.percent}% of total).
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <p className="mt-4 text-sm text-slate-400 dark:text-slate-500">No data yet.</p>
              )}
            </article>
          </section>
        </div>
      )}
    </>
  )
}
