import mongoose from 'mongoose'

/**
 * Unlike every other ToolHub tool, a URL shortener genuinely cannot work
 * entirely client-side — the short code has to resolve to the original
 * URL for anyone who clicks it later, on any device, at any time, which
 * requires real server-side storage. This is a deliberate, disclosed
 * exception to the "nothing leaves your browser" pattern used elsewhere
 * on the site, not an accidental one — see the tool's own content/FAQ
 * for the honest explanation shown to users.
 */
const shortUrlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: [true, 'A destination URL is required'],
      trim: true,
      maxlength: [2048, 'URL cannot exceed 2048 characters'],
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    // Optional - anonymous users can create short links with no account at
    // all. Only set when the creator was logged in at the time, which is
    // what lets logged-in users see and manage their own links later.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      index: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('ShortUrl', shortUrlSchema)
