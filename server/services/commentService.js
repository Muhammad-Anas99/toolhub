import Comment from '../models/Comment.js'
import Blog from '../models/Blog.js'
import { ApiError } from '../utils/ApiError.js'

async function getPublishedBlogBySlug(slug) {
  const blog = await Blog.findOne({ slug: slug.toLowerCase(), published: true })
  if (!blog) throw ApiError.notFound(`Blog post "${slug}" was not found`)
  return blog
}

export async function listCommentsForPost(slug) {
  const blog = await getPublishedBlogBySlug(slug)
  return Comment.find({ blog: blog._id })
    .sort({ createdAt: -1 })
    .populate('user', 'name avatar')
}

export async function createComment(slug, userId, content) {
  const blog = await getPublishedBlogBySlug(slug)
  try {
    const comment = await Comment.create({ blog: blog._id, user: userId, content })
    return comment.populate('user', 'name avatar')
  } catch (error) {
    if (error.code === 11000) {
      throw ApiError.conflict('You\u2019ve already commented on this post \u2014 edit your existing comment instead')
    }
    throw error
  }
}

export async function updateComment(commentId, userId, content) {
  const comment = await Comment.findById(commentId)
  if (!comment) throw ApiError.notFound('Comment not found')
  if (comment.user.toString() !== userId.toString()) {
    throw ApiError.forbidden('You can only edit your own comment')
  }
  comment.content = content
  comment.edited = true
  await comment.save()
  return comment.populate('user', 'name avatar')
}

export async function deleteComment(commentId, userId, isAdmin) {
  const comment = await Comment.findById(commentId)
  if (!comment) throw ApiError.notFound('Comment not found')
  if (!isAdmin && comment.user.toString() !== userId.toString()) {
    throw ApiError.forbidden('You can only delete your own comment')
  }
  await comment.deleteOne()
}
