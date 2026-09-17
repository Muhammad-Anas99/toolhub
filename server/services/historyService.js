import ConversionHistory from '../models/ConversionHistory.js'
import { ApiError } from '../utils/ApiError.js'

const MAX_PAGE_SIZE = 100

export async function logConversion({ userId, toolSlug, toolName, category, action, originalFileName, country, device, ipAddress }) {
  return ConversionHistory.create({
    user: userId || null,
    toolSlug: toolSlug.toLowerCase(),
    toolName,
    category,
    action: action || '',
    originalFileName: originalFileName || '',
    country,
    device,
    ipAddress: ipAddress || 'Unknown',
  })
}

export async function listMyHistory(userId, { page = 1, limit = 20 } = {}) {
  const safeLimit = Math.min(Number(limit) || 20, MAX_PAGE_SIZE)
  const safePage = Math.max(Number(page) || 1, 1)

  const [items, total] = await Promise.all([
    ConversionHistory.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip((safePage - 1) * safeLimit)
      .limit(safeLimit),
    ConversionHistory.countDocuments({ user: userId }),
  ])

  return { items, total, page: safePage, pages: Math.ceil(total / safeLimit) }
}

export async function clearMyHistory(userId) {
  await ConversionHistory.deleteMany({ user: userId })
}

export async function deleteHistoryEntry(userId, entryId) {
  const entry = await ConversionHistory.findOneAndDelete({ _id: entryId, user: userId })
  if (!entry) throw ApiError.notFound('History entry not found')
  return entry
}

/**
 * Admin view of every conversion, across all users. Populates the user's
 * name/email from the existing `user` relationship (see
 * models/ConversionHistory.js) rather than storing a redundant copy of
 * that data on every single history record — a copy would drift out of
 * sync the moment a user changed their name or email.
 */
export async function listAllHistoryAdmin({ page = 1, limit = 50 } = {}) {
  const safeLimit = Math.min(Number(limit) || 50, MAX_PAGE_SIZE)
  const safePage = Math.max(Number(page) || 1, 1)

  const [items, total] = await Promise.all([
    ConversionHistory.find({})
      .sort({ createdAt: -1 })
      .skip((safePage - 1) * safeLimit)
      .limit(safeLimit)
      .populate('user', 'name email'),
    ConversionHistory.countDocuments({}),
  ])

  return { items, total, page: safePage, pages: Math.ceil(total / safeLimit) }
}

/**
 * Admin-only: deletes any single conversion record by ID, regardless of
 * which user (or no user at all, for anonymous traffic) it belongs to.
 * Deliberately separate from deleteHistoryEntry above, which is scoped
 * to the requesting user's own entries by design — this one has no such
 * restriction, which is exactly why it's wired to an admin-only route.
 */
export async function deleteHistoryEntryAdmin(entryId) {
  const entry = await ConversionHistory.findByIdAndDelete(entryId)
  if (!entry) throw ApiError.notFound('Conversion record not found')
  return entry
}
