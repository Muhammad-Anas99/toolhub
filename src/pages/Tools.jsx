import React, { useMemo, useState } from 'react'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import Container from '../components/ui/Container.jsx'
import ToolCard from '../components/ui/ToolCard.jsx'
import SEO from '../components/ui/SEO.jsx'
import { tools, categories } from '../data/tools.js'

export default function Tools() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return tools.filter((tool) => {
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory
      const matchesQuery =
        normalizedQuery.length === 0 ||
        tool.name.toLowerCase().includes(normalizedQuery) ||
        tool.description.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [query, activeCategory])

  return (
    <>
      <SEO
        title="All Tools"
        description="Browse every free online tool available on ToolHub, including image converters, compressors, and more."
        canonicalPath="/tools"
      />

      <Container className="py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            All tools
          </h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Search or filter by category to find the tool you need.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <div className="relative">
            <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tools..."
              aria-label="Search tools"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
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
              onClick={() => setActiveCategory(category.slug)}
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

        <div className="mt-12">
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-md py-16 text-center">
              <p className="text-slate-500 dark:text-slate-400">
                No tools found for &ldquo;{query}&rdquo;. Try a different search term.
              </p>
            </div>
          )}
        </div>
      </Container>
    </>
  )
}
