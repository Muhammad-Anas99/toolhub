import { Router } from 'express'
import * as contactController from '../controllers/contactController.js'
import { contactRateLimiter } from '../middleware/rateLimiter.js'
import { contactValidator } from '../middleware/validators/contactValidator.js'
import { handleValidationErrors } from '../middleware/validate.js'

const router = Router()

router.post('/', contactRateLimiter, contactValidator, handleValidationErrors, contactController.submitContactForm)

export default router
