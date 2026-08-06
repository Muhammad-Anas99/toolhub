import { useEffect, useState } from 'react'
import { api } from '../lib/api.js'
import { blogPosts as localBlogPosts } from '../data/blog.js'

function normalizePost(apiPost) {
  return {
    id: apiPost.slug,
    slug: apiPost.slug,
    title: apiPost.title,
    excerpt: apiPost.excerpt,
    category: apiPost.category,
    date: apiPost.createdAt,
    readTime: apiPost.readTime,
    author: apiPost.author,
  }
}

/**
 * Fetches published blog posts from the API, falling back to the local
 * `blogPosts` data (src/data/blog.js) if the API is unreachable.
 */
export function useBlogPosts({ category, search } = {}) {
  const [posts, setPosts] = useState(localBlogPosts)
  const [loading, setLoading] = useState(true)
  const [isFallback, setIsFallback] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      try {
        const params = {}
        if (category && category !== 'all') params.category = category
        if (search) params.search = search

        const { data } = await api.getBlogPosts(params)
        if (!cancelled) {
          setPosts(data.map(normalizePost))
          setIsFallback(false)
        }
      } catch (error) {
        console.warn('[useBlogPosts] API unavailable, using local data:', error.message)
        if (!cancelled) {
          let fallback = localBlogPosts
          if (category && category !== 'all') {
            fallback = fallback.filter((post) => post.category === category)
          }
          setPosts(fallback)
          setIsFallback(true)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [category, search])

  return { posts, loading, isFallback }
}
