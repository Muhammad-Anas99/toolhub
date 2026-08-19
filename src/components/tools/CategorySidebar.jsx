import React from 'react'
import PropTypes from 'prop-types'
import { HiOutlineSquares2X2 } from 'react-icons/hi2'
import { categoryColorClasses } from '../../data/categories.js'

/**
 * The left category sidebar shared by the Tools/category listing page and
 * every individual tool page (via ToolLayout). Two modes:
 *
 * - onSelect provided (Tools.jsx): clicking a category updates filter
 *   state/URL params without leaving the page.
 * - onSelect omitted (ToolLayout.jsx): items are real links to
 *   /tools?category=X — there's nothing to filter on a single tool page,
 *   so this should genuinely navigate, not fake a filter interaction.
 *
 * `max-h-[calc(100vh-7rem)] overflow-y-auto` keeps the sidebar reachable
 * within the viewport even when its content is taller than the visible
 * space below the sticky offset.
 *
 * The "Can't find a tool?" card used to live here — moved to a
 * SuggestToolBanner at the bottom of the page instead (both this page
 * and every tool page), not shown in the sidebar anymore.
 */
export default function CategorySidebar({ categories, activeCategory, onSelect, topContent }) {
  return (
    <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto pb-2">
      {topContent}
      <nav className="card p-4">
        <h2 className="px-2 text-sm font-semibold text-slate-900 dark:text-white">Categories</h2>
        <div className="mt-2 space-y-0.5">
          <SidebarItem
            active={activeCategory === 'all'}
            onSelect={onSelect}
            slug="all"
            icon={HiOutlineSquares2X2}
            iconClasses="bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400"
          >
            All Tools
          </SidebarItem>
          {categories.map((category) => {
            const colors = categoryColorClasses[category.color] || categoryColorClasses.brand
            return (
              <SidebarItem
                key={category.id}
                active={activeCategory === category.slug}
                onSelect={onSelect}
                slug={category.slug}
                icon={category.icon}
                iconClasses={`${colors.bg} ${colors.text}`}
              >
                {category.name}
              </SidebarItem>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

function SidebarItem({ active, onSelect, slug, icon: Icon, iconClasses, children }) {
  const className = `flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors ${
    active
      ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-400'
      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
  }`

  const content = (
    <>
      <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md ${iconClasses}`}>
        <Icon className="h-3.5 w-3.5" />
      </span>
      {children}
    </>
  )

  if (onSelect) {
    return (
      <button type="button" onClick={() => onSelect(slug)} className={className}>
        {content}
      </button>
    )
  }

  return (
    <Link to={slug === 'all' ? '/tools' : `/tools?category=${slug}`} className={className}>
      {content}
    </Link>
  )
}

CategorySidebar.propTypes = {
  categories: PropTypes.array.isRequired,
  activeCategory: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  topContent: PropTypes.node,
}
