import Blog from '../models/Blog.js'
import { ApiError } from '../utils/ApiError.js'
import { slugify } from '../utils/slugify.js'

/**
 * List blog posts. Defaults to published-only (what the public site should
 * show); pass includeUnpublished: true for an admin/editor view later.
 */
export async function listBlogPosts({ category, search, includeUnpublished = false } = {}) {
  const query = {}
  if (!includeUnpublished) query.published = true
  if (category && category !== 'all') query.category = category
  if (search) query.$text = { $search: search }

  return Blog.find(query).sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
}

export async function getBlogPostBySlug(slug, { includeUnpublished = false } = {}) {
  const query = { slug: slug.toLowerCase() }
  if (!includeUnpublished) query.published = true

  const post = await Blog.findOne(query)
  if (!post) throw ApiError.notFound(`Blog post "${slug}" was not found`)
  return post
}

export async function createBlogPost(payload) {
  const slug = payload.slug ? slugify(payload.slug) : slugify(payload.title)

  const existing = await Blog.findOne({ slug })
  if (existing) throw ApiError.conflict(`A blog post with slug "${slug}" already exists`)

  return Blog.create({ ...payload, slug })
}

export async function updateBlogPost(slug, payload) {
  const post = await Blog.findOne({ slug: slug.toLowerCase() })
  if (!post) throw ApiError.notFound(`Blog post "${slug}" was not found`)

  Object.assign(post, payload)
  await post.save()
  return post
}

export async function deleteBlogPost(slug) {
  const post = await Blog.findOneAndDelete({ slug: slug.toLowerCase() })
  if (!post) throw ApiError.notFound(`Blog post "${slug}" was not found`)
  return post
}
