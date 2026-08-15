# ToolHub API

Node.js + Express + MongoDB (Mongoose) REST API for ToolHub.

## Setup

```bash
cd server
npm install
cp .env.example .env
# edit .env — at minimum set MONGODB_URI to your MongoDB Atlas connection string
npm run seed   # populates the database with data matching the current frontend
npm run dev    # starts the API on http://localhost:5000 (nodemon, auto-restarts)
```

`npm start` runs the same thing without nodemon, for production.

## Environment variables

See `.env.example` for the full list with defaults. You must set `MONGODB_URI`, `JWT_ACCESS_SECRET`, and `JWT_REFRESH_SECRET` yourself — everything else has a sensible default for local development.

| Variable | Purpose |
|---|---|
| `NODE_ENV` | `development` or `production` |
| `PORT` | Port the API listens on (default `5000`) |
| `MONGODB_URI` | MongoDB Atlas (or local) connection string |
| `CLIENT_URL` | Frontend origin, used for CORS and building email links |
| `RATE_LIMIT_WINDOW_MS` / `RATE_LIMIT_MAX` | General API rate limiting |
| `UPLOAD_MAX_FILE_SIZE_MB` / `UPLOAD_DIR` | File upload limits and storage location |
| `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` | Two *different* secrets for signing access vs refresh tokens — generate each with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `JWT_ACCESS_EXPIRES_IN` / `JWT_REFRESH_EXPIRES_IN` | Token lifetimes (defaults: 15 minutes / 30 days) |
| `BCRYPT_SALT_ROUNDS` | Password hashing cost factor (default `12`) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `EMAIL_FROM` | Email delivery — verification, password reset, welcome, and security alert emails all go through this. Configured for Brevo by default (see `.env.example`), but works with any SMTP provider. **Leave blank for local dev** — emails are logged to the console instead of sent. |
| `ADMIN_NAME` / `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Used only by `npm run seed:admin` (see below) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Optional — enables "Continue with Google". See the "Google OAuth" section below for full setup. |
| `CONTACT_EMAIL` | Where Contact page submissions get emailed. Defaults to `flashycoderch@gmail.com` if unset. |

### Creating your first admin account

```bash
npm run seed:admin
```

Reads `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env` and creates (or promotes) that account to the `admin` role, with its email pre-verified so you can sign in immediately. **Change the password after your first login** — the seeded one lives in plaintext in your `.env` file.

## Folder structure

```
server/
├── api/
│   └── index.js      Vercel serverless entry point (see "Deploying to Vercel" below)
├── app.js             the Express app itself — no side effects, imported by both entry points
├── server.js           entry point for traditional hosting (local dev, Render, Railway, ...)
├── config/         env.js (central config object), db.js (cached Mongoose connection)
├── controllers/    thin HTTP handlers — call services, format the response
│   ├── toolController.js, categoryController.js, blogController.js, settingsController.js, uploadController.js
│   └── authController.js, userController.js, favoriteController.js, historyController.js, analyticsController.js
├── middleware/      errorHandler, notFound, logger, rateLimiter (general + stricter authRateLimiter), sanitizeInput, upload
│   ├── auth.js       protect (requires valid access token), authorize(...roles), attachUserIfPresent (optional auth)
│   └── validators/  express-validator chains, one file per resource
├── models/          Mongoose schemas: Tool, Category, Blog, SiteSettings, User, Favorite, ConversionHistory
├── routes/           Express routers, one file per resource, combined in index.js
├── services/         Mongoose queries live here, not in controllers (clean architecture)
├── utils/             ApiError, ApiResponse, asyncHandler, slugify, jwt.js, email.js, requestMeta.js
│                        + seed script/data, seedAdmin.js (creates the first admin account)
├── uploads/            local-dev fallback storage for uploads (see "File uploads" below)
└── vercel.json          routes all requests to api/index.js when deployed on Vercel
```

## API reference

Every response is shaped `{ success, message, data, meta? }` on success, or `{ success: false, message, errors? }` on failure.

### Health check
`GET /api/health` — confirms the API is running.

### Tools
| Method | Route | Notes |
|---|---|---|
| GET | `/api/tools` | Query params: `category`, `search`, `featured=true` |
| GET | `/api/tools/:slug` | |
| POST | `/api/tools` | Validated body — see `middleware/validators/toolValidator.js` |
| PUT | `/api/tools/:slug` | |
| DELETE | `/api/tools/:slug` | |

### Categories
| Method | Route |
|---|---|
| GET | `/api/categories` |
| GET | `/api/categories/:slug` |
| POST | `/api/categories` |
| PUT | `/api/categories/:slug` |
| DELETE | `/api/categories/:slug` |

### Blog
| Method | Route | Notes |
|---|---|---|
| GET | `/api/blog` | Query params: `category`, `search`. Only returns `published: true` posts. |
| GET | `/api/blog/:slug` | |
| POST | `/api/blog` | |
| PUT | `/api/blog/:slug` | |
| DELETE | `/api/blog/:slug` | |

### Settings (singleton)
| Method | Route |
|---|---|
| GET | `/api/settings` |
| PUT | `/api/settings` |

### Uploads
| Method | Route | Notes |
|---|---|---|
| POST | `/api/uploads` | Admin only. `multipart/form-data`, field name `file`. Images only (jpg/png/webp/gif/svg), size limit from `UPLOAD_MAX_FILE_SIZE_MB`. Stores to **Vercel Blob** if `BLOB_READ_WRITE_TOKEN` is set (automatic on Vercel once you enable Blob storage), otherwise falls back to writing into the local `uploads/` folder for local development. |

### Auth
| Method | Route | Notes |
|---|---|---|
| POST | `/api/auth/register` | Creates an account, signs in immediately, sends a verification email |
| POST | `/api/auth/login` | |
| POST | `/api/auth/logout` | Requires auth. Revokes the current refresh token |
| POST | `/api/auth/refresh` | Uses the httpOnly refresh cookie — no body needed |
| GET | `/api/auth/me` | Requires auth. Returns the current user |
| POST | `/api/auth/verify-email` | Body: `{ token }` |
| POST | `/api/auth/resend-verification` | Requires auth |
| POST | `/api/auth/forgot-password` | Body: `{ email }`. Always returns success, regardless of whether the email exists |
| POST | `/api/auth/reset-password` | Body: `{ token, password }`. Invalidates all existing sessions |
| GET | `/api/auth/google` | Redirects to Google's consent screen. Not an API call the frontend fetches — the button navigates the whole page here. |
| GET | `/api/auth/google/callback` | Google redirects here after consent. Not called directly — see the "Google OAuth" section below. |

### Users
| Method | Route | Notes |
|---|---|---|
| PUT | `/api/users/me` | Requires auth. Update own name/email/avatar (avatar as a plain string field — see the dedicated upload route below for actually uploading a file) |
| POST | `/api/users/me/avatar` | Requires auth. `multipart/form-data`, field name `file`. Real image upload (type/size validated by the shared `upload` middleware), stored via `services/storageService.js`, sets the result as the user's avatar. |
| DELETE | `/api/users/me/avatar` | Requires auth. Clears the avatar back to none. |
| PUT | `/api/users/me/password` | Requires auth. Body: `{ currentPassword, newPassword }` |
| GET | `/api/users` | Admin only. Query params: `role`, `plan`, `search` |
| GET | `/api/users/:id` | Admin only |
| PUT | `/api/users/:id` | Admin only. Body: any of `{ role, plan, name, isEmailVerified }` |
| DELETE | `/api/users/:id` | Admin only |

### Favorites
| Method | Route | Notes |
|---|---|---|
| GET | `/api/favorites` | Requires auth |
| POST | `/api/favorites` | Requires auth. Body: `{ toolSlug }` |
| DELETE | `/api/favorites/:toolSlug` | Requires auth |

### Conversion history
| Method | Route | Notes |
|---|---|---|
| POST | `/api/history` | Works signed-out too (logs anonymously, still counts toward analytics). Body: `{ toolSlug, toolName, category, originalFileName? }`. Metadata only — never the actual file. |
| GET | `/api/history` | Requires auth. Every conversion, regardless of whether it was ever downloaded. Query params: `page`, `limit` |
| DELETE | `/api/history` | Requires auth. Clears all of the current user's history |
| DELETE | `/api/history/:id` | Requires auth |

### Contact
| Method | Route | Notes |
|---|---|---|
| POST | `/api/contact` | Public, rate-limited. Body: `{ name, email, subject?, message, website? }` — `website` is the honeypot field, must stay empty. |

### Analytics
| Method | Route | Notes |
|---|---|---|
| GET | `/api/analytics/overview` | Admin only. Returns total/daily/monthly active users, total conversions, top tools, top categories, country and device breakdowns — all in one call |

## Deploying to Vercel

Full step-by-step instructions live in the root `README.md`'s "Deploying to Vercel" section, since it covers both the frontend and backend projects together (they need each other's URLs). The short version specific to this backend:

- Deploy this `server/` folder as its own Vercel project (**Root Directory** = `server`) — `vercel.json` and `api/index.js` here handle the serverless adaptation.
- Set `MONGODB_URI` and `CLIENT_URL` as environment variables.
- Enable **Vercel Blob** (project → Storage tab) so file uploads persist — Vercel sets `BLOB_READ_WRITE_TOKEN` automatically.
- Run `npm run seed` locally (pointed at your production `MONGODB_URI`) — it's a one-off script, not something that runs inside a serverless function.

## Authentication (Phase 5)

JWT-based, with refresh-token rotation and an absolute 7-day session cap:

- **Access token**: short-lived (15 min default), returned in the response body, sent by the frontend as `Authorization: Bearer <token>`. Kept in memory only on the frontend (`src/lib/tokenStore.js`) — never localStorage.
- **Refresh token**: 7 days by default, stored as an **httpOnly cookie** (JavaScript can never read it — the main defense against XSS-based token theft), scoped to `/api/auth`. Rotated on every use: each refresh invalidates the old token and issues a new one, so a stolen-and-reused old token fails.
- **Absolute session cap, enforced server-side:** each refresh token entry carries a `sessionExpiresAt` (see `models/User.js`), fixed once at the original login and copied unchanged onto every token produced by rotating it. `services/authService.js`'s `refresh()` rejects once real time passes that value — independent of whether the token's own JWT signature would otherwise still validate. This is what actually stops "keep the tab open and it silently refreshes forever" from extending a session past 7 days; a rotated token's own `expiresAt` resets on each rotation, but `sessionExpiresAt` never does. The refresh cookie's `maxAge` is computed from the same value each time too, so the cookie itself doesn't quietly outlive the session it represents.
- Both token types use separate secrets (`JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET`) so a leak of one can't forge the other.
- Passwords hashed with bcrypt (`BCRYPT_SALT_ROUNDS`, default 12).
- Email verification and password reset both use single-use, hashed, time-limited tokens (verification: 24h, reset: 1h) — only the hash is ever stored, same principle as refresh tokens.
- Four email flows, all in `server/utils/email.js`: verification (on register), password reset (on forgot-password), a welcome email (sent once, right after verification succeeds — not at registration, since the address isn't confirmed yet), and a security alert (sent on password reset, password change, and email address change — invalidates other sessions and tells the account owner, in case it wasn't them). Email-address changes alert the *old* address, not the new one, so an attacker changing the email to lock someone out can't also suppress the warning.
- `forgot-password` always returns the same response whether or not the email exists, to prevent using it to enumerate registered accounts.
- Auth endpoints (`/register`, `/login`, `/forgot-password`) have a stricter rate limit (`authRateLimiter`) than the general API.

**Migration note:** this session-cap change adds a required `sessionExpiresAt` field to refresh token entries. Any session created *before* this deploy won't have it, and `refresh()` correctly treats a missing value as expired — meaning every currently-logged-in user gets signed out once, the first time their access token expires after this deploys, and needs to log in again. After that one-time reset, everyone's on the new 7-day cap. This is expected, not a bug.

## Contact form

`POST /api/contact` — public, rate-limited (5 per 15 min per IP via `contactRateLimiter`), validated server-side (`middleware/validators/contactValidator.js`). Every submission is saved to MongoDB (`models/ContactMessage.js`) first — durable regardless of email outcome — then emailed to `CONTACT_EMAIL` (defaults to `flashycoderch@gmail.com`, overridable via env var) through the same Brevo/SMTP setup as every other email in the app, with the visitor's address set as Reply-To so responding in an inbox goes straight back to them. A hidden honeypot field (`website`) catches basic bots: filled in means silently no-op with a normal-looking success response, rather than an error that would teach the bot what tripped it.

**All previously-open write routes are now protected.** Every `POST`/`PUT`/`DELETE` on tools, categories, blog posts, settings, and uploads requires `protect` + `authorize('admin')`. Regular users can only act on their own data (profile, favorites, history) via `protect` alone.

## Google OAuth ("Continue with Google")

Uses the standard OAuth 2.0 authorization code flow — the same confidential-client pattern any server-backed app uses, not a client-side-only token flow, which is why it needs `GOOGLE_CLIENT_SECRET` (must stay server-side, never sent to the frontend).

**How it works:**
1. Frontend button does a full-page redirect to `GET /api/auth/google`.
2. That redirects to Google's consent screen.
3. Google redirects back to `GET /api/auth/google/callback?code=...` (or `?error=...` if the user cancels).
4. The backend exchanges the code for tokens directly with Google (`google-auth-library`), verifies the ID token's signature and audience, and finds-or-creates a `User` matching that email (`services/googleAuthService.js`).
5. Same `issueTokens()` as a password login — sets the httpOnly refresh cookie, then redirects to `${CLIENT_URL}/dashboard`.
6. **No token is ever put in a URL.** The dashboard's own silent-refresh-on-load (already built for regular login) picks up the session automatically, since the cookie is already set by the time that page's JS runs.

**Account matching:** by email, not just Google's internal ID — so someone who registered with a password first and later clicks "Continue with Google" with the same address gets their *existing* account linked (and marked verified, and given an avatar if they don't have one), never a duplicate. `User.password` is optional at the schema level specifically for accounts that only ever sign in via Google; `authService.login` gives a clear "use Google instead" message if someone without a password tries the password form.

### Branding — showing "ToolHub" instead of the backend's Vercel domain

**This is a Google Cloud Console setting, not something fixable in code.** What Google's consent screen shows ("Choose an account to continue to ___") comes entirely from the OAuth consent screen's own configuration for the Google Cloud project — nothing about how this app builds requests or redirects affects it. If it's currently showing your backend's raw Vercel domain instead of "ToolHub," that means the App name field was never actually set (or saved) on this screen — Google falls back to the verified domain associated with the OAuth client's redirect URI when there's no proper app identity configured.

1. Google Cloud Console → in the left sidebar, either **"OAuth consent screen"** or **"Google Auth Platform" → "Branding"** (Google has renamed/reorganized this menu over time — you'll land on the same settings either way).
2. Set:
   - **App name**: `ToolHub`
   - **User support email**: your email
   - **App logo**: upload `public/icon-512.png` from this repo directly — it's already square (512×512 PNG), well under Google's 1MB limit, and meets their minimum 120×120 requirement. No new asset needed.
   - **Application home page**: `https://trytoolhub.net`
   - **Application privacy policy link**: `https://trytoolhub.net/privacy-policy`
   - **Application terms of service link**: `https://trytoolhub.net/terms`
   - **Authorized domains**: add `trytoolhub.net`
   - **Developer contact information**: your email
3. Save.

Two things worth knowing:
- Changes here can take anywhere from a few minutes to a few hours to actually show up on the live consent screen — Google caches it. If it doesn't update instantly, that's expected, not a sign something's wrong.
- ToolHub's Google sign-in only requests non-sensitive scopes (`email`, `profile`, `openid` — see `server/services/googleAuthService.js`), so the App name and logo should display correctly without needing Google's full manual app-verification review, even while the app is in "Testing" publishing status. Full verification only becomes relevant if sensitive/restricted scopes are ever added, or you move past 100 test users while still in Testing mode.

### Set up in Google Cloud Console

1. [console.cloud.google.com](https://console.cloud.google.com) → create or select a project.
2. **APIs & Services → OAuth consent screen** → configure it (User type: External is fine for most cases; app name, support email, etc.). Scopes needed: `email`, `profile`, `openid` — these are non-sensitive defaults, no Google verification review required.
3. **APIs & Services → Credentials → Create Credentials → OAuth client ID** → Application type: **Web application**.
4. Under **Authorized redirect URIs**, add both, exactly:
   - `http://localhost:5000/api/auth/google/callback` (local dev)
   - `https://<your-backend-domain>/api/auth/google/callback` (production)

   **`<your-backend-domain>` is your *backend's* Vercel domain — e.g. `toolhub-backend-project.vercel.app` — never `trytoolhub.net`.** `trytoolhub.net` is the frontend; Google never redirects there directly. This is intentional, not a mistake to fix — see "Why the user ends up on the backend URL if `CLIENT_URL` is wrong" below for the full flow and why the *final* destination is still always the frontend.
4b. Under **Authorized JavaScript origins** (same Credentials page, just above redirect URIs), add:
   - `http://localhost:5173` (local dev)
   - `https://trytoolhub.net` (production)

   Honest note: this app's Google sign-in uses a server-side authorization-code exchange (the flow described above), not Google's client-side JavaScript SDK — so this field isn't strictly required for anything to work today. It's still worth setting to the *frontend's* domain (not the backend's) as standard practice and in case a client-side Google button (One Tap, etc.) is ever added later.
5. Copy the generated **Client ID** and **Client Secret**.

### Set up in your environment

| Where | Variable | Value |
|---|---|---|
| `server/.env` (local) | `GOOGLE_CLIENT_ID` | from step 5 above |
| `server/.env` (local) | `GOOGLE_CLIENT_SECRET` | from step 5 above |
| Backend Vercel project → Environment Variables | `GOOGLE_CLIENT_ID` | same value |
| Backend Vercel project → Environment Variables | `GOOGLE_CLIENT_SECRET` | same value |
| Backend Vercel project → Environment Variables | `CLIENT_URL` | `https://trytoolhub.net` — **the frontend's domain, never this backend's own Vercel URL.** See "Why the user ends up on the backend URL if this is wrong" below. |

**Never set `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` on the frontend project** — the client secret has no reason to exist client-side, and doing so would expose it. Redeploy the backend after adding any of these on Vercel. If Google's credentials are left blank, the "Continue with Google" button still renders but redirects to `/login?error=google_not_configured` instead of crashing anything.

### Why the user ends up on the backend URL if `CLIENT_URL` is wrong

The flow is: `trytoolhub.net/login` → this backend's `/api/auth/google` (a real, necessary, brief hop — Google requires the redirect_uri to be a backend endpoint, since only the backend holds the client secret needed to exchange the authorization code) → `accounts.google.com` → back to this backend's `/api/auth/google/callback` → **redirect to `${CLIENT_URL}/dashboard`**.

That last step is the one that matters: it's built entirely from the `CLIENT_URL` environment variable, never hardcoded (`server/controllers/authController.js`, `googleAuthCallback`). If `CLIENT_URL` is missing, wrong, or accidentally set to this backend's own Vercel URL (an easy copy-paste mistake when you're juggling two separate Vercel projects), the user gets redirected to the wrong place after Google approves them — which is exactly what "stuck on the backend URL" looks like. Two things now guard against this:
- `CLIENT_URL` is **required** in production — the backend refuses to start at all if it's missing, rather than silently falling back to `http://localhost:5173` and sending real users to a dead address.
- Both OAuth handlers (`googleAuthRedirect`, `googleAuthCallback`) now wrap their entire body in try/catch, so literally any unexpected error results in a redirect back to `${CLIENT_URL}/login?error=...` — never a raw JSON error response left sitting on this backend's domain, which was the actual gap that made this bug possible even with `CLIENT_URL` set correctly.

## Icon names

`Tool.icon` and `Category.icon` are string names (e.g. `"FaFileImage"`), not image files. The frontend's `src/lib/iconRegistry.js` maps these strings back to the actual `react-icons` component. If you add a tool/category with a new icon, add the matching import + entry to that registry, or it'll fall back to a generic placeholder icon.

## Security measures in place

- `helmet` — standard security headers
- `cors` — restricted to `CLIENT_URL`
- `express-rate-limit` — applied to all `/api` routes
- Custom `sanitizeInput` middleware — strips NoSQL-operator injection attempts (`$`, `.` in keys) and HTML tags from every request body/query/params, without mangling ordinary text like apostrophes
- `express-validator` — every write route validates its input before touching the database
- Centralized error handler — never leaks stack traces outside development
