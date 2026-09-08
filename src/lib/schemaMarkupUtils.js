/**
 * Field definitions per schema.org type. `required` fields are what
 * Google's own Rich Results requirements (where a rich result still
 * applies) or basic schema validity call for; `recommended` fields add
 * genuine value but shouldn't be forced on the user if the information
 * doesn't actually exist for their content - inventing a rating, price,
 * or date just to fill a field is explicitly worse than leaving it out.
 */
export const SCHEMA_TYPES = [
  {
    id: 'Organization',
    label: 'Organization',
    fields: [
      { name: 'name', label: 'Organization name', required: true },
      { name: 'url', label: 'Website URL', required: true },
      { name: 'logo', label: 'Logo URL', required: false },
      { name: 'description', label: 'Description', required: false },
      { name: 'sameAs', label: 'Social profile URLs (comma-separated)', required: false, isList: true },
    ],
  },
  {
    id: 'LocalBusiness',
    label: 'Local Business',
    fields: [
      { name: 'name', label: 'Business name', required: true },
      { name: 'address', label: 'Street address', required: true },
      { name: 'addressLocality', label: 'City', required: true },
      { name: 'addressRegion', label: 'State/Region', required: false },
      { name: 'postalCode', label: 'Postal code', required: false },
      { name: 'telephone', label: 'Phone number', required: false },
      { name: 'url', label: 'Website URL', required: false },
      { name: 'priceRange', label: 'Price range (e.g. $$)', required: false },
    ],
  },
  {
    id: 'Article',
    label: 'Article',
    fields: [
      { name: 'headline', label: 'Headline', required: true },
      { name: 'image', label: 'Image URL', required: true },
      { name: 'datePublished', label: 'Date published (YYYY-MM-DD)', required: true },
      { name: 'dateModified', label: 'Date modified (YYYY-MM-DD)', required: false },
      { name: 'authorName', label: 'Author name', required: false },
      { name: 'publisherName', label: 'Publisher name', required: false },
    ],
  },
  {
    id: 'BlogPosting',
    label: 'Blog Posting',
    fields: [
      { name: 'headline', label: 'Headline', required: true },
      { name: 'image', label: 'Image URL', required: true },
      { name: 'datePublished', label: 'Date published (YYYY-MM-DD)', required: true },
      { name: 'dateModified', label: 'Date modified (YYYY-MM-DD)', required: false },
      { name: 'authorName', label: 'Author name', required: false },
    ],
  },
  {
    id: 'Product',
    label: 'Product',
    fields: [
      { name: 'name', label: 'Product name', required: true },
      { name: 'image', label: 'Image URL', required: true },
      { name: 'description', label: 'Description', required: false },
      { name: 'sku', label: 'SKU', required: false },
      { name: 'brand', label: 'Brand name', required: false },
      { name: 'price', label: 'Price', required: false },
      { name: 'priceCurrency', label: 'Currency (e.g. USD)', required: false },
      { name: 'availability', label: 'Availability (InStock / OutOfStock)', required: false },
    ],
  },
  {
    id: 'FAQPage',
    label: 'FAQ Page',
    note: 'Google deprecated the FAQ rich result in Search starting May 2026 \u2014 this markup no longer produces the expanded FAQ snippet it used to. It\u2019s still valid, accurate structured data if something else on your site or another system reads it, but don\u2019t add it expecting a Google search-result benefit.',
    fields: [
      { name: 'questions', label: 'Questions & answers', required: true, isFaqList: true },
    ],
  },
  {
    id: 'BreadcrumbList',
    label: 'Breadcrumb List',
    fields: [
      { name: 'items', label: 'Breadcrumb items (name, one per line)', required: true, isBreadcrumbList: true },
    ],
  },
  {
    id: 'Event',
    label: 'Event',
    fields: [
      { name: 'name', label: 'Event name', required: true },
      { name: 'startDate', label: 'Start date (YYYY-MM-DD)', required: true },
      { name: 'endDate', label: 'End date (YYYY-MM-DD)', required: false },
      { name: 'locationName', label: 'Location name', required: false },
      { name: 'address', label: 'Location address', required: false },
      { name: 'description', label: 'Description', required: false },
    ],
  },
  {
    id: 'SoftwareApplication',
    label: 'Software Application',
    fields: [
      { name: 'name', label: 'Application name', required: true },
      { name: 'applicationCategory', label: 'Category (e.g. UtilitiesApplication)', required: false },
      { name: 'operatingSystem', label: 'Operating system', required: false },
      { name: 'price', label: 'Price', required: false },
      { name: 'priceCurrency', label: 'Currency (e.g. USD)', required: false },
    ],
  },
  {
    id: 'WebSite',
    label: 'Website',
    fields: [
      { name: 'name', label: 'Website name', required: true },
      { name: 'url', label: 'Website URL', required: true },
    ],
  },
  {
    id: 'WebPage',
    label: 'Web Page',
    fields: [
      { name: 'name', label: 'Page title', required: true },
      { name: 'description', label: 'Page description', required: false },
      { name: 'url', label: 'Page URL', required: false },
    ],
  },
  {
    id: 'Person',
    label: 'Person',
    fields: [
      { name: 'name', label: 'Full name', required: true },
      { name: 'jobTitle', label: 'Job title', required: false },
      { name: 'url', label: 'Website/profile URL', required: false },
      { name: 'sameAs', label: 'Social profile URLs (comma-separated)', required: false, isList: true },
    ],
  },
  {
    id: 'HowTo',
    label: 'How-To',
    note: 'Google no longer supports the HowTo rich result in Search as of 2026 \u2014 this markup no longer produces the step-by-step display it used to. Still valid structured data for other purposes, just not for a Google search-result benefit.',
    fields: [
      { name: 'name', label: 'How-to title', required: true },
      { name: 'steps', label: 'Steps (one per line)', required: true, isStepList: true },
    ],
  },
]

function buildFaqSchema(values) {
  const pairs = (values.questions || '').split('\n\n').filter((p) => p.trim())
  return pairs.map((pair) => {
    const [q, ...rest] = pair.split('\n')
    return {
      '@type': 'Question',
      name: (q || '').trim(),
      acceptedAnswer: { '@type': 'Answer', text: rest.join(' ').trim() },
    }
  })
}

function buildBreadcrumbSchema(values) {
  const names = (values.items || '').split('\n').filter((n) => n.trim())
  return names.map((name, i) => ({ '@type': 'ListItem', position: i + 1, name: name.trim() }))
}

function buildHowToSteps(values) {
  const steps = (values.steps || '').split('\n').filter((s) => s.trim())
  return steps.map((text) => ({ '@type': 'HowToStep', text: text.trim() }))
}

export function buildJsonLd(typeId, values) {
  const base = { '@context': 'https://schema.org', '@type': typeId }

  if (typeId === 'FAQPage') {
    return { ...base, mainEntity: buildFaqSchema(values) }
  }
  if (typeId === 'BreadcrumbList') {
    return { ...base, itemListElement: buildBreadcrumbSchema(values) }
  }
  if (typeId === 'HowTo') {
    return { ...base, name: values.name || '', step: buildHowToSteps(values) }
  }
  if (typeId === 'LocalBusiness') {
    return {
      ...base,
      name: values.name || '',
      address: {
        '@type': 'PostalAddress',
        streetAddress: values.address || '',
        addressLocality: values.addressLocality || '',
        addressRegion: values.addressRegion || '',
        postalCode: values.postalCode || '',
      },
      ...(values.telephone ? { telephone: values.telephone } : {}),
      ...(values.url ? { url: values.url } : {}),
      ...(values.priceRange ? { priceRange: values.priceRange } : {}),
    }
  }
  if (typeId === 'Article' || typeId === 'BlogPosting') {
    return {
      ...base,
      headline: values.headline || '',
      image: values.image || '',
      datePublished: values.datePublished || '',
      ...(values.dateModified ? { dateModified: values.dateModified } : {}),
      ...(values.authorName ? { author: { '@type': 'Person', name: values.authorName } } : {}),
      ...(values.publisherName ? { publisher: { '@type': 'Organization', name: values.publisherName } } : {}),
    }
  }
  if (typeId === 'Product') {
    return {
      ...base,
      name: values.name || '',
      image: values.image || '',
      ...(values.description ? { description: values.description } : {}),
      ...(values.sku ? { sku: values.sku } : {}),
      ...(values.brand ? { brand: { '@type': 'Brand', name: values.brand } } : {}),
      ...(values.price
        ? {
            offers: {
              '@type': 'Offer',
              price: values.price,
              priceCurrency: values.priceCurrency || 'USD',
              ...(values.availability ? { availability: `https://schema.org/${values.availability}` } : {}),
            },
          }
        : {}),
    }
  }
  if (typeId === 'Organization' || typeId === 'Person') {
    const result = { ...base }
    for (const key of ['name', 'url', 'logo', 'description', 'jobTitle']) {
      if (values[key]) result[key] = values[key]
    }
    if (values.sameAs) {
      result.sameAs = values.sameAs.split(',').map((s) => s.trim()).filter(Boolean)
    }
    return result
  }
  if (typeId === 'Event') {
    return {
      ...base,
      name: values.name || '',
      startDate: values.startDate || '',
      ...(values.endDate ? { endDate: values.endDate } : {}),
      ...(values.description ? { description: values.description } : {}),
      ...(values.locationName || values.address
        ? { location: { '@type': 'Place', name: values.locationName || '', address: values.address || '' } }
        : {}),
    }
  }

  // Generic fallback for simpler types (SoftwareApplication, WebSite, WebPage)
  const result = { ...base }
  for (const key of ['name', 'url', 'description', 'applicationCategory', 'operatingSystem']) {
    if (values[key]) result[key] = values[key]
  }
  if (values.price) {
    result.offers = { '@type': 'Offer', price: values.price, priceCurrency: values.priceCurrency || 'USD' }
  }
  return result
}

export function validateRequiredFields(typeId, values) {
  const type = SCHEMA_TYPES.find((t) => t.id === typeId)
  if (!type) return []
  return type.fields.filter((f) => f.required && !values[f.name]?.trim()).map((f) => f.label)
}
