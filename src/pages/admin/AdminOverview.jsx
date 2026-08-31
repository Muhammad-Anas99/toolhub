import React, { useEffect, useState } from 'react'
import {
  HiOutlineUsers,
  HiOutlineChartBar,
  HiOutlineGlobeAmericas,
  HiOutlineDevicePhoneMobile,
  HiOutlineFire,
  HiOutlineUserPlus,
  HiOutlineCalendarDays,
} from 'react-icons/hi2'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import Sparkline from '../../components/admin/Sparkline.jsx'
import TrendBadge from '../../components/admin/TrendBadge.jsx'
import DonutChart from '../../components/admin/DonutChart.jsx'
import { api } from '../../lib/api.js'
import { getCategoryBySlug } from '../../data/categories.js'
import { getToolBySlug } from '../../data/tools.js'

const ACCENTS = {
  brand: { bg: 'bg-brand-50 dark:bg-brand-950', text: 'text-brand-600 dark:text-brand-400', stroke: 'stroke-brand-500' },
  violet: { bg: 'bg-violet-50 dark:bg-violet-950', text: 'text-violet-600 dark:text-violet-400', stroke: 'stroke-violet-500' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950', text: 'text-emerald-600 dark:text-emerald-400', stroke: 'stroke-emerald-500' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-950', text: 'text-amber-600 dark:text-amber-400', stroke: 'stroke-amber-500' },
}

function StatCard({ label, value, icon: Icon, sublabel, accent = 'brand', trend }) {
  const colors = ACCENTS[accent]
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && <TrendBadge percentChange={trend} />}
      </div>
      <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{value ?? '\u2014'}</p>
      <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
        {label}
      </p>
      {sublabel && <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{sublabel}</p>}
    </div>
  )
}

function RankedList({ title, rows, renderIcon, labelKey, countKey, emptyMessage }) {
  return (
    <div className="card p-5">
      <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h2>
      {rows && rows.length > 0 ? (
        <div className="mt-4 space-y-4">
          {rows.map((row, index) => {
            const max = rows[0][countKey] || 1
            const percent = Math.round((row[countKey] / max) * 100)
            return (
              <div key={row[labelKey] || index} className="flex items-center gap-3">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  {index + 1}
                </span>
                {renderIcon && renderIcon(row)}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate font-medium text-slate-700 dark:text-slate-300">
                      {row[labelKey] || 'Unknown'}
                    </span>
                    <span className="flex-shrink-0 text-slate-400 dark:text-slate-500">{row[countKey]}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-full rounded-full bg-brand-500" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-400 dark:text-slate-500">{emptyMessage}</p>
      )}
    </div>
  )
}

export default function AdminOverview() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .adminGetAnalyticsOverview()
      .then(({ data: overview }) => setData(overview))
      .catch((err) => setError(err.message || 'Could not load analytics.'))
  }, [])

  const categorySegments = data?.topCategories?.map((row) => ({
    label: getCategoryBySlug(row.category)?.name || row.category,
    value: row.count,
  }))

  const dailyPoints = data?.dailyActivity?.map((d) => d.count)
  // Only every 5th day gets a visible label - showing all 30 in the same
  // narrow space designed for 7 would be illegibly cramped. The sparkline
  // itself still plots every single real data point regardless.
  const dayLabels = data?.dailyActivity?.map((d, i) =>
    i % 5 === 0 || i === data.dailyActivity.length - 1
      ? new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : ''
  )

  return (
    <>
      <SEO title="Admin — Overview" description="ToolHub admin analytics." canonicalPath="/admin" noIndex />

      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

      {!data && !error && <p className="text-sm text-slate-400 dark:text-slate-500">Loading analytics...</p>}

      {data && (
        <div className="space-y-6">
          {/* Monthly activity — the one "hero" element on the page, real
              daily data (see analyticsService.getDailyActivity), not a
              decorative placeholder. */}
          <div className="card overflow-hidden p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <HiOutlineCalendarDays className="h-4 w-4 text-slate-400" />
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Last 30 days</h2>
                </div>
                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {dailyPoints?.reduce((sum, v) => sum + v, 0) ?? 0}
                  <span className="ml-1.5 text-sm font-normal text-slate-400 dark:text-slate-500">conversions</span>
                </p>
              </div>
              <TrendBadge percentChange={data.conversionTrend?.percentChange} />
            </div>
            <div className="mt-4">
              <Sparkline points={dailyPoints} colorClassName="stroke-brand-500 text-brand-500" />
              {dayLabels && (
                <div className="mt-1 flex justify-between text-[11px] text-slate-400 dark:text-slate-500">
                  {dayLabels.map((label, i) => (
                    <span key={i}>{label}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="Total users" value={data.users.total} icon={HiOutlineUsers} accent="brand" />
            <StatCard
              label="New this week"
              value={data.newUsers.week}
              icon={HiOutlineUserPlus}
              accent="violet"
              trend={data.newUserTrend?.percentChange}
              sublabel={`${data.newUsers.today} today`}
            />
            <StatCard label="Active this month" value={data.users.monthly} icon={HiOutlineFire} accent="amber" sublabel="Signed in this month" />
            <StatCard
              label="Conversions this month"
              value={data.conversions.month}
              icon={HiOutlineChartBar}
              accent="emerald"
              sublabel={`${data.conversions.today} today \u00b7 ${data.conversions.week} this week`}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <RankedList
              title="Most-used tools"
              rows={data.topTools}
              labelKey="toolName"
              countKey="count"
              emptyMessage="No conversions logged yet."
              renderIcon={(row) => {
                const Icon = getToolBySlug(row.toolSlug)?.icon
                return Icon ? (
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                ) : null
              }}
            />

            <div className="card p-5">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Most-used categories</h2>
              {categorySegments && categorySegments.length > 0 ? (
                <div className="mt-5">
                  <DonutChart segments={categorySegments} />
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-400 dark:text-slate-500">No conversions logged yet.</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="card p-5">
              <div className="flex items-center gap-2">
                <HiOutlineGlobeAmericas className="h-4 w-4 text-slate-400" />
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Countries</h2>
              </div>
              {data.countries?.length > 0 ? (
                <div className="mt-4 space-y-2">
                  {data.countries.map((row) => (
                    <div key={row.country || 'unknown'} className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-300">{row.country || 'Unknown'}</span>
                      <span className="text-slate-400 dark:text-slate-500">{row.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-400 dark:text-slate-500">No data yet.</p>
              )}
            </div>

            <div className="card p-5">
              <div className="flex items-center gap-2">
                <HiOutlineDevicePhoneMobile className="h-4 w-4 text-slate-400" />
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Devices</h2>
              </div>
              {data.devices?.length > 0 ? (
                <div className="mt-4 space-y-2">
                  {data.devices.map((row) => (
                    <div key={row.device || 'unknown'} className="flex items-center justify-between text-sm capitalize">
                      <span className="text-slate-600 dark:text-slate-300">{row.device || 'Unknown'}</span>
                      <span className="text-slate-400 dark:text-slate-500">{row.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-400 dark:text-slate-500">No data yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
