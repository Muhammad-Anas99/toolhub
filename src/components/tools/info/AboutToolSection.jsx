import React from 'react'
import PropTypes from 'prop-types'

export default function AboutToolSection({ toolName, about }) {
  if (!about) return null

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        About {toolName}
      </h2>
      <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">{about}</p>
    </div>
  )
}

AboutToolSection.propTypes = {
  toolName: PropTypes.string.isRequired,
  about: PropTypes.string,
}
