import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import * as siteSettingsService from '../services/siteSettingsService.js'

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await siteSettingsService.getSettings()
  sendSuccess(res, { data: settings })
})

export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await siteSettingsService.updateSettings(req.body)
  sendSuccess(res, { message: 'Settings updated', data: settings })
})
