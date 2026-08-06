import rateLimit from 'express-rate-limit'
import { config } from '../config/env.js'

/**
 * Applied globally to /api in server.js. Keeps default values reasonable
 * for a public API while staying configurable via env vars.
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
