import React, { useEffect, useState } from 'react'
import { HiOutlineMagnifyingGlass, HiOutlineCheckBadge, HiOutlineNoSymbol } from 'react-icons/hi2'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import { api } from '../../lib/api.js'

const PLAN_LABELS = { free: 'Free', premium: 'Premium', pro: 'Pro' }

export default function AdminUsers() {
  const [users, setUsers] = useState(null)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  function loadUsers(query) {
    api
      .adminGetUsers(query ? { search: query } : {})
      .then(({ data }) => setUsers(data))
      .catch((err) => setError(err.message || 'Could not load users.'))
  }

  useEffect(() => {
    loadUsers('')
  }, [])

  function handleSearchSubmit(event) {
    event.preventDefault()
    setUsers(null)
    loadUsers(search)
  }

  return (
    <>
      <SEO title="Admin — Users" description="Manage ToolHub users." canonicalPath="/admin/users" noIndex />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Users</h2>
        <form onSubmit={handleSearchSubmit} className="relative">
          <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or email..."
            className="w-64 rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </form>
      </div>

      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

      {!users && !error && <p className="text-sm text-slate-400 dark:text-slate-500">Loading users...</p>}

      {users && users.length === 0 && (
        <p className="text-sm text-slate-400 dark:text-slate-500">No users found.</p>
      )}

      {users && users.length > 0 && (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800 dark:text-slate-500">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Plan</th>
                <th className="px-5 py-3 font-medium">Verified</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">{user.name}</td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{user.email}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 dark:bg-brand-950 dark:text-brand-400">
                      {PLAN_LABELS[user.plan] || user.plan}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {user.isEmailVerified ? (
                      <HiOutlineCheckBadge className="h-5 w-5 text-emerald-500" aria-label="Verified" />
                    ) : (
                      <HiOutlineNoSymbol className="h-5 w-5 text-slate-300 dark:text-slate-600" aria-label="Not verified" />
                    )}
                  </td>
                  <td className="px-5 py-3 capitalize text-slate-500 dark:text-slate-400">{user.role}</td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
