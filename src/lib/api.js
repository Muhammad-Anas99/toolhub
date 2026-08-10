import { getAccessToken, setAccessToken, clearAccessToken } from './tokenStore.js'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

/**
 * Thin wrapper around fetch for the ToolHub API. Every backend response is
 * shaped { success, message, data, meta? } (see server/utils/ApiResponse.js),
 * so this unwraps that envelope and throws a normal Error on failure —
 * callers (the hooks in src/hooks/) catch that and fall back to local data.
 *
 * `credentials: 'include'` is always set so the httpOnly refresh-token
 * cookie (see server/controllers/authController.js) is sent on every
 * request — required for the silent-refresh flow in AuthContext.
 */
async function request(path, options = {}) {
  // Destructuring `headers` out first, then explicitly setting `headers`
  // and `credentials` LAST in the fetch call below (after `...restOptions`)
  // is deliberate: an object spread later in a literal always wins over
  // one earlier. Putting `...options` before `headers`/`credentials` used
  // to let it silently overwrite the carefully-merged Content-Type header
  // with whatever (incomplete) headers object the caller passed in —
  // which meant every authorizedRequest() call (any authenticated POST/PUT
  // with a JSON body) was sent with no Content-Type at all, so Express's
  // body parser skipped it entirely and the backend saw an empty req.body.
  // This is what actually broke favorites, profile updates, and admin
  // CRUD, not just this endpoint or that one.
  const { headers: extraHeaders, ...restOptions } = options

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...restOptions,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  })

  let body
  try {
    body = await response.json()
  } catch {
    const error = new Error(`API returned a non-JSON response (${response.status})`)
    error.status = response.status
    throw error
  }

  if (!response.ok || body.success === false) {
    const error = new Error(body.message || `API request failed (${response.status})`)
    error.status = response.status
    error.details = body.errors
    throw error
  }

  return body
}

let refreshInFlight = null

/**
 * Same as `request`, but attaches the current access token and — on a 401
 * specifically — attempts exactly one silent refresh before retrying the
 * original request once. This is what lets a session survive the access
 * token's short 15-minute expiry without the user noticing: the httpOnly
 * refresh cookie does the work behind the scenes.
 *
 * `refreshInFlight` de-duplicates concurrent refreshes — if five requests
 * all 401 around the same moment, only one actual refresh call goes out;
 * the other four await the same in-flight promise.
 */
async function authorizedRequest(path, options = {}) {
  const token = getAccessToken()
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {}

  try {
    return await request(path, { ...options, headers: { ...authHeaders, ...options.headers } })
  } catch (error) {
    if (error.status !== 401 || path === '/auth/refresh') {
      throw error
    }

    if (!refreshInFlight) {
      refreshInFlight = request('/auth/refresh', { method: 'POST' })
        .then((body) => {
          setAccessToken(body.data.accessToken)
          return body.data.accessToken
        })
        .catch((refreshError) => {
          clearAccessToken()
          throw refreshError
        })
        .finally(() => {
          refreshInFlight = null
        })
    }

    const newToken = await refreshInFlight
    return request(path, {
      ...options,
      headers: { Authorization: `Bearer ${newToken}`, ...options.headers },
    })
  }
}

function toQuery(params = {}) {
  const query = new URLSearchParams(params).toString()
  return query ? `?${query}` : ''
}

export const api = {
  // --- Public content ---------------------------------------------------------
  getTools: (params = {}) => request(`/tools${toQuery(params)}`),
  getToolBySlug: (slug) => request(`/tools/${slug}`),

  getCategories: () => request('/categories'),
  getCategoryBySlug: (slug) => request(`/categories/${slug}`),

  getBlogPosts: (params = {}) => request(`/blog${toQuery(params)}`),
  getBlogPostBySlug: (slug) => request(`/blog/${slug}`),

  getSettings: () => request('/settings'),

  // --- Auth ---------------------------------------------------------------------
  register: (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  logoutRequest: () => authorizedRequest('/auth/logout', { method: 'POST' }),
  refreshSession: () => request('/auth/refresh', { method: 'POST' }),
  getMe: () => authorizedRequest('/auth/me'),
  verifyEmail: (token) => request('/auth/verify-email', { method: 'POST', body: JSON.stringify({ token }) }),
  resendVerification: () => authorizedRequest('/auth/resend-verification', { method: 'POST' }),
  forgotPassword: (email) => request('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
  resetPassword: (token, password) =>
    request('/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, password }) }),

  // --- Profile (self-service) -----------------------------------------------------
  updateProfile: (data) => authorizedRequest('/users/me', { method: 'PUT', body: JSON.stringify(data) }),
  changePassword: (data) => authorizedRequest('/users/me/password', { method: 'PUT', body: JSON.stringify(data) }),

  // --- Favorites -----------------------------------------------------------------
  getFavorites: () => authorizedRequest('/favorites'),
  addFavorite: (toolSlug) => authorizedRequest('/favorites', { method: 'POST', body: JSON.stringify({ toolSlug }) }),
  removeFavorite: (toolSlug) => authorizedRequest(`/favorites/${toolSlug}`, { method: 'DELETE' }),

  // --- Conversion history -----------------------------------------------------------
  logConversion: (data) => authorizedRequest('/history', { method: 'POST', body: JSON.stringify(data) }), // works signed-out too — authorizedRequest only attaches a token when one exists
  getMyHistory: (params = {}) => authorizedRequest(`/history${toQuery(params)}`),
  clearMyHistory: () => authorizedRequest('/history', { method: 'DELETE' }),
  deleteHistoryEntry: (id) => authorizedRequest(`/history/${id}`, { method: 'DELETE' }),
  markDownloaded: (id) => authorizedRequest(`/history/${id}/download`, { method: 'PATCH' }),
  getMyDownloads: (params = {}) => authorizedRequest(`/history/downloads${toQuery(params)}`),
  adminGetAllHistory: (params = {}) => authorizedRequest(`/history/admin/all${toQuery(params)}`),

  // --- Admin: users --------------------------------------------------------------
  adminGetUsers: (params = {}) => authorizedRequest(`/users${toQuery(params)}`),
  adminGetUser: (id) => authorizedRequest(`/users/${id}`),
  adminUpdateUser: (id, data) => authorizedRequest(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  adminDeleteUser: (id) => authorizedRequest(`/users/${id}`, { method: 'DELETE' }),

  // --- Admin: tools ----------------------------------------------------------------
  adminCreateTool: (data) => authorizedRequest('/tools', { method: 'POST', body: JSON.stringify(data) }),
  adminUpdateTool: (slug, data) => authorizedRequest(`/tools/${slug}`, { method: 'PUT', body: JSON.stringify(data) }),
  adminDeleteTool: (slug) => authorizedRequest(`/tools/${slug}`, { method: 'DELETE' }),

  // --- Admin: categories -------------------------------------------------------------
  adminCreateCategory: (data) => authorizedRequest('/categories', { method: 'POST', body: JSON.stringify(data) }),
  adminUpdateCategory: (slug, data) =>
    authorizedRequest(`/categories/${slug}`, { method: 'PUT', body: JSON.stringify(data) }),
  adminDeleteCategory: (slug) => authorizedRequest(`/categories/${slug}`, { method: 'DELETE' }),

  // --- Admin: blog -------------------------------------------------------------------
  adminGetAllBlogPosts: (params = {}) => authorizedRequest(`/blog/admin/all${toQuery(params)}`),
  adminGetBlogPost: (slug) => authorizedRequest(`/blog/admin/${slug}`),
  adminCreateBlogPost: (data) => authorizedRequest('/blog', { method: 'POST', body: JSON.stringify(data) }),
  adminUpdateBlogPost: (slug, data) => authorizedRequest(`/blog/${slug}`, { method: 'PUT', body: JSON.stringify(data) }),
  adminDeleteBlogPost: (slug) => authorizedRequest(`/blog/${slug}`, { method: 'DELETE' }),

  // --- Admin: settings ---------------------------------------------------------------
  adminUpdateSettings: (data) => authorizedRequest('/settings', { method: 'PUT', body: JSON.stringify(data) }),

  // --- Admin: analytics --------------------------------------------------------------
  adminGetAnalyticsOverview: () => authorizedRequest('/analytics/overview'),

  // --- Uploads (admin) -----------------------------------------------------------------
  uploadFile: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const token = getAccessToken()
    return authorizedRequestWithFormData('/uploads', formData, token)
  },
}

// Multipart uploads can't use the JSON `request` helper (no Content-Type:
// application/json, and the body is FormData, not a JSON string) — kept
// separate to keep `request` simple for the common JSON case.
async function authorizedRequestWithFormData(path, formData, token) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  })
  const body = await response.json()
  if (!response.ok || body.success === false) {
    const error = new Error(body.message || `Upload failed (${response.status})`)
    error.status = response.status
    throw error
  }
  return body
}
