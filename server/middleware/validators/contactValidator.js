import { body } from 'express-validator'

export const contactValidator = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('subject').optional().trim().isLength({ max: 200 }),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message should be between 10 and 5000 characters'),
]
