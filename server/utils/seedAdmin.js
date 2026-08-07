import { connectDB, disconnectDB } from '../config/db.js'
import User from '../models/User.js'
import { config } from '../config/env.js'

async function seedAdmin() {
  if (!config.admin.email || !config.admin.password) {
    console.error('[seed:admin] Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env before running this.')
    process.exit(1)
  }

  console.log('[seed:admin] Connecting to MongoDB...')
  await connectDB()

  const existing = await User.findOne({ email: config.admin.email.toLowerCase() })
  if (existing) {
    if (existing.role !== 'admin') {
      existing.role = 'admin'
      await existing.save()
      console.log(`[seed:admin] Promoted existing user ${existing.email} to admin.`)
    } else {
      console.log(`[seed:admin] ${existing.email} is already an admin. Nothing to do.`)
    }
  } else {
    const admin = await User.create({
      name: config.admin.name,
      email: config.admin.email,
      password: config.admin.password,
      role: 'admin',
      isEmailVerified: true, // skip the email flow for the seeded admin account
    })
    console.log(`[seed:admin] Created admin account: ${admin.email}`)
    console.log('[seed:admin] Sign in with the ADMIN_EMAIL / ADMIN_PASSWORD from your .env, then change the password.')
  }

  await disconnectDB()
  process.exit(0)
}

seedAdmin().catch((error) => {
  console.error('[seed:admin] Failed:', error)
  process.exit(1)
})
