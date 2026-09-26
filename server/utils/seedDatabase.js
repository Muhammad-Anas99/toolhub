import { connectDB, disconnectDB } from '../config/db.js'
import Category from '../models/Category.js'
import Tool from '../models/Tool.js'
import Blog from '../models/Blog.js'
import { categorySeed, toolSeed, blogSeed } from './seedData.js'
import { computeReadTime } from '../services/blogService.js'

// Category, Tool, and Blog can all be created directly through their
// own admin-only API routes (POST /api/categories, /api/tools,
// /api/blog), not just from this seed file - genuinely live, real
// content the admin panel creates. An earlier version of this script
// upserted-and-deleted by slug, which broke that in two real ways:
// (1) a post/tool/category created through the admin panel, having no
// entry in this seed file, got deleted outright on the next seed run
// - for a blog post specifically, this also orphaned any comments
// left on it, since they reference the post by its database _id,
// which a delete-and-later-different-insert would never restore; (2)
// an admin's edit to an existing post or tool's title/content got
// silently overwritten back to whatever this seed file says, since
// the update path always applied this file's version on top.
//
// The fix: only ever INSERT a document whose slug doesn't exist in the
// database yet - this is what actually gets a genuinely new tool or
// post (something written here, in the codebase) into a database that
// doesn't have it yet. Anything that already exists, whether it was
// seeded before or created entirely through the admin panel, is left
// completely untouched - no update, no delete. Editing an existing
// tool or post's content is what the admin panel itself is for; this
// script's job is only to make sure new things exist, not to keep
// re-asserting old ones.
async function seedNewOnly(Model, seedItems, label) {
  const seedSlugs = seedItems.map((item) => item.slug)
  const existing = await Model.find({ slug: { $in: seedSlugs } }, 'slug').lean()
  const existingSlugs = new Set(existing.map((doc) => doc.slug))
  const toInsert = seedItems.filter((item) => !existingSlugs.has(item.slug))

  if (toInsert.length === 0) {
    console.log(`[seed] ${label}: nothing new to add (${seedItems.length} in seed file, all already exist).`)
    return
  }

  await Model.insertMany(toInsert)
  console.log(`[seed] ${label}: added ${toInsert.length} new (${seedItems.length - toInsert.length} already existed, left untouched).`)
}

async function seed() {
  console.log('[seed] Connecting to MongoDB...')
  await connectDB()

  await seedNewOnly(Category, categorySeed, 'Categories')

  await seedNewOnly(Tool, toolSeed, 'Tools')

  // readTime is computed fresh from each new post's actual content
  // here, the same logic the admin editor uses, rather than trusting
  // whatever static value sits in the seed file - this is precisely
  // what let the original seed data claim "6 min read" for a couple of
  // sentences, so it's not something to keep trusting blindly. Only
  // applied to posts actually being inserted - an existing post's
  // readTime, like everything else about it, is left alone.
  const blogSeedWithComputedReadTime = blogSeed.map((post) => ({
    ...post,
    readTime: computeReadTime(post.content),
  }))
  await seedNewOnly(Blog, blogSeedWithComputedReadTime, 'Blog posts')

  console.log('[seed] Done.')
  await disconnectDB()
  process.exit(0)
}

seed().catch((error) => {
  console.error('[seed] Failed:', error)
  process.exit(1)
})
