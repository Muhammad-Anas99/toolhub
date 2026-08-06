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

  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',

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

  // Not used yet — reserved so Phase 5 (authentication) can read these
  // without any changes to how config is loaded.
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
}

export const isProduction = config.env === 'production'
export const isDevelopment = config.env === 'development'
