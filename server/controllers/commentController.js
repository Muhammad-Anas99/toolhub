import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import * as commentService from '../services/commentService.js'

export const getComments = asyncHandler(async (req, res) => {
  const comments = await commentService.listCommentsForPost(req.params.slug)
  sendSuccess(res, { data: comments, meta: { count: comments.length } })
})

export const getAllCommentsAdmin = asyncHandler(async (req, res) => {
  const comments = await commentService.listAllCommentsAdmin()
  sendSuccess(res, { data: comments, meta: { count: comments.length } })
})

export const createComment = asyncHandler(async (req, res) => {
  const comment = await commentService.createComment(req.params.slug, req.user._id, req.body.content)
  sendSuccess(res, { statusCode: 201, message: 'Comment posted', data: comment })
})

export const updateComment = asyncHandler(async (req, res) => {
  const comment = await commentService.updateComment(req.params.commentId, req.user._id, req.body.content)
  sendSuccess(res, { message: 'Comment updated', data: comment })
})

export const deleteComment = asyncHandler(async (req, res) => {
  await commentService.deleteComment(req.params.commentId, req.user._id, req.user.role === 'admin')
  sendSuccess(res, { message: 'Comment deleted' })
})
