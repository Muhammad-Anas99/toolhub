/**
 * Wraps an async Express handler so a thrown/rejected error is forwarded to
 * `next()` (and therefore the centralized error handler) instead of needing
 * a try/catch in every single controller function.
 */
export function asyncHandler(handler) {
  return function wrapped(req, res, next) {
    Promise.resolve(handler(req, res, next)).catch(next)
  }
}
