import { Router } from 'express'
import toolRoutes from './toolRoutes.js'
import categoryRoutes from './categoryRoutes.js'
import blogRoutes from './blogRoutes.js'
import settingsRoutes from './settingsRoutes.js'
import uploadRoutes from './uploadRoutes.js'
import authRoutes from './authRoutes.js'
import userRoutes from './userRoutes.js'
import favoriteRoutes from './favoriteRoutes.js'
import historyRoutes from './historyRoutes.js'
import analyticsRoutes from './analyticsRoutes.js'
import contactRoutes from './contactRoutes.js'

const router = Router()

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'ToolHub API is running', timestamp: new Date().toISOString() })
})

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/favorites', favoriteRoutes)
router.use('/history', historyRoutes)
router.use('/analytics', analyticsRoutes)
router.use('/contact', contactRoutes)

router.use('/tools', toolRoutes)
router.use('/categories', categoryRoutes)
router.use('/blog', blogRoutes)
router.use('/settings', settingsRoutes)
router.use('/uploads', uploadRoutes)

export default router
