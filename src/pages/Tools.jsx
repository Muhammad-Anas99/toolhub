import React, { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  HiOutlineMagnifyingGlass,
  HiOutlineSquares2X2,
  HiOutlineChatBubbleLeftRight,
  HiOutlineShieldCheck,
  HiOutlineBarsArrowDown,
  HiChevronDown,
} from 'react-icons/hi2'
import Container from '../components/ui/Container.jsx'
import ToolCard from '../components/ui/ToolCard.jsx'
import Breadcrumb from '../components/tools/Breadcrumb.jsx'
import SEO, { SITE_URL } from '../components/ui/SEO.jsx'
import { useTools } from '../hooks/useTools.js'
import { useCategories } from '../hooks/useCategories.js'

const SORT_OPTIONS = [
  { value: 'popular', label: 'Popular' },
  { value: 'name', label: 'Name (A-Z)' },
]

export default function Tools() {
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryParam = searchParams.get('category') || 'all'
  const queryParam = searchParams.get('query') || ''

  const [query, setQuery] = useState(queryParam)
  const [activeCategory, setActiveCategory] = useState(categoryParam)
  const [sortBy, setSortBy] = useState('popular')

  // Keep local state in sync if the URL changes externally (e.g. nav link click).
  useEffect(() => {
    setQuery(queryParam)
    setActiveCategory(categoryParam)
  }, [queryParam, categoryParam])

  function updateFilters(nextQuery, nextCategory) {
    const params = {}
    if (nextQuery.trim()) params.query = nextQuery.trim()
    if (nextCategory !== 'all') params.category = nextCategory
    setSearchParams(params)
  }

  function handleQueryChange(event) {
    const value = event.target.value
    setQuery(value)
    updateFilters(value, activeCategory)
  }

  function handleCategoryChange(slug) {
    setActiveCategory(slug)
    updateFilters(query, slug)
  }

  // Data now comes from the API (src/hooks/useTools.js, useCategories.js),
  // with an automatic fallback to the local data files in src/data/ if the
  // backend isn't reachable — see each hook for details. Filtering by
  // category/search happens inside the hook either way, so this page
  // doesn't need to know which source is currently active.
  const { tools: filteredTools, loading: toolsLoading } = useTools({
    category: activeCategory,
    search: query,
  })
  const { categories } = useCategories()

  // Real, working sort — not decorative. "Popular" surfaces badge:'popular'
  // tools first (then 'new', then everything else), each group keeping its
  // existing order; "Name" is a straightforward alphabetical sort.
  const sortedTools = useMemo(() => {
    const list = [...filteredTools]
    if (sortBy === 'name') {
      return list.sort((a, b) => a.name.localeCompare(b.name))
    }
    const rank = { popular: 0, new: 1 }
    return list.sort((a, b) => (rank[a.badge] ?? 2) - (rank[b.badge] ?? 2))
  }, [filteredTools, sortBy])

  const activeCategoryData =
    activeCategory !== 'all' ? categories.find((category) => category.slug === activeCategory) : null

  const HeaderIcon = activeCategoryData?.icon || HiOutlineSquares2X2
  const headerTitle = activeCategoryData ? activeCategoryData.name : 'All Tools'
  const headerDescription = activeCategoryData
    ? activeCategoryData.description
    : 'Search or filter by category to find the tool you need.'

  const pageTitle = activeCategoryData ? activeCategoryData.name : 'All Tools'
  const pageDescription = activeCategoryData
    ? `${activeCategoryData.description} Free, fast, and works right in your browser.`
    : 'Browse every free online tool available on ToolHub, including image converters, PDF tools, developer utilities and more.'
  const pagePath = activeCategoryData ? `/tools?category=${activeCategoryData.slug}` : '/tools'

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: pageTitle,
      description: pageDescription,
      url: `${SITE_URL}${pagePath}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE_URL}/tools` },
        ...(activeCategoryData
          ? [{ '@type': 'ListItem', position: 3, name: activeCategoryData.name, item: `${SITE_URL}${pagePath}` }]
          : []),
      ],
    },
  ]

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalPath={pagePath}
        structuredData={structuredData}
      />

      <Container className="py-10">
        <Breadcrumb items={activeCategoryData ? [{ label: activeCategoryData.name }] : [{ label: 'All Tools' }]} />

        {/* Header: icon + title + description on the left, "Free to Use" card on the right */}
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
              <HeaderIcon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {headerTitle}
              </h1>
              <p className="mt-2 max-w-xl text-slate-500 dark:text-slate-400">{headerDescription}</p>
            </div>
          </div>

          <div className="flex flex-shrink-0 items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:w-80">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <HiOutlineShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">100% Free to Use</p>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                No sign up required. All tools are free and easy to use.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar + main content */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              <nav className="card p-4">
                <h2 className="px-2 text-sm font-semibold text-slate-900 dark:text-white">Categories</h2>
                <div className="mt-2 space-y-0.5">
                  <button
                    type="button"
                    onClick={() => handleCategoryChange('all')}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors ${
                      activeCategory === 'all'
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-400'
                        : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    <HiOutlineSquares2X2 className="h-4 w-4 flex-shrink-0" />
                    All Tools
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors ${
                        activeCategory === category.slug
                          ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-400'
                          : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                      }`}
                    >
                      <category.icon className="h-4 w-4 flex-shrink-0" />
                      {category.name}
                    </button>
                  ))}
                </div>
              </nav>

              <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white">
                <HiOutlineChatBubbleLeftRight className="h-6 w-6 text-brand-200" />
                <h3 className="mt-3 text-sm font-semibold">Can&apos;t find a tool?</h3>
                <p className="mt-1.5 text-sm text-brand-100">
                  We&apos;re adding new tools every week. Let us know what you want to see!
                </p>
                <Link
                  to="/contact?subject=Tool%20Suggestion"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
                >
                  Suggest a Tool
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </aside>

          <div>
            {/* Sub-header: "All X Tools" + count on the left, search + sort on the right */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  All {headerTitle}
                </h2>
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-400">
                  {toolsLoading ? '...' : `${sortedTools.length} ${sortedTools.length === 1 ? 'tool' : 'tools'}`}
                </span>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative">
                  <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                    placeholder="Search tools..."
                    aria-label="Search tools"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-800 dark:bg-slate-900 dark:text-white sm:w-56"
                  />
                </div>

                <div className="relative">
                  <HiOutlineBarsArrowDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    aria-label="Sort tools"
                    className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm font-medium text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        Sort by: {option.label}
                      </option>
                    ))}
                  </select>
                  <HiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Category pills — extra quick-filter row, useful on the "All Tools" view especially */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleCategoryChange('all')}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    activeCategory === category.slug
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {sortedTools.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {sortedTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              ) : (
                !toolsLoading && (
                  <div className="mx-auto max-w-md py-16 text-center">
                    <p className="text-slate-500 dark:text-slate-400">
                      No tools found{query ? ` for "${query}"` : ''}. Try a different search term or
                      category.
                    </p>
                  </div>
                )
              )}
            </div>

            {sortedTools.length > 0 && (
              <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-emerald-50 p-6 dark:bg-emerald-950/40 sm:flex-row">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400">
                    <HiOutlineShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Powerful {activeCategoryData ? activeCategoryData.name : 'Tools'}. Completely Free.
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      No limits, no watermarks, no hidden fees — just simple, powerful tools for everyone.
                    </p>
                  </div>
                </div>
                {activeCategoryData && (
                  <Link to="/tools" className="btn-primary flex-shrink-0 px-4 py-2 text-sm">
                    Explore All Tools
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}
