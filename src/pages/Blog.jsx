import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Container from '../components/ui/Container.jsx'
import BlogCard from '../components/ui/BlogCard.jsx'
import SEO from '../components/ui/SEO.jsx'
import { blogPosts } from '../data/blog.js'

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all')

  const postCategories = useMemo(() => {
    const unique = new Set(blogPosts.map((post) => post.category))
    return ['all', ...unique]
  }, [])

  const filteredPosts = useMemo(() => {
    const sorted = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date))
    if (activeCategory === 'all') return sorted
    return sorted.filter((post) => post.category === activeCategory)
  }, [activeCategory])

  return (
    <>
      <SEO
        title="Blog"
        description="Guides, tips and updates from the ToolHub team on getting the most out of your files and tools."
        canonicalPath="/blog"
      />

      <Container className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            The ToolHub Blog
          </h1>
          <p className="mt-4 text-slate-500 dark:text-slate-400">
            Guides and tips on file formats, compression, and getting more out of your tools.
          </p>
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {postCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                activeCategory === category
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {category === 'all' ? 'All posts' : category}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </Container>
    </>
  )
}
