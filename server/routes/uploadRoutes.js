import { Router } from 'express'
import { upload } from '../middleware/upload.js'
import { uploadFile } from '../controllers/uploadController.js'
import { protect, authorize } from '../middleware/auth.js'

const router = Router()

router.post('/', protect, authorize('admin'), upload.single('file'), uploadFile)

export default router
