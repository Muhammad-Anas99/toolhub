import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { HiOutlineArrowLeft, HiOutlinePhoto, HiOutlineXMark } from 'react-icons/hi2'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import { api } from '../../lib/api.js'

const EMPTY_POST = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image: '',
  author: 'ToolHub Team',
  category: '',
  readTime: '',
  published: false,
}

export default function AdminBlogEditor() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(slug)

  const [post, setPost] = useState(EMPTY_POST)
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isEditing) return
    api
      .adminGetBlogPost(slug)
      .then(({ data }) => setPost({ ...EMPTY_POST, ...data }))
      .catch((err) => setError(err.message || 'Could not load this post.'))
      .finally(() => setLoading(false))
  }, [isEditing, slug])

  function updateField(field, value) {
    setPost((prev) => ({ ...prev, [field]: value }))
  }

  async function handleImageUpload(event) {
    const file = event.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError(null)
    try {
      const { data } = await api.uploadFile(file)
      updateField('image', data.url)
    } catch (err) {
      setError(err.message || 'Could not upload this image.')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setError(null)
    try {
      if (isEditing) {
        await api.adminUpdateBlogPost(slug, post)
      } else {
        await api.adminCreateBlogPost(post)
      }
      navigate('/admin/blog')
    } catch (err) {
      setError(err.message || 'Could not save this post.')
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-400 dark:text-slate-500">Loading post...</p>
  }

  return (
    <>
      <SEO
        title={isEditing ? 'Admin \u2014 Edit Post' : 'Admin \u2014 New Post'}
        description="ToolHub blog editor."
        canonicalPath="/admin/blog"
        noIndex
      />

      <Link
        to="/admin/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
      >
        <HiOutlineArrowLeft className="h-4 w-4" />
        Back to posts
      </Link>

      <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
        {isEditing ? `Edit "${post.title}"` : 'New Post'}
      </h2>

      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

      <form onSubmit={handleSubmit} className="mt-5 space-y-5">
        <div>
          <label htmlFor="blog-title" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Title
          </label>
          <input
            id="blog-title"
            type="text"
            required
            maxLength={160}
            value={post.title}
            onChange={(event) => updateField('title', event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {isEditing && (
          <div>
            <label htmlFor="blog-slug" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Slug
            </label>
            <input
              id="blog-slug"
              type="text"
              value={post.slug}
              disabled
              className="mt-1.5 w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
            />
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              The slug can&apos;t be changed after a post is created — it may already be linked to.
            </p>
          </div>
        )}

        <div>
          <label htmlFor="blog-excerpt" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Excerpt
          </label>
          <textarea
            id="blog-excerpt"
            rows={2}
            maxLength={300}
            value={post.excerpt}
            onChange={(event) => updateField('excerpt', event.target.value)}
            placeholder="A short summary shown on the blog listing page..."
            className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Featured image</span>
          {post.image ? (
            <div className="mt-2 flex items-center gap-3">
              <img src={post.image} alt="" className="h-20 w-32 rounded-lg object-cover" />
              <button type="button" onClick={() => updateField('image', '')} className="btn-secondary text-xs">
                <HiOutlineXMark className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
          ) : (
            <label className="mt-2 flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 px-4 py-3 text-sm text-slate-500 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-400">
              <HiOutlinePhoto className="h-4 w-4" />
              {uploading ? 'Uploading...' : 'Upload image'}
              <input type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} disabled={uploading} />
            </label>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="blog-category" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Category
            </label>
            <input
              id="blog-category"
              type="text"
              value={post.category}
              onChange={(event) => updateField('category', event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="blog-author" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Author
            </label>
            <input
              id="blog-author"
              type="text"
              value={post.author}
              onChange={(event) => updateField('author', event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="blog-readtime" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Read time
            </label>
            <input
              id="blog-readtime"
              type="text"
              placeholder="5 min read"
              value={post.readTime}
              onChange={(event) => updateField('readTime', event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label htmlFor="blog-content" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Content
          </label>
          <textarea
            id="blog-content"
            rows={16}
            required
            value={post.content}
            onChange={(event) => updateField('content', event.target.value)}
            placeholder="Write your post content here..."
            className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <label className="flex w-fit cursor-pointer items-center gap-2.5">
          <input
            type="checkbox"
            checked={post.published}
            onChange={(event) => updateField('published', event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-slate-600"
          />
          <span className="text-sm text-slate-700 dark:text-slate-300">Published (visible on the public blog)</span>
        </label>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Post'}
          </button>
          <Link to="/admin/blog" className="btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </>
  )
}
