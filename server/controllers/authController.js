import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { config, isProduction } from '../config/env.js'
import * as authService from '../services/authService.js'
import User from '../models/User.js'
import { generateOneTimeToken } from '../utils/jwt.js'
import { sendVerificationEmail } from '../utils/email.js'

const REFRESH_COOKIE_NAME = 'toolhub_refresh_token'

// httpOnly means client-side JavaScript can never read this cookie — the
// single biggest reason a refresh token is meaningfully safer here than in
// localStorage, which is readable by any script (including an XSS payload).
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax', // 'none' needed cross-site in prod (separate Vercel domains)
  maxAge: config.jwt.refreshExpiresInMs,
  path: '/api/auth',
}

function setRefreshCookie(res, token) {
  res.cookie(REFRESH_COOKIE_NAME, token, REFRESH_COOKIE_OPTIONS)
}

function clearRefreshCookie(res) {
  res.clearCookie(REFRESH_COOKIE_NAME, { ...REFRESH_COOKIE_OPTIONS, maxAge: 0 })
}

export const register = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.register(req.body, {
    baseUrl: config.clientUrl,
    userAgent: req.headers['user-agent'],
  })

  setRefreshCookie(res, refreshToken)
  sendSuccess(res, {
    statusCode: 201,
    message: 'Account created. Please check your email to verify your address.',
    data: { user, accessToken },
  })
})

export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body, {
    userAgent: req.headers['user-agent'],
  })

  setRefreshCookie(res, refreshToken)
  sendSuccess(res, { message: 'Signed in', data: { user, accessToken } })
})

export const refresh = asyncHandler(async (req, res) => {
  const rawRefreshToken = req.cookies?.[REFRESH_COOKIE_NAME]
  const { user, accessToken, refreshToken } = await authService.refresh(rawRefreshToken, {
    userAgent: req.headers['user-agent'],
  })

  setRefreshCookie(res, refreshToken)
  sendSuccess(res, { message: 'Session refreshed', data: { user, accessToken } })
})

export const logout = asyncHandler(async (req, res) => {
  const rawRefreshToken = req.cookies?.[REFRESH_COOKIE_NAME]
  if (req.user && rawRefreshToken) {
    await authService.logout(req.user._id, rawRefreshToken)
  }
  clearRefreshCookie(res)
  sendSuccess(res, { message: 'Signed out' })
})

export const getMe = asyncHandler(async (req, res) => {
  sendSuccess(res, { data: req.user })
})

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.body
  if (!token) throw ApiError.badRequest('A verification token is required')

  const user = await authService.verifyEmail(token)
  sendSuccess(res, { message: 'Email verified', data: user })
})

export const resendVerification = asyncHandler(async (req, res) => {
  if (req.user.isEmailVerified) {
    sendSuccess(res, { message: 'Your email is already verified' })
    return
  }

  // Reuses the registration flow's token format, generating a fresh one.
  const { rawToken, tokenHash } = generateOneTimeToken()
  req.user.emailVerificationTokenHash = tokenHash
  req.user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000)
  await req.user.save()

  const verifyUrl = `${config.clientUrl}/verify-email?token=${rawToken}`
  await sendVerificationEmail(req.user, verifyUrl)

  sendSuccess(res, { message: 'Verification email sent' })
})

export const forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body.email, { baseUrl: config.clientUrl })
  // Same message whether or not the email exists — see the comment in
  // authService.forgotPassword for why.
  sendSuccess(res, { message: 'If an account exists for that email, a reset link has been sent.' })
})

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body
  if (!token) throw ApiError.badRequest('A reset token is required')

  await authService.resetPassword(token, password)
  sendSuccess(res, { message: 'Password reset. Please sign in with your new password.' })
})

// Exported so userController's change-password endpoint can reuse the same
// "check current password" logic without importing authService directly.
export async function verifyCurrentPassword(userId, candidatePassword) {
  const user = await User.findById(userId).select('+password')
  return user && (await user.comparePassword(candidatePassword))
}
