import { Router } from 'express'
import * as urlShortenerController from '../controllers/urlShortenerController.js'
import { protect, attachUserIfPresent } from '../middleware/auth.js'
import { urlShortenerRateLimiter } from '../middleware/rateLimiter.js'
import { shortenUrlValidator } from '../middleware/validators/urlShortenerValidator.js'
import { handleValidationErrors } from '../middleware/validate.js'

const router = Router()

// Works for both anonymous and logged-in users - attachUserIfPresent sets
// req.user when a valid token is present, without blocking the request
// when it isn't (same pattern as historyRoutes.js's logConversion route).
router.post(
  '/',
  attachUserIfPresent,
  urlShortenerRateLimiter,
  shortenUrlValidator,
  handleValidationErrors,
  urlShortenerController.createShortUrl
)

// Listing/deleting "my" short links only makes sense for a logged-in
// user - there's no "account" to manage links under otherwise.
router.get('/', protect, urlShortenerController.getMyShortUrls)
router.delete('/:id', protect, urlShortenerController.deleteShortUrl)

router.get('/:code', urlShortenerController.resolveShortCode)

export default router
