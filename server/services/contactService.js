import ContactMessage from '../models/ContactMessage.js'
import { sendContactFormEmail } from '../utils/email.js'

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
