import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDown,
  HiOutlineGlobeAlt,
  HiOutlineGlobeAmericas,
  HiOutlineEye,
  HiOutlineUsers,
  HiOutlineDocumentDuplicate,
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiXMark,
} from 'react-icons/hi2'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import DateRangeSelector from '../../components/admin/DateRangeSelector.jsx'
import { api } from '../../lib/api.js'
import { getCountryName, getCountryFlagUrl } from '../../lib/countryUtils.js'

const PAGE_SIZE = 25

// Page views are deleted after 90 days, so longer ranges aren't offered.
const RANGE_CHOICES = ['today', 'yesterday', '7d', '30d', '90d']

const RANGE_LABELS = {
  today: 'today',
  yesterday: 'yesterday',
  '7d': 'the last 7 days',
  '30d': 'the last 30 days',
  '90d': 'the last 90 days',
}

function formatDateTime(value) {
  return new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function formatLocation(city, country) {
  const countryLabel = getCountryName(country)
  if (!city || city === 'Unknown') return countryLabel
  return `${city}, ${countryLabel}`
}

function Flag({ code }) {
  const url = getCountryFlagUrl(code)
  if (!url) {
    return <HiOutlineGlobeAmericas className="h-4 w-4 flex-shrink-0 text-slate-300 dark:text-slate-600" aria-hidden="true" />
  }
  return (
    <img
      src={url}
      alt=""
      width={20}
      height={15}
      aria-hidden="true"
      className="h-[15px] w-5 flex-shrink-0 rounded-sm object-cover"
      onError={(event) => {
        event.currentTarget.style.display = 'none'
      }}
    />
  )
}

Flag.propTypes = { code: PropTypes.string }

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <p className="text-2xl font-semibold text-slate-900 dark:text-white">{value}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </div>
  )
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
}

function RankedList({ title, subtitle, rows, renderLabel, emptyText, loading }) {
  const max = rows && rows.length > 0 ? rows[0].views || 1 : 1
  return (
    <article className="card p-5">
      <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
      {loading && <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Loading...</p>}
      {!loading && rows && rows.length === 0 && (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{emptyText}</p>
      )}
      {!loading && rows && rows.length > 0 && (
        <ul className="mt-4 space-y-3.5">
          {rows.map((row, index) => (
            <li key={row.key} className="flex items-center gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3 text-sm">
                  {renderLabel(row)}
                  <span className="flex-shrink-0 text-slate-500 dark:text-slate-400">{row.views.toLocaleString()}</span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-full rounded-full bg-brand-500" style={{ width: `${Math.round((row.views / max) * 100)}%` }} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

RankedList.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string.isRequired, views: PropTypes.number.isRequired })),
  renderLabel: PropTypes.func.isRequired,
  emptyText: PropTypes.string.isRequired,
  loading: PropTypes.bool,
}

function VisitorRow({ visitor, isOpen, onToggle, detailId, isYou, onRemove, removing }) {
  return (
    <>
      <tr>
        <td className="px-5 py-3">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={isOpen ? detailId : undefined}
            className="flex items-center gap-2 rounded font-mono text-xs text-slate-700 hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:text-slate-300 dark:hover:text-brand-400"
          >
            <HiOutlineChevronDown
              className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform dark:text-slate-500 ${isOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
            {visitor.ipAddress}
            {isYou && (
              <span className="rounded-full bg-brand-50 px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wide text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                You
              </span>
            )}
          </button>
        </td>
        <td className="px-5 py-3 text-slate-600 dark:text-slate-300">
          <span className="flex items-center gap-2">
            <Flag code={visitor.country} />
            {formatLocation(visitor.city, visitor.country)}
          </span>
        </td>
        <td className="px-5 py-3 text-slate-700 dark:text-slate-300">{visitor.views.toLocaleString()}</td>
        <td className="whitespace-nowrap px-5 py-3 text-slate-500 dark:text-slate-400">
          <time dateTime={visitor.lastSeen}>{formatDateTime(visitor.lastSeen)}</time>
        </td>
      </tr>
      {isOpen && (
        <tr id={detailId} className="bg-slate-50 dark:bg-slate-900/50">
          <td colSpan={4} className="px-5 py-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              First seen <time dateTime={visitor.firstSeen}>{formatDateTime(visitor.firstSeen)}</time>
            </p>
            <ol className="mt-3 space-y-1.5">
              {visitor.pages.map((page, index) => (
                <li key={`${page.at}-${index}`} className="flex items-baseline justify-between gap-4 text-xs">
                  <span className="min-w-0 truncate font-mono text-slate-700 dark:text-slate-300" title={page.path}>
                    {page.path}
                  </span>
                  <time dateTime={page.at} className="flex-shrink-0 text-slate-500 dark:text-slate-400">
                    {formatDateTime(page.at)}
                  </time>
                </li>
              ))}
            </ol>
            {visitor.views > visitor.pages.length && (
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Showing the {visitor.pages.length} most recent of {visitor.views.toLocaleString()} page views.
              </p>
            )}
            <div className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-800">
              <button
                type="button"
                onClick={onRemove}
                disabled={removing}
                className="inline-flex items-center gap-1.5 rounded text-xs font-medium text-rose-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:opacity-50 dark:text-rose-400"
              >
                <HiOutlineTrash className="h-3.5 w-3.5" aria-hidden="true" />
                {removing ? 'Removing...' : isYou ? 'Remove my visits' : "Remove this visitor's data"}
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

VisitorRow.propTypes = {
  visitor: PropTypes.shape({
    ipAddress: PropTypes.string.isRequired,
    country: PropTypes.string,
    city: PropTypes.string,
    views: PropTypes.number.isRequired,
    firstSeen: PropTypes.string.isRequired,
    lastSeen: PropTypes.string.isRequired,
    pages: PropTypes.arrayOf(PropTypes.shape({ path: PropTypes.string, at: PropTypes.string })).isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  detailId: PropTypes.string.isRequired,
  isYou: PropTypes.bool,
  onRemove: PropTypes.func.isRequired,
  removing: PropTypes.bool,
}

export default function AdminPageViews() {
  const [range, setRange] = useState('7d')
  const [page, setPage] = useState(1)
  const [summary, setSummary] = useState(null)
  const [visitors, setVisitors] = useState(null)
  const [visitorsLoading, setVisitorsLoading] = useState(true)
  const [expanded, setExpanded] = useState(() => new Set())
  const [error, setError] = useState(null)
  const [notice, setNotice] = useState(null)
  const [removingIp, setRemovingIp] = useState(null)
  // Bumped after a removal to re-run both fetches.
  const [reloadKey, setReloadKey] = useState(0)

  // Each effect ignores a response that arrives after the range or page
  // has already changed again, so a slow earlier request can't overwrite
  // the newer one's data.
  useEffect(() => {
    let cancelled = false
    setSummary(null)
    api
      .adminGetPageViewSummary({ range })
      .then(({ data }) => {
        if (!cancelled) setSummary(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Could not load page views.')
      })
    return () => {
      cancelled = true
    }
  }, [range, reloadKey])

  useEffect(() => {
    let cancelled = false
    setVisitorsLoading(true)
    api
      .adminGetPageViewVisitors({ range, page, limit: PAGE_SIZE })
      .then(({ data }) => {
        if (cancelled) return
        setVisitors(data)
        setVisitorsLoading(false)
        // Removing visitors can leave the current page past the last one
        // (e.g. the only visitor on page 2 was removed): step back.
        if (data.visitors.length === 0 && data.total > 0 && data.page > data.pages) setPage(data.pages)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message || 'Could not load page views.')
        setVisitorsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [range, page, reloadKey])

  function handleRangeChange(next) {
    setRange(next)
    setPage(1)
    setExpanded(new Set())
  }

  function goToPage(updater) {
    setPage(updater)
    setExpanded(new Set())
  }

  async function handleRemove(ip) {
    const confirmed = window.confirm(
      `Delete all recorded page views from ${ip}? This removes them from every date range and can't be undone.`
    )
    if (!confirmed) return
    setRemovingIp(ip)
    setError(null)
    setNotice(null)
    try {
      const { data } = await api.adminDeletePageViewVisitor(ip)
      setNotice(`Removed ${data.deleted} page view${data.deleted === 1 ? '' : 's'} from ${ip}.`)
      setExpanded(new Set())
      setReloadKey((key) => key + 1)
    } catch (err) {
      setError(err.message || 'Could not remove that visitor.')
    } finally {
      setRemovingIp(null)
    }
  }

  function toggleVisitor(ip) {
    setExpanded((previous) => {
      const next = new Set(previous)
      if (next.has(ip)) next.delete(ip)
      else next.add(ip)
      return next
    })
  }

  const rangeLabel = RANGE_LABELS[range]
  const pagesPerVisitor =
    summary && summary.uniqueVisitors > 0 ? (summary.totalViews / summary.uniqueVisitors).toFixed(1) : '\u2014'

  const topPages = summary ? summary.topPages.map((row) => ({ key: row.path, path: row.path, views: row.views })) : null
  const topCountries = summary
    ? summary.topCountries.map((row) => ({ key: row.country || 'Unknown', country: row.country, views: row.views }))
    : null

  const total = visitors ? visitors.total : 0
  const firstShown = visitors && total > 0 ? (visitors.page - 1) * visitors.limit + 1 : 0
  const lastShown = visitors ? Math.min(visitors.page * visitors.limit, total) : 0

  return (
    <>
      <SEO title="Admin — Page Views" description="Page views across the site." canonicalPath="/admin/pageviews" noIndex />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Page Views</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Where visitors land and who they are. Only visitors who accepted cookies are recorded, and entries are deleted
            after 90 days. Visits from admin accounts, including any browser you've signed in to as an admin, are not
            counted.
          </p>
        </div>
        <DateRangeSelector value={range} onChange={handleRangeChange} options={RANGE_CHOICES} />
      </div>

      {error && (
        <div className="mt-4">
          <ErrorMessage message={error} onDismiss={() => setError(null)} />
        </div>
      )}

      {notice && (
        <div
          role="status"
          className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300"
        >
          <HiOutlineCheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
          <p className="flex-1">{notice}</p>
          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Dismiss message"
            className="flex-shrink-0 text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200"
          >
            <HiXMark className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      <section aria-label="Summary" className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Page views" value={summary ? summary.totalViews.toLocaleString() : '\u2014'} icon={HiOutlineEye} />
        <StatCard
          label="Unique visitors"
          value={summary ? summary.uniqueVisitors.toLocaleString() : '\u2014'}
          icon={HiOutlineUsers}
        />
        <StatCard label="Pages per visitor" value={pagesPerVisitor} icon={HiOutlineDocumentDuplicate} />
      </section>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        Visitors are counted by IP address, so this is an estimate: one person on two networks counts twice, and people
        sharing a network count once.
      </p>

      <section aria-label="Top pages and countries" className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <RankedList
          title="Top pages"
          subtitle={`Most viewed ${rangeLabel}`}
          rows={topPages}
          loading={!summary}
          emptyText="No page views in this period."
          renderLabel={(row) => (
            <span className="truncate font-mono text-xs text-slate-700 dark:text-slate-300" title={row.path}>
              {row.path}
            </span>
          )}
        />
        <RankedList
          title="Top countries"
          subtitle={`Where visitors came from ${rangeLabel}`}
          rows={topCountries}
          loading={!summary}
          emptyText="No page views in this period."
          renderLabel={(row) => (
            <span className="flex min-w-0 items-center gap-2.5">
              <Flag code={row.country} />
              <span className="truncate text-slate-600 dark:text-slate-300">{getCountryName(row.country)}</span>
            </span>
          )}
        />
      </section>

      <section aria-label="Visitors" className="mt-8">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Visitors</h2>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          One row per IP address, most recent first. Select a row to see the pages they viewed.
        </p>

        {!visitors && visitorsLoading && (
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Loading visitors...</p>
        )}

        {visitors && total === 0 && (
          <div className="mt-4 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-slate-200 py-12 text-center dark:border-slate-800">
            <HiOutlineGlobeAlt className="h-8 w-8 text-slate-300 dark:text-slate-600" aria-hidden="true" />
            <p className="text-sm text-slate-500 dark:text-slate-400">No page views recorded for this period.</p>
          </div>
        )}

        {visitors && total > 0 && (
          <>
            <div className={`card mt-4 overflow-x-auto transition-opacity ${visitorsLoading ? 'opacity-60' : ''}`} aria-busy={visitorsLoading}>
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <th scope="col" className="px-5 py-3 font-medium">Visitor (IP)</th>
                    <th scope="col" className="px-5 py-3 font-medium">Location</th>
                    <th scope="col" className="px-5 py-3 font-medium">Page views</th>
                    <th scope="col" className="px-5 py-3 font-medium">Last seen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {visitors.visitors.map((visitor) => (
                    <VisitorRow
                      key={visitor.ipAddress}
                      visitor={visitor}
                      isOpen={expanded.has(visitor.ipAddress)}
                      onToggle={() => toggleVisitor(visitor.ipAddress)}
                      detailId={`visitor-detail-${visitor.ipAddress.replace(/[^a-zA-Z0-9]/g, '-')}`}
                      isYou={visitors.yourIp === visitor.ipAddress}
                      onRemove={() => handleRemove(visitor.ipAddress)}
                      removing={removingIp === visitor.ipAddress}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
              <p>
                Showing {firstShown}–{lastShown} of {total.toLocaleString()} visitors
              </p>
              {visitors.pages > 1 && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => goToPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="btn-secondary text-xs disabled:opacity-40"
                  >
                    <HiOutlineChevronLeft className="h-4 w-4" aria-hidden="true" />
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => goToPage((p) => Math.min(visitors.pages, p + 1))}
                    disabled={page >= visitors.pages}
                    className="btn-secondary text-xs disabled:opacity-40"
                  >
                    Next
                    <HiOutlineChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </>
  )
}
