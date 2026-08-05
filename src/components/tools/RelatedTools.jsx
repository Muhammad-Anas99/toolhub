import React from 'react'
import PropTypes from 'prop-types'
import ToolCard from '../ui/ToolCard.jsx'
import { tools } from '../../data/tools.js'

export default function RelatedTools({ currentToolId, category, count = 3 }) {
  const related = tools
    .filter((tool) => tool.id !== currentToolId && tool.category === category)
    .slice(0, count)

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
  count: PropTypes.number,
}
