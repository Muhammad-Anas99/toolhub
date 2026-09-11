import { Router } from 'express'
import * as blogController from '../controllers/blogController.js'
import * as commentController from '../controllers/commentController.js'
import { createBlogValidator, updateBlogValidator } from '../middleware/validators/blogValidator.js'
import { commentContentValidator } from '../middleware/validators/commentValidator.js'
import { handleValidationErrors } from '../middleware/validate.js'
import { protect, authorize } from '../middleware/auth.js'
import { blogReactionRateLimiter } from '../middleware/rateLimiter.js'

const router = Router()

// Admin routes declared before the public "/:slug" route so "/admin/all"
// and "/admin/:slug" aren't swallowed by the public param route.
router.get('/admin/all', protect, authorize('admin'), blogController.getAllBlogPostsAdmin)
router.get('/admin/:slug', protect, authorize('admin'), blogController.getBlogPostAdmin)

router.get('/', blogController.getBlogPosts)
router.get('/:slug', blogController.getBlogPost)

router.post('/:slug/react', blogReactionRateLimiter, blogController.reactToBlogPost)

// Comments - scoped under the post they belong to. Listing is public;
// posting requires an account (comments, unlike likes, aren't anonymous).
router.get('/:slug/comments', commentController.getComments)
router.post('/:slug/comments', protect, commentContentValidator, handleValidationErrors, commentController.createComment)

router.post('/', protect, authorize('admin'), createBlogValidator, handleValidationErrors, blogController.createBlogPost)
router.put('/:slug', protect, authorize('admin'), updateBlogValidator, handleValidationErrors, blogController.updateBlogPost)
router.delete('/:slug', protect, authorize('admin'), blogController.deleteBlogPost)

export default router
