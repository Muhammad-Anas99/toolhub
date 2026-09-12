import { Router } from 'express'
import * as toolController from '../controllers/toolController.js'
import { createToolValidator, updateToolValidator } from '../middleware/validators/toolValidator.js'
import { toolFaqValidator } from '../middleware/validators/toolFaqValidator.js'
import { handleValidationErrors } from '../middleware/validate.js'
import { protect, authorize } from '../middleware/auth.js'
import { toolRatingRateLimiter } from '../middleware/rateLimiter.js'

const router = Router()

router.get('/', toolController.getTools)
router.get('/:slug', toolController.getTool)

router.post('/', protect, authorize('admin'), createToolValidator, handleValidationErrors, toolController.createTool)
router.put('/:slug', protect, authorize('admin'), updateToolValidator, handleValidationErrors, toolController.updateTool)
router.delete('/:slug', protect, authorize('admin'), toolController.deleteTool)

router.post('/:slug/faqs', protect, authorize('admin'), toolFaqValidator, handleValidationErrors, toolController.addToolFaq)
router.put('/:slug/faqs/:faqId', protect, authorize('admin'), toolFaqValidator, handleValidationErrors, toolController.updateToolFaq)
router.delete('/:slug/faqs/:faqId', protect, authorize('admin'), toolController.deleteToolFaq)

router.post('/:slug/rate', toolRatingRateLimiter, toolController.rateTool)

export default router
