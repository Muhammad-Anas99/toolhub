import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      maxlength: [80, 'Category name cannot exceed 80 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Category slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters'],
      default: '',
    },
    // Icon name string (e.g. "HiOutlinePhoto") resolved to a component on
    // the frontend via src/lib/iconRegistry.js.
    icon: {
      type: String,
      required: [true, 'Icon name is required'],
      trim: true,
    },
    // Key into categoryColorClasses on the frontend (see src/data/categories.js).
    color: {
      type: String,
      trim: true,
      default: 'brand',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

categorySchema.index({ order: 1 })

export default mongoose.model('Category', categorySchema)
