import { body } from 'express-validator'

export const createBlogValidator = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 160 }),
  body('slug').optional().trim().isSlug().withMessage('Slug must be URL-safe (lowercase, hyphens)'),
  body('excerpt').optional().trim().isLength({ max: 300 }),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('image').optional().trim(),
  body('author').optional().trim(),
  body('category').optional().trim(),
  body('readTime').optional().trim(),
  body('published').optional().isBoolean().withMessage('published must be a boolean'),
]

export const updateBlogValidator = [
  body('title').optional().trim().notEmpty().isLength({ max: 160 }),
  body('excerpt').optional().trim().isLength({ max: 300 }),
  body('content').optional().trim().notEmpty(),
  body('image').optional().trim(),
  body('author').optional().trim(),
  body('category').optional().trim(),
  body('readTime').optional().trim(),
  body('published').optional().isBoolean(),
]
