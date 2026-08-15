import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { config } from '../config/env.js'

const refreshTokenSchema = new mongoose.Schema(
  {
    // Only the hash is stored — never the raw token — so a database leak
    // alone can't be used to impersonate a session.
    tokenHash: { type: String, required: true },
    userAgent: { type: String, default: '' },
    // This individual token's own ceiling, derived from its JWT `exp`.
    expiresAt: { type: Date, required: true },
    // The ABSOLUTE cap for the whole session this token belongs to — set
    // once, at the very first login, and copied unchanged onto every
    // token produced by rotating it (see authService.issueTokens /
    // authService.refresh). This is what stops repeated silent refreshing
    // from extending a session indefinitely: `expiresAt` above resets on
    // every rotation, but `sessionExpiresAt` never does, and
    // authService.refresh() rejects once real time passes it — regardless
    // of whether the token itself would otherwise still validate.
    sessionExpiresAt: { type: Date, required: true },
  },
  { _id: false, timestamps: { createdAt: true, updatedAt: false } }
)

const userSchema = new mongoose.Schema(
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
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
    },
    // Not required at the schema level — accounts created via Google
    // Sign-In have no password at all. A password-based registration
    // always sets one (enforced by registerValidator, not here), and
    // authService.login rejects a password-login attempt for an account
    // that doesn't have one, directing them to use Google instead.
    password: {
      type: String,
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // never returned by default — must opt in with .select('+password')
    },
    // Set only for accounts created or linked via "Continue with Google"
    // (see services/googleAuthService.js). `sparse: true` on the unique
    // index means many users can all have no googleId at once without
    // colliding on uniqueness — only actual duplicate Google IDs conflict.
    googleId: {
      type: String,
      unique: true,
      sparse: true,
      select: false,
    },
    avatar: {
      type: String,
      default: '',
    },

    // Authorization role — separate from `plan` below. A user can be a
    // 'free' or 'premium' plan admin just as easily as a regular user;
    // these two concepts are independent by design.
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    // Subscription tier. No payment integration yet (Phase 5 explicitly
    // excludes it) — this exists so the UI, limits, and admin tooling all
    // have somewhere real to read/write plan state once billing lands.
    plan: {
      type: String,
      enum: ['free', 'premium', 'pro'],
      default: 'free',
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationTokenHash: { type: String, select: false },
    emailVerificationExpires: { type: Date, select: false },

    passwordResetTokenHash: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },

    refreshTokens: {
      type: [refreshTokenSchema],
      select: false,
      default: [],
    },

    lastActiveAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

// --- Password hashing --------------------------------------------------------
userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    next()
    return
  }
  this.password = await bcrypt.hash(this.password, config.bcryptSaltRounds)
  next()
})

userSchema.methods.comparePassword = function comparePassword(candidate) {
  // Google-only accounts have no password to compare against — false,
  // not a thrown error, so callers can treat it as "wrong credentials"
  // uniformly. (authService.login gives a more specific message for this
  // case before it even reaches here.)
  if (!this.password) return Promise.resolve(false)
  return bcrypt.compare(candidate, this.password)
}

// --- Serialization ------------------------------------------------------------
// Strip sensitive/internal fields whenever a user doc is sent in a response,
// regardless of which controller does the sending.
userSchema.methods.toJSON = function toSafeJSON() {
  const obj = this.toObject()
  delete obj.password
  delete obj.googleId
  delete obj.refreshTokens
  delete obj.emailVerificationTokenHash
  delete obj.emailVerificationExpires
  delete obj.passwordResetTokenHash
  delete obj.passwordResetExpires
  delete obj.__v
  return obj
}

export default mongoose.model('User', userSchema)
