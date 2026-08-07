import { Router } from 'express'
import * as toolController from '../controllers/toolController.js'
import { createToolValidator, updateToolValidator } from '../middleware/validators/toolValidator.js'
import { handleValidationErrors } from '../middleware/validate.js'
import { protect, authorize } from '../middleware/auth.js'

const router = Router()

router.get('/', toolController.getTools)
router.get('/:slug', toolController.getTool)

router.post('/', protect, authorize('admin'), createToolValidator, handleValidationErrors, toolController.createTool)
router.put('/:slug', protect, authorize('admin'), updateToolValidator, handleValidationErrors, toolController.updateTool)
router.delete('/:slug', protect, authorize('admin'), toolController.deleteTool)

export default router
