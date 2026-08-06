import { connectDB, disconnectDB } from '../config/db.js'
import Category from '../models/Category.js'
import Tool from '../models/Tool.js'
import Blog from '../models/Blog.js'
import { categorySeed, toolSeed, blogSeed } from './seedData.js'

async function seed() {
  console.log('[seed] Connecting to MongoDB...')
  await connectDB()

  console.log('[seed] Clearing existing categories, tools, and blog posts...')
  await Promise.all([Category.deleteMany({}), Tool.deleteMany({}), Blog.deleteMany({})])

  console.log(`[seed] Inserting ${categorySeed.length} categories...`)
  await Category.insertMany(categorySeed)

  console.log(`[seed] Inserting ${toolSeed.length} tools...`)
  await Tool.insertMany(toolSeed)

  console.log(`[seed] Inserting ${blogSeed.length} blog posts...`)
  await Blog.insertMany(blogSeed)

  console.log('[seed] Done.')
  await disconnectDB()
  process.exit(0)
}

seed().catch((error) => {
  console.error('[seed] Failed:', error)
  process.exit(1)
})
