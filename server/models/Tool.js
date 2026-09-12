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
    // Admin-managed FAQs for this tool. Each entry gets its own _id
    // (Mongoose default for subdocuments) so a specific FAQ can be
    // targeted for editing or deletion without touching the others.
    // Empty by default - the frontend falls back to its own static FAQ
    // content for a tool until an admin adds FAQs here for it, so
    // existing tool pages don't regress to "no FAQs" the moment this
    // field is introduced.
    faqs: {
      type: [
        {
          question: {
            type: String,
            required: [true, 'FAQ question is required'],
            trim: true,
            maxlength: [200, 'FAQ question cannot exceed 200 characters'],
          },
          answer: {
            type: String,
            required: [true, 'FAQ answer is required'],
            trim: true,
            maxlength: [2000, 'FAQ answer cannot exceed 2000 characters'],
          },
        },
      ],
      default: [],
    },
    // Sum and count are stored rather than a precomputed average, so the
    // real average is always derived fresh (sum / count) rather than
    // risking small rounding errors accumulating after many rating
    // changes over time. No default/starting values - a tool with zero
    // real ratings genuinely has ratingCount: 0, not a fabricated
    // starting number.
    ratingSum: {
      type: Number,
      default: 0,
      min: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
)

// Powers ?search= querying across name/description/tags.
toolSchema.index({ name: 'text', description: 'text', tags: 'text' })

export default mongoose.model('Tool', toolSchema)
