import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import PageLoader from '../ui/PageLoader.jsx'

/**
 * Wraps a set of routes (via React Router's nested-route + <Outlet>
 * pattern) so they require authentication, and optionally a specific role.
 *
 * Usage in App.jsx:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/dashboard" element={<Dashboard />} />
 *   </Route>
 *   <Route element={<ProtectedRoute requireRole="admin" />}>
 *     <Route path="/admin" element={<AdminDashboard />} />
 *   </Route>
 */
export default function ProtectedRoute({ requireRole }) {
  const { status, isAuthenticated, user } = useAuth()
  const location = useLocation()

  // Still attempting the silent-refresh-on-load — render nothing
  // meaningful yet rather than redirecting a genuinely logged-in user to
  // /login just because their access token hasn't finished loading.
  if (status === 'checking') {
    return <PageLoader />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (requireRole && user?.role !== requireRole) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

ProtectedRoute.propTypes = {
  requireRole: PropTypes.string,
}
