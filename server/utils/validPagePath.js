// The page-view logging endpoint is public and unauthenticated, and what
// it stores is later shown in the admin panel - so `path` is checked
// rather than trusted. A real value is always a site path from the
// browser's location.pathname: it starts with a single "/", has no
// control characters, and is nowhere near this long.
export const MAX_PAGE_PATH_LENGTH = 300

export function isValidPagePath(path) {
  return (
    typeof path === 'string' &&
    path.length > 0 &&
    path.length <= MAX_PAGE_PATH_LENGTH &&
    path.startsWith('/') &&
    !path.startsWith('//') &&
    !/[\u0000-\u001f\u007f]/.test(path)
  )
}
