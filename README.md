# ToolHub

Free online tools — starting with image conversion, compression, resizing, cropping and rotation. Built to be fast, responsive, SEO-friendly, and easy to extend with new tools and categories over time.

## Tech Stack

- **Frontend:** React + Vite, Tailwind CSS, React Router, Framer Motion, React Icons, react-helmet-async
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), REST API — see `server/README.md` for full API docs

## Getting Started (full stack)

The frontend works on its own with local data even if you skip the backend entirely — see "How the frontend and backend connect" below. To run both:

**1. Backend**
```bash
cd server
npm install
cp .env.example .env
# edit .env and set MONGODB_URI to your MongoDB Atlas connection string
npm run seed   # populates the database with data matching the frontend's current content
npm run dev    # API running at http://localhost:5000
```

**2. Frontend** (in a separate terminal, from the project root)
```bash
npm install
cp .env.example .env   # defaults already point at http://localhost:5000/api
npm run dev             # app running at http://localhost:5173
```

### Other frontend scripts

```bash
npm run build    # production build to /dist
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

## How the frontend and backend connect

Data-fetching hooks in `src/hooks/` (`useTools`, `useCategories`, `useBlogPosts`, `useSiteSettings`) call the API first. If the API is unreachable — backend not running, MongoDB not configured yet, network hiccup — each hook automatically falls back to the matching local file in `src/data/` and logs a `console.warn` so you can tell which source is active. This means:

- The frontend **never breaks** because the backend isn't running.
- You can develop frontend-only, exactly as in Phases 1–3, with zero setup.
- Once the backend is seeded and running, the site automatically switches to live data — no frontend code changes needed.

Icons are the one wrinkle: MongoDB can't store a React component, so `Tool.icon` / `Category.icon` are string names (e.g. `"FaFileImage"`) in the database. `src/lib/iconRegistry.js` maps those strings back to the real icon components right after fetching, so every component downstream (`ToolCard`, `CategoryCard`, etc.) always receives a real component reference — it never needs to know or care whether the data came from the API or the local fallback.

**Not yet wired to the API** (still reading directly from `src/data/`, intentionally, to keep this phase's scope manageable): `MegaMenu`, `Footer`, `SearchModal`, `RelatedTools`, and the `Blog.jsx` listing page. `Home.jsx` and `Tools.jsx` are fully wired and are the reference implementation for finishing the rest — see the "Next steps" note near the bottom of this file.

## Deploying to Vercel

Both the frontend and backend deploy to Vercel, as **two separate Vercel projects from the same GitHub repo** — one rooted at the repo root (frontend), one rooted at `server/` (backend, as serverless functions). This is the standard, clean way to handle a monorepo like this on Vercel; trying to force both into a single project fights the platform more than it helps.

The backend was specifically restructured for this: `server/app.js` holds the Express app with no side effects, `server/server.js` is a thin entry for traditional hosting (local dev, or Render/Railway if you ever want that instead), and `server/api/index.js` is the actual Vercel serverless entry point — both entry points share the same `app.js`, so nothing is duplicated. MongoDB connections are cached (`server/config/db.js`) so a warm serverless instance reuses its connection instead of opening a new one per request, and file uploads go to **Vercel Blob storage** in production (local disk writes don't persist on Vercel) — see `server/README.md` for the upload details.

### 1. Push to GitHub, then set up MongoDB Atlas
If you haven't already, create a free MongoDB Atlas cluster and grab its connection string — you'll need it in step 2.

### 2. Deploy the backend first
In the Vercel dashboard, **Add New Project** → import your repo → set **Root Directory** to `server`. Vercel will detect `server/vercel.json` automatically.

Set these environment variables on this project (Settings → Environment Variables):
| Variable | Value |
|---|---|
| `MONGODB_URI` | your Atlas connection string |
| `CLIENT_URL` | your frontend's Vercel URL (you can update this after step 3, then redeploy) |
| `NODE_ENV` | `production` |
| `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` | two different long random strings — generate each with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`. **Do not reuse the same value for both.** |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM` | your Brevo (or other provider) SMTP credentials — without these, verification/reset/welcome/security emails only get logged to Vercel's function logs, not actually delivered to users |
| `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX`, `UPLOAD_MAX_FILE_SIZE_MB`, `UPLOAD_DIR`, `BCRYPT_SALT_ROUNDS` | defaults from `.env.example` work fine |

Then enable **Vercel Blob**: project → Storage tab → Create → Blob. This automatically sets `BLOB_READ_WRITE_TOKEN` for you — you don't add it by hand.

Deploy. Note the resulting URL (e.g. `https://toolhub-api.vercel.app`) — your API lives at `<that-url>/api`.

### 3. Deploy the frontend
**Add New Project** again, same repo, **Root Directory** left as the repo root. Vercel auto-detects the Vite framework preset; `vercel.json` at the root handles SPA routing so client-side routes like `/tools/jpg-to-png` don't 404 on refresh.

Set one environment variable:
| Variable | Value |
|---|---|
| `VITE_API_URL` | `https://toolhub-api.vercel.app/api` (your backend URL from step 2, plus `/api`) |

Deploy. Then go back to the **backend** project's env vars and set `CLIENT_URL` to this frontend's actual URL, and redeploy the backend so CORS allows it.

### 4. Seed the database
The seed script isn't something you run "on" Vercel — serverless functions aren't built for one-off scripts like this. Run it locally, pointed at production:
```bash
cd server
# temporarily set MONGODB_URI in your local .env to the Atlas connection
# string you used in step 2, then:
npm run seed
```

### 5. Create your admin account
Same idea — run locally, pointed at production:
```bash
# with ADMIN_EMAIL / ADMIN_PASSWORD set in your local .env:
npm run seed:admin
```
Sign in at `https://<your-frontend>.vercel.app/login` with those credentials, then change the password from Dashboard → Settings.

### Known platform constraints worth knowing about
- **Request body size:** Vercel's Hobby plan caps request bodies at 4.5MB — this is why `UPLOAD_MAX_FILE_SIZE_MB` defaults to 4 now, not the 10 it was before. Upgrade to Pro if you need larger uploads.
- **Function duration:** `server/vercel.json` sets `maxDuration: 30` (seconds) for the API function. Fine for everything currently in this API.
- **CORS and preview deployments:** every PR/branch gets a unique preview URL on Vercel. `server/app.js` allows any `*.vercel.app` origin (not just your own) so previews aren't silently broken by CORS — there's a comment right above that code explaining the tradeoff and how to tighten it once Phase 5 adds real authentication.
- **Cold starts:** the first request after a period of inactivity will be slower (new function instance + fresh MongoDB connection). Normal for serverless, not a bug.
- **Cross-domain cookies (Phase 5 auth):** the refresh-token cookie is set with `sameSite: 'none'` and `secure: true` in production (see `server/controllers/authController.js`) specifically because the frontend and backend live on two different `*.vercel.app` domains — this is what makes the browser send the cookie cross-site at all. Both requirements need HTTPS, which Vercel provides automatically, so this works out of the box. If you ever see login succeed but the session not persisting on refresh, check the cookie in DevTools → Application → Cookies — if it's missing entirely, the most common cause is `VITE_API_URL` pointing somewhere that doesn't match where the cookie was actually set.
## Project Structure

```
toolhub/
├── server/                    ← Node/Express/MongoDB backend (see server/README.md)
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx, MegaMenu.jsx, Footer.jsx, Layout.jsx
│   │   │   └── UserMenu.jsx           (account dropdown - dashboard/admin/sign out)
│   │   ├── auth/
│   │   │   └── ProtectedRoute.jsx     (route guard, optional requireRole prop)
│   │   ├── dashboard/
│   │   │   ├── DashboardLayout.jsx    (sidebar shell for all /dashboard/* pages)
│   │   │   └── HistoryList.jsx        (shared by History + Downloads pages)
│   │   ├── tools/
│   │   │   ├── ToolLayout.jsx         (shell every tool page uses)
│   │   │   ├── Breadcrumb.jsx, ToolHeader.jsx, FavoriteButton.jsx
│   │   │   ├── DropZone.jsx, FileInfoCard.jsx, ToolWorkspace.jsx
│   │   │   ├── PreviewPanel.jsx, ProgressBar.jsx, DownloadPanel.jsx, ErrorMessage.jsx
│   │   │   ├── RelatedTools.jsx, ToolFAQSection.jsx
│   │   │   └── image/                 (image-format-specific engines; future pdf/, text/ etc. go alongside)
│   │   │       ├── ImageConverterTool.jsx  (generic core: powers 5 format-conversion tools)
│   │   │       ├── RotateFlipTool.jsx      (shared core: powers Rotate + Flip)
│   │   │       └── CropStage.jsx           (draggable/resizable crop box, keyboard-operable)
│   │   └── ui/
│   │       ├── Container.jsx, ThemeToggle.jsx, ToolCard.jsx, CategoryCard.jsx
│   │       ├── StatCounter.jsx, TestimonialCard.jsx, BlogCard.jsx, PageLoader.jsx
│   │       ├── FAQAccordion.jsx, SearchModal.jsx, Slider.jsx, SEO.jsx
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   └── AuthContext.jsx            (user, access token, login/register/logout, silent refresh)
│   ├── hooks/
│   │   ├── useImageUpload.js, useToolResult.js  (image-tool state; also logs conversions)
│   │   └── useTools.js, useCategories.js, useBlogPosts.js, useSiteSettings.js  (API + local fallback)
│   ├── lib/
│   │   ├── imageProcessing.js        (canvas-based convert/compress/resize/rotate/crop)
│   │   ├── fileValidation.js, formatBytes.js, downloadBlob.js
│   │   ├── api.js                    (all API calls, including auth's silent-refresh-and-retry)
│   │   ├── tokenStore.js             (in-memory access token — never localStorage)
│   │   └── iconRegistry.js           (backend integration)
│   ├── data/
│   │   ├── tools.js, categories.js, blog.js, testimonials.js, faq.js, toolFaq.js
│   │   └── (local fallback source when the API is unreachable — see "How the frontend and backend connect")
│   ├── pages/
│   │   ├── Home.jsx, Tools.jsx, About.jsx, Contact.jsx, Blog.jsx
│   │   ├── PrivacyPolicy.jsx, Terms.jsx, NotFound.jsx
│   │   ├── tools/
│   │   │   ├── JpgToPng.jsx, PngToJpg.jsx, WebpToPng.jsx, WebpToJpg.jsx
│   │   │   ├── ConvertToWebp.jsx, ImageCompressor.jsx, ImageResizer.jsx
│   │   │   └── ImageCrop.jsx, ImageRotate.jsx, FlipImage.jsx
│   │   ├── auth/
│   │   │   └── Login.jsx, Register.jsx, ForgotPassword.jsx, ResetPassword.jsx, VerifyEmail.jsx
│   │   └── dashboard/
│   │       └── Dashboard.jsx, Profile.jsx, Favorites.jsx, History.jsx, Downloads.jsx, Settings.jsx, Subscription.jsx
│   ├── App.jsx, main.jsx, index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## Adding a new tool

1. Add an entry to the `tools` array in `src/data/tools.js` (name, slug, path, category, description, icon, optional `badge`, `comingSoon: false` once it's built).
2. Add FAQ content for it in `src/data/toolFaq.js`, keyed by the tool's slug.
3. Build the tool's page under `src/pages/tools/`, wrapping it in `<ToolLayout tool={tool} faqItems={toolFaqs['your-slug']}>`. Reuse `DropZone`, `FileInfoCard`, `PreviewPanel`, `ProgressBar`, `DownloadPanel`, `ErrorMessage` from `src/components/tools/`, and the processing helpers in `src/lib/imageProcessing.js` (add a new exported function there if the transform doesn't exist yet).
4. Register the route in `src/App.jsx`.

If the new tool is another format conversion, it likely doesn't need a new page at all — reuse `ImageConverterTool` with different `acceptedTypes`/`outputMimeType` props, the way the 5 conversion tools do.

## Adding a new category

Add an entry to the `categories` array in `src/data/categories.js`, including an icon and a `color` key that matches one of the palettes defined in `categoryColorClasses` in that same file.

## Status

**Phase 1 (complete):** Frontend scaffold, routing, layout, dark/light mode, homepage, and tools listing page.

**Phase 2 (complete):** Premium SaaS-style redesign — categories mega menu, command-palette search (⌘K), redesigned homepage, improved Tools page with URL-synced filters, About/Contact/Blog/Privacy Policy/Terms pages, upgraded footer.

**Phase 3 (complete):** All 10 image tools are fully working, entirely in the browser via the Canvas API — no backend involved. JPG→PNG, PNG→JPG, WEBP→PNG, WEBP→JPG, Convert to WEBP, Image Compressor, Image Resizer, Image Cropper, Image Rotator, Flip Image. Built on a reusable tool architecture (`ToolLayout`, `DropZone`, `PreviewPanel`, `DownloadPanel`, etc.) so future tools — PDF, developer, text, AI, color, security, social — can be added with minimal new code.

**Phase 4 (complete):** Backend foundation — Node/Express/MongoDB REST API under `server/` (see `server/README.md`), covering Tools, Categories, Blog, and Site Settings with full CRUD, validation, centralized error handling, rate limiting, security headers, input sanitization, and file uploads. Frontend integration layer added (`src/lib/api.js`, `src/lib/iconRegistry.js`, `src/hooks/use*.js`) with automatic fallback to local data — `Home.jsx` and `Tools.jsx` are fully wired to the API.

**Phase 5 (backend + user-facing complete; admin UI next):**
- **Authentication** — register, login, logout, JWT access + refresh tokens (rotation, httpOnly cookie), forgot/reset password, email verification. Full details in `server/README.md`'s "Authentication" section.
- **User dashboard** — Overview, Profile (edit name/email/avatar), Favorites, Conversion History, Downloads, Settings (change password, resend verification), Subscription (Free/Premium/Pro display, no payment yet). All under `/dashboard`, protected by `ProtectedRoute`.
- **Favorites & history wired into the tools themselves** — every tool page has a Favorite button (`FavoriteButton` in `ToolHeader`), and every successful conversion is logged automatically via `useToolResult` (works for signed-out users too, for site-wide analytics, without a personal history entry).
- **Roles & plans** — `User.role` (`user`/`admin`) and `User.plan` (`free`/`premium`/`pro`) are separate fields by design. All previously-open admin write routes (tools, categories, blog, settings, uploads) are now behind `protect` + `authorize('admin')`.
- **Analytics backend** — `GET /api/analytics/overview` (admin-only) returns total/daily/monthly active users, total conversions, top tools, top categories, country and device breakdowns, all in one call. Country comes from Vercel's `x-vercel-ip-country` header automatically; device from a lightweight User-Agent check.
- **Not yet built — the Admin Dashboard UI.** The backend fully supports it (every endpoint above, plus admin-only blog draft endpoints at `/api/blog/admin/*`), but there's no frontend for it yet: no `/admin` pages for User Management, Tool Management, Category Management, Blog CMS, Analytics Dashboard, Site Settings, or Reports. The navbar's `UserMenu` already links to `/admin` for admin users — that link currently 404s until this is built. This is next session's focus.

**Next steps:**
- Build the Admin Dashboard UI (`/admin/*` routes, `AdminLayout`, and one page per section) against the already-complete backend endpoints — this is the main remaining piece of Phase 5.
- Finish wiring `MegaMenu`, `Footer`, `SearchModal`, `RelatedTools`, and the public `Blog.jsx` listing to the API hooks (`useCategories`, `useTools`, `useBlogPosts`) the same way `Home.jsx`/`Tools.jsx` already are.
- Wire `useSiteSettings` into the places that currently hardcode "ToolHub" (page titles, footer, SEO defaults).
- Payment integration for Premium/Pro plans, once you're ready for it.

## Pre-Phase-4 audit (code quality, accessibility, performance)

Before starting authentication, the codebase was reviewed and the following changes were made:

**Duplication removed:**
- `src/hooks/useToolResult.js` (new) — extracted the processing status/result-blob/object-URL lifecycle that was separately reimplemented in `ImageConverterTool`, `ImageCompressor`, `ImageResizer`, `RotateFlipTool`, and `ImageCrop`.
- `src/components/tools/ToolWorkspace.jsx` (new) — extracted the error-banner + drop-zone/file-info skeleton that was duplicated across those same 5 files.
- Removed two dead exports found by cross-referencing every export against its call sites: `getPostBySlug` (`src/data/blog.js`) and `formatSavings` (`src/lib/formatBytes.js`) — both defined but never called anywhere.

**Folder structure:**
- Moved `ImageConverterTool.jsx`, `RotateFlipTool.jsx`, and `CropStage.jsx` into `src/components/tools/image/` — these are image-format-specific processing engines, distinct from the generic tool chrome (`ToolLayout`, `DropZone`, `PreviewPanel`, etc.) that any future tool category (PDF, text, dev tools) will also reuse. Future categories get their own `src/components/tools/pdf/`, `src/components/tools/text/` siblings without cluttering the shared components.

**Accessibility:**
- `MotionConfig reducedMotion="user"` in `main.jsx` — every Framer Motion animation site-wide now respects the OS-level "reduce motion" preference automatically.
- Skip-to-content link in `Layout.jsx` so keyboard users can bypass the navbar/mega menu.
- Decorative logo icons marked `aria-hidden` in Navbar/Footer (screen readers previously announced "T, ToolHub" redundantly).
- `SearchModal`: added a focus trap (Tab/Shift+Tab cycle within the dialog) and focus is returned to whatever triggered it on close.
- `MegaMenu`: closes on Escape and on an outside click (previously only closed via hover-leave or clicking a link).
- `CropStage`: the crop box is now keyboard-operable — Tab to it, arrow keys move it, Shift+arrow keys resize it. Previously pointer/touch only.
- `FAQAccordion`: trigger buttons and panels are now linked via `aria-controls`/`aria-labelledby`.
- Form labels in `ImageResizer` given explicit `htmlFor`/`id` pairs; toggle buttons across tools given `aria-pressed`.

**Performance:**
- All 17 routes in `App.jsx` converted to `React.lazy` + a top-level `Suspense` boundary (`src/components/ui/PageLoader.jsx`), so each page's JS only downloads when visited instead of bundling everything into the initial load.
- Fixed a real bug found during the audit: `compressImage` previously kept PNG inputs as PNG output, where canvas re-encoding ignores the quality parameter — meaning the quality slider silently did nothing for PNG uploads. It now always compresses to JPEG unless explicitly overridden, matching the tool's own FAQ copy. *(This was actually fixed during Phase 3 QA, not this audit — noted here for completeness.)*

**Verified, not changed:**
- No orphaned files — every file in `src/` is imported from somewhere (checked programmatically).
- All 10 tool slugs cross-checked for consistency across `tools.js`, `toolFaq.js`, page files, and `App.jsx` routes.
- All relative imports resolve to real files (checked programmatically after the folder move).
- `package.json` dependencies unchanged — no new packages were introduced by this audit.

**Suggested for later (not done now — out of scope for a pre-auth audit):**
- Automated accessibility testing (axe DevTools or `eslint-plugin-jsx-a11y`) to catch color-contrast and other issues a manual pass can miss.
- A real test suite (Vitest + React Testing Library) — nothing currently has automated tests.
- TypeScript migration, if the team wants stronger guarantees as the codebase grows.
- `sitemap.xml`, generated at build time once tool pages stabilize.
- Bundle-size analysis (`rollup-plugin-visualizer`) once the PDF/dev/text tool categories add more weight.
