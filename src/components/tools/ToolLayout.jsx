import React from 'react'
import PropTypes from 'prop-types'
import Container from '../ui/Container.jsx'
import SEO from '../ui/SEO.jsx'
import Breadcrumb from './Breadcrumb.jsx'
import ToolHeader from './ToolHeader.jsx'
import RelatedTools from './RelatedTools.jsx'
import ToolFAQSection from './ToolFAQSection.jsx'
import { getCategoryBySlug } from '../../data/categories.js'

/**
 * Shared shell for every tool page. Handles the parts that are identical
 * across tools (breadcrumb, header, SEO, related tools, FAQ) so each tool
 * page only needs to provide its own working UI as `children`.
 */
export default function ToolLayout({ tool, children, faqItems }) {
  const category = getCategoryBySlug(tool.category)

  return (
    <>
      <SEO
        title={tool.name}
        description={tool.description}
        canonicalPath={tool.path}
      />

      <Container className="py-10">
        <Breadcrumb
          items={[
            { label: 'Tools', to: '/tools' },
            ...(category ? [{ label: category.name, to: `/tools?category=${category.slug}` }] : []),
            { label: tool.name },
          ]}
        />

        <div className="mt-8">
          <ToolHeader icon={tool.icon} title={tool.name} description={tool.description} />
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
  }).isRequired,
  children: PropTypes.node.isRequired,
  faqItems: PropTypes.array,
}
