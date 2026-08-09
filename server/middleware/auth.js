import User from '../models/User.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { verifyAccessToken } from '../utils/jwt.js'

/**
 * Requires a valid access token in the Authorization header
 * (`Bearer <token>`). Attaches the authenticated user to `req.user` on
 * success. This is the middleware referenced by every
 * `// Auth-protected in Phase 5` comment left in Phase 4's routes.
 */
export const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    throw ApiError.unauthorized('You must be signed in to do that')
  }

  let payload
  try {
    payload = verifyAccessToken(token)
  } catch {
    throw ApiError.unauthorized('Your session has expired. Please sign in again.')
  }

  const user = await User.findById(payload.sub)
  if (!user) {
    throw ApiError.unauthorized('This account no longer exists')
  }

  // Best-effort "last active" tracking for the Daily/Monthly Active Users
  // analytics metric — deliberately not awaited so it never slows down
  // the actual request.
  User.updateOne({ _id: user._id }, { lastActiveAt: new Date() }).catch(() => {})

  req.user = user
  next()
})

/**
 * Requires `protect` to have run first. Restricts a route to specific
 * roles, e.g. `authorize('admin')`.
 */
export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      next(ApiError.unauthorized('You must be signed in to do that'))
      return
    }
    if (!allowedRoles.includes(req.user.role)) {
      next(ApiError.forbidden('You do not have permission to do that'))
      return
    }
    next()
  }
}

/**
 * Like `protect`, but doesn't fail when there's no token at all — leaves
 * `req.user` undefined and proceeds anonymously. Used on routes that
 * behave differently for logged-in vs anonymous users without requiring
 * login (e.g. logging conversion history against a user when available,
 * anonymously otherwise).
 *
 * Important distinction from a missing token: if a token IS present but
 * expired or invalid, this throws 401 rather than quietly falling back to
 * anonymous. That 401 is what makes the frontend's `authorizedRequest`
 * (src/lib/api.js) run its silent-refresh-and-retry logic — without this,
 * a conversion made right as a 15-minute access token expires would
 * silently get attributed to "anonymous" instead of the signed-in user,
 * since nothing would ever prompt a refresh.
 */
export const attachUserIfPresent = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    next()
    return
  }

  let payload
  try {
    payload = verifyAccessToken(token)
  } catch {
    throw ApiError.unauthorized('Your session has expired. Please sign in again.')
  }

  const user = await User.findById(payload.sub)
  if (user) req.user = user

  next()
})
