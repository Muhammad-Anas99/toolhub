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

/**
 * Called once, right after the browser download is actually triggered —
 * see src/hooks/useToolResult.js. Distinct from logConversion (which
 * fires when processing finishes, regardless of whether the user ever
 * downloads the result).
 */
export const markDownloaded = asyncHandler(async (req, res) => {
  const entry = await historyService.markDownloaded(req.user._id, req.params.id)
  sendSuccess(res, { message: 'Download recorded', data: entry })
})

export const getMyDownloads = asyncHandler(async (req, res) => {
  const { page, limit } = req.query
  const result = await historyService.listMyDownloads(req.user._id, { page, limit })
  sendSuccess(res, {
    data: result.items,
    meta: { total: result.total, page: result.page, pages: result.pages },
  })
})

/**
 * Admin-only: every conversion across all users, newest first, with the
 * performing user's name/email attached where known. `user: null` on the
 * underlying record (an anonymous conversion) is shaped into an explicit
 * `{ name: 'Anonymous', email: null }` here so the frontend never has to
 * special-case a missing user object.
 */
export const getAllHistoryAdmin = asyncHandler(async (req, res) => {
  const { page, limit } = req.query
  const result = await historyService.listAllHistoryAdmin({ page, limit })

  const items = result.items.map((entry) => ({
    id: entry._id,
    toolSlug: entry.toolSlug,
    toolName: entry.toolName,
    category: entry.category,
    createdAt: entry.createdAt,
    user: entry.user ? { id: entry.user._id, name: entry.user.name, email: entry.user.email } : { name: 'Anonymous', email: null },
  }))

  sendSuccess(res, {
    data: items,
    meta: { total: result.total, page: result.page, pages: result.pages },
  })
})
