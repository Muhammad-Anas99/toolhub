import { body } from 'express-validator'

export const createCategoryValidator = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 80 }),
  body('slug').optional().trim().isSlug().withMessage('Slug must be URL-safe (lowercase, hyphens)'),
  body('description').optional().trim().isLength({ max: 300 }),
  body('icon').trim().notEmpty().withMessage('Icon name is required'),
  body('color').optional().trim(),
  body('order').optional().isInt().withMessage('order must be an integer'),
]

export const updateCategoryValidator = [
  body('name').optional().trim().notEmpty().isLength({ max: 80 }),
  body('description').optional().trim().isLength({ max: 300 }),
  body('icon').optional().trim().notEmpty(),
  body('color').optional().trim(),
  body('order').optional().isInt(),
]
