import { Router } from 'express'
import * as commentController from '../controllers/commentController.js'
import { commentContentValidator } from '../middleware/validators/commentValidator.js'
import { handleValidationErrors } from '../middleware/validate.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.put('/:commentId', protect, commentContentValidator, handleValidationErrors, commentController.updateComment)
router.delete('/:commentId', protect, commentController.deleteComment)

export default router
