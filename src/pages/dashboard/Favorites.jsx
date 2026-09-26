import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineHeart } from 'react-icons/hi2'
import SEO from '../../components/ui/SEO.jsx'
import ToolCard from '../../components/ui/ToolCard.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import { useTools } from '../../hooks/useTools.js'
import { api } from '../../lib/api.js'

export default function Favorites() {
  const { tools } = useTools()
  const [favoriteSlugs, setFavoriteSlugs] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    api
      .getFavorites()
      .then(({ data }) => {
        if (!cancelled) setFavoriteSlugs(data.map((favorite) => favorite.toolSlug))
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Could not load your favorites.')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const favoriteTools = favoriteSlugs ? tools.filter((tool) => favoriteSlugs.includes(tool.slug)) : []

  return (
    <>
      <SEO title="Favorites" description="Your favorite ToolHub tools." canonicalPath="/dashboard/favorites" noIndex />

      <h2 className="text-base font-semibold text-slate-900 dark:text-white">Favorites</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Tools you&apos;ve saved for quick access.
      </p>

      <div className="mt-6">
        {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

        {favoriteSlugs === null && !error ? (
          <p className="text-sm text-slate-400 dark:text-slate-500">Loading...</p>
        ) : favoriteTools.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {favoriteTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          !error && (
            <div className="card flex flex-col items-center gap-3 p-10 text-center">
              <HiOutlineHeart className="h-10 w-10 text-slate-300 dark:text-slate-700" />
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No favorites yet. Save a tool from its page to see it here.
              </p>
              <Link to="/tools" className="btn-secondary mt-1">
                Browse tools
              </Link>
            </div>
          )
        )}
      </div>
    </>
  )
}
