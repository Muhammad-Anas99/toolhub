import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [160, 'Title cannot exceed 160 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: [300, 'Excerpt cannot exceed 300 characters'],
      default: '',
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    // Path or URL to a cover image, served from /uploads or an external host.
    image: {
      type: String,
      trim: true,
      default: '',
    },
    author: {
      type: String,
      trim: true,
      default: 'ToolHub Team',
    },
    category: {
      type: String,
      trim: true,
      default: '',
    },
    readTime: {
      type: String,
      trim: true,
      default: '',
    },
    published: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
)

blogSchema.index({ title: 'text', excerpt: 'text', content: 'text' })

export default mongoose.model('Blog', blogSchema)
