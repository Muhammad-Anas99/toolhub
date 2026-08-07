import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import * as historyService from '../services/historyService.js'
import { getCountry, getDeviceType } from '../utils/requestMeta.js'

/**
 * Logs a completed conversion. Works for both logged-in and anonymous
 * users (see `attachUserIfPresent` on this route) — anonymous
 * conversions still count toward site-wide analytics, just without a
 * user-visible history entry.
 */
export const logConversion = asyncHandler(async (req, res) => {
  const { toolSlug, toolName, category, originalFileName } = req.body
  if (!toolSlug || !toolName) {
    throw ApiError.badRequest('toolSlug and toolName are required')
  }

  const entry = await historyService.logConversion({
    userId: req.user?._id,
    toolSlug,
    toolName,
    category,
    originalFileName,
    country: getCountry(req),
    device: getDeviceType(req),
  })

  sendSuccess(res, { statusCode: 201, message: 'Conversion logged', data: entry })
})

export const getMyHistory = asyncHandler(async (req, res) => {
  const { page, limit } = req.query
  const result = await historyService.listMyHistory(req.user._id, { page, limit })
  sendSuccess(res, {
    data: result.items,
    meta: { total: result.total, page: result.page, pages: result.pages },
  })
})

export const clearMyHistory = asyncHandler(async (req, res) => {
  await historyService.clearMyHistory(req.user._id)
  sendSuccess(res, { message: 'History cleared' })
})

export const deleteHistoryEntry = asyncHandler(async (req, res) => {
  await historyService.deleteHistoryEntry(req.user._id, req.params.id)
  sendSuccess(res, { message: 'History entry deleted' })
})
