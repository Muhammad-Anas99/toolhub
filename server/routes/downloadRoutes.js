import { Router } from 'express'
import { upload } from '../middleware/upload.js'
import { protect } from '../middleware/auth.js'
import * as downloadController from '../controllers/downloadController.js'

const router = Router()

router.use(protect)

router.post('/', upload.single('file'), downloadController.createDownload)
router.get('/', downloadController.getMyDownloads)
router.delete('/:id', downloadController.deleteDownload)

export default router
