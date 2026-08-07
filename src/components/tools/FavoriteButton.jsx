import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2'
import { useAuth } from '../../context/AuthContext.jsx'
import { api } from '../../lib/api.js'

export default function FavoriteButton({ toolSlug }) {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isFavorited, setIsFavorited] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Check favorite status only once we know the user is signed in — no
  // point calling a protected endpoint otherwise.
  useEffect(() => {
    if (!isAuthenticated) {
      setIsFavorited(false)
      return
    }
    let cancelled = false
    api
      .getFavorites()
      .then(({ data }) => {
        if (!cancelled) setIsFavorited(data.some((favorite) => favorite.toolSlug === toolSlug))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [isAuthenticated, toolSlug])

  async function handleToggle() {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    setIsLoading(true)
    try {
      if (isFavorited) {
        await api.removeFavorite(toolSlug)
        setIsFavorited(false)
      } else {
        await api.addFavorite(toolSlug)
        setIsFavorited(true)
      }
    } catch {
      // Non-critical UI action — fail silently rather than showing a
      // disruptive error banner for a heart-icon toggle.
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isLoading}
      aria-pressed={isFavorited}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:border-rose-200 hover:text-rose-600 disabled:opacity-60 dark:border-slate-700 dark:text-slate-300 dark:hover:border-rose-900 dark:hover:text-rose-400"
    >
      {isFavorited ? (
        <HiHeart className="h-4 w-4 text-rose-500" />
      ) : (
        <HiOutlineHeart className="h-4 w-4" />
      )}
      {isFavorited ? 'Favorited' : 'Favorite'}
    </button>
  )
}

FavoriteButton.propTypes = {
  toolSlug: PropTypes.string.isRequired,
}
