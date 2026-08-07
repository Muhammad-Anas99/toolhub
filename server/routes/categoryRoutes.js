import { Router } from 'express'
import * as categoryController from '../controllers/categoryController.js'
import { createCategoryValidator, updateCategoryValidator } from '../middleware/validators/categoryValidator.js'
import { handleValidationErrors } from '../middleware/validate.js'
import { protect, authorize } from '../middleware/auth.js'

const router = Router()

router.get('/', categoryController.getCategories)
router.get('/:slug', categoryController.getCategory)

router.post('/', protect, authorize('admin'), createCategoryValidator, handleValidationErrors, categoryController.createCategory)
router.put('/:slug', protect, authorize('admin'), updateCategoryValidator, handleValidationErrors, categoryController.updateCategory)
router.delete('/:slug', protect, authorize('admin'), categoryController.deleteCategory)

export default router
