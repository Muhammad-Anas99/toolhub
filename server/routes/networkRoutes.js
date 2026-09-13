import { Router } from 'express'
import * as networkController from '../controllers/networkController.js'
import { networkToolsRateLimiter } from '../middleware/rateLimiter.js'

const router = Router()

router.get('/my-ip', networkController.getMyIp)
router.get('/dns-lookup', networkToolsRateLimiter, networkController.dnsLookup)
router.get('/http-headers', networkToolsRateLimiter, networkController.httpHeaderCheck)
router.get('/redirect-check', networkToolsRateLimiter, networkController.redirectCheck)

export default router
