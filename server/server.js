import { createApp } from './app.js'
import { config, isDevelopment } from './config/env.js'
import { connectDB, disconnectDB } from './config/db.js'

/**
 * Entry point for traditional hosting — local development, or a platform
 * built for long-running Node processes (Render, Railway, a VPS, etc).
 *
 * NOT used when deploying to Vercel — see api/index.js for that entry
 * point, which reuses the same createApp() but skips app.listen() and the
 * shutdown handlers, since Vercel manages the function lifecycle itself.
 */
const app = createApp()
let server

async function start() {
  try {
    await connectDB()
  } catch (error) {
    console.error('[server] Failed to connect to MongoDB:', error.message)
    if (!isDevelopment) {
      // In production, a database-less API is not useful — fail fast so
      // the process manager (PM2, Docker, etc.) can restart/alert.
      process.exit(1)
    }
    console.warn('[server] Continuing without a database connection (development mode).')
  }

  server = app.listen(config.port, () => {
    console.log(`[server] ToolHub API running on port ${config.port} (${config.env})`)
  })
}

async function shutdown(signal) {
  console.log(`\n[server] Received ${signal}, shutting down gracefully...`)
  server?.close(async () => {
    await disconnectDB()
    console.log('[server] Shutdown complete.')
    process.exit(0)
  })
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))

start()

export default app
