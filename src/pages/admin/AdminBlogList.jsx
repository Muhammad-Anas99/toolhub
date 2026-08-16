import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import { api } from '../../lib/api.js'

export default function AdminBlogList() {
  const [posts, setPosts] = useState(null)
  const [error, setError] = useState(null)
  const [togglingSlug, setTogglingSlug] = useState(null)

  function loadPosts() {
    api
      .adminGetAllBlogPosts()
      .then(({ data }) => setPosts(data))
      .catch((err) => setError(err.message || 'Could not load blog posts.'))
  }

  useEffect(() => {
    loadPosts()
  }, [])

  async function handleTogglePublished(post) {
    setTogglingSlug(post.slug)
    try {
      await api.adminUpdateBlogPost(post.slug, { published: !post.published })
      setPosts((prev) => prev.map((p) => (p.slug === post.slug ? { ...p, published: !p.published } : p)))
    } catch (err) {
      setError(err.message || 'Could not update this post.')
    } finally {
      setTogglingSlug(null)
    }
  }

  async function handleDelete(post) {
    if (!window.confirm(`Delete "${post.title}"? This can\u2019t be undone.`)) return
    try {
      await api.adminDeleteBlogPost(post.slug)
      setPosts((prev) => prev.filter((p) => p.slug !== post.slug))
    } catch (err) {
      setError(err.message || 'Could not delete this post.')
    }
  }

  return (
    <>
      <SEO title="Admin \u2014 Blog" description="Manage ToolHub blog posts." canonicalPath="/admin/blog" noIndex />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Blog</h2>
        <Link to="/admin/blog/new" className="btn-primary text-sm">
          <HiOutlinePlus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

      {!posts && !error && <p className="text-sm text-slate-400 dark:text-slate-500">Loading posts...</p>}

      {posts && posts.length === 0 && (
        <div className="card p-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">No blog posts yet.</p>
          <Link to="/admin/blog/new" className="btn-primary mt-4 inline-flex text-sm">
            Write your first post
          </Link>
        </div>
      )}

      {posts && posts.length > 0 && (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800 dark:text-slate-500">
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Updated</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {posts.map((post) => (
                <tr key={post.slug}>
                  <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">{post.title}</td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{post.category || '\u2014'}</td>
                  <td className="px-5 py-3">
                    <button
                      type="button"
                      onClick={() => handleTogglePublished(post)}
                      disabled={togglingSlug === post.slug}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                        post.published
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-400'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      <Link
                        to={`/admin/blog/${post.slug}/edit`}
                        aria-label={`Edit ${post.title}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                      >
                        <HiOutlinePencil className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(post)}
                        aria-label={`Delete ${post.title}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800 dark:hover:text-rose-400"
                      >
                        <HiOutlineTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
