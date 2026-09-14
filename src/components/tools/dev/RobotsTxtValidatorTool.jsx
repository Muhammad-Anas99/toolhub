import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineCheckCircle, HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { validateRobotsTxt } from '../../../lib/miscToolsUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function RobotsTxtValidatorTool({ toolSlug, toolName, category }) {
  const [content, setContent] = useState('')
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const issues = content.trim() ? validateRobotsTxt(content) : []
  if (content.trim()) logDebounced('robots.txt validated', content)

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">robots.txt content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          placeholder={'User-agent: *\nDisallow: /admin\nSitemap: https://example.com/sitemap.xml'}
          spellCheck={false}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {content.trim() && (
        <div className={`rounded-2xl border p-4 ${issues.length === 0 ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950' : 'border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950'}`}>
          {issues.length === 0 ? (
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <HiOutlineCheckCircle className="h-5 w-5" />
              <p className="text-sm font-medium">No issues found \u2014 this looks like valid robots.txt syntax.</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                {issues.length} issue{issues.length === 1 ? '' : 's'} found
              </p>
              {issues.map((issue, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400">
                  <HiOutlineExclamationTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>{issue.line > 0 ? `Line ${issue.line}: ` : ''}{issue.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

RobotsTxtValidatorTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
