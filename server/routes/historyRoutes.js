import { Router } from 'express'
import * as historyController from '../controllers/historyController.js'
import { protect, attachUserIfPresent, authorize } from '../middleware/auth.js'

const router = Router()

// Anonymous conversions are still logged for site-wide analytics — see the
// comment on historyController.logConversion.
router.post('/', attachUserIfPresent, historyController.logConversion)

router.get('/', protect, historyController.getMyHistory)
router.delete('/', protect, historyController.clearMyHistory)
router.delete('/:id', protect, historyController.deleteHistoryEntry)

// Admin-only: every user's conversions, with who-did-it attached.
router.get('/admin/all', protect, authorize('admin'), historyController.getAllHistoryAdmin)

export default router
