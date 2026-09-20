import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { parseInlineSegments } from '../../../lib/blogContentParser.js'

export default function GuideSection({ title, sections }) {
  if (!sections || sections.length === 0) return null

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
      <div className="mt-6 space-y-8">
        {sections.map((section) => (
          <div key={section.heading}>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{section.heading}</h3>
            <div className="mt-2.5 space-y-3.5">
              {section.body.split('\n\n').map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-slate-600 dark:text-slate-300">
                  {parseInlineSegments(paragraph).map((segment) => {
                    if (segment.type === 'bold') {
                      return <strong key={segment.key} className="font-semibold text-slate-900 dark:text-white">{segment.text}</strong>
                    }
                    if (segment.type === 'link') {
                      const isInternal = segment.url.startsWith('/')
                      return isInternal ? (
                        <Link key={segment.key} to={segment.url} className="font-medium text-brand-600 hover:underline dark:text-brand-400">
                          {segment.text}
                        </Link>
                      ) : (
                        <a
                          key={segment.key}
                          href={segment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-brand-600 hover:underline dark:text-brand-400"
                        >
                          {segment.text}
                        </a>
                      )
                    }
                    return <React.Fragment key={segment.key}>{segment.text}</React.Fragment>
                  })}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

GuideSection.propTypes = {
  title: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })
  ),
}
