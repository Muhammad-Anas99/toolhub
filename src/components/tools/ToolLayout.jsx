import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Container from '../ui/Container.jsx'
import SEO, { SITE_URL } from '../ui/SEO.jsx'
import Breadcrumb from './Breadcrumb.jsx'
import ToolHeader from './ToolHeader.jsx'
import RelatedTools from './RelatedTools.jsx'
import ToolFAQSection from './ToolFAQSection.jsx'
import ToolInformation from './info/ToolInformation.jsx'
import { getCategoryBySlug } from '../../data/categories.js'
import { toolContent } from '../../data/toolContent.js'

/**
 * Shared shell for every tool page. Handles the parts that are identical
 * across tools (breadcrumb, header, SEO, related tools, FAQ) so each tool
 * page only needs to provide its own working UI as `children`. Every
 * tool's title/description/canonical URL/structured data comes straight
 * from its own entry in src/data/tools.js — never a shared generic value,
 * so every one of the 10 tool pages gets genuinely unique SEO metadata
 * without needing to repeat this wiring in each page file.
 */
export default function ToolLayout({ tool, children, faqItems }) {
  const category = getCategoryBySlug(tool.category)
  const hasContent = Boolean(toolContent[tool.slug])

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
        title={tool.name}
        description={tool.description}
        canonicalPath={tool.path}
        structuredData={structuredData}
      />

      <Container className="py-10">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-8">
          <ToolHeader icon={tool.icon} title={tool.name} description={tool.description} toolSlug={tool.slug} />
        </div>

        {/* The tool itself stays the visual focus near the top of the
            page — everything below (info sections, related tools, FAQ,
            CTA) is reference material a visitor scrolls to only if they
            want it. */}
        <div className="mx-auto mt-10 max-w-3xl">{children}</div>

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
