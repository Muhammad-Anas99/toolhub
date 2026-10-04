import mongoose from 'mongoose'

const pageViewSchema = new mongoose.Schema(
  {
    // The path visited, e.g. "/", "/tools/image-compressor", "/blog/rule-of-72-explained".
    // Not restricted to tool pages - this is meant to capture landing on
    // any page of the site, which is the whole point of this collection
    // existing separately from ConversionHistory (which only logs an
    // actual tool action, not simply arriving on a page).
    path: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    country: {
      type: String,
      trim: true,
      default: 'Unknown',
    },
    city: {
      type: String,
      trim: true,
      default: 'Unknown',
    },
    // Same disclosure basis as ConversionHistory.ipAddress - admin-facing
    // only, disclosed in the Privacy Policy's analytics section, never
    // shown anywhere in the public-facing UI.
    ipAddress: {
      type: String,
      trim: true,
      default: 'Unknown',
    },
  },
  { timestamps: true }
)

// A page view is a much higher-volume, lower-signal event than a tool
// conversion - someone just looking at a page, not taking an action -
// so unlike ConversionHistory (kept indefinitely, since each entry
// represents a meaningful action worth permanent analytics history),
// this collection is deliberately bounded. 90 days is enough for
// genuine month-over-month and quarter-over-quarter comparison while
// keeping the collection from growing without limit. MongoDB's TTL
// monitor deletes a document some time after this point (not
// instantly), which is expected and fine for data this low-stakes.
pageViewSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 90 })

export default mongoose.model('PageView', pageViewSchema)
