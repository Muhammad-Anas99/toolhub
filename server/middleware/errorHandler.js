import { ApiError } from '../utils/ApiError.js'
import { isDevelopment, config } from '../config/env.js'

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

  // Multer upload errors (file too large, unexpected field, etc.) -> 400.
  // These aren't ApiError instances (multer throws its own MulterError
  // class), so without this they'd fall through to the generic 500
  // message below even though "your file is too large" is exactly the
  // kind of specific, safe, useful message this handler exists to show.
  if (err.name === 'MulterError') {
    statusCode = 400
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = `File is too large. Maximum size is ${config.upload.maxFileSizeMb} MB.`
    } else {
      message = 'There was a problem with the uploaded file.'
    }
  }

  if (statusCode >= 500) {
    console.error('[error]', err)

    // Only genericize for errors we did NOT deliberately throw ourselves.
    // A hand-written ApiError (even at 500/503) has a message a developer
    // wrote on purpose to be safe and useful to show — e.g. "File uploads
    // aren't configured on this deployment yet." An error that's still at
    // 500 and ISN'T an ApiError is a genuine unexpected bug, whose message
    // is an internal implementation detail (e.g. "Cannot read properties
    // of undefined (reading 'push')"), not something written for a client
    // to read — that's the only case this generic fallback should apply
    // to. Previously this checked `statusCode >= 500` alone, which
    // silently discarded every ApiError's own message too — contradicting
    // the whole point of writing one.
    if (!isDevelopment && !(err instanceof ApiError)) {
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
