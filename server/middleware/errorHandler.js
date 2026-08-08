import { ApiError } from '../utils/ApiError.js'
import { isDevelopment } from '../config/env.js'

/**
 * Must be registered last, after all routes. Normalizes every error —
 * whether a deliberate ApiError, a Mongoose validation/cast error, or
 * anything unexpected — into the same { success, message, errors } shape.
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  let statusCode = err instanceof ApiError ? err.statusCode : 500
  let message = err.message || 'Internal server error'
  let details = err instanceof ApiError ? err.details : undefined

  // Mongoose validation error -> 400 with per-field messages.
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = 'Validation failed'
    details = Object.values(err.errors).map((fieldError) => fieldError.message)
  }

  // Mongoose invalid ObjectId / cast error -> 400.
  if (err.name === 'CastError') {
    statusCode = 400
    message = `Invalid value for field "${err.path}"`
  }

  // Mongoose duplicate key error -> 409.
  if (err.code === 11000) {
    statusCode = 409
    const field = Object.keys(err.keyValue || {})[0] || 'field'
    message = `A record with this ${field} already exists`
  }

  if (statusCode >= 500) {
    console.error('[error]', err)

    // Everything above this point (ApiError, ValidationError, CastError,
    // duplicate key) is a deliberate, recognized error type with a
    // message that's safe to show a client. Anything still at 500 here is
    // an *unexpected* bug — its message is an internal implementation
    // detail (e.g. "Cannot read properties of undefined (reading 'push')"),
    // not something written for a client to read. Show a generic message
    // in production; keep the real one in development so it's still
    // useful while debugging locally.
    if (!isDevelopment) {
      message = 'Something went wrong on our end. Please try again.'
    }
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { errors: details } : {}),
    // Stack traces only in development — never leak internals in production.
    ...(isDevelopment ? { stack: err.stack } : {}),
  })
}
