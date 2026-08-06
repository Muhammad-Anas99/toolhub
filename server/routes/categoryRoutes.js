import { Router } from 'express'
import * as categoryController from '../controllers/categoryController.js'
import { createCategoryValidator, updateCategoryValidator } from '../middleware/validators/categoryValidator.js'
import { handleValidationErrors } from '../middleware/validate.js'

const router = Router()

router.get('/', categoryController.getCategories)
router.get('/:slug', categoryController.getCategory)

// Auth-protected in Phase 5.
router.post('/', createCategoryValidator, handleValidationErrors, categoryController.createCategory)
router.put('/:slug', updateCategoryValidator, handleValidationErrors, categoryController.updateCategory)
router.delete('/:slug', categoryController.deleteCategory)

export default router
