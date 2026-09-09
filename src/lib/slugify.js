/**
 * Turn a string into a URL-safe slug, e.g. "Image Compressor!" -> "image-compressor".
 * Deliberately kept identical to server/utils/slugify.js so a slug computed
 * here (for an admin form preview, before the record is actually saved)
 * matches what the backend will independently derive from the same name.
 */
export function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}
