import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import * as analyticsService from '../services/analyticsService.js'

export const getOverview = asyncHandler(async (req, res) => {
  const overview = await analyticsService.getDashboardOverview()
  sendSuccess(res, { data: overview })
})
