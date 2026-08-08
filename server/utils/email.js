import nodemailer from 'nodemailer'
import { config, isDevelopment } from '../config/env.js'

let transporter = null

/**
 * Works with any standard SMTP provider — configured here for Brevo
 * (smtp-relay.brevo.com, port 587, STARTTLS) but nothing below is
 * Brevo-specific. `SMTP_USER`/`SMTP_PASS` for Brevo are your account
 * login email and an SMTP key generated in Brevo's dashboard (Settings ->
 * SMTP & API) — not your regular Brevo account password.
 */
function getTransporter() {
  if (!config.smtp.host) return null
  if (transporter) return transporter

  transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.port === 465, // 587 (Brevo's default) uses STARTTLS, not implicit TLS
    auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.pass } : undefined,
  })
  return transporter
}

/**
 * Sends an email via SMTP if configured (SMTP_HOST set in .env). If not —
 * which is the default out of the box — logs the email to the console
 * instead. This means every flow below works end-to-end in local
 * development with zero email setup: just copy the link Claude prints to
 * the console into your browser. Wire up real SMTP credentials (Brevo or
 * otherwise) before production; see the note in .env.example.
 */
async function sendEmail({ to, subject, html, text }) {
  const activeTransporter = getTransporter()

  if (!activeTransporter) {
    console.log('\n[email] SMTP not configured — logging email instead of sending:')
    console.log(`[email] To: ${to}`)
    console.log(`[email] Subject: ${subject}`)
    console.log(`[email] Body:\n${text || html}\n`)
    if (!isDevelopment) {
      console.warn('[email] WARNING: running in production with no SMTP configured. Users cannot receive real emails.')
    }
    return { delivered: false, loggedOnly: true }
  }

  await activeTransporter.sendMail({
    from: config.smtp.emailFrom,
    to,
    subject,
    html,
    text,
  })
  return { delivered: true, loggedOnly: false }
}

export async function sendVerificationEmail(user, verifyUrl) {
  return sendEmail({
    to: user.email,
    subject: 'Verify your ToolHub email address',
    text: `Hi ${user.name}, verify your email by visiting: ${verifyUrl} (expires in 24 hours)`,
    html: `<p>Hi ${user.name},</p><p>Verify your email by clicking the link below:</p><p><a href="${verifyUrl}">${verifyUrl}</a></p><p>This link expires in 24 hours.</p>`,
  })
}

export async function sendPasswordResetEmail(user, resetUrl) {
  return sendEmail({
    to: user.email,
    subject: 'Reset your ToolHub password',
    text: `Hi ${user.name}, reset your password by visiting: ${resetUrl} (expires in 1 hour). If you didn't request this, you can ignore this email.`,
    html: `<p>Hi ${user.name},</p><p>Reset your password by clicking the link below:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>This link expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>`,
  })
}

/**
 * Sent once, right after a user successfully verifies their email — not
 * at registration itself, since at that point we don't yet know the
 * address is real and reachable.
 */
export async function sendWelcomeEmail(user) {
  return sendEmail({
    to: user.email,
    subject: 'Welcome to ToolHub',
    text: `Hi ${user.name}, welcome to ToolHub! Your email is verified and your account is ready — head to ${config.clientUrl}/tools to get started.`,
    html: `<p>Hi ${user.name},</p><p>Welcome to ToolHub! Your email is verified and your account is ready.</p><p><a href="${config.clientUrl}/tools">Browse tools</a> to get started.</p>`,
  })
}

/**
 * Generic security notification for sensitive account changes. Both
 * password reset and password change invalidate every other active
 * session (see authService.resetPassword / userService.changePassword) —
 * this email is what tells the account owner that happened, in case it
 * wasn't them.
 */
export async function sendSecurityAlertEmail(user, { action } = {}) {
  const actionText = action || 'A security-sensitive change was made to your account'
  return sendEmail({
    to: user.email,
    subject: 'Security alert for your ToolHub account',
    text: `Hi ${user.name}, ${actionText.toLowerCase()} on your ToolHub account just now. You have been signed out on all other devices. If this wasn't you, reset your password immediately at ${config.clientUrl}/forgot-password.`,
    html: `<p>Hi ${user.name},</p><p>${actionText} on your ToolHub account just now. You have been signed out on all other devices as a precaution.</p><p>If this wasn't you, <a href="${config.clientUrl}/forgot-password">reset your password immediately</a>.</p>`,
  })
}
