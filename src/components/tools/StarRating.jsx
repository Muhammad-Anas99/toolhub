import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FaStar, FaRegStar } from 'react-icons/fa6'

const MIN_RATINGS_TO_SHOW_COUNT = 3

/**
 * Purely presentational - the actual rating state and submission logic
 * live in the useToolRating hook, shared across every StarRating
 * instance on the page (a tool page renders one near the top and one
 * at the end), so rating via either one keeps both in sync. Only the
 * hover-preview state stays local here, since hovering is genuinely
 * specific to whichever instance the cursor is actually over.
 */
export default function StarRating({ ratingSum, ratingCount, userRating, onRate }) {
  const [hoveredStar, setHoveredStar] = useState(0)

  const average = ratingCount > 0 ? ratingSum / ratingCount : 0
  const filledCount = hoveredStar > 0 ? hoveredStar : userRating || Math.round(average)

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center gap-0.5" onMouseLeave={() => setHoveredStar(0)}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHoveredStar(star)}
            onClick={() => onRate(star)}
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
  ratingSum: PropTypes.number.isRequired,
  ratingCount: PropTypes.number.isRequired,
  userRating: PropTypes.number,
  onRate: PropTypes.func.isRequired,
}
