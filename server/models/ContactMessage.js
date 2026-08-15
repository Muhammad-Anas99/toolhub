import mongoose from 'mongoose'

/**
 * Every contact form submission is saved here regardless of whether the
 * notification email successfully sends — so a transient SMTP failure
 * never means a message is silently lost with no record anywhere.
 */
const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
    },
    subject: {
      type: String,
      trim: true,
      maxlength: [200, 'Subject cannot exceed 200 characters'],
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [5000, 'Message cannot exceed 5000 characters'],
    },
    ipAddress: {
      type: String,
      trim: true,
      default: '',
    },
    emailDelivered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

contactMessageSchema.index({ createdAt: -1 })

export default mongoose.model('ContactMessage', contactMessageSchema)
