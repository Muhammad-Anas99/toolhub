import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import * as downloadService from '../services/downloadService.js'
import { DOWNLOAD_RETENTION_DAYS } from '../models/Download.js'

export const saveDownload = asyncHandler(async (req, res) => {
  const { toolSlug, toolName, category, action, fileUrl, fileName, fileSize, mimeType, cloudinaryPublicId } = req.body
  if (!toolSlug || !toolName || !fileUrl || !fileName || !fileSize) {
    throw ApiError.badRequest('toolSlug, toolName, fileUrl, fileName and fileSize are required')
  }

  const download = await downloadService.saveDownload({
    userId: req.user._id,
    toolSlug,
    toolName,
    category,
    action,
    fileUrl,
    fileName,
    fileSize,
    mimeType,
    cloudinaryPublicId,
  })

  sendSuccess(res, { statusCode: 201, message: 'Download saved', data: download })
})

export const getMyDownloads = asyncHandler(async (req, res) => {
  const downloads = await downloadService.listUserDownloads(req.user._id)
  sendSuccess(res, { data: downloads, meta: { retentionDays: DOWNLOAD_RETENTION_DAYS } })
})

export const deleteMyDownload = asyncHandler(async (req, res) => {
  await downloadService.deleteDownload(req.params.id, req.user._id)
  sendSuccess(res, { message: 'Download deleted' })
})

/**
 * Called by Vercel's daily cron (see server/vercel.json) — protect.js
 * doesn't apply here since this isn't a logged-in-user request; it's
 * verified via CRON_SECRET instead (Vercel's documented pattern for
 * securing cron endpoints, https://vercel.com/docs/cron-jobs/manage-cron-jobs).
 */
export const cleanupExpiredDownloads = asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    throw ApiError.unauthorized('Unauthorized')
  }

  const result = await downloadService.cleanupExpiredDownloads()
  sendSuccess(res, { message: 'Cleanup complete', data: result })
})
