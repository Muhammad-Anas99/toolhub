import { Router } from 'express'
import * as pageViewController from '../controllers/pageViewController.js'
import { protect, authorize, attachUserIfPresent } from '../middleware/auth.js'
import { pageViewRateLimiter } from '../middleware/rateLimiter.js'

const router = Router()

// Public - fires from every page load, logged-in or not, which is the
// whole point: this tracks landing on a page, not an authenticated action.
// The general /api limiter explicitly skips this path (see
// rateLimiter.js) in favor of this more generous, purpose-built one.
// attachUserIfPresent identifies a signed-in admin so their own visits
// aren't counted; an anonymous visitor passes straight through.
router.post('/', pageViewRateLimiter, attachUserIfPresent, pageViewController.logPageView)

router.get('/summary', protect, authorize('admin'), pageViewController.getPageViewSummary)
router.get('/visitors', protect, authorize('admin'), pageViewController.getPageViewVisitors)
router.delete('/visitor', protect, authorize('admin'), pageViewController.deleteVisitor)

export default router
