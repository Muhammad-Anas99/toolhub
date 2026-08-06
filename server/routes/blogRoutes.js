import { Router } from 'express'
import * as blogController from '../controllers/blogController.js'
import { createBlogValidator, updateBlogValidator } from '../middleware/validators/blogValidator.js'
import { handleValidationErrors } from '../middleware/validate.js'

const router = Router()

router.get('/', blogController.getBlogPosts)
router.get('/:slug', blogController.getBlogPost)

// Auth-protected in Phase 5.
router.post('/', createBlogValidator, handleValidationErrors, blogController.createBlogPost)
router.put('/:slug', updateBlogValidator, handleValidationErrors, blogController.updateBlogPost)
router.delete('/:slug', blogController.deleteBlogPost)

export default router
