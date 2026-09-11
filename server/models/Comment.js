import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true,
      maxlength: [2000, 'Comment cannot exceed 2000 characters'],
    },
    edited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

// Enforces one comment per user per post at the database level - a
// duplicate insert attempt (a second comment from the same user on the
// same post) fails here even under concurrent requests, rather than
// relying solely on an application-level check-then-insert that could
// race.
commentSchema.index({ blog: 1, user: 1 }, { unique: true })

export default mongoose.model('Comment', commentSchema)
