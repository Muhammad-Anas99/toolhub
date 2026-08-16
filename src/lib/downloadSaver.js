import { getAccessToken } from './tokenStore.js'
import { api } from './api.js'

/**
 * Uploads a tool's result blob directly from the browser to Cloudinary
 * (bypassing this app's own backend for the actual file bytes), then
 * tells the backend just the small resulting metadata so it can create a
 * Download record. Deliberately NOT routed through the Express backend
 * as a file upload — Vercel's Hobby plan caps serverless function
 * request bodies at 4.5MB, and several ToolHub results (a merged PDF, a
 * batch ZIP) can legitimately exceed that; a direct browser-to-Cloudinary
 * upload has no such limit.
 *
 * Requires an unsigned Cloudinary upload preset — see server/README.md
 * for how to create one. VITE_CLOUDINARY_CLOUD_NAME and
 * VITE_CLOUDINARY_UPLOAD_PRESET are safe to expose to the browser (they
 * aren't secrets); the preset's own dashboard configuration is what
 * actually restricts what can be uploaded with it.
 *
 * Only runs for signed-in users (checked via the in-memory access token,
 * not a full AuthContext import, since this is called from plain hooks
 * that don't have component-tree access to context) — anonymous use
 * never triggers any upload here. Always best-effort: any failure here
 * is swallowed silently and never affects the user's actual download,
 * exactly like the existing History logging.
 */
export async function trySaveDownload({ blob, filename, toolSlug, toolName, category, action }) {
  if (!getAccessToken()) return // anonymous — Downloads is signed-in only

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  if (!cloudName || !uploadPreset) return // not configured — silently skip, don't break the download

  try {
    const formData = new FormData()
    formData.append('file', blob, filename)
    formData.append('upload_preset', uploadPreset)
    formData.append('folder', 'toolhub-downloads')

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: 'POST',
      body: formData,
    })
    if (!response.ok) return
    const result = await response.json()

    await api.saveDownload({
      toolSlug,
      toolName,
      category,
      action,
      fileUrl: result.secure_url,
      fileName: filename,
      fileSize: blob.size,
      mimeType: blob.type,
      cloudinaryPublicId: result.public_id,
    })
  } catch {
    // Best-effort — never surfaces an error to the user over this.
  }
}
