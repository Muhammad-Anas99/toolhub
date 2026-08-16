import fs from 'node:fs/promises'
import path from 'node:path'
import { put } from '@vercel/blob'
import { v2 as cloudinary } from 'cloudinary'
import { slugify } from '../utils/slugify.js'
import { config } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'

function buildFilename(originalName) {
  const extension = path.extname(originalName).toLowerCase()
  const baseName = slugify(path.basename(originalName, extension)) || 'file'
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
  return `${baseName}-${uniqueSuffix}${extension}`
}

const hasCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET
)

if (hasCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

/**
 * multer gives us the uploaded file as an in-memory Buffer (req.file.buffer),
 * not a file path — Cloudinary's basic uploader.upload() expects a path or
 * a base64 string, so a Buffer needs the stream-based uploader instead.
 * This is the standard, documented way to upload an in-memory buffer with
 * the Cloudinary Node SDK.
 */
function uploadToCloudinary(buffer, filename) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id: `toolhub/${filename}`, resource_type: 'image', overwrite: false },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    )
    uploadStream.end(buffer)
  })
}

/**
 * Uploads to Cloudinary when configured (the recommended path — a
 * generous free tier that doesn't compete with MongoDB's own storage
 * quota the way storing images in the database would), falling back to
 * Vercel Blob if that's connected instead (kept for anyone who already
 * has it set up), then to the local `uploads/` directory in development
 * so `npm run dev` works without any storage configured at all.
 *
 * "Cloudinary configured" means all three of CLOUDINARY_CLOUD_NAME,
 * CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET are set — see
 * server/README.md for where to get these from your Cloudinary
 * dashboard.
 *
 * The returned URL is always absolute in every case. That matters here
 * specifically because the frontend and this API live on different
 * origins — a relative `/uploads/xyz.png` would resolve against the
 * frontend's own origin when used as an `<img src>` or download link,
 * which is wrong; it needs to point back at this API (or, for
 * Cloudinary/Blob, at their own CDN).
 *
 * Used by both the admin content-upload endpoint (POST /api/uploads) and
 * the profile-picture upload endpoint (POST /api/users/me/avatar) — the
 * same underlying storage mechanism, reached from two different,
 * differently-authorized routes.
 */
export async function storeFile(file, req) {
  const filename = buildFilename(file.originalname)

  if (hasCloudinaryConfigured) {
    const result = await uploadToCloudinary(file.buffer, filename)
    return { url: result.secure_url, filename }
  }

  const hasConnectedBlobStore = Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN)
  if (hasConnectedBlobStore) {
    const blob = await put(filename, file.buffer, {
      access: 'public',
      contentType: file.mimetype,
    })
    return { url: blob.url, filename }
  }

  // Vercel's serverless filesystem is read-only outside of /tmp — the
  // local-disk fallback below would throw a confusing, generic-looking
  // "Something went wrong" error there (an unhandled EROFS/read-only-
  // filesystem exception), not a helpful one, if it were ever attempted
  // on Vercel. `process.env.VERCEL` is set automatically on every Vercel
  // deployment (production and preview alike), so this fails explicitly
  // and clearly instead — this is a one-time configuration gap to fix,
  // not a bug to chase.
  if (process.env.VERCEL) {
    throw ApiError.internal(
      'File uploads are not configured on this deployment yet. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to the backend project\u2019s environment variables and redeploy — see server/README.md.'
    )
  }

  const uploadDir = path.resolve(process.cwd(), config.upload.directory)
  await fs.mkdir(uploadDir, { recursive: true })
  await fs.writeFile(path.join(uploadDir, filename), file.buffer)

  const baseUrl = `${req.protocol}://${req.get('host')}`
  return { url: `${baseUrl}/uploads/${filename}`, filename }
}
