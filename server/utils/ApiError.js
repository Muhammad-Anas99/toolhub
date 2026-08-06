/**
 * Custom error class for known, intentional API errors (validation
 * failures, not-found resources, etc). Thrown anywhere in a controller or
 * service and caught by the centralized error handler middleware, which
 * uses `statusCode` to shape the HTTP response correctly.
 */
export class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.details = details
    Error.captureStackTrace?.(this, ApiError)
  }

  static badRequest(message, details) {
    return new ApiError(400, message, details)
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(404, message)
  }

  static conflict(message) {
    return new ApiError(409, message)
  }

  static internal(message = 'Internal server error') {
    return new ApiError(500, message)
  }
}
