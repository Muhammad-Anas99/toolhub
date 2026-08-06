import { validationResult } from 'express-validator'
import { ApiError } from '../utils/ApiError.js'

/**
 * Runs after a resource's validation chain (see middleware/validators/).
 * Collects express-validator's results and turns them into a single clean
 * ApiError so every validation failure across every resource returns the
 * same response shape.
 */
export function handleValidationErrors(req, res, next) {
  const result = validationResult(req)
  if (result.isEmpty()) {
    next()
    return
  }

  const details = result.array().map((error) => ({
    field: error.path,
    message: error.msg,
  }))

  next(ApiError.badRequest('Validation failed', details))
}
