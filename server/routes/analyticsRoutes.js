import { Router } from 'express'
import * as analyticsController from '../controllers/analyticsController.js'
import { protect, authorize } from '../middleware/auth.js'

const router = Router()

router.get('/overview', protect, authorize('admin'), analyticsController.getOverview)
router.get('/public-stats', analyticsController.getPublicStats)

export default router
