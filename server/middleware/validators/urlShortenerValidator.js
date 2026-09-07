import { body } from 'express-validator'

export const shortenUrlValidator = [
  body('url')
    .trim()
    .notEmpty()
    .withMessage('A URL is required')
    .isLength({ max: 2048 })
    .withMessage('URL is too long')
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Please provide a valid http:// or https:// URL'),
]
