import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import { storeFile } from '../services/storageService.js'

/**
 * Admin-only content uploads (blog images, logos, etc.) — not to be
 * confused with the user-facing Downloads flow (POST /api/downloads),
 * which uses the same underlying storeFile() but through a different,
 * differently-authorized route. See services/storageService.js.
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
