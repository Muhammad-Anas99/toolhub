/**
 * Each generator function returns the .htaccess snippet for one option,
 * with a comment noting which Apache module it depends on where that's
 * genuinely relevant - per the explicit requirement not to present these
 * as guaranteed-to-work everywhere regardless of server configuration.
 *
 * IP-based access control uses the modern Apache 2.4+ Require syntax
 * (not the deprecated Order/Allow/Deny syntax from mod_access_compat) -
 * verified directly against Apache's own official documentation, which
 * states those older directives "are deprecated and will go away in a
 * future version" and explicitly advises against "outdated tutorials
 * recommending their use."
 */

const GENERATORS = {
  forceHttps: () =>
    `# Force HTTPS (requires mod_rewrite)\n<IfModule mod_rewrite.c>\n  RewriteEngine On\n  RewriteCond %{HTTPS} off\n  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n</IfModule>`,

  wwwToNonWww: () =>
    `# Redirect www to non-www (requires mod_rewrite)\n<IfModule mod_rewrite.c>\n  RewriteEngine On\n  RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]\n  RewriteRule ^(.*)$ https://%1/$1 [L,R=301]\n</IfModule>`,

  nonWwwToWww: () =>
    `# Redirect non-www to www (requires mod_rewrite)\n<IfModule mod_rewrite.c>\n  RewriteEngine On\n  RewriteCond %{HTTP_HOST} !^www\\. [NC]\n  RewriteRule ^(.*)$ https://www.%{HTTP_HOST}/$1 [L,R=301]\n</IfModule>`,

  disableDirectoryListing: () => `# Disable directory listing\nOptions -Indexes`,

  gzipCompression: () =>
    `# Enable GZIP compression (requires mod_deflate)\n<IfModule mod_deflate.c>\n  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript\n  AddOutputFilterByType DEFLATE application/javascript application/x-javascript application/json\n</IfModule>`,

  browserCaching: () =>
    `# Browser caching (requires mod_expires)\n<IfModule mod_expires.c>\n  ExpiresActive On\n  ExpiresByType image/jpg "access plus 1 year"\n  ExpiresByType image/jpeg "access plus 1 year"\n  ExpiresByType image/png "access plus 1 year"\n  ExpiresByType image/webp "access plus 1 year"\n  ExpiresByType text/css "access plus 1 month"\n  ExpiresByType application/javascript "access plus 1 month"\n</IfModule>`,

  custom301: (from, to) => (from && to ? `# Custom 301 (permanent) redirect\nRedirect 301 ${from} ${to}` : ''),

  custom302: (from, to) => (from && to ? `# Custom 302 (temporary) redirect\nRedirect 302 ${from} ${to}` : ''),

  blockIp: (ip) =>
    ip
      ? `# Block a specific IP address (Apache 2.4+ syntax, requires mod_authz_core)\n<RequireAll>\n  Require all granted\n  Require not ip ${ip}\n</RequireAll>`
      : '',

  allowOnlyIp: (ip) =>
    ip
      ? `# Allow access only from a specific IP address (Apache 2.4+ syntax, requires mod_authz_core)\nRequire ip ${ip}`
      : '',

  passwordProtection: () =>
    `# Password protection (requires mod_auth_basic and mod_authn_file)\n# This alone is not enough - you also need to create a .htpasswd file\n# (outside your web root) with a username and hashed password, using a\n# tool like htpasswd on your server.\nAuthType Basic\nAuthName "Restricted Area"\nAuthUserFile /path/to/.htpasswd\nRequire valid-user`,

  custom404: (path) => (path ? `# Custom 404 error page\nErrorDocument 404 ${path}` : ''),

  removeHtmlExtension: () =>
    `# Remove .html extension from URLs (requires mod_rewrite)\n<IfModule mod_rewrite.c>\n  RewriteEngine On\n  RewriteCond %{REQUEST_FILENAME}.html -f\n  RewriteRule ^([^.]+)$ $1.html [NC,L]\n</IfModule>`,

  removePhpExtension: () =>
    `# Remove .php extension from URLs (requires mod_rewrite)\n<IfModule mod_rewrite.c>\n  RewriteEngine On\n  RewriteCond %{REQUEST_FILENAME}.php -f\n  RewriteRule ^([^.]+)$ $1.php [NC,L]\n</IfModule>`,

  preventHotlinking: (domain) =>
    domain
      ? `# Prevent hotlinking of images (requires mod_rewrite)\n<IfModule mod_rewrite.c>\n  RewriteEngine On\n  RewriteCond %{HTTP_REFERER} !^$\n  RewriteCond %{HTTP_REFERER} !^https?://(www\\.)?${domain} [NC]\n  RewriteRule \\.(jpg|jpeg|png|gif|webp)$ - [F,NC,L]\n</IfModule>`
      : '',

  securityHeaders: () =>
    `# Security headers (requires mod_headers)\n<IfModule mod_headers.c>\n  Header always set X-Content-Type-Options "nosniff"\n  Header always set X-Frame-Options "SAMEORIGIN"\n  Header always set Referrer-Policy "strict-origin-when-cross-origin"\n</IfModule>`,
}

export const OPTIONS = [
  { key: 'forceHttps', label: 'Force HTTPS', hasInput: false },
  { key: 'wwwToNonWww', label: 'Redirect www \u2192 non-www', hasInput: false, excludesKey: 'nonWwwToWww' },
  { key: 'nonWwwToWww', label: 'Redirect non-www \u2192 www', hasInput: false, excludesKey: 'wwwToNonWww' },
  { key: 'disableDirectoryListing', label: 'Disable directory listing', hasInput: false },
  { key: 'gzipCompression', label: 'Enable GZIP compression', hasInput: false },
  { key: 'browserCaching', label: 'Browser caching', hasInput: false },
  { key: 'custom301', label: 'Custom 301 redirect', hasInput: true, inputs: [{ name: 'from', placeholder: '/old-page' }, { name: 'to', placeholder: '/new-page' }] },
  { key: 'custom302', label: 'Custom 302 redirect', hasInput: true, inputs: [{ name: 'from', placeholder: '/old-page' }, { name: 'to', placeholder: '/new-page' }] },
  { key: 'blockIp', label: 'Block a specific IP address', hasInput: true, inputs: [{ name: 'ip', placeholder: '203.0.113.0/24' }] },
  { key: 'allowOnlyIp', label: 'Allow access only from a specific IP', hasInput: true, inputs: [{ name: 'ip', placeholder: '198.51.100.15' }] },
  { key: 'passwordProtection', label: 'Password protection (instructions)', hasInput: false },
  { key: 'custom404', label: 'Custom 404 page', hasInput: true, inputs: [{ name: 'path', placeholder: '/404.html' }] },
  { key: 'removeHtmlExtension', label: 'Remove .html extension', hasInput: false },
  { key: 'removePhpExtension', label: 'Remove .php extension', hasInput: false },
  { key: 'preventHotlinking', label: 'Prevent image hotlinking', hasInput: true, inputs: [{ name: 'domain', placeholder: 'yoursite.com' }] },
  { key: 'securityHeaders', label: 'Add security headers', hasInput: false },
]

export function generateHtaccess(selected, values) {
  const blocks = []
  for (const option of OPTIONS) {
    if (!selected[option.key]) continue
    const generator = GENERATORS[option.key]
    const args = option.inputs ? option.inputs.map((inp) => values[option.key]?.[inp.name] || '') : []
    const block = generator(...args)
    if (block) blocks.push(block)
  }
  return blocks.join('\n\n')
}
