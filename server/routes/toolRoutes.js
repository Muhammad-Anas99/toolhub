import { Router } from 'express'
import * as toolController from '../controllers/toolController.js'
import { createToolValidator, updateToolValidator } from '../middleware/validators/toolValidator.js'
import { handleValidationErrors } from '../middleware/validate.js'

const router = Router()

router.get('/', toolController.getTools)
router.get('/:slug', toolController.getTool)

// Auth-protected in Phase 5 (a `protect` / `authorize('admin')` middleware
// will slot in here without changing anything else about these routes).
router.post('/', createToolValidator, handleValidationErrors, toolController.createTool)
router.put('/:slug', updateToolValidator, handleValidationErrors, toolController.updateTool)
router.delete('/:slug', toolController.deleteTool)

export default router
