import React from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import {
  HiOutlineSquares2X2,
  HiOutlineUsers,
  HiOutlineWrenchScrewdriver,
  HiOutlineNewspaper,
  HiOutlineArrowTopRightOnSquare,
} from 'react-icons/hi2'
import Container from '../ui/Container.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const NAV_ITEMS = [
  { label: 'Overview', to: '/admin', icon: HiOutlineSquares2X2, end: true },
  { label: 'Users', to: '/admin/users', icon: HiOutlineUsers },
  { label: 'Tools', to: '/admin/tools', icon: HiOutlineWrenchScrewdriver },
  { label: 'Blog', to: '/admin/blog', icon: HiOutlineNewspaper },
]

/**
 * Route-level access control (ProtectedRoute requireRole="admin" in
 * App.jsx) is what actually keeps non-admins out — this layout doesn't
 * duplicate that check, it's just the shared shell for pages already
 * behind it.
 */
export default function AdminLayout() {
  const { user } = useAuth()

  return (
    <Container className="py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Admin
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Signed in as {user?.name} ({user?.email})
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          Back to site
          <HiOutlineArrowTopRightOnSquare className="h-4 w-4" />
        </Link>
      </div>

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
