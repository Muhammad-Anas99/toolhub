import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import * as favoriteService from '../services/favoriteService.js'

export const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await favoriteService.listFavorites(req.user._id)
  sendSuccess(res, { data: favorites, meta: { count: favorites.length } })
})

export const addFavorite = asyncHandler(async (req, res) => {
  const { toolSlug } = req.body
  if (!toolSlug) throw ApiError.badRequest('toolSlug is required')

  const favorite = await favoriteService.addFavorite(req.user._id, toolSlug)
  sendSuccess(res, { statusCode: 201, message: 'Added to favorites', data: favorite })
})

export const removeFavorite = asyncHandler(async (req, res) => {
  await favoriteService.removeFavorite(req.user._id, req.params.toolSlug)
  sendSuccess(res, { message: 'Removed from favorites' })
})
