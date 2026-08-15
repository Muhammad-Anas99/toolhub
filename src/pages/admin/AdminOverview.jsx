import React, { useEffect, useState } from 'react'
import {
  HiOutlineUsers,
  HiOutlineArrowTrendingUp,
  HiOutlineChartBar,
  HiOutlineGlobeAmericas,
  HiOutlineDevicePhoneMobile,
} from 'react-icons/hi2'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import { api } from '../../lib/api.js'
import { getCategoryBySlug } from '../../data/categories.js'

function StatCard({ label, value, icon: Icon, sublabel }) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
            {label}
          </p>
        </div>
      </div>
      <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{value ?? '\u2014'}</p>
      {sublabel && <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{sublabel}</p>}
    </div>
  )
}

function RankedTable({ title, rows, labelKey, countKey, emptyMessage }) {
  return (
    <div className="card p-5">
      <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h2>
      {rows && rows.length > 0 ? (
        <div className="mt-4 space-y-3">
          {rows.map((row, index) => {
            const max = rows[0][countKey] || 1
            const percent = Math.round((row[countKey] / max) * 100)
            return (
              <div key={row[labelKey] || index}>
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

  const topCategoriesWithNames = data?.topCategories?.map((row) => ({
    ...row,
    categoryName: getCategoryBySlug(row.category)?.name || row.category,
  }))

  return (
    <>
      <SEO title="Admin \u2014 Overview" description="ToolHub admin analytics." canonicalPath="/admin" noIndex />

      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

      {!data && !error && <p className="text-sm text-slate-400 dark:text-slate-500">Loading analytics...</p>}

      {data && (
        <div className="space-y-8">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Users
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatCard label="Total users" value={data.users.total} icon={HiOutlineUsers} />
              <StatCard label="Active today" value={data.users.daily} icon={HiOutlineArrowTrendingUp} sublabel="Signed in today" />
              <StatCard label="Active this month" value={data.users.monthly} icon={HiOutlineArrowTrendingUp} sublabel="Signed in this month" />
              <StatCard
                label="New this month"
                value={data.newUsers.month}
                icon={HiOutlineUsers}
                sublabel={`${data.newUsers.today} today \u00b7 ${data.newUsers.week} this week`}
              />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Conversions
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatCard label="Total conversions" value={data.conversions.total} icon={HiOutlineChartBar} />
              <StatCard label="Today" value={data.conversions.today} icon={HiOutlineChartBar} />
              <StatCard label="This week" value={data.conversions.week} icon={HiOutlineChartBar} />
              <StatCard label="This month" value={data.conversions.month} icon={HiOutlineChartBar} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <RankedTable
              title="Most-used tools"
              rows={data.topTools}
              labelKey="toolName"
              countKey="count"
              emptyMessage="No conversions logged yet."
            />
            <RankedTable
              title="Most-used categories"
              rows={topCategoriesWithNames}
              labelKey="categoryName"
              countKey="count"
              emptyMessage="No conversions logged yet."
            />
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
