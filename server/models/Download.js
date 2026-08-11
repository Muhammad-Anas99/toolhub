import mongoose from 'mongoose'

/**
 * Represents one file the user actually downloaded — created only when
 * they click Download (see src/hooks/useToolResult.js), never at
 * conversion time. This is deliberately a separate model from
 * ConversionHistory, not a flag on it: a conversion that's processed but
 * never downloaded should exist in History and never appear here, and
 * this record needs to reference a real, retained output file (fileUrl),
 * which ConversionHistory has no reason to store for every conversion
 * regardless of whether it was ever downloaded.
 */
const downloadSchema = new mongoose.Schema(
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
    toolName: {
      type: String,
      required: true,
      trim: true,
    },
    filename: {
      type: String,
      required: true,
      trim: true,
    },
    mimeType: {
      type: String,
      required: true,
      trim: true,
    },
    // Absolute URL to the actual retained output file (Vercel Blob in
    // production, this API's own /uploads/ path in local dev — see
    // services/storageService.js). Never a placeholder or a reference to
    // something that isn't really there.
    fileUrl: {
      type: String,
      required: true,
      trim: true,
    },
    fileSize: {
      type: Number,
    },
    downloadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

downloadSchema.index({ user: 1, downloadedAt: -1 })

export default mongoose.model('Download', downloadSchema)
