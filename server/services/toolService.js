import Tool from '../models/Tool.js'
import { ApiError } from '../utils/ApiError.js'
import { slugify } from '../utils/slugify.js'

/**
 * List tools with optional filters:
 *  - category: filter by category slug
 *  - search: full-text search across name/description/tags
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
    query.$text = { $search: search }
  }

  return Tool.find(query).sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
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
