import { Router } from 'express'
import * as contactController from '../controllers/contactController.js'
import { contactRateLimiter } from '../middleware/rateLimiter.js'
import { contactValidator } from '../middleware/validators/contactValidator.js'
import { handleValidationErrors } from '../middleware/validate.js'
import { protect, authorize } from '../middleware/auth.js'

const router = Router()

router.post('/', contactRateLimiter, contactValidator, handleValidationErrors, contactController.submitContactForm)
router.get('/', protect, authorize('admin'), contactController.getContactMessages)
router.delete('/:id', protect, authorize('admin'), contactController.deleteContactMessage)

export default router
