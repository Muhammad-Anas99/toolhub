import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import Container from '../components/ui/Container.jsx'
import ToolCard from '../components/ui/ToolCard.jsx'
import SEO, { SITE_URL } from '../components/ui/SEO.jsx'
import { useTools } from '../hooks/useTools.js'
import { useCategories } from '../hooks/useCategories.js'

export default function Tools() {
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryParam = searchParams.get('category') || 'all'
  const queryParam = searchParams.get('query') || ''

  const [query, setQuery] = useState(queryParam)
  const [activeCategory, setActiveCategory] = useState(categoryParam)

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

  const activeCategoryData =
    activeCategory !== 'all' ? categories.find((category) => category.slug === activeCategory) : null

  const CategoryIcon = activeCategoryData?.icon

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

      <Container className="py-16">
        <div className="mx-auto max-w-2xl text-center">
          {CategoryIcon && (
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
              <CategoryIcon className="h-7 w-7" />
            </div>
          )}
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {activeCategoryData ? activeCategoryData.name : 'All tools'}
          </h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            {activeCategoryData
              ? activeCategoryData.description
              : 'Search or filter by category to find the tool you need.'}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <div className="relative">
            <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={handleQueryChange}
              placeholder="Search tools..."
              aria-label="Search tools"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => handleCategoryChange('all')}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === 'all'
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategoryChange(category.slug)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === category.slug
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-slate-400 dark:text-slate-500">
          {toolsLoading
            ? 'Loading tools...'
            : `${filteredTools.length} ${filteredTools.length === 1 ? 'tool' : 'tools'} found`}
        </p>

        <div className="mt-8">
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool) => (
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
      </Container>
    </>
  )
}
