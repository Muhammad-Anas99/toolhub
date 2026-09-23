// pdfjs-dist references DOMMatrix at module-load time even though no
// actual PDF rendering happens during prerendering (no file is ever
// uploaded) - a minimal stub is sufficient since it's never actually
// used for real matrix math here, only avoids a load-time crash.
if (typeof globalThis.DOMMatrix === 'undefined') {
  globalThis.DOMMatrix = class DOMMatrix {}
}

import fs from 'fs'
import path from 'path'
import { Writable } from 'stream'
import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js'
import { HelmetProvider } from 'react-helmet-async'
import { MotionConfig } from 'framer-motion'
import App from '../src/App.jsx'
import { ThemeProvider } from '../src/context/ThemeContext.jsx'
import { AuthProvider } from '../src/context/AuthContext.jsx'

const DIST_DIR = path.resolve('dist')
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html')
const PRISTINE_TEMPLATE_PATH = path.join(DIST_DIR, '_prerender-template.html')

/**
 * renderToString does not support Suspense/React.lazy() at all - it
 * silently renders just the Suspense fallback (this site's lazy-loaded
 * route components never resolve in time), confirmed by inspecting
 * real output before this fix: every route produced the identical
 * "Loading..." spinner HTML instead of its actual content.
 * renderToPipeableStream's onAllReady callback genuinely waits for
 * every Suspense boundary - including the lazy-loaded page component -
 * to resolve before the HTML is considered complete.
 */
function renderRoute(url) {
  return new Promise((resolve, reject) => {
    const helmetContext = {}
    let html = ''
    const writable = new Writable({
      write(chunk, encoding, callback) {
        html += chunk.toString()
        callback()
      },
    })

    const { pipe } = renderToPipeableStream(
      React.createElement(
        HelmetProvider,
        { context: helmetContext },
        React.createElement(
          ThemeProvider,
          null,
          React.createElement(
            StaticRouter,
            { location: url },
            React.createElement(
              MotionConfig,
              { reducedMotion: 'user' },
              React.createElement(AuthProvider, null, React.createElement(App))
            )
          )
        )
      ),
      {
        onAllReady() {
          pipe(writable)
          writable.on('finish', () => resolve({ html, helmet: helmetContext.helmet }))
        },
        onError(err) {
          reject(err)
        },
      }
    )
  })
}

function injectIntoTemplate(template, { html, helmet }) {
  let out = template

  if (helmet) {
    // Previously only title and the plain description meta tag were
    // injected here - a real, confirmed bug found via an external SEO
    // checker reporting missing Open Graph markup on a live page. The
    // <SEO> component (src/components/ui/SEO.jsx) genuinely renders
    // Open Graph tags, the canonical link, structured data (JSON-LD),
    // and noindex tags via the same <Helmet> - they were correctly
    // defined in code the whole time, just never making it from
    // Helmet's server-side capture into the actual prerendered HTML
    // file a crawler reads, since this function only ever extracted
    // two of Helmet's several managed tag categories. A real browser
    // never showed this bug, since react-helmet-async also runs
    // client-side and fixes the head up once JavaScript loads and
    // hydrates - exactly why this went unnoticed until a tool that
    // reads the raw, pre-JS HTML (an SEO checker, and more importantly
    // Google's first-wave crawl, which doesn't always wait for a
    // second JS-rendering pass) flagged it. Every one of Helmet's tag
    // categories is now injected, not just two of them.
    out = out.replace(/<title>.*?<\/title>/s, helmet.title.toString())
    out = out.replace(
      /<meta\s+name="description"[^>]*\/?>(?:\s*<\/meta>)?/s,
      [
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ]
        .filter(Boolean)
        .join('\n    ')
    )
  }

  out = out.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  return out
}

export async function prerenderRoutes(routes) {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    throw new Error(`No build found at ${TEMPLATE_PATH} - run "vite build" first.`)
  }
  // Captured only once, the first time this runs against a fresh build.
  // dist/index.html itself becomes a write target as soon as the "/"
  // route is processed, so re-copying from it on a later run would
  // silently capture already-prerendered content as the "template" -
  // exactly the bug this idempotent check exists to prevent.
  if (!fs.existsSync(PRISTINE_TEMPLATE_PATH)) {
    fs.copyFileSync(TEMPLATE_PATH, PRISTINE_TEMPLATE_PATH)
  }
  const template = fs.readFileSync(PRISTINE_TEMPLATE_PATH, 'utf-8')
  const results = []

  for (const route of routes) {
    try {
      const rendered = await renderRoute(route)
      const finalHtml = injectIntoTemplate(template, rendered)
      const outDir = route === '/' ? DIST_DIR : path.join(DIST_DIR, route)
      fs.mkdirSync(outDir, { recursive: true })
      fs.writeFileSync(path.join(outDir, 'index.html'), finalHtml)
      results.push({ route, ok: true, bytes: finalHtml.length })
    } catch (err) {
      results.push({ route, ok: false, error: err.message })
    }
  }

  return results
}

export function cleanupPrerenderTemplate() {
  if (fs.existsSync(PRISTINE_TEMPLATE_PATH)) fs.unlinkSync(PRISTINE_TEMPLATE_PATH)
}
