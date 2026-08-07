import { Router } from 'express'
import * as settingsController from '../controllers/settingsController.js'
import { updateSettingsValidator } from '../middleware/validators/settingsValidator.js'
import { handleValidationErrors } from '../middleware/validate.js'
import { protect, authorize } from '../middleware/auth.js'

const router = Router()

router.get('/', settingsController.getSettings)

router.put('/', protect, authorize('admin'), updateSettingsValidator, handleValidationErrors, settingsController.updateSettings)

export default router
