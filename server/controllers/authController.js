import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { config, isProduction } from '../config/env.js'
import * as authService from '../services/authService.js'
import { getGoogleAuthUrl, isGoogleConfigured } from '../services/googleAuthService.js'
import User from '../models/User.js'
import { generateOneTimeToken } from '../utils/jwt.js'
import { sendVerificationEmail } from '../utils/email.js'

const REFRESH_COOKIE_NAME = 'toolhub_refresh_token'

// Whether the frontend is served over HTTPS on a different origin than
// this API — the case that needs SameSite=None; Secure so the browser
// will send the cookie cross-site at all. Deriving this from CLIENT_URL's
// own protocol (which must already be set correctly for CORS and email
// links to work) rather than relying solely on NODE_ENV avoids a whole
// class of bugs where NODE_ENV=production was never actually set on the
// deployed backend — e.g. two separate Vercel projects, cookie set with
// SameSite=Lax by mistake, browser silently refuses to send it back on
// the cross-site refresh call, and the user gets logged out on reload
// even though login itself appeared to work fine.
const useCrossSiteCookie = isProduction || config.clientUrl.startsWith('https://')

// httpOnly means client-side JavaScript can never read this cookie — the
// single biggest reason a refresh token is meaningfully safer here than in
// localStorage, which is readable by any script (including an XSS payload).
// Deliberately has no `maxAge` here — that's computed per-call in
// setRefreshCookie() below, from the actual remaining time until the
// session's absolute 7-day cap, not a fixed window reset on every login/
// refresh. Without this, the cookie itself would always get a fresh 7-day
// life on every rotation even though the *session* it represents has a
// fixed deadline — the server-side check in authService.refresh() is the
// real enforcement either way, but a cookie that quietly outlives its own
// session is confusing and unnecessary.
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: useCrossSiteCookie,
  sameSite: useCrossSiteCookie ? 'none' : 'lax',
  path: '/api/auth',
}

function setRefreshCookie(res, token, sessionExpiresAt) {
  const maxAge = sessionExpiresAt
    ? Math.max(0, sessionExpiresAt.getTime() - Date.now())
    : config.jwt.refreshExpiresInMs
  res.cookie(REFRESH_COOKIE_NAME, token, { ...REFRESH_COOKIE_OPTIONS, maxAge })
}

function clearRefreshCookie(res) {
  res.clearCookie(REFRESH_COOKIE_NAME, { ...REFRESH_COOKIE_OPTIONS, maxAge: 0 })
}

export const register = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken, sessionExpiresAt } = await authService.register(req.body, {
    baseUrl: config.clientUrl,
    userAgent: req.headers['user-agent'],
  })

  setRefreshCookie(res, refreshToken, sessionExpiresAt)
  sendSuccess(res, {
    statusCode: 201,
    message: 'Account created. Please check your email to verify your address.',
    data: { user, accessToken },
  })
})

export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken, sessionExpiresAt } = await authService.login(req.body, {
    userAgent: req.headers['user-agent'],
  })

  setRefreshCookie(res, refreshToken, sessionExpiresAt)
  sendSuccess(res, { message: 'Logged in', data: { user, accessToken } })
})

export const refresh = asyncHandler(async (req, res) => {
  const rawRefreshToken = req.cookies?.[REFRESH_COOKIE_NAME]
  const { user, accessToken, refreshToken, sessionExpiresAt } = await authService.refresh(rawRefreshToken, {
    userAgent: req.headers['user-agent'],
  })

  setRefreshCookie(res, refreshToken, sessionExpiresAt)
  sendSuccess(res, { message: 'Session refreshed', data: { user, accessToken } })
})

export const logout = asyncHandler(async (req, res) => {
  const rawRefreshToken = req.cookies?.[REFRESH_COOKIE_NAME]
  if (req.user && rawRefreshToken) {
    await authService.logout(req.user._id, rawRefreshToken)
  }
  clearRefreshCookie(res)
  sendSuccess(res, { message: 'Logged out' })
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
  sendSuccess(res, { message: 'Password reset. Please log in with your new password.' })
})

/**
 * Redirects the browser to Google's consent screen. A full-page redirect
 * (not a popup) — simpler and more reliable, no popup-blocker concerns.
 *
 * Wrapped in try/catch deliberately, not just relying on asyncHandler:
 * if anything here throws (a malformed client ID, a transient issue
 * building the Google auth URL), asyncHandler would otherwise forward it
 * to the JSON error-handling middleware — which means the user would be
 * left staring at a raw API error response sitting on this backend's own
 * domain instead of bouncing back to the frontend. Every path out of this
 * handler is a redirect, with no exceptions.
 */
export const googleAuthRedirect = asyncHandler(async (req, res) => {
  try {
    if (!isGoogleConfigured()) {
      res.redirect(`${config.clientUrl}/login?error=google_not_configured`)
      return
    }
    res.redirect(getGoogleAuthUrl(req))
  } catch (err) {
    console.error('[auth] Failed to start Google sign-in:', err.message)
    res.redirect(`${config.clientUrl}/login?error=google_auth_failed`)
  }
})

/**
 * Google redirects back here with either `?code=...` (approved) or
 * `?error=...` (denied/cancelled). On success, this sets the refresh
 * cookie exactly like a normal login and redirects straight to the
 * dashboard — no token is ever put in a URL. The dashboard's own
 * ProtectedRoute + AuthContext then picks up the session automatically
 * via the same silent-refresh flow that runs on any page load, since the
 * cookie is already there by the time that page's JS runs.
 *
 * The entire body is one try/catch, for the same reason as
 * googleAuthRedirect above: this endpoint must NEVER let an error escape
 * as a JSON API response. This is the actual OAuth callback URL Google
 * redirects the user's browser to directly — if this ever produced a raw
 * error response instead of a redirect, the user would be left sitting
 * on this backend's own domain, which is precisely the bug being fixed
 * here. `config.clientUrl` is always the destination — the production
 * frontend URL from CLIENT_URL, never hardcoded, never this backend's
 * own domain.
 */
export const googleAuthCallback = asyncHandler(async (req, res) => {
  try {
    // Diagnostic safety net for the exact misconfiguration that causes
    // "the user ends up back on the backend URL": CLIENT_URL set to this
    // backend's own domain instead of the frontend's (an easy copy-paste
    // mistake when two separate Vercel projects are involved). This
    // doesn't change where the redirect below goes — that's still
    // whatever CLIENT_URL says — but it makes a genuine misconfiguration
    // loudly visible in the server logs instead of silently producing a
    // confusing redirect loop back to this same API.
    try {
      if (new URL(config.clientUrl).hostname === req.get('host')?.split(':')[0]) {
        console.error(
          `[auth] CLIENT_URL (${config.clientUrl}) appears to point at this backend's own domain (${req.get('host')}). ` +
            'It must be set to the FRONTEND domain instead — see server/README.md "Google OAuth" section.'
        )
      }
    } catch {
      // config.clientUrl failing to parse as a URL is caught by the outer
      // try/catch below via the redirect call itself failing.
    }

    const { code, error } = req.query

    if (error || !code) {
      // error === 'access_denied' when the user cancels on Google's
      // screen — handled the same as any other failure, sent back to the
      // frontend's /login, never left on this backend URL.
      res.redirect(`${config.clientUrl}/login?error=google_auth_failed`)
      return
    }

    const { refreshToken, sessionExpiresAt } = await authService.googleLogin(code, req, {
      userAgent: req.headers['user-agent'],
    })
    setRefreshCookie(res, refreshToken, sessionExpiresAt)
    res.redirect(`${config.clientUrl}/dashboard`)
  } catch (err) {
    console.error('[auth] Google sign-in failed:', err.message)
    res.redirect(`${config.clientUrl}/login?error=google_auth_failed`)
  }
})

// Exported so userController's change-password endpoint can reuse the same
// "check current password" logic without importing authService directly.
export async function verifyCurrentPassword(userId, candidatePassword) {
  const user = await User.findById(userId).select('+password')
  return user && (await user.comparePassword(candidatePassword))
}
