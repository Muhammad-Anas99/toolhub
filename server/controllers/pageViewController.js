import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import * as pageViewService from '../services/pageViewService.js'
import { getCountry, getCity, getClientIp, isLikelyBot } from '../utils/requestMeta.js'
import { isValidPagePath } from '../utils/validPagePath.js'
import { shouldRecordPageView, isValidIpParam } from '../utils/pageViewPolicy.js'

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
  if (!isValidPagePath(path)) {
    throw ApiError.badRequest('path must be a site path starting with "/"')
  }

  // Bots, the admin panel's own pages, and anyone signed in as an admin
  // are acknowledged but never written - see pageViewPolicy.js.
  const decision = shouldRecordPageView({ path, isBot: isLikelyBot(req), user: req.user })
  if (!decision.record) {
    return sendSuccess(res, { message: 'Acknowledged (not recorded)' })
  }

  await pageViewService.logPageView({
    path,
    country: getCountry(req),
    city: getCity(req),
    ipAddress: getClientIp(req),
  })

  sendSuccess(res, { statusCode: 201, message: 'Page view logged' })
})

export const getPageViewSummary = asyncHandler(async (req, res) => {
  const range = pageViewService.normalizeRange(req.query.range)
  const summary = await pageViewService.getPageViewSummary(range)
  sendSuccess(res, { data: { ...summary, range } })
})

export const getPageViewVisitors = asyncHandler(async (req, res) => {
  const range = pageViewService.normalizeRange(req.query.range)
  const page = Math.max(1, parseInt(req.query.page, 10) || 1)
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 25))
  const result = await pageViewService.getVisitors(range, { page, limit })
  // yourIp lets the admin screen label the row that is the admin's own
  // address, so it can be spotted (and removed) at a glance.
  sendSuccess(res, { data: { ...result, range, yourIp: getClientIp(req) } })
})

export const deleteVisitor = asyncHandler(async (req, res) => {
  const { ip } = req.query
  if (!isValidIpParam(ip)) {
    throw ApiError.badRequest('A valid ip query parameter is required')
  }
  const deleted = await pageViewService.deleteViewsByIp(ip)
  sendSuccess(res, { message: `Removed ${deleted} page view${deleted === 1 ? '' : 's'}`, data: { deleted } })
})
