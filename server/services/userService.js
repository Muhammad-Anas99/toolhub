import User from '../models/User.js'
import { ApiError } from '../utils/ApiError.js'

export async function updateProfile(userId, { name, email, avatar }) {
  const user = await User.findById(userId)
  if (!user) throw ApiError.notFound('User not found')

  if (email && email.toLowerCase() !== user.email) {
    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) throw ApiError.conflict('An account with this email already exists')
    user.email = email
    // Changing email invalidates verification — they need to re-verify
    // the new address.
    user.isEmailVerified = false
  }

  if (name) user.name = name
  if (avatar !== undefined) user.avatar = avatar

  await user.save()
  return user
}

export async function changePassword(userId, newPassword) {
  const user = await User.findById(userId).select('+refreshTokens')
  if (!user) throw ApiError.notFound('User not found')

  user.password = newPassword
  // Same reasoning as a password reset: invalidate other sessions when the
  // password changes.
  user.refreshTokens = []
  await user.save()
  return user
}

// --- Admin operations ----------------------------------------------------------

export async function listUsers({ role, plan, search } = {}) {
  const query = {}
  if (role) query.role = role
  if (plan) query.plan = plan
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ]
  }
  return User.find(query).sort({ createdAt: -1 })
}

export async function getUserById(id) {
  const user = await User.findById(id)
  if (!user) throw ApiError.notFound('User not found')
  return user
}

export async function updateUserAsAdmin(id, { role, plan, name, isEmailVerified }) {
  const user = await User.findById(id)
  if (!user) throw ApiError.notFound('User not found')

  if (role) user.role = role
  if (plan) user.plan = plan
  if (name) user.name = name
  if (isEmailVerified !== undefined) user.isEmailVerified = isEmailVerified

  await user.save()
  return user
}

export async function deleteUser(id) {
  const user = await User.findByIdAndDelete(id)
  if (!user) throw ApiError.notFound('User not found')
  return user
}
