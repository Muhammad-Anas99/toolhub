import { Router } from 'express'
import toolRoutes from './toolRoutes.js'
import categoryRoutes from './categoryRoutes.js'
import blogRoutes from './blogRoutes.js'
import settingsRoutes from './settingsRoutes.js'
import uploadRoutes from './uploadRoutes.js'

const router = Router()

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'ToolHub API is running', timestamp: new Date().toISOString() })
})

router.use('/tools', toolRoutes)
router.use('/categories', categoryRoutes)
router.use('/blog', blogRoutes)
router.use('/settings', settingsRoutes)
router.use('/uploads', uploadRoutes)

export default router
