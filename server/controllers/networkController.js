import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import * as networkService from '../services/networkService.js'

export const getMyIp = asyncHandler(async (req, res) => {
  // req.ip respects Express's trust proxy setting, correctly resolving
  // to the real client IP behind a load balancer or reverse proxy
  // rather than the proxy's own address.
  const ip = req.ip || req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress
  sendSuccess(res, { data: { ip } })
})

export const dnsLookup = asyncHandler(async (req, res) => {
  const { domain } = req.query
  if (!domain) throw ApiError.badRequest('A domain is required.')
  const results = await networkService.lookupDns(domain.trim())
  sendSuccess(res, { data: results })
})

export const httpHeaderCheck = asyncHandler(async (req, res) => {
  const { url } = req.query
  if (!url) throw ApiError.badRequest('A URL is required.')
  const result = await networkService.checkHttpHeaders(url)
  sendSuccess(res, { data: result })
})

export const redirectCheck = asyncHandler(async (req, res) => {
  const { url } = req.query
  if (!url) throw ApiError.badRequest('A URL is required.')
  const result = await networkService.checkRedirectChain(url)
  sendSuccess(res, { data: result })
})
