import mongoose from 'mongoose'
import { config } from './env.js'

mongoose.set('strictQuery', true)

let connectionPromise = null

/**
 * Connect to MongoDB, reusing an existing (or in-flight) connection instead
 * of opening a new one every time this is called.
 *
 * This matters in two different environments:
 *  - Traditional hosting (server.js / Render / Railway): called once at
 *    startup, so caching is a no-op there.
 *  - Vercel serverless functions (api/index.js): each invocation can reuse
 *    a "warm" function instance, and this cache is what stops every request
 *    from opening a brand new MongoDB connection — which would quickly
 *    exhaust Atlas's connection limit under real traffic.
 */
export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  if (!connectionPromise) {
    mongoose.connection.on('connected', () => {
      console.log(`[db] MongoDB connected -> ${mongoose.connection.name}`)
    })
    mongoose.connection.on('error', (error) => {
      console.error('[db] MongoDB connection error:', error.message)
    })
    mongoose.connection.on('disconnected', () => {
      console.warn('[db] MongoDB disconnected')
      connectionPromise = null
    })

    connectionPromise = mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 10000,
      bufferCommands: false,
    })
  }

  try {
    await connectionPromise
  } catch (error) {
    // Let the next call retry instead of being stuck on a rejected promise.
    connectionPromise = null
    throw error
  }

  return mongoose.connection
}

/**
 * Close the MongoDB connection cleanly. Used on graceful shutdown in
 * server.js — not called at all in the serverless entry point, since
 * Vercel manages the function lifecycle itself.
 */
export async function disconnectDB() {
  connectionPromise = null
  await mongoose.connection.close()
}
