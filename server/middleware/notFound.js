import { ApiError } from '../utils/ApiError.js'

/**
 * Registered after all routes but before the error handler. Anything that
 * reaches this point matched no route, so it's a clean 404.
 */
export function notFound(req, res, next) {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`))
}
