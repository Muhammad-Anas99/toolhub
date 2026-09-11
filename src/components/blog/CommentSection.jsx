import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { HiOutlinePencil, HiOutlineTrash, HiOutlineChatBubbleLeftRight, HiOutlineUserCircle } from 'react-icons/hi2'
import { api } from '../../lib/api.js'
import { useAuth } from '../../context/AuthContext.jsx'
import ErrorMessage from '../tools/ErrorMessage.jsx'

function formatCommentDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function CommentForm({ initialValue, onSubmit, onCancel, submitLabel }) {
  const [content, setContent] = useState(initialValue)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    if (!content.trim()) return
    setSubmitting(true)
    await onSubmit(content.trim())
    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        maxLength={2000}
        rows={3}
        placeholder="Share your thoughts..."
        className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />
      <div className="flex items-center gap-2">
        <button type="submit" disabled={submitting || !content.trim()} className="btn-primary text-sm">
          {submitting ? 'Posting...' : submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-secondary text-sm">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default function CommentSection({ slug }) {
  const { user, isAuthenticated } = useAuth()
  const [comments, setComments] = useState(null)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    api
      .getComments(slug)
      .then(({ data }) => setComments(data))
      .catch((err) => setError(err.message || 'Could not load comments.'))
  }, [slug])

  const ownComment = isAuthenticated ? comments?.find((c) => c.user?._id === user?._id) : null

  async function handlePost(content) {
    setError(null)
    try {
      const { data } = await api.createComment(slug, content)
      setComments((prev) => [data, ...(prev || [])])
    } catch (err) {
      setError(err.message || 'Could not post your comment.')
    }
  }

  async function handleUpdate(commentId, content) {
    setError(null)
    try {
      const { data } = await api.updateComment(commentId, content)
      setComments((prev) => prev.map((c) => (c._id === commentId ? data : c)))
      setEditingId(null)
    } catch (err) {
      setError(err.message || 'Could not update your comment.')
    }
  }

  async function handleDelete(commentId) {
    setError(null)
    try {
      await api.deleteComment(commentId)
      setComments((prev) => prev.filter((c) => c._id !== commentId))
    } catch (err) {
      setError(err.message || 'Could not delete your comment.')
    }
  }

  return (
    <section className="mt-12 border-t border-slate-100 pt-8 dark:border-slate-800">
      <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
        <HiOutlineChatBubbleLeftRight className="h-5 w-5" />
        Comments {comments && `(${comments.length})`}
      </h2>

      {error && (
        <div className="mt-4">
          <ErrorMessage message={error} onDismiss={() => setError(null)} />
        </div>
      )}

      <div className="mt-5">
        {isAuthenticated ? (
          ownComment ? (
            editingId === ownComment._id ? null : (
              <p className="text-sm text-slate-400 dark:text-slate-500">
                You've already commented on this post, edit your comment below instead of posting a new one.
              </p>
            )
          ) : (
            <CommentForm initialValue="" onSubmit={handlePost} submitLabel="Post Comment" />
          )
        ) : (
          <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
            <Link to="/login" className="font-medium text-brand-600 hover:underline dark:text-brand-400">
              Log in
            </Link>{' '}
            or{' '}
            <Link to="/register" className="font-medium text-brand-600 hover:underline dark:text-brand-400">
              create an account
            </Link>{' '}
            to leave a comment.
          </p>
        )}
      </div>

      {!comments && !error && <p className="mt-6 text-sm text-slate-400 dark:text-slate-500">Loading comments...</p>}

      {comments && comments.length === 0 && (
        <p className="mt-6 text-sm text-slate-400 dark:text-slate-500">No comments yet. Be the first to share your thoughts.</p>
      )}

      {comments && comments.length > 0 && (
        <ul className="mt-6 space-y-5">
          {comments.map((comment) => {
            const isOwn = isAuthenticated && comment.user?._id === user?._id
            const isEditing = editingId === comment._id

            return (
              <li key={comment._id} className="flex gap-3">
                {comment.user?.avatar ? (
                  <img src={comment.user.avatar} alt="" className="h-9 w-9 flex-shrink-0 rounded-full object-cover" />
                ) : (
                  <HiOutlineUserCircle className="h-9 w-9 flex-shrink-0 text-slate-300 dark:text-slate-600" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {comment.user?.name || 'Deleted user'}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      {formatCommentDate(comment.createdAt)}
                      {comment.edited && ' \u00b7 edited'}
                    </span>
                  </div>

                  {isEditing ? (
                    <div className="mt-2">
                      <CommentForm
                        initialValue={comment.content}
                        submitLabel="Save"
                        onCancel={() => setEditingId(null)}
                        onSubmit={(content) => handleUpdate(comment._id, content)}
                      />
                    </div>
                  ) : (
                    <>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{comment.content}</p>
                      {isOwn && (
                        <div className="mt-1.5 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setEditingId(comment._id)}
                            className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-brand-600 dark:text-slate-500 dark:hover:text-brand-400"
                          >
                            <HiOutlinePencil className="h-3.5 w-3.5" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(comment._id)}
                            className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-rose-600 dark:text-slate-500 dark:hover:text-rose-400"
                          >
                            <HiOutlineTrash className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

CommentSection.propTypes = {
  slug: PropTypes.string.isRequired,
}
