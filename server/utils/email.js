import nodemailer from 'nodemailer'
import { config, isDevelopment } from '../config/env.js'

let transporter = null

function getTransporter() {
  if (!config.smtp.host) return null
  if (transporter) return transporter

  transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.port === 465,
    auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.password } : undefined,
  })
  return transporter
}

/**
 * Sends an email via SMTP if configured (SMTP_HOST set in .env). If not —
 * which is the default out of the box — logs the email to the console
 * instead. This means registration/password-reset flows work end-to-end
 * in local development with zero email setup: just copy the link Claude
 * prints to the console into your browser. Wire up a real SMTP provider
 * before production; see the note in .env.example.
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
    from: `"${config.smtp.fromName}" <${config.smtp.fromEmail}>`,
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
