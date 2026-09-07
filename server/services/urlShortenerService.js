import ShortUrl from '../models/ShortUrl.js'
import { ApiError } from '../utils/ApiError.js'

const CODE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const CODE_LENGTH = 7

function generateCode() {
  let code = ''
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]
  }
  return code
}

/**
 * Generates a short code and retries on the rare chance of a collision
 * with an existing one, rather than trusting randomness alone to never
 * repeat. At 62^7 possible codes, a collision is already astronomically
 * unlikely, but checking costs one indexed query and removes any doubt.
 */
async function generateUniqueCode() {
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateCode()
    const existing = await ShortUrl.findOne({ shortCode: code })
    if (!existing) return code
  }
  throw new Error('Could not generate a unique short code — please try again.')
}

export async function createShortUrl(originalUrl, userId) {
  // Defense in depth: re-validate the protocol here too, independent of
  // the express-validator middleware upstream - this service function
  // could in principle be called from elsewhere later, and a redirect
  // generator is exactly the kind of feature worth not trusting a single
  // validation layer for.
  let parsed
  try {
    parsed = new URL(originalUrl)
  } catch {
    throw ApiError.badRequest('Please provide a valid URL.')
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw ApiError.badRequest('Only http:// and https:// URLs are supported.')
  }

  const shortCode = await generateUniqueCode()
  const record = await ShortUrl.create({ originalUrl, shortCode, user: userId || undefined })
  return record
}

/**
 * Looks up a short code and increments its click count atomically in the
 * same operation, rather than a separate read-then-write — avoids a race
 * condition where two simultaneous clicks could both read the same
 * starting count and one increment gets lost.
 */
export async function resolveShortCode(shortCode) {
  const record = await ShortUrl.findOneAndUpdate({ shortCode }, { $inc: { clicks: 1 } }, { new: true })
  return record
}

export async function listMyShortUrls(userId) {
  return ShortUrl.find({ user: userId }).sort({ createdAt: -1 })
}

/**
 * Filters by both the link's own id AND the requesting user's id in the
 * same query — same pattern as favoriteService.removeFavorite — so a
 * user can never delete a link that isn't theirs, without a separate
 * ownership-check step that could race against the delete itself.
 */
export async function deleteMyShortUrl(id, userId) {
  const record = await ShortUrl.findOneAndDelete({ _id: id, user: userId })
  if (!record) throw ApiError.notFound('This short link doesn\u2019t exist, or isn\u2019t yours to delete.')
  return record
}
