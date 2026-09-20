import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import * as historyService from '../services/historyService.js'
import { getCountry, getDeviceType, getClientIp, isLikelyBot } from '../utils/requestMeta.js'

/**
 * Logs a completed conversion. Works for both logged-in and anonymous
 * users (see `attachUserIfPresent` on this route) — anonymous
 * conversions still count toward site-wide analytics, just without a
 * user-visible history entry.
 *
 * Requests identified as coming from a crawler or bot (see
 * requestMeta.isLikelyBot) are acknowledged with a normal success
 * response but never actually written to the database — a real,
 * confirmed problem this fixes: search engine crawlers render tool
 * pages in a real headless browser to index them (the same reason
 * prerendering exists at all), which looks identical to a genuine
 * visit at the page level, and was inflating conversion counts with
 * traffic that was never a person actually using a tool.
 */
export const logConversion = asyncHandler(async (req, res) => {
  const { toolSlug, toolName, category, action, originalFileName } = req.body
  if (!toolSlug || !toolName) {
    throw ApiError.badRequest('toolSlug and toolName are required')
  }

  if (isLikelyBot(req)) {
    return sendSuccess(res, { message: 'Acknowledged (not recorded — automated request)' })
  }

  const entry = await historyService.logConversion({
    userId: req.user?._id,
    toolSlug,
    toolName,
    category,
    action,
    originalFileName,
    country: getCountry(req),
    device: getDeviceType(req),
    ipAddress: getClientIp(req),
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
 * Admin-only: every conversion across all users, newest first, with the
 * performing user's name/email attached where known. `user: null` on the
 * underlying record (an anonymous conversion) is shaped into an explicit
 * `{ name: 'Anonymous', email: null }` here so the frontend never has to
 * special-case a missing user object.
 */
export const getAllHistoryAdmin = asyncHandler(async (req, res) => {
  const { page, limit, ipAddress } = req.query
  const result = await historyService.listAllHistoryAdmin({ page, limit, ipAddress })

  const items = result.items.map((entry) => ({
    id: entry._id,
    toolSlug: entry.toolSlug,
    toolName: entry.toolName,
    category: entry.category,
    action: entry.action,
    ipAddress: entry.ipAddress,
    country: entry.country,
    device: entry.device,
    createdAt: entry.createdAt,
    user: entry.user ? { id: entry.user._id, name: entry.user.name, email: entry.user.email } : { name: 'Anonymous', email: null },
  }))

  sendSuccess(res, {
    data: items,
    meta: { total: result.total, page: result.page, pages: result.pages },
  })
})

/**
 * Admin-only: deletes any single conversion record by ID, regardless of
 * which user it belongs to (or none, for anonymous traffic) — see
 * historyService.deleteHistoryEntryAdmin for why this is deliberately
 * separate from the user-scoped deleteHistoryEntry above.
 */
export const deleteHistoryEntryAdmin = asyncHandler(async (req, res) => {
  await historyService.deleteHistoryEntryAdmin(req.params.id)
  sendSuccess(res, { message: 'Conversion record deleted' })
})
