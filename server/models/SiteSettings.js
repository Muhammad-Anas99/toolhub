import mongoose from 'mongoose'

const siteSettingsSchema = new mongoose.Schema(
  {
    // A fixed key guarantees only one settings document can ever exist —
    // see the unique index below and getOrCreate() in siteSettingsService.js.
    singletonKey: {
      type: String,
      default: 'site-settings',
      unique: true,
    },
    siteName: {
      type: String,
      trim: true,
      default: 'ToolHub',
    },
    tagline: {
      type: String,
      trim: true,
      default: 'Free online tools that work right in your browser.',
    },
    logo: {
      type: String,
      trim: true,
      default: '',
    },
    seo: {
      title: { type: String, trim: true, default: 'ToolHub — Free Online Tools' },
      description: {
        type: String,
        trim: true,
        default:
          'ToolHub — Free online tools to convert, compress, resize, crop and rotate your images.',
      },
      keywords: { type: [String], default: [] },
    },
    social: {
      github: { type: String, trim: true, default: '' },
      twitter: { type: String, trim: true, default: '' },
      linkedin: { type: String, trim: true, default: '' },
    },
    contactEmail: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
)

export default mongoose.model('SiteSettings', siteSettingsSchema)
