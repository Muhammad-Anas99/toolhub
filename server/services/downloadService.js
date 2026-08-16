import Download from '../models/Download.js'
import { ApiError } from '../utils/ApiError.js'
import { deleteCloudinaryFiles } from './storageService.js'

export async function saveDownload({ userId, toolSlug, toolName, category, action, fileUrl, fileName, fileSize, mimeType, cloudinaryPublicId }) {
  return Download.create({
    user: userId,
    toolSlug: toolSlug.toLowerCase(),
    toolName,
    category,
    action: action || '',
    fileUrl,
    fileName,
    fileSize,
    mimeType,
    cloudinaryPublicId: cloudinaryPublicId || null,
    expiresAt: Download.computeExpiresAt(),
  })
}

export async function listUserDownloads(userId) {
  // expiresAt is checked here too, not just relied on from the daily
  // cleanup cron — the cron only runs once a day, so a download that
  // technically expired a few hours ago but hasn't been swept yet should
  // still never show up as available to download.
  return Download.find({ user: userId, expiresAt: { $gt: new Date() } }).sort({ createdAt: -1 })
}

export async function deleteDownload(id, userId) {
  const download = await Download.findOne({ _id: id, user: userId })
  if (!download) throw ApiError.notFound('Download not found')

  if (download.cloudinaryPublicId) {
    await deleteCloudinaryFiles([download.cloudinaryPublicId])
  }
  await download.deleteOne()
}

/**
 * Deletes every expired download's actual file (Cloudinary) and its
 * database record together, in that order — the Cloudinary file only
 * where a real publicId exists, since Blob/local-disk-stored downloads
 * don't have one to clean up the same way (see the Download model's
 * comment on why this isn't just a MongoDB TTL index).
 */
export async function cleanupExpiredDownloads() {
  const expired = await Download.find({ expiresAt: { $lte: new Date() } }).select('_id cloudinaryPublicId')
  if (expired.length === 0) return { deletedCount: 0 }

  const publicIds = expired.filter((d) => d.cloudinaryPublicId).map((d) => d.cloudinaryPublicId)
  if (publicIds.length > 0) {
    await deleteCloudinaryFiles(publicIds)
  }

  const ids = expired.map((d) => d._id)
  const result = await Download.deleteMany({ _id: { $in: ids } })
  return { deletedCount: result.deletedCount }
}
