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
