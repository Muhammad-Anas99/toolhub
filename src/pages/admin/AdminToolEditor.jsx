import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { HiOutlineArrowLeft } from 'react-icons/hi2'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import { api } from '../../lib/api.js'
import { categories } from '../../data/categories.js'
import { slugify } from '../../lib/slugify.js'

const EMPTY_TOOL = {
  name: '',
  description: '',
  category: categories[0]?.slug || '',
  comingSoon: true,
}

// A new tool added here has no real functionality yet - this icon is a
// placeholder shown until the tool is actually built in code and given
// its own specific icon, matching how the existing Coming Soon tools work.
const DEFAULT_ICON = 'HiOutlineSparkles'

export default function AdminToolEditor() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(slug)

  const [tool, setTool] = useState(EMPTY_TOOL)
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isEditing) return
    api
      .getToolBySlug(slug)
      .then(({ data }) => setTool({ ...EMPTY_TOOL, ...data }))
      .catch((err) => setError(err.message || 'Could not load this tool.'))
      .finally(() => setLoading(false))
  }, [isEditing, slug])

  function updateField(field, value) {
    setTool((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setError(null)
    try {
      if (isEditing) {
        await api.adminUpdateTool(slug, tool)
      } else {
        const newSlug = slugify(tool.name)
        await api.adminCreateTool({
          ...tool,
          slug: newSlug,
          path: `/tools/${newSlug}`,
          icon: DEFAULT_ICON,
        })
      }
      navigate('/admin/tools')
    } catch (err) {
      setError(err.message || 'Could not save this tool.')
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-400 dark:text-slate-500">Loading tool...</p>
  }

  return (
    <>
      <SEO
        title={isEditing ? 'Admin \u2014 Edit Tool' : 'Admin \u2014 New Tool'}
        description="ToolHub tool editor."
        canonicalPath="/admin/tools"
        noIndex
      />

      <Link
        to="/admin/tools"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
      >
        <HiOutlineArrowLeft className="h-4 w-4" />
        Back to tools
      </Link>

      <h1 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
        {isEditing ? `Edit "${tool.name}"` : 'New Tool'}
      </h1>

      {!isEditing && (
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          This adds a placeholder entry — it appears on the site right away as Coming Soon. Switch it to Live once
          the actual tool has been built in code.
        </p>
      )}

      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

      <form onSubmit={handleSubmit} className="mt-5 max-w-xl space-y-5">
        <div>
          <label htmlFor="tool-name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Title
          </label>
          <input
            id="tool-name"
            type="text"
            required
            value={tool.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="tool-description" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Description
          </label>
          <textarea
            id="tool-description"
            rows={3}
            required
            maxLength={300}
            value={tool.description}
            onChange={(event) => updateField('description', event.target.value)}
            className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="tool-category" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Category
          </label>
          <select
            id="tool-category"
            value={tool.category}
            onChange={(event) => updateField('category', event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="tool-status" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Status
          </label>
          <select
            id="tool-status"
            value={tool.comingSoon ? 'coming-soon' : 'live'}
            onChange={(event) => updateField('comingSoon', event.target.value === 'coming-soon')}
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="coming-soon">Coming Soon</option>
            <option value="live">Live</option>
          </select>
        </div>

        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Tool'}
        </button>
      </form>
    </>
  )
}
