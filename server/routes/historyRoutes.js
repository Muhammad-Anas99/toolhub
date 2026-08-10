import { Router } from 'express'
import * as historyController from '../controllers/historyController.js'
import { protect, attachUserIfPresent, authorize } from '../middleware/auth.js'

const router = Router()

// Anonymous conversions are still logged for site-wide analytics — see the
// comment on historyController.logConversion.
router.post('/', attachUserIfPresent, historyController.logConversion)

router.get('/', protect, historyController.getMyHistory)
router.delete('/', protect, historyController.clearMyHistory)

// Downloads — only conversions actually downloaded, distinct from the
// full history above. Declared before "/:id" so "/downloads" is never
// mistaken for an :id value.
router.get('/downloads', protect, historyController.getMyDownloads)

router.patch('/:id/download', protect, historyController.markDownloaded)
router.delete('/:id', protect, historyController.deleteHistoryEntry)

// Admin-only: every user's conversions, with who-did-it attached.
router.get('/admin/all', protect, authorize('admin'), historyController.getAllHistoryAdmin)

export default router
