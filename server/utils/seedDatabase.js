import { connectDB, disconnectDB } from '../config/db.js'
import Category from '../models/Category.js'
import Tool from '../models/Tool.js'
import Blog from '../models/Blog.js'
import { categorySeed, toolSeed, blogSeed } from './seedData.js'
import { computeReadTime } from '../services/blogService.js'

// Safe, repeatable seed. Nothing is ever deleted, so it can be run after
// every deploy without losing live data.
//
// - Categories & tools: matched by slug. Existing ones get the fields from
//   seedData.js updated; new ones are inserted. Fields that seedData.js does
//   not contain (tool ratings, FAQs, etc.) are left untouched.
// - Blog posts: only NEW slugs are inserted. Existing posts are never
//   overwritten, because live posts are edited through the Admin Blog CMS
//   and their views/comments must survive. Comments reference a post by its
//   _id, so a post must never be deleted and re-created.

async function upsertBySlug(Model, docs, { onlyInsert = false } = {}) {
  if (!docs.length) return { inserted: 0, updated: 0 }
  const ops = docs.map((doc) => ({
    updateOne: {
      filter: { slug: doc.slug },
      update: onlyInsert ? { $setOnInsert: doc } : { $set: doc },
      upsert: true,
    },
  }))
  const result = await Model.bulkWrite(ops, { ordered: false })
  return { inserted: result.upsertedCount, updated: result.modifiedCount }
}

async function seed() {
  console.log('[seed] Connecting to MongoDB...')
  await connectDB()

  const categories = await upsertBySlug(Category, categorySeed)
  console.log(`[seed] Categories: ${categories.inserted} added, ${categories.updated} updated (${categorySeed.length} in seed file)`)

  const tools = await upsertBySlug(Tool, toolSeed)
  console.log(`[seed] Tools: ${tools.inserted} added, ${tools.updated} updated (${toolSeed.length} in seed file)`)

  // readTime is computed fresh from each post's actual content, the same
  // logic the admin editor uses, rather than trusting the static value.
  const blogSeedWithComputedReadTime = blogSeed.map((post) => ({
    ...post,
    readTime: computeReadTime(post.content),
  }))
  const blogs = await upsertBySlug(Blog, blogSeedWithComputedReadTime, { onlyInsert: true })
  console.log(`[seed] Blog posts: ${blogs.inserted} added (existing posts left unchanged)`)

  console.log('[seed] Done. Nothing was deleted.')
  await disconnectDB()
  process.exit(0)
}

seed().catch((error) => {
  console.error('[seed] Failed:', error)
  process.exit(1)
})
