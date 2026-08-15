import rateLimit from 'express-rate-limit'
import { config } from '../config/env.js'

/**
 * Applied globally to /api in app.js. Keeps default values reasonable for
 * a public API while staying configurable via env vars.
 */
export const apiRateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again later.',
  },
})

/**
 * Much stricter limit applied only to auth endpoints (login, register,
 * forgot-password) — these are the routes brute-force/credential-stuffing
 * attacks actually target, so they get a tighter ceiling than the general
 * API limiter above.
 */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // only count failed attempts against the limit
  message: {
    success: false,
    message: 'Too many attempts. Please try again in a few minutes.',
  },
})

/**
 * Applied to the contact form endpoint — a form that sends a real email
 * on every successful submission is a natural target for spam, separate
 * from the honeypot field (middleware/validators/contactValidator.js /
 * controllers/contactController.js), which catches bots; this limits
 * genuine repeated submissions (accidental or deliberate) from one IP.
 */
export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages sent. Please try again in a little while.',
  },
})
