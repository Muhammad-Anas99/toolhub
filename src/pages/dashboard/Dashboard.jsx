import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineHeart, HiOutlineClock, HiOutlineSparkles, HiArrowRight } from 'react-icons/hi2'
import SEO from '../../components/ui/SEO.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { api } from '../../lib/api.js'

const PLAN_LABELS = { free: 'Free', premium: 'Premium', pro: 'Pro' }

export default function Dashboard() {
  const { user } = useAuth()
  const [favoritesCount, setFavoritesCount] = useState(null)
  const [historyCount, setHistoryCount] = useState(null)

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
      .getMyHistory({ limit: 1 })
      .then(({ meta }) => {
        if (!cancelled) setHistoryCount(meta?.total ?? 0)
      })
      .catch(() => {
        if (!cancelled) setHistoryCount(0)
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
      <SEO title="Dashboard" description="Your ToolHub dashboard." canonicalPath="/dashboard" />

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
