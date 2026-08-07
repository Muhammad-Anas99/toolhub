import Favorite from '../models/Favorite.js'
import { ApiError } from '../utils/ApiError.js'

export async function listFavorites(userId) {
  return Favorite.find({ user: userId }).sort({ createdAt: -1 })
}

export async function addFavorite(userId, toolSlug) {
  try {
    return await Favorite.create({ user: userId, toolSlug: toolSlug.toLowerCase() })
  } catch (error) {
    if (error.code === 11000) {
      throw ApiError.conflict('This tool is already in your favorites')
    }
    throw error
  }
}

export async function removeFavorite(userId, toolSlug) {
  const favorite = await Favorite.findOneAndDelete({ user: userId, toolSlug: toolSlug.toLowerCase() })
  if (!favorite) throw ApiError.notFound('This tool is not in your favorites')
  return favorite
}
