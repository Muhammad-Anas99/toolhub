const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

/**
 * Thin wrapper around fetch for the ToolHub API. Every backend response is
 * shaped { success, message, data, meta? } (see server/utils/ApiResponse.js),
 * so this unwraps that envelope and throws a normal Error on failure —
 * callers (the hooks in src/hooks/) catch that and fall back to local data.
 */
async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  let body
  try {
    body = await response.json()
  } catch {
    throw new Error(`API returned a non-JSON response (${response.status})`)
  }

  if (!response.ok || body.success === false) {
    throw new Error(body.message || `API request failed (${response.status})`)
  }

  return body
}

export const api = {
  getTools: (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return request(`/tools${query ? `?${query}` : ''}`)
  },
  getToolBySlug: (slug) => request(`/tools/${slug}`),

  getCategories: () => request('/categories'),
  getCategoryBySlug: (slug) => request(`/categories/${slug}`),

  getBlogPosts: (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return request(`/blog${query ? `?${query}` : ''}`)
  },
  getBlogPostBySlug: (slug) => request(`/blog/${slug}`),

  getSettings: () => request('/settings'),
}
