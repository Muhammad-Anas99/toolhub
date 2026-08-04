import React from 'react'
import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'

const SITE_NAME = 'ToolHub'
const DEFAULT_DESCRIPTION =
  'ToolHub — Free online tools to convert, compress, resize, crop and rotate your images. Fast, private, and works right in your browser.'

export default function SEO({ title, description = DEFAULT_DESCRIPTION, canonicalPath = '' }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Free Online Tools`
  const canonicalUrl = canonicalPath ? `https://toolhub.example.com${canonicalPath}` : undefined

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  canonicalPath: PropTypes.string,
}
