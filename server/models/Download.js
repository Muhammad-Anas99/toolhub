import mongoose from 'mongoose'

const DOWNLOAD_RETENTION_DAYS = 14

/**
 * A saved result file — the OUTPUT of a tool (e.g. the compressed image,
 * the merged PDF), never the user's original input. Opt-in: only created
 * when a signed-in user's tool run finishes, never for anonymous users.
 *
 * Deliberately NOT using a MongoDB TTL index for cleanup, even though
 * that's the simpler built-in option — TTL only deletes the database
 * document, not the actual file sitting in Cloudinary storage, which
 * would silently keep accumulating cost forever. The daily cleanup cron
 * job (see routes/downloadRoutes.js) needs the real record — including
 * publicId — to still exist right up until it deletes the Cloudinary
 * file itself, so it queries `expiresAt` explicitly instead.
 */
const downloadSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    toolSlug: { type: String, required: true, trim: true, lowercase: true },
    toolName: { type: String, required: true, trim: true },
    category: { type: String, trim: true, lowercase: true },
    action: { type: String, trim: true, maxlength: 120, default: '' },
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
    fileSize: { type: Number, required: true },
    mimeType: { type: String, default: '' },
    // Null when stored via Vercel Blob or local disk instead of
    // Cloudinary — those paths don't have a deletable resource id in the
    // same way, so cleanup for those falls back to just removing the
    // database record.
    cloudinaryPublicId: { type: String, default: null },
    expiresAt: { type: Date, required: true, index: true },
  },
  { timestamps: true }
)

downloadSchema.statics.computeExpiresAt = function computeExpiresAt() {
  return new Date(Date.now() + DOWNLOAD_RETENTION_DAYS * 24 * 60 * 60 * 1000)
}

export { DOWNLOAD_RETENTION_DAYS }
export default mongoose.model('Download', downloadSchema)
