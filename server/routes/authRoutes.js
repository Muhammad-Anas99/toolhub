import { Router } from 'express'
import * as authController from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'
import { authRateLimiter } from '../middleware/rateLimiter.js'
import { handleValidationErrors } from '../middleware/validate.js'
import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  verifyEmailValidator,
} from '../middleware/validators/authValidator.js'

const router = Router()

router.post('/register', authRateLimiter, registerValidator, handleValidationErrors, authController.register)
router.post('/login', authRateLimiter, loginValidator, handleValidationErrors, authController.login)
router.post('/refresh', authController.refresh)
router.post('/logout', protect, authController.logout)
router.get('/me', protect, authController.getMe)

router.post('/verify-email', verifyEmailValidator, handleValidationErrors, authController.verifyEmail)
router.post('/resend-verification', protect, authController.resendVerification)

router.post(
  '/forgot-password',
  authRateLimiter,
  forgotPasswordValidator,
  handleValidationErrors,
  authController.forgotPassword
)
router.post('/reset-password', authRateLimiter, resetPasswordValidator, handleValidationErrors, authController.resetPassword)

export default router
