/*
 * Decisions about page-view logging, kept as pure functions (no
 * imports) so every case can be tested directly.
 */

/**
 * True for the admin panel itself. React Router matches paths
 * case-insensitively, so "/ADMIN/Users" opens the same screen as
 * "/admin/users" - the check lowercases to match. A path that merely
 * starts with the letters (e.g. "/administrator", "/adminx") is not the
 * panel and is not excluded.
 */
export function isAdminPanelPath(path) {
  const lower = String(path).toLowerCase()
  return lower === '/admin' || lower.startsWith('/admin/')
}

/**
 * Whether a page view should be written to the database. Bots, the
 * admin panel's own pages, and anyone signed in as an admin are not
 * recorded - those are the site owner working on the site, not visitors.
 */
export function shouldRecordPageView({ path, isBot, user }) {
  if (isBot) return { record: false, reason: 'bot' }
  if (isAdminPanelPath(path)) return { record: false, reason: 'admin-panel' }
  if (user && user.role === 'admin') return { record: false, reason: 'admin-user' }
  return { record: true }
}

/**
 * Validates the `ip` value used to delete one visitor's page views.
 * It must be an actual string: Express's query parser turns
 * `?ip[$ne]=x` into the OBJECT { $ne: 'x' }, and passing that to a
 * delete filter would mean "everything except x" - i.e. wiping the
 * whole collection. Only characters that can appear in an IPv4/IPv6
 * address are allowed (plus the literal "Unknown" the logger stores
 * when no address was available).
 */
export function isValidIpParam(ip) {
  if (typeof ip !== 'string') return false
  if (ip === 'Unknown') return true
  return ip.length >= 2 && ip.length <= 45 && /^[0-9a-fA-F:.]+$/.test(ip)
}
