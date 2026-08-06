import fs from 'node:fs/promises'
import path from 'node:path'
import { put } from '@vercel/blob'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import { slugify } from '../utils/slugify.js'
import { config } from '../config/env.js'

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
 * Same fallback philosophy as the frontend's API hooks: try the
 * production-grade path first, degrade gracefully to something that still
 * works when it's not configured.
 */
async function storeFile(file) {
  const filename = buildFilename(file.originalname)

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(filename, file.buffer, {
      access: 'public',
      contentType: file.mimetype,
    })
    return { url: blob.url, filename }
  }

  const uploadDir = path.resolve(process.cwd(), config.upload.directory)
  await fs.mkdir(uploadDir, { recursive: true })
  await fs.writeFile(path.join(uploadDir, filename), file.buffer)
  return { url: `/uploads/${filename}`, filename }
}

export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw ApiError.badRequest('No file was uploaded')
  }

  const { url, filename } = await storeFile(req.file)

  sendSuccess(res, {
    statusCode: 201,
    message: 'File uploaded',
    data: {
      filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype,
      url,
    },
  })
})
