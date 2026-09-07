import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import { config } from '../config/env.js'
import * as urlShortenerService from '../services/urlShortenerService.js'

export const createShortUrl = asyncHandler(async (req, res) => {
  const { url } = req.body
  const record = await urlShortenerService.createShortUrl(url, req.user?._id)

  sendSuccess(res, {
    statusCode: 201,
    message: 'Short URL created',
    data: {
      shortCode: record.shortCode,
      shortUrl: `${config.clientUrl}/s/${record.shortCode}`,
      originalUrl: record.originalUrl,
    },
  })
})

export const getMyShortUrls = asyncHandler(async (req, res) => {
  const records = await urlShortenerService.listMyShortUrls(req.user._id)
  const data = records.map((record) => ({
    id: record._id,
    shortCode: record.shortCode,
    shortUrl: `${config.clientUrl}/s/${record.shortCode}`,
    originalUrl: record.originalUrl,
    clicks: record.clicks,
    createdAt: record.createdAt,
  }))
  sendSuccess(res, { data, meta: { count: data.length } })
})

export const deleteShortUrl = asyncHandler(async (req, res) => {
  await urlShortenerService.deleteMyShortUrl(req.params.id, req.user._id)
  sendSuccess(res, { message: 'Short link deleted' })
})

/**
 * JSON-returning resolve endpoint, called by the frontend's /s/:code route
 * (see src/pages/ShortUrlRedirect.jsx) rather than relying solely on the
 * direct server redirect below - the frontend's own vercel.json has a
 * catch-all SPA rewrite that would intercept a browser navigating
 * straight to trytoolhub.net/s/CODE before it ever reached this backend's
 * /s route, so the frontend needs to own that path and call this endpoint
 * to find out where to send the visitor.
 */
export const resolveShortCode = asyncHandler(async (req, res) => {
  const { code } = req.params
  const record = await urlShortenerService.resolveShortCode(code)

  if (!record) {
    res.status(404).json({ success: false, message: 'This short link doesn\u2019t exist or may have been removed.' })
    return
  }

  sendSuccess(res, { data: { originalUrl: record.originalUrl } })
})

/**
 * Uses a genuine 301 (permanent) redirect, not a 302 - this is what
 * reputable URL shorteners use, and it's what correctly passes SEO
 * ranking value through to the destination page rather than having the
 * short link itself compete with it in search results. Reachable
 * directly on the backend's own domain; most real traffic instead comes
 * through the frontend's /s/:code route calling resolveShortCode above.
 */
export const redirectShortUrl = asyncHandler(async (req, res) => {
  const { code } = req.params
  const record = await urlShortenerService.resolveShortCode(code)

  if (!record) {
    res.status(404).send('This short link doesn\u2019t exist or may have been removed.')
    return
  }

  res.redirect(301, record.originalUrl)
})
