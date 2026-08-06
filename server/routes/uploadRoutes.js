import { Router } from 'express'
import { upload } from '../middleware/upload.js'
import { uploadFile } from '../controllers/uploadController.js'

const router = Router()

// Auth-protected in Phase 5.
router.post('/', upload.single('file'), uploadFile)

export default router
