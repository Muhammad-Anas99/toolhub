import { connectDB, disconnectDB } from '../config/db.js'
import Category from '../models/Category.js'
import Tool from '../models/Tool.js'
import Blog from '../models/Blog.js'
import { categorySeed, toolSeed, blogSeed } from './seedData.js'
import { computeReadTime } from '../services/blogService.js'

// Fields Tool and Blog documents accumulate at runtime (user ratings,
// admin-added FAQs, the featured flag, tags, likes/dislikes, view
// counts, an admin-uploaded cover image) are never part of the seed
// data and must never be reset by seeding - previously, seeding wiped
// and recreated every Tool and Blog document from scratch, silently
// zeroing all of this out on every run. Upserting by slug and setting
// only the fields the seed data actually controls fixes this: an
// existing document keeps its accumulated data, a genuinely new one
// gets the schema's own defaults (0 ratings, 0 views, etc, which is
// correct for something that's never been rated or viewed).
//
// A tool or post removed from the codebase's seed data is still
// removed from the database - this isn't a switch to "never delete
// anything," just "don't delete AND recreate everything that still
// exists," so the two collections stay in sync when something is
// genuinely retired, not just when it's edited.
async function seed() {
  console.log('[seed] Connecting to MongoDB...')
  await connectDB()

  console.log('[seed] Syncing categories...')
  await Category.deleteMany({})
  await Category.insertMany(categorySeed)

  console.log(`[seed] Upserting ${toolSeed.length} tools (preserving ratings, FAQs, featured, tags)...`)
  for (const tool of toolSeed) {
    await Tool.findOneAndUpdate(
      { slug: tool.slug },
      {
        $set: {
          name: tool.name,
          path: tool.path,
          category: tool.category,
          description: tool.description,
          icon: tool.icon,
          badge: tool.badge ?? null,
          comingSoon: tool.comingSoon ?? false,
        },
      },
      { upsert: true, setDefaultsOnInsert: true }
    )
  }
  const toolSlugs = toolSeed.map((tool) => tool.slug)
  const { deletedCount: toolsRemoved } = await Tool.deleteMany({ slug: { $nin: toolSlugs } })
  if (toolsRemoved > 0) console.log(`[seed] Removed ${toolsRemoved} tool(s) no longer in the seed data.`)

  console.log(`[seed] Upserting ${blogSeed.length} blog posts (preserving views, likes, dislikes, cover image)...`)
  for (const post of blogSeed) {
    // readTime is computed fresh from each post's actual content here,
    // the same logic the admin editor uses, rather than trusting
    // whatever static value sits in the seed file - this is precisely
    // what let the original seed data claim "6 min read" for a couple
    // of sentences, so it's not something to keep trusting blindly.
    await Blog.findOneAndUpdate(
      { slug: post.slug },
      {
        $set: {
          title: post.title,
          excerpt: post.excerpt ?? '',
          content: post.content,
          author: post.author ?? 'ToolHub Team',
          category: post.category ?? '',
          readTime: computeReadTime(post.content),
          published: post.published ?? false,
        },
      },
      { upsert: true, setDefaultsOnInsert: true }
    )
  }
  const blogSlugs = blogSeed.map((post) => post.slug)
  const { deletedCount: postsRemoved } = await Blog.deleteMany({ slug: { $nin: blogSlugs } })
  if (postsRemoved > 0) console.log(`[seed] Removed ${postsRemoved} blog post(s) no longer in the seed data.`)

  console.log('[seed] Done.')
  await disconnectDB()
  process.exit(0)
}

seed().catch((error) => {
  console.error('[seed] Failed:', error)
  process.exit(1)
})
