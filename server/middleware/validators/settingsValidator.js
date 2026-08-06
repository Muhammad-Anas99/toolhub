import { body } from 'express-validator'

export const updateSettingsValidator = [
  body('siteName').optional().trim().notEmpty().isLength({ max: 100 }),
  body('tagline').optional().trim().isLength({ max: 200 }),
  body('logo').optional().trim(),
  body('seo.title').optional().trim().isLength({ max: 160 }),
  body('seo.description').optional().trim().isLength({ max: 300 }),
  body('seo.keywords').optional().isArray(),
  body('social.github').optional().trim().isURL().withMessage('social.github must be a valid URL'),
  body('social.twitter').optional().trim().isURL().withMessage('social.twitter must be a valid URL'),
  body('social.linkedin').optional().trim().isURL().withMessage('social.linkedin must be a valid URL'),
  body('contactEmail').optional().trim().isEmail().withMessage('contactEmail must be a valid email'),
]
