import { body } from 'express-validator'

export const updateProfileValidator = [
  body('name').optional().trim().notEmpty().isLength({ max: 100 }),
  body('email').optional().trim().isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('avatar').optional().trim(),
]

export const changePasswordValidator = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters')
    .matches(/\d/)
    .withMessage('New password must contain at least one number'),
]

export const adminUpdateUserValidator = [
  body('role').optional().isIn(['user', 'admin']).withMessage('role must be "user" or "admin"'),
  body('plan').optional().isIn(['free', 'premium', 'pro']).withMessage('plan must be "free", "premium", or "pro"'),
  body('name').optional().trim().notEmpty().isLength({ max: 100 }),
  body('isEmailVerified').optional().isBoolean(),
]
