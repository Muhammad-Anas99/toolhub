import React from 'react'
import PropTypes from 'prop-types'
import ToolCard from '../ui/ToolCard.jsx'
import { tools, getToolBySlug } from '../../data/tools.js'

/**
 * `relatedSlugs`, when a tool's own data specifies it, picks genuinely
 * relevant related tools explicitly rather than whatever happens to sit
 * first in the category's array order. Without it, falls back to the
 * exact previous behavior - this exists specifically because that
 * fallback can produce nonsensical results: Image Compressor and Image
 * Resizer, sitting next to each other in the data and clearly relevant
 * to each other, previously never cross-linked at all, since both just
 * showed whichever three format-converter tools happened to come first
 * in the array regardless of which page you were on.
 */
export default function RelatedTools({ currentToolId, category, relatedSlugs, count = 3 }) {
  const explicit = relatedSlugs
    ?.map((slug) => getToolBySlug(slug))
    .filter((tool) => tool && tool.id !== currentToolId)

  const related =
    explicit && explicit.length > 0
      ? explicit.slice(0, count)
      : tools.filter((tool) => tool.id !== currentToolId && tool.category === category).slice(0, count)

  if (related.length === 0) return null

  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
        Related tools
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  )
}

RelatedTools.propTypes = {
  currentToolId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  relatedSlugs: PropTypes.arrayOf(PropTypes.string),
  count: PropTypes.number,
}
