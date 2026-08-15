import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import { storeFile } from '../services/storageService.js'

/**
 * Admin-only content uploads (blog images, logos, etc.). See
 * services/storageService.js for the underlying storage mechanism, also
 * reused by the profile-picture upload route (POST /users/me/avatar).
 */
export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw ApiError.badRequest('No file was uploaded')
  }

  const { url, filename } = await storeFile(req.file, req)

  sendSuccess(res, {
    statusCode: 201,
    message: 'File uploaded',
    data: {
      filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype,
      url,
    },
  })
})
