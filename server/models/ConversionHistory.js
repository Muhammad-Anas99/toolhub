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
    // Short, human-readable label for what actually happened — "Password
    // generated", "Color selected", "JSON formatted", "Image converted".
    // Optional and defaults to '' so existing entries (and any future
    // caller that doesn't set one) remain perfectly valid; the History UI
    // just falls back to the tool name alone when it's blank.
    action: {
      type: String,
      trim: true,
      maxlength: 120,
      default: '',
    },
    // Metadata only — the actual file never touches the server (every
    // tool processes images entirely in the browser via the Canvas API),
    // so there is nothing here that identifies file content, just that a
    // conversion of this type happened.
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
