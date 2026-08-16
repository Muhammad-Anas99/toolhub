import { Router } from 'express'
import * as downloadController from '../controllers/downloadController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

// The cleanup endpoint is deliberately declared before the /:id route
// and without `protect` — it's invoked by Vercel's cron (see
// server/vercel.json), not by a logged-in user, and authenticates via
// CRON_SECRET inside the controller instead of a user session.
router.post('/cleanup', downloadController.cleanupExpiredDownloads)

router.get('/', protect, downloadController.getMyDownloads)
router.post('/', protect, downloadController.saveDownload)
router.delete('/:id', protect, downloadController.deleteMyDownload)

export default router
