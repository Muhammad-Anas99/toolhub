import { Router } from 'express'
import * as favoriteController from '../controllers/favoriteController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.use(protect)

router.get('/', favoriteController.getFavorites)
router.post('/', favoriteController.addFavorite)
router.delete('/:toolSlug', favoriteController.removeFavorite)

export default router
