import path from 'node:path'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import { config } from './config/env.js'
import { requestLogger } from './middleware/logger.js'
import { apiRateLimiter } from './middleware/rateLimiter.js'
import { sanitizeInput } from './middleware/sanitizeInput.js'
import { notFound } from './middleware/notFound.js'
import { errorHandler } from './middleware/errorHandler.js'
import apiRoutes from './routes/index.js'

/**
 * Builds and returns the fully configured Express app, with no side
 * effects (no app.listen, no process signal handlers) — those belong to
 * whichever entry point imports this:
 *  - server.js        -> traditional hosting (local dev, Render, Railway, ...)
 *  - api/index.js      -> Vercel serverless functions
 */
export function createApp() {
  const app = express()

  // --- Security & core middleware -----------------------------------------
  app.use(helmet())
  app.use(
    cors({
      // Allows the exact configured origin, plus Vercel's own preview
      // deployment domains (*.vercel.app) — each PR/branch gets a unique
      // preview URL, and without this, every preview would be silently
      // blocked by CORS even though production works fine.
      //
      // Tradeoff, stated plainly: this accepts requests from *any*
      // *.vercel.app site, not just your own preview deployments, since
      // there's no way to know your project's preview URL pattern from
      // here. That's an acceptable loosening for a public read API with
      // no cookie-based auth yet — but once Phase 5 adds authentication,
      // replace the regex below with your actual project's preview
      // pattern (e.g. /^toolhub-[a-z0-9-]+-your-team\.vercel\.app$/,
      // visible in your Vercel dashboard) instead of the open wildcard.
      origin(origin, callback) {
        const isAllowed =
          !origin || // same-origin / non-browser requests (e.g. curl, health checks)
          origin === config.clientUrl ||
          /\.vercel\.app$/.test(new URL(origin).hostname)

        callback(isAllowed ? null : new Error('Not allowed by CORS'), isAllowed)
      },
      credentials: true,
    })
  )
  app.use(compression())
  app.use(requestLogger)

  // --- Body parsing ----------------------------------------------------------
  app.use(express.json({ limit: '2mb' }))
  app.use(express.urlencoded({ extended: true, limit: '2mb' }))
  app.use(sanitizeInput)

  // --- Rate limiting (API routes only) ---------------------------------------
  app.use('/api', apiRateLimiter)

  // --- Static file serving for uploads ----------------------------------------
  // Only meaningful when files are actually written to local disk, which
  // happens in the local-dev fallback path of the upload controller — see
  // middleware/upload.js and controllers/uploadController.js. On Vercel,
  // uploads go to Vercel Blob instead and this route simply won't be hit.
  app.use('/uploads', express.static(path.resolve(process.cwd(), config.upload.directory)))

  // --- API routes ---------------------------------------------------------------
  app.use('/api', apiRoutes)

  app.get('/', (req, res) => {
    res.json({ success: true, message: 'ToolHub API — see /api/health for status' })
  })

  // --- 404 + centralized error handling (must be registered last) --------------
  app.use(notFound)
  app.use(errorHandler)

  return app
}
