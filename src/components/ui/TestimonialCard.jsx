import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { HiMiniStar } from 'react-icons/hi2'

export default function TestimonialCard({ testimonial }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="card flex h-full flex-col p-6"
    >
      <div className="flex gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, index) => (
          <HiMiniStar key={index} className="h-4 w-4" />
        ))}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700 dark:bg-brand-900 dark:text-brand-300">
          {testimonial.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {testimonial.name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  )
}

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    quote: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    initials: PropTypes.string.isRequired,
  }).isRequired,
}
