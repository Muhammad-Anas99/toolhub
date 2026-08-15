import React from 'react'
import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'

const SITE_NAME = 'ToolHub'
const SITE_URL = 'https://trytoolhub.net'
const DEFAULT_DESCRIPTION =
  'ToolHub — Free online tools to convert, compress, resize, crop and rotate your images. Fast, private, and works right in your browser.'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

/**
 * Every page on the site renders this once, with page-specific title/
 * description/canonicalPath — see src/components/tools/ToolLayout.jsx for
 * tool pages (each tool's own name/description from src/data/tools.js
 * flows straight through), and each top-level page (Home.jsx, Tools.jsx,
 * About.jsx, etc.) for everything else. `structuredData` accepts a
 * schema.org object (or array of them) to render as JSON-LD — used for
 * tool pages (SoftwareApplication) and the homepage (WebSite).
 */
export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalPath = '',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  structuredData,
  noIndex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Free Online Tools`
  const canonicalUrl = `${SITE_URL}${canonicalPath}`
  const schemaEntries = Array.isArray(structuredData) ? structuredData : structuredData ? [structuredData] : []

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {/* robots.txt only stops crawling; a URL that's already been linked
          to from elsewhere can still get indexed without ever being
          crawled. This meta tag is the layer that actually prevents that
          — used for token-based auth pages (verify-email, reset-password)
          and the whole /dashboard/* tree, none of which are meaningful
          search results even if Google discovers the URL somehow. */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemaEntries.map((entry, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  )
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  canonicalPath: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.string,
  structuredData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  noIndex: PropTypes.bool,
}

export { SITE_URL, SITE_NAME }
