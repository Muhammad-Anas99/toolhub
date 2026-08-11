import Download from '../models/Download.js'
import { ApiError } from '../utils/ApiError.js'

const MAX_PAGE_SIZE = 100

export async function createDownload({ userId, toolSlug, toolName, filename, mimeType, fileUrl, fileSize }) {
  return Download.create({
    user: userId,
    toolSlug: toolSlug.toLowerCase(),
    toolName,
    filename,
    mimeType,
    fileUrl,
    fileSize,
  })
}

export async function listMyDownloads(userId, { page = 1, limit = 20 } = {}) {
  const safeLimit = Math.min(Number(limit) || 20, MAX_PAGE_SIZE)
  const safePage = Math.max(Number(page) || 1, 1)

  const query = { user: userId }

  const [items, total] = await Promise.all([
    Download.find(query)
      .sort({ downloadedAt: -1 })
      .skip((safePage - 1) * safeLimit)
      .limit(safeLimit),
    Download.countDocuments(query),
  ])

  return { items, total, page: safePage, pages: Math.ceil(total / safeLimit) }
}

export async function deleteDownload(userId, downloadId) {
  const download = await Download.findOneAndDelete({ _id: downloadId, user: userId })
  if (!download) throw ApiError.notFound('Download not found')
  return download
}
