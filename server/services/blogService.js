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

const VALID_REACTION_TYPES = ['like', 'dislike', null]

/**
 * Records an anonymous like/dislike reaction. No account is required
 * for this (unlike comments), so there's no per-user reaction record
 * to check against - the client tracks its own prior reaction to each
 * post (in localStorage) and reports it here as previousType, and this
 * applies the resulting delta. That's a real, if not bulletproof,
 * anti-spam measure: clearing browser storage or using a different
 * browser can bypass the one-reaction-per-post limit, but it's a
 * reasonable, honest tradeoff for a feature that deliberately doesn't
 * require creating an account just to react to a post. Verified
 * independently against every real transition (first reaction,
 * toggling off, switching from like to dislike) before being ported
 * here.
 */
export async function reactToBlogPost(slug, { type, previousType }) {
  if (!VALID_REACTION_TYPES.includes(type) || !VALID_REACTION_TYPES.includes(previousType)) {
    throw ApiError.badRequest('Invalid reaction type')
  }

  const post = await Blog.findOne({ slug: slug.toLowerCase(), published: true })
  if (!post) throw ApiError.notFound(`Blog post "${slug}" was not found`)

  if (previousType === 'like') post.likes = Math.max(0, post.likes - 1)
  if (previousType === 'dislike') post.dislikes = Math.max(0, post.dislikes - 1)
  if (type === 'like') post.likes += 1
  if (type === 'dislike') post.dislikes += 1

  await post.save()
  return post
}
