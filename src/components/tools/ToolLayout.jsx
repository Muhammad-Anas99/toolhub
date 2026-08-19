import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { HiOutlineShieldCheck } from 'react-icons/hi2'
import Container from '../ui/Container.jsx'
import SEO, { SITE_URL } from '../ui/SEO.jsx'
import Breadcrumb from './Breadcrumb.jsx'
import ToolHeader from './ToolHeader.jsx'
import CategorySidebar from './CategorySidebar.jsx'
import SuggestToolBanner from './SuggestToolBanner.jsx'
import RelatedTools from './RelatedTools.jsx'
import ToolFAQSection from './ToolFAQSection.jsx'
import ToolInformation from './info/ToolInformation.jsx'
import { getCategoryBySlug } from '../../data/categories.js'
import { toolContent } from '../../data/toolContent.js'
import { useCategories } from '../../hooks/useCategories.js'

/**
 * Shared shell for every tool page. Handles the parts that are identical
 * across tools (breadcrumb, header, category sidebar, SEO, related tools,
 * FAQ) so each tool page only needs to provide its own working UI as
 * `children`. Every tool's title/description/canonical URL/structured
 * data comes straight from its own entry in src/data/tools.js — never a
 * shared generic value, so every tool page gets genuinely unique SEO
 * metadata without needing to repeat this wiring in each page file.
 *
 * Layout matches the same pattern as the Tools/category listing page
 * (top row: title+description left, "100% Free to Use" right; category
 * sidebar alongside the main content) — previously this page used a
 * completely different centered single-column layout, which is what made
 * individual tool pages feel visually inconsistent with the rest of the
 * site.
 */
export default function ToolLayout({ tool, children, faqItems }) {
  const category = getCategoryBySlug(tool.category)
  const hasContent = Boolean(toolContent[tool.slug])
  const { categories } = useCategories()

  const breadcrumbItems = [
    { label: 'Tools', to: '/tools' },
    ...(category ? [{ label: category.name, to: `/tools?category=${category.slug}` }] : []),
    { label: tool.name },
  ]

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: tool.name,
      description: tool.description,
      url: `${SITE_URL}${tool.path}`,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any (runs in any modern browser)',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE_URL}/tools` },
        ...(category
          ? [
              {
                '@type': 'ListItem',
                position: 3,
                name: category.name,
                item: `${SITE_URL}/tools?category=${category.slug}`,
              },
            ]
          : []),
        {
          '@type': 'ListItem',
          position: category ? 4 : 3,
          name: tool.name,
          item: `${SITE_URL}${tool.path}`,
        },
      ],
    },
    // Only added when the same FAQs are visibly rendered on the page
    // below (via ToolFAQSection) — structured data must match what a
    // visitor actually sees, not be added speculatively.
    ...(faqItems && faqItems.length > 0
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          },
        ]
      : []),
  ]

  return (
    <>
      <SEO
        title={tool.seoTitle || tool.name}
        description={tool.description}
        canonicalPath={tool.path}
        structuredData={structuredData}
      />

      <Container className="py-10">
        <Breadcrumb items={breadcrumbItems} />

        {/* Category selector for mobile/tablet, where the sidebar below
            is hidden — same pattern as the Tools page, genuine navigation
            here (there's nothing to filter on a single tool page). */}
        <div className="mt-6 flex flex-wrap items-center gap-2 lg:hidden">
          <Link
            to="/tools"
            className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/tools?category=${cat.slug}`}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                cat.slug === tool.category
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Sidebar + main content — starts right after the breadcrumb/
            mobile category selector above, with no separate full-width
            header row spanning above both columns. */}
        <div className="mt-6 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <CategorySidebar categories={categories} activeCategory={tool.category} />
          </aside>

          <div>
            {/* Name + "100% Free to Use" as a row scoped to this column
                only — starting beside the sidebar, not spanning above it.
                Stacks to a single column on narrow screens via flex-col,
                so there's no separate mobile-only duplicate needed. */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <ToolHeader icon={tool.icon} title={tool.name} description={tool.description} toolSlug={tool.slug} />

              <div className="flex flex-shrink-0 items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:w-72">
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

            {/* The tool itself stays the visual focus near the top of
                this column — everything below (info sections, related
                tools, FAQ, CTA) is reference material a visitor scrolls
                to only if they want it. A subtle background panel gives
                the actual tool area visual separation from the page,
                same treatment already used on the Tools listing page. */}
            <div className="mx-auto max-w-3xl rounded-2xl bg-slate-50 p-5 dark:bg-slate-900/40 sm:p-6">{children}</div>

            {hasContent && (
              <div className="mx-auto mt-20 max-w-3xl">
                <ToolInformation toolName={tool.name} toolSlug={tool.slug} />
              </div>
            )}

            <div className="mx-auto mt-20 max-w-3xl space-y-16">
              <RelatedTools currentToolId={tool.id} category={tool.category} />
              <ToolFAQSection items={faqItems} />
            </div>

            <div className="mx-auto mt-16 max-w-3xl text-center">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 dark:border-slate-800 dark:bg-slate-900/50">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Looking for something else?
                </h2>
                <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                  Browse the full collection of free tools, or explore what&apos;s in this category.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <Link to="/tools" className="btn-primary text-sm">
                    Browse all tools
                  </Link>
                  {category && (
                    <Link to={`/tools?category=${category.slug}`} className="btn-secondary text-sm">
                      More {category.name}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <SuggestToolBanner />
        </div>
      </Container>
    </>
  )
}

ToolLayout.propTypes = {
  tool: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    icon: PropTypes.elementType,
    slug: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
  faqItems: PropTypes.array,
}
