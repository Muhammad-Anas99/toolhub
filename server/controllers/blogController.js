import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import * as blogService from '../services/blogService.js'

export const getBlogPosts = asyncHandler(async (req, res) => {
  const { category, search } = req.query
  const posts = await blogService.listBlogPosts({ category, search })
  sendSuccess(res, { data: posts, meta: { count: posts.length } })
})

// Admin-only: includes unpublished drafts, which the public listing above
// deliberately excludes. Powers the Blog CMS's post list.
export const getAllBlogPostsAdmin = asyncHandler(async (req, res) => {
  const { category, search } = req.query
  const posts = await blogService.listBlogPosts({ category, search, includeUnpublished: true })
  sendSuccess(res, { data: posts, meta: { count: posts.length } })
})

export const getBlogPost = asyncHandler(async (req, res) => {
  const post = await blogService.getBlogPostBySlug(req.params.slug)
  sendSuccess(res, { data: post })
})

// Admin-only: fetches a post by slug regardless of published status, so
// the Blog CMS can open a draft for editing.
export const getBlogPostAdmin = asyncHandler(async (req, res) => {
  const post = await blogService.getBlogPostBySlug(req.params.slug, { includeUnpublished: true })
  sendSuccess(res, { data: post })
})

export const createBlogPost = asyncHandler(async (req, res) => {
  const post = await blogService.createBlogPost(req.body)
  sendSuccess(res, { statusCode: 201, message: 'Blog post created', data: post })
})

export const updateBlogPost = asyncHandler(async (req, res) => {
  const post = await blogService.updateBlogPost(req.params.slug, req.body)
  sendSuccess(res, { message: 'Blog post updated', data: post })
})

export const deleteBlogPost = asyncHandler(async (req, res) => {
  await blogService.deleteBlogPost(req.params.slug)
  sendSuccess(res, { message: 'Blog post deleted' })
})
