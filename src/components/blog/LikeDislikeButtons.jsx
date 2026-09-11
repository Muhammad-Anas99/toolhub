import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiHandThumbUp, HiHandThumbDown, HiOutlineHandThumbUp, HiOutlineHandThumbDown } from 'react-icons/hi2'
import { api } from '../../lib/api.js'
import { getStoredReaction, setStoredReaction } from '../../lib/blogReactionStorage.js'

export default function LikeDislikeButtons({ slug, initialLikes, initialDislikes, size }) {
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [reaction, setReaction] = useState(() => getStoredReaction(slug))
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleReact(type) {
    if (isSubmitting) return
    const nextType = reaction === type ? null : type
    const previousType = reaction

    setIsSubmitting(true)
    setReaction(nextType)
    setStoredReaction(slug, nextType)
    if (previousType === 'like') setLikes((n) => n - 1)
    if (previousType === 'dislike') setDislikes((n) => n - 1)
    if (nextType === 'like') setLikes((n) => n + 1)
    if (nextType === 'dislike') setDislikes((n) => n + 1)

    try {
      const { data } = await api.reactToBlogPost(slug, { type: nextType, previousType })
      setLikes(data.likes)
      setDislikes(data.dislikes)
    } catch (err) {
      setReaction(previousType)
      setStoredReaction(slug, previousType)
      if (previousType === 'like') setLikes((n) => n + 1)
      if (previousType === 'dislike') setDislikes((n) => n + 1)
      if (nextType === 'like') setLikes((n) => n - 1)
      if (nextType === 'dislike') setDislikes((n) => n - 1)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isSmall = size === 'sm'
  const buttonPadding = isSmall ? 'px-2 py-1' : 'px-3 py-1.5'
  const iconSize = isSmall ? 'h-3.5 w-3.5' : 'h-4 w-4'
  const textSize = isSmall ? 'text-xs' : 'text-sm'

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          handleReact('like')
        }}
        aria-pressed={reaction === 'like'}
        aria-label="Like this post"
        className={`flex items-center gap-1.5 rounded-full border transition-colors ${buttonPadding} ${textSize} ${
          reaction === 'like'
            ? 'border-brand-200 bg-brand-50 text-brand-600 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-400'
            : 'border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800'
        }`}
      >
        {reaction === 'like' ? <HiHandThumbUp className={iconSize} /> : <HiOutlineHandThumbUp className={iconSize} />}
        {likes}
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          handleReact('dislike')
        }}
        aria-pressed={reaction === 'dislike'}
        aria-label="Dislike this post"
        className={`flex items-center gap-1.5 rounded-full border transition-colors ${buttonPadding} ${textSize} ${
          reaction === 'dislike'
            ? 'border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-400'
            : 'border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800'
        }`}
      >
        {reaction === 'dislike' ? <HiHandThumbDown className={iconSize} /> : <HiOutlineHandThumbDown className={iconSize} />}
        {dislikes}
      </button>
    </div>
  )
}

LikeDislikeButtons.propTypes = {
  slug: PropTypes.string.isRequired,
  initialLikes: PropTypes.number,
  initialDislikes: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md']),
}

LikeDislikeButtons.defaultProps = {
  initialLikes: 0,
  initialDislikes: 0,
  size: 'md',
}
