import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineChatBubbleLeftRight, HiOutlineTrash } from 'react-icons/hi2'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import { api } from '../../lib/api.js'

function formatDate(dateString) {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function AdminComments() {
  const [comments, setComments] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api
      .adminGetAllComments()
      .then(({ data }) => setComments(data))
      .catch((err) => setError(err.message || 'Could not load comments.'))
  }, [])

  async function handleDelete(commentId) {
    setError(null)
    try {
      await api.deleteComment(commentId)
      setComments((prev) => prev.filter((c) => c._id !== commentId))
    } catch (err) {
      setError(err.message || 'Could not delete this comment.')
    }
  }

  return (
    <>
      <SEO title="Admin \u2014 Comments" description="Comments posted across every blog post." canonicalPath="/admin/comments" noIndex />

      <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Comments</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Every comment across every post, newest first.
      </p>

      {error && (
        <div className="mt-4">
          <ErrorMessage message={error} onDismiss={() => setError(null)} />
        </div>
      )}

      {!comments && !error && <p className="mt-6 text-sm text-slate-400 dark:text-slate-500">Loading comments...</p>}

      {comments && comments.length === 0 && (
        <div className="mt-6 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-slate-200 py-12 text-center dark:border-slate-800">
          <HiOutlineChatBubbleLeftRight className="h-8 w-8 text-slate-300 dark:text-slate-600" />
          <p className="text-sm text-slate-400 dark:text-slate-500">No comments yet.</p>
        </div>
      )}

      {comments && comments.length > 0 && (
        <ul className="mt-6 space-y-3">
          {comments.map((comment) => (
            <li key={comment._id} className="card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {comment.user?.name || 'Deleted user'}
                  </span>
                  <span>{comment.user?.email}</span>
                  <span>{'\u00b7'}</span>
                  <span>{formatDate(comment.createdAt)}</span>
                  {comment.edited && <span>{'\u00b7'} edited</span>}
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(comment._id)}
                  className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-rose-600 dark:text-slate-500 dark:hover:text-rose-400"
                >
                  <HiOutlineTrash className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{comment.content}</p>

              {comment.blog && (
                <Link
                  to={`/blog/${comment.blog.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:underline dark:text-brand-400"
                >
                  On: {comment.blog.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
