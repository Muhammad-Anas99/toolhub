import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  HiOutlineHeart,
  HiOutlineClock,
  HiOutlineSparkles,
  HiOutlineFire,
  HiOutlineWrenchScrewdriver,
  HiHeart,
  HiArrowRight,
} from 'react-icons/hi2'
import SEO from '../../components/ui/SEO.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { api } from '../../lib/api.js'
import { getToolBySlug } from '../../data/tools.js'

const PLAN_LABELS = { free: 'Free', premium: 'Premium', pro: 'Pro' }

const QUICK_ACTIONS = [
  { label: 'Explore Tools', to: '/tools', icon: HiOutlineWrenchScrewdriver },
  { label: 'View History', to: '/dashboard/history', icon: HiOutlineClock },
  { label: 'Favorites', to: '/dashboard/favorites', icon: HiHeart },
]

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
  const [topTool, setTopTool] = useState(null)

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

    // Reuses the existing usage endpoint (Phase 7) — its topTool field is
    // itself built on the same ConversionHistory / History system, not a
    // separate "most used" tracker.
    api
      .getMyUsage()
      .then(({ data }) => {
        if (!cancelled) setTopTool(data.topTool || null)
      })
      .catch(() => {
        if (!cancelled) setTopTool(null)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const topToolMeta = topTool ? getToolBySlug(topTool.toolSlug) : null

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
      label: 'Most-used tool',
      value: topTool ? topTool.toolName : null,
      icon: topToolMeta?.icon || HiOutlineFire,
      to: topToolMeta ? topToolMeta.path : '/dashboard/history',
      isText: true,
      empty: 'None yet',
    },
    {
      label: 'Plan',
      value: PLAN_LABELS[user?.plan] || 'Free',
      icon: HiOutlineSparkles,
      to: '/dashboard/subscription',
      isText: true,
    },
  ]

  const firstName = user?.name ? user.name.split(' ')[0] : ''

  return (
    <>
      <SEO title="Dashboard" description="Your ToolHub dashboard." canonicalPath="/dashboard" noIndex />

      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          Welcome back{firstName ? `, ${firstName}` : ''} <span aria-hidden="true">👋</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Here&apos;s what&apos;s happening with your ToolHub account.
        </p>
      </motion.div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={card.to} className="card group block h-full p-5 hover:shadow-card-hover">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                <card.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 truncate text-2xl font-bold text-slate-900 dark:text-white">
                {card.value === null ? '\u2014' : card.isText && !card.value ? card.empty : card.value}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {QUICK_ACTIONS.map((action) => (
          <Link
            key={action.label}
            to={action.to}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-brand-200 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-900 dark:hover:text-brand-400"
          >
            <action.icon className="h-4 w-4" />
            {action.label}
          </Link>
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
              {recentActivity.map((entry) => {
                const Icon = getToolBySlug(entry.toolSlug)?.icon || HiOutlineClock
                return (
                  <li key={entry._id} className="flex items-center gap-3 py-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                        {entry.toolName}
                      </p>
                      {entry.action && (
                        <p className="truncate text-xs text-slate-400 dark:text-slate-500">{entry.action}</p>
                      )}
                    </div>
                    <span className="flex-shrink-0 text-xs text-slate-400 dark:text-slate-500">
                      {formatRelativeDate(entry.createdAt)}
                    </span>
                  </li>
                )
              })}
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
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '\u2014'}
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
