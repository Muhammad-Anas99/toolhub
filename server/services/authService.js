import User from '../models/User.js'
import { ApiError } from '../utils/ApiError.js'
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  hashToken,
  generateOneTimeToken,
} from '../utils/jwt.js'
import { sendVerificationEmail, sendPasswordResetEmail, sendWelcomeEmail, sendSecurityAlertEmail } from '../utils/email.js'
import { config } from '../config/env.js'
import * as googleAuthService from './googleAuthService.js'

const EMAIL_VERIFICATION_EXPIRY_MS = 24 * 60 * 60 * 1000 // 24 hours
const PASSWORD_RESET_EXPIRY_MS = 60 * 60 * 1000 // 1 hour
const MAX_REFRESH_TOKENS_PER_USER = 5 // caps concurrent "remembered" devices

/**
 * Issues a fresh access+refresh token pair for a user, storing the
 * refresh token's hash (never the raw value) so it can be revoked later
 * (logout, or if it's ever suspected to be compromised).
 */
async function issueTokens(user, userAgent = '') {
  const accessToken = signAccessToken(user)
  const refreshToken = signRefreshToken(user)

  // Defensive guard: `refreshTokens` has `select: false` on the schema
  // (same as `password`), so any query that fetches a user without
  // explicitly re-selecting it gets `undefined` here, not `[]`. The login
  // bug this guarded against is fixed at its call site too (see
  // login() below) — this stays as a second line of defense so the same
  // mistake at some future call site degrades to "start a fresh session
  // list" instead of crashing the request.
  if (!Array.isArray(user.refreshTokens)) {
    user.refreshTokens = []
  }

  user.refreshTokens.push({
    tokenHash: hashToken(refreshToken),
    userAgent,
    expiresAt: new Date(Date.now() + config.jwt.refreshExpiresInMs),
  })

  // Keep the list bounded — drop the oldest sessions past the cap rather
  // than letting it grow forever across many logins.
  if (user.refreshTokens.length > MAX_REFRESH_TOKENS_PER_USER) {
    user.refreshTokens = user.refreshTokens.slice(-MAX_REFRESH_TOKENS_PER_USER)
  }

  await user.save()
  return { accessToken, refreshToken }
}

export async function register({ name, email, password }, { baseUrl, userAgent } = {}) {
  const existing = await User.findOne({ email: email.toLowerCase() })
  if (existing) {
    throw ApiError.conflict('An account with this email already exists')
  }

  const user = new User({ name, email, password })

  const { rawToken, tokenHash } = generateOneTimeToken()
  user.emailVerificationTokenHash = tokenHash
  user.emailVerificationExpires = new Date(Date.now() + EMAIL_VERIFICATION_EXPIRY_MS)
  await user.save()

  const verifyUrl = `${baseUrl}/verify-email?token=${rawToken}`
  await sendVerificationEmail(user, verifyUrl)

  const tokens = await issueTokens(user, userAgent)
  return { user, ...tokens }
}

export async function login({ email, password }, { userAgent } = {}) {
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password +refreshTokens')
  if (!user) {
    throw ApiError.unauthorized('Incorrect email or password')
  }
  if (!user.password) {
    throw ApiError.unauthorized('This account uses Google Sign-In. Please continue with Google instead.')
  }
  if (!(await user.comparePassword(password))) {
    throw ApiError.unauthorized('Incorrect email or password')
  }

  const tokens = await issueTokens(user, userAgent)
  return { user, ...tokens }
}

/**
 * Completes the "Continue with Google" flow: verifies the authorization
 * code with Google (see services/googleAuthService.js), finds or creates
 * the matching user, then issues our own access+refresh tokens exactly
 * the same way a password login does — from this point on, a Google
 * session is indistinguishable from a password session anywhere else in
 * the app.
 */
export async function googleLogin(code, req, { userAgent } = {}) {
  const user = await googleAuthService.completeGoogleAuth(code, req)
  const tokens = await issueTokens(user, userAgent)
  return { user, ...tokens }
}

/**
 * Refresh-token rotation: every refresh consumes the old token and issues
 * a brand new one. If a refresh token is ever reused after rotation
 * (i.e. someone stole an old one), the hash it's checked against won't
 * be found anymore, so the request fails.
 */
export async function refresh(rawRefreshToken, { userAgent } = {}) {
  if (!rawRefreshToken) {
    throw ApiError.unauthorized('No refresh token provided')
  }

  let payload
  try {
    payload = verifyRefreshToken(rawRefreshToken)
  } catch {
    throw ApiError.unauthorized('Your session has expired. Please sign in again.')
  }

  const user = await User.findById(payload.sub).select('+refreshTokens')
  if (!user) {
    throw ApiError.unauthorized('This account no longer exists')
  }

  const incomingHash = hashToken(rawRefreshToken)
  const matchIndex = user.refreshTokens.findIndex((entry) => entry.tokenHash === incomingHash)

  if (matchIndex === -1) {
    throw ApiError.unauthorized('Your session has expired. Please sign in again.')
  }

  // Rotate: remove the consumed token, issue a new pair.
  user.refreshTokens.splice(matchIndex, 1)
  const tokens = await issueTokens(user, userAgent)
  return { user, ...tokens }
}

export async function logout(userId, rawRefreshToken) {
  if (!rawRefreshToken) return

  const user = await User.findById(userId).select('+refreshTokens')
  if (!user) return

  const incomingHash = hashToken(rawRefreshToken)
  user.refreshTokens = user.refreshTokens.filter((entry) => entry.tokenHash !== incomingHash)
  await user.save()
}

export async function verifyEmail(rawToken) {
  const tokenHash = hashToken(rawToken)
  const user = await User.findOne({
    emailVerificationTokenHash: tokenHash,
    emailVerificationExpires: { $gt: new Date() },
  }).select('+emailVerificationTokenHash +emailVerificationExpires')

  if (!user) {
    throw ApiError.badRequest('This verification link is invalid or has expired')
  }

  user.isEmailVerified = true
  user.emailVerificationTokenHash = undefined
  user.emailVerificationExpires = undefined
  await user.save()

  // Fire-and-forget: a slow or failed welcome email should never make
  // email verification itself appear to fail.
  sendWelcomeEmail(user).catch((error) => {
    console.error('[authService] Failed to send welcome email:', error.message)
  })

  return user
}

export async function forgotPassword(email, { baseUrl } = {}) {
  const user = await User.findOne({ email: email.toLowerCase() })
  // Deliberately do not reveal whether the email exists — same response
  // either way prevents using this endpoint to enumerate registered
  // accounts.
  if (!user) return

  const { rawToken, tokenHash } = generateOneTimeToken()
  user.passwordResetTokenHash = tokenHash
  user.passwordResetExpires = new Date(Date.now() + PASSWORD_RESET_EXPIRY_MS)
  await user.save()

  const resetUrl = `${baseUrl}/reset-password?token=${rawToken}`
  await sendPasswordResetEmail(user, resetUrl)
}

export async function resetPassword(rawToken, newPassword) {
  const tokenHash = hashToken(rawToken)
  const user = await User.findOne({
    passwordResetTokenHash: tokenHash,
    passwordResetExpires: { $gt: new Date() },
  }).select('+passwordResetTokenHash +passwordResetExpires +refreshTokens')

  if (!user) {
    throw ApiError.badRequest('This reset link is invalid or has expired')
  }

  user.password = newPassword
  user.passwordResetTokenHash = undefined
  user.passwordResetExpires = undefined
  // Invalidate every existing session — if someone else triggered this
  // reset, they shouldn't stay logged in on the account either.
  user.refreshTokens = []
  await user.save()

  sendSecurityAlertEmail(user, { action: 'Your password was reset' }).catch((error) => {
    console.error('[authService] Failed to send security alert email:', error.message)
  })

  return user
}
