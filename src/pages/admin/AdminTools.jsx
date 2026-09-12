import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlinePlus, HiOutlinePencil, HiOutlineArrowUp, HiOutlineArrowDown } from 'react-icons/hi2'
import { FaStar } from 'react-icons/fa6'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import { api } from '../../lib/api.js'
import { getCategoryBySlug } from '../../data/categories.js'

export default function AdminTools() {
  const [tools, setTools] = useState([])
  const [usageByTool, setUsageByTool] = useState({})
  const [sortKey, setSortKey] = useState('usage')
  const [sortDirection, setSortDirection] = useState('desc')
  const [error, setError] = useState(null)
  const [loaded, setLoaded] = useState(false)

  // Tools genuinely come from the database here, not the static
  // src/data/tools.js file - a tool added through the editor below has
  // no entry in that file at all, so reading from it would mean a
  // newly-created tool silently never showed up in this very table.
  useEffect(() => {
    api
      .getTools()
      .then(({ data }) => setTools(data))
      .catch((err) => setError(err.message || 'Could not load tools.'))
  }, [])

  useEffect(() => {
    api
      .adminGetToolsUsage(sortDirection)
      .then(({ data }) => {
        const map = {}
        data.forEach((row) => {
          map[row.toolSlug] = row.count
        })
        setUsageByTool(map)
      })
      .catch((err) => setError(err.message || 'Could not load tool usage.'))
      .finally(() => setLoaded(true))
  }, [sortDirection])

  function toggleUsageSort() {
    setSortKey('usage')
    setSortDirection((prev) => (sortKey === 'usage' && prev === 'desc' ? 'asc' : 'desc'))
  }

  function toggleRatingSort() {
    setSortKey('rating')
    setSortDirection((prev) => (sortKey === 'rating' && prev === 'desc' ? 'asc' : 'desc'))
  }

  function averageRating(tool) {
    return tool.ratingCount > 0 ? tool.ratingSum / tool.ratingCount : 0
  }

  // Sorts the same full list of tools by whichever column was last
  // clicked - nothing is ever hidden, only reordered. A tool with no
  // recorded usage or no ratings yet sorts as 0, landing at whichever
  // end matches the current direction.
  const sortedTools = [...tools].sort((a, b) => {
    const aValue = sortKey === 'rating' ? averageRating(a) : usageByTool[a.slug] ?? 0
    const bValue = sortKey === 'rating' ? averageRating(b) : usageByTool[b.slug] ?? 0
    return sortDirection === 'desc' ? bValue - aValue : aValue - bValue
  })

  return (
    <>
      <SEO title="Admin — Tools" description="ToolHub tools overview." canonicalPath="/admin/tools" noIndex />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Tools</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Add a new tool as a placeholder, then switch it to Live once it's actually built. Every tool shown here
            comes directly from the live database.
          </p>
        </div>
        <Link to="/admin/tools/new" className="btn-primary text-sm">
          <HiOutlinePlus className="h-4 w-4" />
          New Tool
        </Link>
      </div>

      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800 dark:text-slate-500">
              <th className="px-5 py-3 font-medium">Tool</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">
                <button
                  type="button"
                  onClick={toggleUsageSort}
                  className="inline-flex items-center gap-1 font-medium uppercase tracking-wide text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                >
                  Recent use
                  {sortKey === 'usage' &&
                    (sortDirection === 'desc' ? (
                      <HiOutlineArrowDown className="h-3.5 w-3.5" />
                    ) : (
                      <HiOutlineArrowUp className="h-3.5 w-3.5" />
                    ))}
                </button>
              </th>
              <th className="px-5 py-3 font-medium">
                <button
                  type="button"
                  onClick={toggleRatingSort}
                  className="inline-flex items-center gap-1 font-medium uppercase tracking-wide text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                >
                  Rating
                  {sortKey === 'rating' &&
                    (sortDirection === 'desc' ? (
                      <HiOutlineArrowDown className="h-3.5 w-3.5" />
                    ) : (
                      <HiOutlineArrowUp className="h-3.5 w-3.5" />
                    ))}
                </button>
              </th>
              <th className="px-5 py-3 font-medium">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {sortedTools.map((tool) => {
              const category = getCategoryBySlug(tool.category)
              return (
                <tr key={tool.slug}>
                  <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">{tool.name}</td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{category?.name || tool.category}</td>
                  <td className="px-5 py-3">
                    {tool.comingSoon ? (
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                        Coming soon
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                        Live
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">
                    {loaded ? (usageByTool[tool.slug] != null ? usageByTool[tool.slug] : '\u2014') : '...'}
                  </td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">
                    {tool.ratingCount > 0 ? (
                      <span className="inline-flex items-center gap-1">
                        <FaStar className="h-3.5 w-3.5 text-amber-400" />
                        {(tool.ratingSum / tool.ratingCount).toFixed(1)}
                        <span className="text-slate-400 dark:text-slate-500">({tool.ratingCount})</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-500">No ratings yet</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <Link
                      to={`/admin/tools/${tool.slug}/edit`}
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400"
                      aria-label={`Edit ${tool.name}`}
                    >
                      <HiOutlinePencil className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
