import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import * as analyticsService from '../services/analyticsService.js'

export const getOverview = asyncHandler(async (req, res) => {
  const overview = await analyticsService.getDashboardOverview()
  sendSuccess(res, { data: overview })
})

/**
 * Public — no auth required. Just aggregate counts and top-tool usage,
 * safe to expose to anonymous homepage visitors. See
 * analyticsService.getPublicStats for exactly what this does and
 * doesn't include.
 */
export const getPublicStats = asyncHandler(async (req, res) => {
  const stats = await analyticsService.getPublicStats()
  sendSuccess(res, { data: stats })
})
