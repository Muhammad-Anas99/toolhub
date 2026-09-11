import Blog from '../models/Blog.js'
import { ApiError } from '../utils/ApiError.js'
import { slugify } from '../utils/slugify.js'

/**
 * Computes a genuine reading-time estimate from the post's actual word
 * count (200 words per minute, the same standard basis used by the
 * Word Counter tool), rather than trusting a free-text field an editor
 * could type any value into - this is what previously let every seeded
 * post claim a "5-7 min read" while actually containing a couple of
 * sentences. Verified independently against known word counts before
 * being ported here.
 */
export function computeReadTime(content) {
  if (!content) return '1 min read'
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(wordCount / 200))
  return `${minutes} min read`
}

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

  return Blog.create({ ...payload, slug, readTime: computeReadTime(payload.content) })
}

export async function updateBlogPost(slug, payload) {
  const post = await Blog.findOne({ slug: slug.toLowerCase() })
  if (!post) throw ApiError.notFound(`Blog post "${slug}" was not found`)

  Object.assign(post, payload)
  if (payload.content !== undefined) {
    post.readTime = computeReadTime(post.content)
  }
  await post.save()
  return post
}

export async function deleteBlogPost(slug) {
  const post = await Blog.findOneAndDelete({ slug: slug.toLowerCase() })
  if (!post) throw ApiError.notFound(`Blog post "${slug}" was not found`)
  return post
}
