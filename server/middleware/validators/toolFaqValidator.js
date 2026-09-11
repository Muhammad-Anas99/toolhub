import { body } from 'express-validator'

export const toolFaqValidator = [
  body('question').trim().notEmpty().withMessage('Question is required').isLength({ max: 200 }),
  body('answer').trim().notEmpty().withMessage('Answer is required').isLength({ max: 2000 }),
]
