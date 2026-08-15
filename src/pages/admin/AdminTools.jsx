import React, { useEffect, useState } from 'react'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import { api } from '../../lib/api.js'
import { tools as allTools } from '../../data/tools.js'
import { getCategoryBySlug } from '../../data/categories.js'

export default function AdminTools() {
  const [usageByTool, setUsageByTool] = useState({})
  const [error, setError] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    api
      .adminGetAnalyticsOverview()
      .then(({ data }) => {
        const map = {}
        data.topTools?.forEach((row) => {
          map[row.toolSlug] = row.count
        })
        setUsageByTool(map)
      })
      .catch((err) => setError(err.message || 'Could not load tool usage.'))
      .finally(() => setLoaded(true))
  }, [])

  return (
    <>
      <SEO title="Admin \u2014 Tools" description="ToolHub tools overview." canonicalPath="/admin/tools" noIndex />

      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Tools</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Read-only for now \u2014 tool routes are defined at build time (src/data/tools.js), so a
          live enable/disable toggle here couldn&apos;t actually affect the site without being
          misleading. Usage counts below only reflect each tool&apos;s top-5 ranking from the
          Overview page; smaller counts aren&apos;t tracked per-tool here yet.
        </p>
      </div>

      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800 dark:text-slate-500">
              <th className="px-5 py-3 font-medium">Tool</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Recent usage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {allTools.map((tool) => {
              const category = getCategoryBySlug(tool.category)
              return (
                <tr key={tool.id}>
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
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
