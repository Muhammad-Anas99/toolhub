import multer from 'multer'
import { config } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'])

function fileFilter(req, file, cb) {
  if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
    cb(ApiError.badRequest(`Unsupported file type: ${file.mimetype}. Allowed: images (jpg, png, webp, gif, svg).`))
    return
  }
  cb(null, true)
}

/**
 * Files are held in memory (as a Buffer on req.file.buffer) rather than
 * written to disk. Vercel's filesystem is read-only/ephemeral in
 * production, so disk writes there either fail outright or vanish the
 * moment the function instance recycles — memory storage works
 * identically in every environment, and uploadController.js decides where
 * the buffer ultimately goes (Vercel Blob in production, local disk as a
 * dev-only fallback — see that file for details).
 */
export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: config.upload.maxFileSizeMb * 1024 * 1024,
  },
})
