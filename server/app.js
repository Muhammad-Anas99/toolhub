import path from 'node:path'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
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

  // Vercel (and most serverless/proxy platforms) terminates TLS at the
  // edge and forwards to this function over an internal connection —
  // without this, Express can't tell the request was actually HTTPS, and
  // express-rate-limit can't correctly identify client IPs from
  // X-Forwarded-For, silently rate-limiting everyone as if they shared one
  // IP (the proxy's).
  app.set('trust proxy', 1)

  // --- Security & core middleware -----------------------------------------
  app.use(helmet())
  app.use(
    cors({
      // Allows the exact configured origin, plus Vercel's own preview
      // deployment domains (*.vercel.app) — each PR/branch gets a unique
      // preview URL, and without this, every preview would be silently
      // blocked by CORS even though production works fine.
      //
      // Tradeoff, stated plainly: `credentials: true` below means the
      // refresh-token cookie (Phase 5 auth) is sent cross-origin to any
      // allowed origin, and this regex accepts requests from *any*
      // *.vercel.app site, not just your own preview deployments — there's
      // no way to know your project's specific preview URL pattern from
      // here. Once you know your real Vercel team/project slug, replace
      // the regex below with something like
      // /^toolhub-[a-z0-9-]+-your-team\.vercel\.app$/ instead of the open
      // wildcard, to stop other Vercel-hosted sites from being able to
      // make credentialed requests against this API.
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
  app.use(cookieParser())
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
