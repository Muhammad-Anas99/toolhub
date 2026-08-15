import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {
  HiOutlineSquares2X2,
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineClock,
  HiOutlineCog6Tooth,
  HiOutlineSparkles,
} from 'react-icons/hi2'
import Container from '../ui/Container.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import EmailVerificationBanner from './EmailVerificationBanner.jsx'

const NAV_ITEMS = [
  { label: 'Overview', to: '/dashboard', icon: HiOutlineSquares2X2, end: true },
  { label: 'Profile', to: '/dashboard/profile', icon: HiOutlineUser },
  { label: 'Favorites', to: '/dashboard/favorites', icon: HiOutlineHeart },
  { label: 'History', to: '/dashboard/history', icon: HiOutlineClock },
  { label: 'Settings', to: '/dashboard/settings', icon: HiOutlineCog6Tooth },
  { label: 'Subscription', to: '/dashboard/subscription', icon: HiOutlineSparkles },
]

export default function DashboardLayout() {
  const { user } = useAuth()

  return (
    <Container className="py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your account, favorites, and conversion history.
        </p>
      </div>

      <EmailVerificationBanner />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900'
                }`
              }
            >
              <item.icon className="h-4.5 w-4.5 flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </Container>
  )
}
