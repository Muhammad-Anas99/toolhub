import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FaStar, FaRegStar } from 'react-icons/fa6'
import { api } from '../../lib/api.js'
import { getStoredRating, setStoredRating } from '../../lib/toolRatingStorage.js'

const MIN_RATINGS_TO_SHOW_COUNT = 3

export default function StarRating({ slug, initialRatingSum, initialRatingCount }) {
  const [ratingSum, setRatingSum] = useState(initialRatingSum)
  const [ratingCount, setRatingCount] = useState(initialRatingCount)
  const [userRating, setUserRating] = useState(() => getStoredRating(slug))
  const [hoveredStar, setHoveredStar] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const average = ratingCount > 0 ? ratingSum / ratingCount : 0
  const filledCount = hoveredStar > 0 ? hoveredStar : userRating || Math.round(average)

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

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center gap-0.5" onMouseLeave={() => setHoveredStar(0)}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHoveredStar(star)}
            onClick={() => handleRate(star)}
            aria-label={`Rate ${star} out of 5 stars`}
            className="text-slate-300 transition-colors hover:scale-110 dark:text-slate-600"
          >
            {star <= filledCount ? (
              <FaStar className="h-4.5 w-4.5 text-amber-400" />
            ) : (
              <FaRegStar className="h-4.5 w-4.5" />
            )}
          </button>
        ))}
      </div>
      <span className="text-xs text-slate-400 dark:text-slate-500">
        {ratingCount >= MIN_RATINGS_TO_SHOW_COUNT
          ? `${average.toFixed(1)} (${ratingCount} rating${ratingCount === 1 ? '' : 's'})`
          : 'Not enough ratings yet'}
      </span>
    </div>
  )
}

StarRating.propTypes = {
  slug: PropTypes.string.isRequired,
  initialRatingSum: PropTypes.number,
  initialRatingCount: PropTypes.number,
}

StarRating.defaultProps = {
  initialRatingSum: 0,
  initialRatingCount: 0,
}
