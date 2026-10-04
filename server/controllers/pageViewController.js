import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import * as pageViewService from '../services/pageViewService.js'
import { getCountry, getCity, getClientIp, isLikelyBot } from '../utils/requestMeta.js'

/**
 * Logs a single page view - any page, not just tool pages, which is
 * the whole point of this existing as its own endpoint rather than
 * reusing /history (that only fires when a tool is actually used).
 * Same bot-handling convention as historyController.logConversion:
 * acknowledged normally but never written, since a crawler rendering
 * every page to index it looks identical to a real visit at this
 * level, and would otherwise flood this specifically page-load-keyed
 * collection even more than it affected conversion counts.
 */
export const logPageView = asyncHandler(async (req, res) => {
  const { path } = req.body
  if (!path) {
    throw ApiError.badRequest('path is required')
  }

  if (isLikelyBot(req)) {
    return sendSuccess(res, { message: 'Acknowledged (not recorded \u2014 automated request)' })
  }

  await pageViewService.logPageView({
    path,
    country: getCountry(req),
    city: getCity(req),
    ipAddress: getClientIp(req),
  })

  sendSuccess(res, { statusCode: 201, message: 'Page view logged' })
})

export const getRecentPageViews = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1)
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 50))
  const result = await pageViewService.getRecentPageViews({ page, limit })
  sendSuccess(res, { data: result })
})
