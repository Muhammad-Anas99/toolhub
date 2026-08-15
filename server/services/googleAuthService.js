import { OAuth2Client } from 'google-auth-library'
import { config } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'
import User from '../models/User.js'

/**
 * The redirect_uri Google sends the user back to after they approve (or
 * deny) access — must exactly match one of the "Authorized redirect URIs"
 * configured in Google Cloud Console for this OAuth client, or Google
 * rejects the request outright with redirect_uri_mismatch.
 *
 * Derived from the incoming request's own host rather than a hardcoded
 * env var, the same approach used in services/storageService.js — it
 * resolves correctly in both local dev and whichever Vercel deployment is
 * actually running, as long as that exact URL is also registered in
 * Google Cloud Console (see .env.example for the exact values to add).
 */
function getRedirectUri(req) {
  const baseUrl = `${req.protocol}://${req.get('host')}`
  return `${baseUrl}/api/auth/google/callback`
}

function getClient(req) {
  return new OAuth2Client(config.google.clientId, config.google.clientSecret, getRedirectUri(req))
}

export function isGoogleConfigured() {
  return Boolean(config.google.clientId && config.google.clientSecret)
}

/**
 * Builds the URL to send the browser to, to start the Google consent
 * flow. `prompt: 'select_account'` means Google always shows the account
 * picker rather than silently reusing whichever Google account happens
 * to already be signed in on the device — better default for a shared or
 * multi-account device.
 */
export function getGoogleAuthUrl(req) {
  const client = getClient(req)
  return client.generateAuthUrl({
    access_type: 'online',
    scope: ['openid', 'email', 'profile'],
    prompt: 'select_account',
  })
}

/**
 * Finds the existing user for this Google identity, or creates one.
 * Matching is by email, not just googleId — so someone who registered
 * with a password first and later clicks "Continue with Google" using the
 * same address gets their existing account linked, not a duplicate. Only
 * ever links when Google reports the email as verified (checked by the
 * caller, completeGoogleAuth, before this runs).
 */
async function findOrCreateGoogleUser({ googleId, email, name, picture }) {
  const normalizedEmail = email.toLowerCase()
  const user = await User.findOne({ email: normalizedEmail }).select('+googleId')

  if (user) {
    let changed = false
    if (!user.googleId) {
      user.googleId = googleId
      changed = true
    }
    if (!user.isEmailVerified) {
      user.isEmailVerified = true
      changed = true
    }
    if (!user.avatar && picture) {
      user.avatar = picture
      changed = true
    }
    if (changed) await user.save()
    return user
  }

  return User.create({
    name,
    email: normalizedEmail,
    googleId,
    avatar: picture || '',
    isEmailVerified: true, // Google already verified this address
  })
}

/**
 * Exchanges the authorization code Google sent back for tokens, verifies
 * the ID token's signature and audience (proving it really came from
 * Google and really is for this app, not just trusting whatever the
 * client claims), and finds-or-creates the corresponding user.
 */
export async function completeGoogleAuth(code, req) {
  if (!isGoogleConfigured()) {
    throw ApiError.badRequest('Google Sign-In is not configured on this server.')
  }

  const client = getClient(req)

  let tokens
  try {
    ;({ tokens } = await client.getToken(code))
  } catch {
    throw ApiError.unauthorized('Could not verify your Google account. Please try again.')
  }

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: config.google.clientId,
  })
  const payload = ticket.getPayload()

  if (!payload?.email) {
    throw ApiError.unauthorized('Google did not provide an email address for this account.')
  }
  if (!payload.email_verified) {
    throw ApiError.unauthorized('Your Google account email address is not verified.')
  }

  return findOrCreateGoogleUser({
    googleId: payload.sub,
    email: payload.email,
    name: payload.name || payload.email.split('@')[0],
    picture: payload.picture,
  })
}
