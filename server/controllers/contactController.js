import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import * as contactService from '../services/contactService.js'

export const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, subject, message, website } = req.body

  // Honeypot: a hidden field real visitors never see or fill (see
  // GoogleAuthButton-adjacent styling pattern — sr-only on the frontend
  // form). A bot that fills every field in the DOM populates it. Return a
  // normal-looking success without actually saving or emailing anything —
  // revealing that it was caught (e.g. via an error response) just teaches
  // the bot to leave that field blank next time.
  if (website) {
    sendSuccess(res, { statusCode: 201, message: 'Message sent' })
    return
  }

  const ipAddress = req.ip || ''

  await contactService.submitContactMessage({ name, email, subject, message, ipAddress })

  sendSuccess(res, { statusCode: 201, message: 'Message sent' })
})
