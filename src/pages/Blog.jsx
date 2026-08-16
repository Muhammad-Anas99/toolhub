import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Container from '../components/ui/Container.jsx'
import BlogCard from '../components/ui/BlogCard.jsx'
import SEO from '../components/ui/SEO.jsx'
import ErrorMessage from '../components/tools/ErrorMessage.jsx'
import { api } from '../lib/api.js'

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [posts, setPosts] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .getBlogPosts()
      .then(({ data }) => setPosts(data))
      .catch((err) => {
        setError(err.message || 'Could not load blog posts.')
        setPosts([])
      })
  }, [])

  const postCategories = useMemo(() => {
    if (!posts) return ['all']
    const unique = new Set(posts.map((post) => post.category).filter(Boolean))
    return ['all', ...unique]
  }, [posts])

  const filteredPosts = useMemo(() => {
    if (!posts) return []
    const sorted = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    if (activeCategory === 'all') return sorted
    return sorted.filter((post) => post.category === activeCategory)
  }, [posts, activeCategory])

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

        {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

        {postCategories.length > 1 && (
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
        )}

        {posts === null ? (
          <p className="mt-12 text-center text-sm text-slate-400 dark:text-slate-500">Loading posts...</p>
        ) : filteredPosts.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          !error && (
            <p className="mt-12 text-center text-sm text-slate-400 dark:text-slate-500">
              No posts published yet — check back soon.
            </p>
          )
        )}
      </Container>
    </>
  )
}
