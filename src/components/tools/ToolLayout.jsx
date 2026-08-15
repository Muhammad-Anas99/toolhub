import React from 'react'
import PropTypes from 'prop-types'
import Container from '../ui/Container.jsx'
import SEO, { SITE_URL } from '../ui/SEO.jsx'
import Breadcrumb from './Breadcrumb.jsx'
import ToolHeader from './ToolHeader.jsx'
import RelatedTools from './RelatedTools.jsx'
import ToolFAQSection from './ToolFAQSection.jsx'
import { getCategoryBySlug } from '../../data/categories.js'

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

        <div className="mx-auto mt-10 max-w-3xl">{children}</div>

        <div className="mx-auto mt-20 max-w-3xl space-y-16">
          <RelatedTools currentToolId={tool.id} category={tool.category} />
          <ToolFAQSection items={faqItems} />
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
