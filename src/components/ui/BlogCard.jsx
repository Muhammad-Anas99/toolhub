import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineCalendar, HiOutlineClock } from 'react-icons/hi2'

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function BlogCard({ post }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/blog/${post.slug}`} className="card group flex h-full flex-col overflow-hidden hover:shadow-card-hover">
        <div className="flex h-32 items-center justify-center bg-gradient-to-br from-brand-500 to-brand-700">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {post.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
            {post.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
            <span className="inline-flex items-center gap-1">
              <HiOutlineCalendar className="h-3.5 w-3.5" />
              {formatDate(post.createdAt)}
            </span>
            <span className="inline-flex items-center gap-1">
              <HiOutlineClock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

BlogCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    readTime: PropTypes.string.isRequired,
  }).isRequired,
}
