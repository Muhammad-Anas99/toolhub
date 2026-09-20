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
async function sendEmail({ to, subject, html, text, replyTo }) {
  const activeTransporter = getTransporter()

  if (!activeTransporter) {
    console.log('\n[email] SMTP not configured — logging email instead of sending:')
    console.log(`[email] To: ${to}`)
    if (replyTo) console.log(`[email] Reply-To: ${replyTo}`)
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
    ...(replyTo ? { replyTo } : {}),
  })
  return { delivered: true, loggedOnly: false }
}

/**
 * Sent to the site's contact inbox when someone submits the Contact page
 * form (see server/services/contactService.js — this only handles the
 * email side; the message is always saved to the database first,
 * independent of whether this send succeeds). The visitor's own address
 * is set as Reply-To, so replying in an inbox goes straight back to them
 * rather than to ToolHub's own From address.
 */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

const BRAND_COLOR = '#3b6cf6' // brand-500, matching tailwind.config.js
const BRAND_DARK = '#171f54' // brand-950

/**
 * Builds a complete, styled HTML email around a shared layout — a dark
 * header bar with the ToolHub name, a white content card, an optional
 * button-styled CTA link, and a plain fallback link beneath it in case
 * the button itself doesn't render.
 *
 * Deliberately uses a table-based layout with every style written
 * inline, rather than modern CSS (flexbox, grid, or even a <style>
 * block) — this isn't a stylistic choice, it's a real constraint of
 * HTML email specifically: many email clients, Outlook desktop being
 * the most significant, use old, limited rendering engines that don't
 * support modern layout CSS and can strip <style> blocks entirely.
 * Tables with inline styles are the actual, still-current standard for
 * an email that needs to render correctly across every major client,
 * not a legacy pattern being needlessly preserved.
 *
 * `bodyHtml` and `footerNote` are trusted, pre-built HTML from the
 * functions below — any user-provided value going into them (a name,
 * a message) must already be escaped by the caller before being passed
 * in, the same as bodyHtml already was for the contact-form email.
 */
function buildEmailHtml({ preheader, heading, bodyHtml, ctaText, ctaUrl, footerNote }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(heading)}</title>
</head>
<body style="margin:0; padding:0; background-color:#f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">${escapeHtml(preheader || '')}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
          <tr>
            <td style="background-color:${BRAND_DARK}; padding: 24px 32px;">
              <span style="font-size:20px; font-weight:800; color:#ffffff; letter-spacing:-0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">ToolHub</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <h1 style="margin:0 0 16px; font-size:20px; font-weight:700; color:#0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${escapeHtml(heading)}</h1>
              <div style="font-size:15px; line-height:1.6; color:#334155;">
                ${bodyHtml}
              </div>
              ${
                ctaText && ctaUrl
                  ? `
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                <tr>
                  <td style="border-radius:8px; background-color:${BRAND_COLOR};">
                    <a href="${ctaUrl}" style="display:inline-block; padding: 12px 28px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; border-radius:8px;">${escapeHtml(ctaText)}</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 16px 0 0; font-size:13px; color:#94a3b8; word-break:break-all;">Or copy and paste this link into your browser:<br><a href="${ctaUrl}" style="color:${BRAND_COLOR};">${ctaUrl}</a></p>
              `
                  : ''
              }
              ${footerNote ? `<p style="margin: 24px 0 0; font-size:13px; color:#94a3b8;">${footerNote}</p>` : ''}
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 32px; background-color:#f8fafc; border-top:1px solid #e2e8f0;">
              <p style="margin:0; font-size:12px; color:#94a3b8;">This email was sent by ToolHub. If you weren\u2019t expecting it, you can safely ignore it.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function sendContactFormEmail({ name, email, subject, message }) {
  const displaySubject = subject ? `New contact message: ${subject}` : 'New contact message from ToolHub'

  return sendEmail({
    to: config.contactEmail,
    replyTo: email,
    subject: displaySubject,
    text: `From: ${name} <${email}>\nSubject: ${subject || '(no subject)'}\n\n${message}`,
    html: buildEmailHtml({
      preheader: displaySubject,
      heading: 'New contact message',
      bodyHtml: `
        <p style="margin:0 0 12px;"><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        ${subject ? `<p style="margin:0 0 12px;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ''}
        <p style="margin:0 0 6px;"><strong>Message:</strong></p>
        <p style="margin:0;">${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    }),
  })
}

export async function sendVerificationEmail(user, verifyUrl) {
  return sendEmail({
    to: user.email,
    subject: 'Verify your ToolHub email address',
    text: `Hi ${user.name}, verify your email by visiting: ${verifyUrl} (expires in 24 hours)`,
    html: buildEmailHtml({
      preheader: 'Verify your email to finish setting up your ToolHub account.',
      heading: 'Verify your email address',
      bodyHtml: `<p style="margin:0 0 8px;">Hi ${escapeHtml(user.name)},</p><p style="margin:0;">Verify your email address to finish setting up your ToolHub account.</p>`,
      ctaText: 'Verify email',
      ctaUrl: verifyUrl,
      footerNote: 'This link expires in 24 hours.',
    }),
  })
}

export async function sendPasswordResetEmail(user, resetUrl) {
  return sendEmail({
    to: user.email,
    subject: 'Reset your ToolHub password',
    text: `Hi ${user.name}, reset your password by visiting: ${resetUrl} (expires in 1 hour). If you didn't request this, you can ignore this email.`,
    html: buildEmailHtml({
      preheader: 'Reset your ToolHub password.',
      heading: 'Reset your password',
      bodyHtml: `<p style="margin:0 0 8px;">Hi ${escapeHtml(user.name)},</p><p style="margin:0;">We received a request to reset your ToolHub password. Click the button below to choose a new one.</p>`,
      ctaText: 'Reset password',
      ctaUrl: resetUrl,
      footerNote: 'This link expires in 1 hour. If you didn\u2019t request this, you can safely ignore this email \u2014 your password won\u2019t be changed.',
    }),
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
    html: buildEmailHtml({
      preheader: 'Your email is verified and your ToolHub account is ready to go.',
      heading: 'Welcome to ToolHub',
      bodyHtml: `<p style="margin:0 0 8px;">Hi ${escapeHtml(user.name)},</p><p style="margin:0;">Your email is verified and your account is ready. Head over to the tools page to get started \u2014 everything is free, and most tools run entirely in your browser.</p>`,
      ctaText: 'Browse tools',
      ctaUrl: `${config.clientUrl}/tools`,
    }),
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
    html: buildEmailHtml({
      preheader: 'A security-sensitive change was just made to your ToolHub account.',
      heading: 'Security alert',
      bodyHtml: `<p style="margin:0 0 8px;">Hi ${escapeHtml(user.name)},</p><p style="margin:0;">${escapeHtml(actionText)} on your ToolHub account just now. You\u2019ve been signed out on all other devices as a precaution.</p>`,
      ctaText: "If this wasn't you, reset your password",
      ctaUrl: `${config.clientUrl}/forgot-password`,
    }),
  })
}
