import { Router } from 'express'
import * as userController from '../controllers/userController.js'
import { protect, authorize } from '../middleware/auth.js'
import { handleValidationErrors } from '../middleware/validate.js'
import { upload } from '../middleware/upload.js'
import {
  updateProfileValidator,
  changePasswordValidator,
  adminUpdateUserValidator,
} from '../middleware/validators/userValidator.js'

const router = Router()

// Self-service — any authenticated user, acting on their own account.
router.put('/me', protect, updateProfileValidator, handleValidationErrors, userController.updateMyProfile)
router.post('/me/avatar', protect, upload.single('file'), userController.uploadMyAvatar)
router.delete('/me/avatar', protect, userController.removeMyAvatar)
router.put(
  '/me/password',
  protect,
  changePasswordValidator,
  handleValidationErrors,
  userController.changeMyPassword
)

// Admin — user management.
router.get('/', protect, authorize('admin'), userController.getUsers)
router.get('/:id', protect, authorize('admin'), userController.getUser)
router.put(
  '/:id',
  protect,
  authorize('admin'),
  adminUpdateUserValidator,
  handleValidationErrors,
  userController.updateUser
)
router.delete('/:id', protect, authorize('admin'), userController.deleteUser)

export default router
