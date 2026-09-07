import { Router } from 'express'
import * as urlShortenerController from '../controllers/urlShortenerController.js'
import { urlShortenerRateLimiter } from '../middleware/rateLimiter.js'
import { shortenUrlValidator } from '../middleware/validators/urlShortenerValidator.js'
import { handleValidationErrors } from '../middleware/validate.js'

const router = Router()

router.post('/', urlShortenerRateLimiter, shortenUrlValidator, handleValidationErrors, urlShortenerController.createShortUrl)
router.get('/:code', urlShortenerController.resolveShortCode)

export default router
