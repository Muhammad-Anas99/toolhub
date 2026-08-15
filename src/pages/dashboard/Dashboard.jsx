import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineHeart, HiOutlineClock, HiOutlineSparkles, HiArrowRight } from 'react-icons/hi2'
import SEO from '../../components/ui/SEO.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { api } from '../../lib/api.js'

const PLAN_LABELS = { free: 'Free', premium: 'Premium', pro: 'Pro' }

function formatRelativeDate(dateString) {
  const date = new Date(dateString)
  const diffMs = Date.now() - date.getTime()
  const diffMinutes = Math.round(diffMs / 60000)

  if (diffMinutes < 1) return 'Just now'
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  const diffHours = Math.round(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.round(diffHours / 24)
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}

export default function Dashboard() {
  const { user } = useAuth()
  const [favoritesCount, setFavoritesCount] = useState(null)
  const [historyCount, setHistoryCount] = useState(null)
  const [recentActivity, setRecentActivity] = useState(null)
  const [activityError, setActivityError] = useState(null)

  useEffect(() => {
    let cancelled = false

    api
      .getFavorites()
      .then(({ meta }) => {
        if (!cancelled) setFavoritesCount(meta?.count ?? 0)
      })
      .catch(() => {
        if (!cancelled) setFavoritesCount(0)
      })

    api
      .getMyHistory({ limit: 5 })
      .then(({ data, meta }) => {
        if (!cancelled) {
          setHistoryCount(meta?.total ?? 0)
          setRecentActivity(data)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setHistoryCount(0)
          setRecentActivity([])
          setActivityError(err.message || 'Could not load recent activity.')
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  const cards = [
    {
      label: 'Favorites',
      value: favoritesCount,
      icon: HiOutlineHeart,
      to: '/dashboard/favorites',
    },
    {
      label: 'Conversions',
      value: historyCount,
      icon: HiOutlineClock,
      to: '/dashboard/history',
    },
    {
      label: 'Plan',
      value: PLAN_LABELS[user?.plan] || 'Free',
      icon: HiOutlineSparkles,
      to: '/dashboard/subscription',
      isText: true,
    },
  ]

  return (
    <>
      <SEO title="Dashboard" description="Your ToolHub dashboard." canonicalPath="/dashboard" noIndex />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {cards.map((card) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={card.to} className="card group block p-5 hover:shadow-card-hover">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                <card.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
                {card.value === null ? '—' : card.value}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="card mt-6 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">Recent activity</h2>
          <Link
            to="/dashboard/history"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400"
          >
            View all
            <HiArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-4">
          {recentActivity === null ? (
            <p className="py-4 text-sm text-slate-400 dark:text-slate-500">Loading...</p>
          ) : activityError ? (
            <p className="py-4 text-sm text-rose-600 dark:text-rose-400">{activityError}</p>
          ) : recentActivity.length > 0 ? (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentActivity.map((entry) => (
                <li key={entry._id} className="flex items-center justify-between gap-4 py-3">
                  <span className="truncate text-sm font-medium text-slate-900 dark:text-white">
                    {entry.toolName}
                  </span>
                  <span className="flex-shrink-0 text-xs text-slate-400 dark:text-slate-500">
                    {formatRelativeDate(entry.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-4 text-sm text-slate-500 dark:text-slate-400">
              No conversions yet. Use any tool and it&apos;ll show up here.
            </p>
          )}
        </div>
      </div>

      <div className="card mt-6 p-6">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">Account</h2>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Name
            </dt>
            <dd className="mt-1 text-sm text-slate-900 dark:text-white">{user?.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Email
            </dt>
            <dd className="mt-1 text-sm text-slate-900 dark:text-white">{user?.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Email status
            </dt>
            <dd className="mt-1 text-sm">
              {user?.isEmailVerified ? (
                <span className="text-emerald-600 dark:text-emerald-400">Verified</span>
              ) : (
                <span className="text-amber-600 dark:text-amber-400">Not verified</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Member since
            </dt>
            <dd className="mt-1 text-sm text-slate-900 dark:text-white">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
            </dd>
          </div>
        </dl>

        <Link
          to="/dashboard/profile"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400"
        >
          Edit profile
          <HiArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </>
  )
}
