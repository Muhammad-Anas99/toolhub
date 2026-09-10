import React from 'react'
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom'
import {
  HiOutlineSquares2X2,
  HiOutlineUsers,
  HiOutlineWrenchScrewdriver,
  HiOutlineNewspaper,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
} from 'react-icons/hi2'
import { FaCrown } from 'react-icons/fa6'
import Container from '../ui/Container.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const NAV_ITEMS = [
  { label: 'Overview', to: '/admin', icon: HiOutlineSquares2X2, end: true },
  { label: 'Users', to: '/admin/users', icon: HiOutlineUsers },
  { label: 'Tools', to: '/admin/tools', icon: HiOutlineWrenchScrewdriver },
  { label: 'Blog', to: '/admin/blog', icon: HiOutlineNewspaper },
]

const sidebarLinkClasses = ({ isActive }) =>
  `flex flex-shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400'
      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900'
  }`

/**
 * Route-level access control (ProtectedRoute requireRole="admin" in
 * App.jsx) is what actually keeps non-admins out — this layout doesn't
 * duplicate that check, it's just the shared shell for pages already
 * behind it.
 */
export default function AdminLayout() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  const currentYear = new Date().getFullYear()

  return (
    <div className="lg:flex lg:min-h-[calc(100vh-4rem)]">
      {/* Mobile: existing horizontal-scroll nav strip, unchanged in
          behavior — a fixed-width sidebar doesn't work on narrow
          screens, so this keeps the same simple pattern already used
          for the user dashboard's own mobile nav. */}
      <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-4 py-2 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={sidebarLinkClasses}>
            <item.icon className="h-4.5 w-4.5 flex-shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <aside className="hidden w-60 flex-shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-6 dark:border-slate-800 dark:bg-slate-950 lg:flex">
        <nav aria-label="Admin navigation" className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={sidebarLinkClasses}>
              <item.icon className="h-4.5 w-4.5 flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-5 pt-6">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-500 dark:bg-amber-950">
              <FaCrown className="h-4 w-4" />
            </div>
            <h2 className="mt-2.5 text-sm font-semibold text-slate-900 dark:text-white">ToolHub Admin</h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Manage your platform, users, tools and content all in one place.
            </p>
          </div>

          <div>
            <h2 className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Quick Links
            </h2>
            <ul className="mt-2 space-y-0.5">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                >
                  <HiOutlineArrowTopRightOnSquare className="h-4 w-4 flex-shrink-0" />
                  View Site
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/settings"
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                >
                  <HiOutlineCog6Tooth className="h-4 w-4 flex-shrink-0" />
                  Settings
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                >
                  <HiOutlineArrowRightOnRectangle className="h-4 w-4 flex-shrink-0" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1 bg-slate-50/60 dark:bg-slate-900/40">
        <Container className="py-8 lg:px-8">
          <Outlet />
        </Container>

        <footer className="border-t border-slate-200 px-4 py-5 dark:border-slate-800 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-500">
            <p>{`\u00a9 ${currentYear} ToolHub. All rights reserved.`}</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy-policy" className="hover:text-slate-600 dark:hover:text-slate-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-slate-600 dark:hover:text-slate-300">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
