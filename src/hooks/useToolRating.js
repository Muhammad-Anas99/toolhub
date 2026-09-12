import { useEffect, useRef, useState } from 'react'
import { api } from '../lib/api.js'
import { getStoredRating, setStoredRating } from '../lib/toolRatingStorage.js'

/**
 * Holds the actual rating state and submission logic for a tool, so it
 * can be shared across more than one StarRating instance rendered on
 * the same page (for example, one near the top and one at the end of a
 * tool page) - without this, each instance would hold its own
 * disconnected copy of the state, and rating via one would leave the
 * other showing stale numbers until a full page reload.
 *
 * initialRatingSum/initialRatingCount may arrive as undefined at first
 * (fetched asynchronously by the caller) and real numbers once loaded.
 * Rather than requiring the caller to delay mounting this hook until
 * the fetch resolves (which would mean calling it conditionally,
 * violating the rules of hooks), it starts at safe zero defaults and
 * syncs to the real values exactly once when they arrive, guarded by a
 * ref so a later re-render with the same props never resets whatever
 * the user has done since.
 */
export function useToolRating(slug, initialRatingSum, initialRatingCount) {
  const [ratingSum, setRatingSum] = useState(initialRatingSum ?? 0)
  const [ratingCount, setRatingCount] = useState(initialRatingCount ?? 0)
  const [userRating, setUserRating] = useState(() => getStoredRating(slug))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (hasInitialized.current) return
    if (initialRatingSum === undefined || initialRatingCount === undefined) return
    setRatingSum(initialRatingSum)
    setRatingCount(initialRatingCount)
    hasInitialized.current = true
  }, [initialRatingSum, initialRatingCount])

  async function handleRate(star) {
    if (isSubmitting || star === userRating) return
    const previousRating = userRating

    setIsSubmitting(true)
    setUserRating(star)
    setStoredRating(slug, star)
    if (previousRating) {
      setRatingSum((s) => s - previousRating + star)
    } else {
      setRatingSum((s) => s + star)
      setRatingCount((c) => c + 1)
    }

    try {
      const { data } = await api.rateTool(slug, { rating: star, previousRating })
      setRatingSum(data.ratingSum)
      setRatingCount(data.ratingCount)
    } catch (err) {
      setUserRating(previousRating)
      setStoredRating(slug, previousRating)
      if (previousRating) {
        setRatingSum((s) => s - star + previousRating)
      } else {
        setRatingSum((s) => s - star)
        setRatingCount((c) => c - 1)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return { ratingSum, ratingCount, userRating, handleRate }
}
