/**
 * Sends a consistently-shaped success response, so every endpoint returns
 * { success, message, data } regardless of resource type.
 */
export function sendSuccess(res, { statusCode = 200, message = 'Success', data = null, meta } = {}) {
  const body = { success: true, message, data }
  if (meta) body.meta = meta
  return res.status(statusCode).json(body)
}
