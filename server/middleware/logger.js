import morgan from 'morgan'
import { isDevelopment } from '../config/env.js'

/**
 * Verbose colored logs in development ('dev' format), concise combined
 * logs in production (useful for shipping to a log aggregator later).
 */
export const requestLogger = morgan(isDevelopment ? 'dev' : 'combined')
