import { Router } from 'express'
import * as settingsController from '../controllers/settingsController.js'
import { updateSettingsValidator } from '../middleware/validators/settingsValidator.js'
import { handleValidationErrors } from '../middleware/validate.js'

const router = Router()

router.get('/', settingsController.getSettings)

// Auth-protected in Phase 5.
router.put('/', updateSettingsValidator, handleValidationErrors, settingsController.updateSettings)

export default router
