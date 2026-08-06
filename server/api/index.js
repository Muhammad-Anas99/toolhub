import { createApp } from '../app.js'
import { connectDB } from '../config/db.js'

/**
 * Vercel serverless entry point. `vercel.json` routes every request here.
 *
 * The Express app is built once per (warm) function instance — not once
 * per request — since `createApp()` runs at module load time, outside the
 * handler. `connectDB()` is still called on every request because it's
 * cheap when already connected (see config/db.js) and cold starts need it
 * regardless.
 */
const app = createApp()

export default async function handler(req, res) {
  await connectDB()
  app(req, res)
}
