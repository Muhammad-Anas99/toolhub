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
    // Metadata only — the actual file never touches the server (every tool
    // processes images entirely in the browser via the Canvas API), so
    // there is nothing here that identifies file content, just that a
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
    // Set only when the user actually clicks Download for this result —
    // logging a conversion (processing finished) and downloading it are
    // different events. See historyService.markDownloaded /
    // controllers/historyController.js markDownloaded, and
    // src/hooks/useToolResult.js on the frontend, which is the single
    // place that calls the mark-as-downloaded endpoint right after
    // triggering the real browser download.
    downloaded: {
      type: Boolean,
      default: false,
      index: true,
    },
    downloadedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
)

conversionHistorySchema.index({ createdAt: -1 })

export default mongoose.model('ConversionHistory', conversionHistorySchema)
