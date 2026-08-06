import mongoose from 'mongoose'

const toolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tool name is required'],
      trim: true,
      maxlength: [120, 'Tool name cannot exceed 120 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Tool slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    // Frontend route, e.g. "/tools/image-compressor".
    path: {
      type: String,
      required: [true, 'Tool path is required'],
      trim: true,
    },
    // References Category.slug rather than an ObjectId so the existing
    // frontend data shape (category as a slug string) needs no translation.
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters'],
    },
    // Icon name string resolved on the frontend via src/lib/iconRegistry.js.
    icon: {
      type: String,
      required: [true, 'Icon name is required'],
      trim: true,
    },
    badge: {
      type: String,
      enum: ['popular', 'new', null],
      default: null,
    },
    comingSoon: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    tags: {
      type: [String],
      default: [],
      set: (tags) => tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean),
    },
  },
  { timestamps: true }
)

// Powers ?search= querying across name/description/tags.
toolSchema.index({ name: 'text', description: 'text', tags: 'text' })

export default mongoose.model('Tool', toolSchema)
