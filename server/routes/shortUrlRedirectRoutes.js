import { Router } from 'express'
import { redirectShortUrl } from '../controllers/urlShortenerController.js'

const router = Router()

router.get('/:code', redirectShortUrl)

export default router
