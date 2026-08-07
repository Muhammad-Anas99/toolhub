import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'
import { config } from '../config/env.js'

/**
 * Short-lived access token, sent in the response body and kept in memory
 * on the frontend (never localStorage — see AuthContext.jsx for why).
 * Carries just enough to authorize requests without a database lookup on
 * every single one.
 */
export function signAccessToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role, plan: user.plan }, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn,
  })
}

export function verifyAccessToken(token) {
  return jwt.verify(token, config.jwt.accessSecret)
}

/**
 * Long-lived refresh token, sent ONLY as an httpOnly cookie (never
 * accessible to JavaScript, which is what makes it meaningfully safer than
 * storing a long-lived credential in localStorage). The raw token is
 * returned here for the cookie; only its hash is ever stored in the
 * database (see User.refreshTokens) or compared against.
 */
export function signRefreshToken(user) {
  return jwt.sign({ sub: user._id.toString() }, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
  })
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, config.jwt.refreshSecret)
}

/**
 * Refresh tokens are hashed with plain SHA-256 (not bcrypt) before storage
 * — they're already high-entropy random-looking JWTs, not human-memorable
 * passwords, so a slow KDF isn't needed and a fast hash keeps the refresh
 * endpoint cheap.
 */
export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

/**
 * Generates a raw token for one-time flows (email verification, password
 * reset) plus its hash. The raw value goes in the emailed link; only the
 * hash is ever persisted, same principle as the refresh token above — a
 * database leak alone can't be used to reset someone's password or verify
 * an email on their behalf.
 */
export function generateOneTimeToken() {
  const rawToken = crypto.randomBytes(32).toString('hex')
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')
  return { rawToken, tokenHash }
}
