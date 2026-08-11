import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import { storeFile } from '../services/storageService.js'
import * as downloadService from '../services/downloadService.js'

/**
 * Called once, right after the browser download is actually triggered —
 * see src/hooks/useToolResult.js. The uploaded file here IS the real
 * converted output the user just downloaded to their device (the same
 * Blob, sent to both places) — not a placeholder, not just a filename.
 * Only ever called for signed-in users; there's no Downloads library to
 * show it in otherwise.
 */
export const createDownload = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw ApiError.badRequest('No file was provided')
  }

  const { toolSlug, toolName } = req.body
  if (!toolSlug || !toolName) {
    throw ApiError.badRequest('toolSlug and toolName are required')
  }

  const { url, filename } = await storeFile(req.file, req)

  const download = await downloadService.createDownload({
    userId: req.user._id,
    toolSlug,
    toolName,
    filename,
    mimeType: req.file.mimetype,
    fileUrl: url,
    fileSize: req.file.size,
  })

  sendSuccess(res, { statusCode: 201, message: 'Download saved', data: download })
})

export const getMyDownloads = asyncHandler(async (req, res) => {
  const { page, limit } = req.query
  const result = await downloadService.listMyDownloads(req.user._id, { page, limit })
  sendSuccess(res, {
    data: result.items,
    meta: { total: result.total, page: result.page, pages: result.pages },
  })
})

export const deleteDownload = asyncHandler(async (req, res) => {
  await downloadService.deleteDownload(req.user._id, req.params.id)
  sendSuccess(res, { message: 'Download removed' })
})
