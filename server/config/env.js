import dotenv from 'dotenv'

dotenv.config()

function requireInProduction(value, name) {
  if (process.env.NODE_ENV === 'production' && !value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,

  mongoUri: requireInProduction(process.env.MONGODB_URI, 'MONGODB_URI') || 'mongodb://127.0.0.1:27017/toolhub',

  // Trailing slash stripped so it's safe to use both for exact-match CORS
  // comparisons (browser Origin headers never have a trailing slash) and
  // for building URLs like `${clientUrl}/verify-email` without risking a
  // double slash.
  clientUrl: (process.env.CLIENT_URL || 'http://localhost:5173').replace(/\/+$/, ''),

  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: Number(process.env.RATE_LIMIT_MAX) || 100,
  },

  upload: {
    // Default kept at/under Vercel's 4.5MB Hobby-plan request body limit —
    // see the note in .env.example. Raise this only if hosting elsewhere
    // or on a paid Vercel plan.
    maxFileSizeMb: Number(process.env.UPLOAD_MAX_FILE_SIZE_MB) || 4,
    directory: process.env.UPLOAD_DIR || 'uploads',
  },

  jwt: {
    accessSecret: requireInProduction(process.env.JWT_ACCESS_SECRET, 'JWT_ACCESS_SECRET') || 'dev-only-access-secret-do-not-use-in-production',
    refreshSecret: requireInProduction(process.env.JWT_REFRESH_SECRET, 'JWT_REFRESH_SECRET') || 'dev-only-refresh-secret-do-not-use-in-production',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    // 7 days: this is also the ABSOLUTE session cap enforced in
    // authService.js (see sessionExpiresAt on the refresh token schema in
    // models/User.js) — refreshing/rotating never extends a session past
    // this many days from the original login, even though each
    // individual rotated token's own JWT `exp` is a fresh 7 days from
    // when it was issued. The two concepts share one value here on
    // purpose: there's no reason for a raw token to outlive the session
    // it belongs to.
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    // Matches JWT_REFRESH_EXPIRES_IN in milliseconds, for setting the
    // refresh-token cookie's maxAge and computing sessionExpiresAt. Kept
    // as a plain number here (rather than parsing the string above) so
    // it's trivial to read/verify.
    refreshExpiresInMs: 7 * 24 * 60 * 60 * 1000,
  },

  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,

  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    // Accepts either a bare address ("noreply@toolhub.com") or a full
    // "Name <email>" string ("ToolHub <noreply@toolhub.com>") — used
    // as-is for the `from` field on every outgoing email.
    emailFrom: process.env.EMAIL_FROM || 'ToolHub <noreply@toolhub.example.com>',
  },

  admin: {
    name: process.env.ADMIN_NAME || 'Admin',
    email: process.env.ADMIN_EMAIL || '',
    password: process.env.ADMIN_PASSWORD || '',
  },

  // Optional — "Continue with Google" is disabled gracefully (see
  // services/googleAuthService.js) rather than crashing the app when
  // these aren't set, since email/password auth works fine without them.
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  },

  // Where Contact page submissions get emailed. Overridable via env var
  // without a code change; defaults to the address ToolHub actually uses.
  contactEmail: process.env.CONTACT_EMAIL || 'flashycoderch@gmail.com',
}

export const isProduction = config.env === 'production'
export const isDevelopment = config.env === 'development'
