import mongoose from 'mongoose'

const conversionHistorySchema = new mongoose.Schema(
  {
    // Optional — logged-in users get personal history; anonymous usage is
    // still counted for site-wide analytics (Total Conversions, Most Used
    // Tool, etc.) with `user: null`.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
    },
    toolSlug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    toolName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
    },
    // Metadata only — the actual file never touches the server as part of
    // logging a conversion (every tool processes images entirely in the
    // browser via the Canvas API), so there is nothing here that
    // identifies file content, just that a conversion of this type
    // happened. Actual downloaded output files are a separate concern —
    // see models/Download.js — created only when the user clicks Download,
    // not at conversion time.
    originalFileName: {
      type: String,
      trim: true,
      default: '',
    },
    country: {
      type: String,
      trim: true,
      default: 'Unknown',
    },
    device: {
      type: String,
      enum: ['desktop', 'mobile', 'tablet', 'unknown'],
      default: 'unknown',
    },
  },
  { timestamps: true }
)

conversionHistorySchema.index({ createdAt: -1 })

export default mongoose.model('ConversionHistory', conversionHistorySchema)
