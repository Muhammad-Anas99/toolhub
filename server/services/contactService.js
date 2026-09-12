import ContactMessage from '../models/ContactMessage.js'
import { sendContactFormEmail } from '../utils/email.js'
import { ApiError } from '../utils/ApiError.js'

/**
 * Always saves the message first — so even if email delivery genuinely
 * fails (not just "SMTP not configured" in local dev, which isn't an
 * error), there's still a durable record in the database. The email send
 * is awaited and its outcome recorded, but a hard failure here is
 * re-thrown so the controller can tell the visitor something went wrong
 * and they may want to try again, rather than silently claiming success.
 */
export async function submitContactMessage({ name, email, subject, message, ipAddress }) {
  const record = await ContactMessage.create({ name, email, subject, message, ipAddress })

  const result = await sendContactFormEmail({ name, email, subject, message })

  record.emailDelivered = result.delivered
  await record.save()

  return record
}

// Admin-only: messages were previously saved with no way to ever read
// them back except direct database access - this and deleteContactMessage
// below are the genuine missing piece that makes the contact form
// actually usable end to end, not just a write-only form.
export async function listContactMessages() {
  return ContactMessage.find().sort({ createdAt: -1 })
}

export async function deleteContactMessage(id) {
  const message = await ContactMessage.findByIdAndDelete(id)
  if (!message) throw ApiError.notFound('Message not found')
}
