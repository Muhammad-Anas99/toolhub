import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { categoryColorClasses } from '../../data/categories.js'
import { getToolsByCategory } from '../../data/tools.js'

export default function CategoryCard({ category }) {
  const Icon = category.icon
  const colors = categoryColorClasses[category.color] ?? categoryColorClasses.brand
  const toolCount = getToolsByCategory(category.slug).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Link
        to={`/tools?category=${category.slug}`}
        className="card group block h-full p-5 hover:border-brand-200 hover:shadow-card-hover dark:hover:border-brand-900"
      >
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
          {category.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {category.description}
        </p>
        <span className="mt-4 inline-block text-xs font-medium text-slate-400 dark:text-slate-500">
          {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
        </span>
      </Link>
    </motion.div>
  )
}

CategoryCard.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
}
