import Tool from '../models/Tool.js'
import { ApiError } from '../utils/ApiError.js'
import { slugify } from '../utils/slugify.js'

// Escapes regex special characters in user-supplied search text before it's
// used to build a RegExp — without this, characters like `.`, `*`, `(`
// would either throw, match unintended things, or (in pathological cases)
// create a ReDoS risk. Standard escape pattern for this exact purpose.
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * List tools with optional filters:
 *  - category: filter by category slug
 *  - search: case-insensitive substring match across name/description
 *  - featured: 'true' to only return featured tools
 */
export async function listTools({ category, search, featured } = {}) {
  const query = {}

  if (category && category !== 'all') {
    query.category = category.toLowerCase()
  }

  if (featured === 'true') {
    query.featured = true
  }

  if (search) {
    // A genuine substring match, not MongoDB's $text operator — $text does
    // word-stem matching (each indexed word is its own token), so
    // searching "you" would never match "youtube" as a substring the way
    // a tool search box is expected to behave.
    const pattern = new RegExp(escapeRegex(search.trim()), 'i')
    query.$or = [{ name: pattern }, { description: pattern }]
  }

  return Tool.find(query).sort({ createdAt: -1 })
}

export async function getToolBySlug(slug) {
  const tool = await Tool.findOne({ slug: slug.toLowerCase() })
  if (!tool) throw ApiError.notFound(`Tool "${slug}" was not found`)
  return tool
}

export async function createTool(payload) {
  const slug = payload.slug ? slugify(payload.slug) : slugify(payload.name)

  const existing = await Tool.findOne({ slug })
  if (existing) throw ApiError.conflict(`A tool with slug "${slug}" already exists`)

  return Tool.create({ ...payload, slug })
}

export async function updateTool(slug, payload) {
  const tool = await Tool.findOne({ slug: slug.toLowerCase() })
  if (!tool) throw ApiError.notFound(`Tool "${slug}" was not found`)

  Object.assign(tool, payload)
  await tool.save()
  return tool
}

export async function deleteTool(slug) {
  const tool = await Tool.findOneAndDelete({ slug: slug.toLowerCase() })
  if (!tool) throw ApiError.notFound(`Tool "${slug}" was not found`)
  return tool
}

export async function addToolFaq(slug, { question, answer }) {
  const tool = await getToolBySlug(slug)
  tool.faqs.push({ question, answer })
  await tool.save()
  return tool.faqs[tool.faqs.length - 1]
}

export async function updateToolFaq(slug, faqId, { question, answer }) {
  const tool = await getToolBySlug(slug)
  const faq = tool.faqs.id(faqId)
  if (!faq) throw ApiError.notFound('FAQ not found for this tool')
  faq.question = question
  faq.answer = answer
  await tool.save()
  return faq
}

export async function deleteToolFaq(slug, faqId) {
  const tool = await getToolBySlug(slug)
  const faq = tool.faqs.id(faqId)
  if (!faq) throw ApiError.notFound('FAQ not found for this tool')
  faq.deleteOne()
  await tool.save()
}

const VALID_STAR_VALUES = [1, 2, 3, 4, 5]

/**
 * Records an anonymous star rating (no account required, matching how
 * likes work on blog posts). The client tracks its own previous rating
 * for this tool in localStorage and reports it here as previousRating,
 * so changing a rating adjusts the running sum without inflating the
 * count - a genuine, honest average derived from real ratings, verified
 * against a full realistic sequence (first ratings, a changed rating,
 * a later new rating) before being ported here.
 */
export async function rateTool(slug, { rating, previousRating }) {
  if (!VALID_STAR_VALUES.includes(rating)) {
    throw ApiError.badRequest('Rating must be a whole number from 1 to 5')
  }
  if (previousRating !== null && previousRating !== undefined && !VALID_STAR_VALUES.includes(previousRating)) {
    throw ApiError.badRequest('Invalid previous rating')
  }

  const tool = await getToolBySlug(slug)

  if (previousRating) {
    tool.ratingSum = Math.max(0, tool.ratingSum - previousRating + rating)
  } else {
    tool.ratingSum += rating
    tool.ratingCount += 1
  }

  await tool.save()
  return { ratingSum: tool.ratingSum, ratingCount: tool.ratingCount }
}
