import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import * as userService from '../services/userService.js'
import { verifyCurrentPassword } from './authController.js'
import { storeFile } from '../services/storageService.js'

// --- Self-service (any authenticated user) --------------------------------------

export const updateMyProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateProfile(req.user._id, req.body)
  sendSuccess(res, { message: 'Profile updated', data: user })
})

/**
 * Uploads a real image file (validated for type/size by the shared
 * `upload` multer middleware — see routes/userRoutes.js) and sets it as
 * the user's avatar. Reuses the same storage mechanism as admin content
 * uploads (server/services/storageService.js): Vercel Blob in production,
 * local `uploads/` in dev.
 */
export const uploadMyAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw ApiError.badRequest('No image was uploaded')
  }

  const { url } = await storeFile(req.file, req)
  const user = await userService.setAvatar(req.user._id, url)
  sendSuccess(res, { message: 'Profile picture updated', data: user })
})

export const removeMyAvatar = asyncHandler(async (req, res) => {
  const user = await userService.removeAvatar(req.user._id)
  sendSuccess(res, { message: 'Profile picture removed', data: user })
})

export const changeMyPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body

  const isValid = await verifyCurrentPassword(req.user._id, currentPassword)
  if (!isValid) throw ApiError.badRequest('Current password is incorrect')

  await userService.changePassword(req.user._id, newPassword)
  sendSuccess(res, { message: 'Password changed. Please sign in again on other devices.' })
})

// --- Admin -------------------------------------------------------------------------

export const getUsers = asyncHandler(async (req, res) => {
  const { role, plan, search } = req.query
  const users = await userService.listUsers({ role, plan, search })
  sendSuccess(res, { data: users, meta: { count: users.length } })
})

export const getUser = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id)
  sendSuccess(res, { data: user })
})

export const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUserAsAdmin(req.params.id, req.body)
  sendSuccess(res, { message: 'User updated', data: user })
})

export const deleteUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user._id.toString()) {
    throw ApiError.badRequest('You cannot delete your own account from here')
  }
  await userService.deleteUser(req.params.id)
  sendSuccess(res, { message: 'User deleted' })
})
