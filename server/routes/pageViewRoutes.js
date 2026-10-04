import { Router } from 'express'
import * as pageViewController from '../controllers/pageViewController.js'
import { protect, authorize } from '../middleware/auth.js'
import { pageViewRateLimiter } from '../middleware/rateLimiter.js'

const router = Router()

// Public - fires from every page load, logged-in or not, which is the
// whole point: this tracks landing on a page, not an authenticated action.
// The general /api limiter explicitly skips this path (see
// rateLimiter.js) in favor of this more generous, purpose-built one.
router.post('/', pageViewRateLimiter, pageViewController.logPageView)

router.get('/', protect, authorize('admin'), pageViewController.getRecentPageViews)

export default router
