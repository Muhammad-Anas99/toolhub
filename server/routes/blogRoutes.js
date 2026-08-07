import { Router } from 'express'
import * as blogController from '../controllers/blogController.js'
import { createBlogValidator, updateBlogValidator } from '../middleware/validators/blogValidator.js'
import { handleValidationErrors } from '../middleware/validate.js'
import { protect, authorize } from '../middleware/auth.js'

const router = Router()

// Admin routes declared before the public "/:slug" route so "/admin/all"
// and "/admin/:slug" aren't swallowed by the public param route.
router.get('/admin/all', protect, authorize('admin'), blogController.getAllBlogPostsAdmin)
router.get('/admin/:slug', protect, authorize('admin'), blogController.getBlogPostAdmin)

router.get('/', blogController.getBlogPosts)
router.get('/:slug', blogController.getBlogPost)

router.post('/', protect, authorize('admin'), createBlogValidator, handleValidationErrors, blogController.createBlogPost)
router.put('/:slug', protect, authorize('admin'), updateBlogValidator, handleValidationErrors, blogController.updateBlogPost)
router.delete('/:slug', protect, authorize('admin'), blogController.deleteBlogPost)

export default router
