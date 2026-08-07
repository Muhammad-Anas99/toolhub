import mongoose from 'mongoose'

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    toolSlug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
)

// A user can only favorite a given tool once.
favoriteSchema.index({ user: 1, toolSlug: 1 }, { unique: true })

export default mongoose.model('Favorite', favoriteSchema)
