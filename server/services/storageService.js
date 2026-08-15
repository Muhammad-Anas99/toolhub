import fs from 'node:fs/promises'
import path from 'node:path'
import { put } from '@vercel/blob'
import { slugify } from '../utils/slugify.js'
import { config } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'

function buildFilename(originalName) {
  const extension = path.extname(originalName).toLowerCase()
  const baseName = slugify(path.basename(originalName, extension)) || 'file'
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
  return `${baseName}-${uniqueSuffix}${extension}`
}

/**
 * Uploads to Vercel Blob when configured (BLOB_READ_WRITE_TOKEN is set —
 * Vercel injects this automatically once Blob storage is enabled on the
 * project). Falls back to writing the file to the local `uploads/`
 * directory otherwise, so `npm run dev` works out of the box without
 * needing a Vercel Blob store set up just to test uploads locally.
 *
 * The returned URL is always absolute in both cases. That matters here
 * specifically because the frontend and this API live on different
 * origins — a relative `/uploads/xyz.png` would resolve against the
 * frontend's own origin when used as an `<img src>` or download link,
 * which is wrong; it needs to point back at this API.
 *
 * Used by both the admin content-upload endpoint (POST /api/uploads) and
 * the profile-picture upload endpoint (POST /api/users/me/avatar) — the
 * same underlying storage mechanism, reached from two different,
 * differently-authorized routes.
 */
export async function storeFile(file, req) {
  const filename = buildFilename(file.originalname)

  if (process.env.BLOB_READ_WRITE_TOKEN) {
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
  // and clearly instead — this is a one-time configuration gap to fix
  // (enable Blob storage), not a bug to chase.
  if (process.env.VERCEL) {
    throw ApiError.internal(
      'File uploads are not configured on this deployment yet. Enable Vercel Blob storage on the backend project (Storage tab -> Create -> Blob) and redeploy — see server/README.md.'
    )
  }

  const uploadDir = path.resolve(process.cwd(), config.upload.directory)
  await fs.mkdir(uploadDir, { recursive: true })
  await fs.writeFile(path.join(uploadDir, filename), file.buffer)

  const baseUrl = `${req.protocol}://${req.get('host')}`
  return { url: `${baseUrl}/uploads/${filename}`, filename }
}
