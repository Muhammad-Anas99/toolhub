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

/**
 * Applied to the URL shortener creation endpoint — public and
 * unauthenticated, and each successful request creates a persistent
 * database record and a real redirect, so it's worth limiting more
 * tightly than a typical read-only tool endpoint. More generous than the
 * contact form's 5/15min since legitimate use might mean shortening
 * several links in one session.
 */
export const urlShortenerRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many links created. Please try again in a little while.',
  },
})

/**
 * Applied to the blog like/dislike endpoint — public and unauthenticated
 * (no account required to react, unlike comments), so an IP-based limit
 * is the only real backstop against a script rapidly inflating or
 * deflating a post's counts. Generous enough that someone genuinely
 * reading through several posts in one sitting and reacting to each
 * won't hit it.
 */
export const blogReactionRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many reactions sent. Please try again in a little while.',
  },
})

/**
 * Applied to the tool star-rating endpoint — public and unauthenticated
 * (no account required to rate, matching blog reactions), so this is
 * the real backstop against a script rapidly skewing a tool's average.
 * Same generous allowance as blog reactions, since rating several
 * tools while browsing in one session is normal use.
 */
export const toolRatingRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many ratings sent. Please try again in a little while.',
  },
})
