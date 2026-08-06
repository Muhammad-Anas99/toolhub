import { body } from 'express-validator'

const BADGE_VALUES = ['popular', 'new']

export const createToolValidator = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 120 }),
  body('slug').optional().trim().isSlug().withMessage('Slug must be URL-safe (lowercase, hyphens)'),
  body('path').trim().notEmpty().withMessage('Path is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 300 }),
  body('icon').trim().notEmpty().withMessage('Icon name is required'),
  body('badge').optional({ nullable: true }).isIn(BADGE_VALUES).withMessage(`Badge must be one of: ${BADGE_VALUES.join(', ')}`),
  body('comingSoon').optional().isBoolean().withMessage('comingSoon must be a boolean'),
  body('featured').optional().isBoolean().withMessage('featured must be a boolean'),
  body('tags').optional().isArray().withMessage('tags must be an array of strings'),
]

export const updateToolValidator = [
  body('name').optional().trim().notEmpty().isLength({ max: 120 }),
  body('path').optional().trim().notEmpty(),
  body('category').optional().trim().notEmpty(),
  body('description').optional().trim().notEmpty().isLength({ max: 300 }),
  body('icon').optional().trim().notEmpty(),
  body('badge').optional({ nullable: true }).isIn(BADGE_VALUES),
  body('comingSoon').optional().isBoolean(),
  body('featured').optional().isBoolean(),
  body('tags').optional().isArray(),
]
