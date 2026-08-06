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

See `.env.example` for the full list with defaults. The only one you must set yourself is `MONGODB_URI` — everything else has a sensible default for local development.

| Variable | Purpose |
|---|---|
| `NODE_ENV` | `development` or `production` |
| `PORT` | Port the API listens on (default `5000`) |
| `MONGODB_URI` | MongoDB Atlas (or local) connection string |
| `CLIENT_URL` | Frontend origin, used for CORS |
| `RATE_LIMIT_WINDOW_MS` / `RATE_LIMIT_MAX` | API rate limiting |
| `UPLOAD_MAX_FILE_SIZE_MB` / `UPLOAD_DIR` | File upload limits and storage location |
| `JWT_SECRET` / `JWT_EXPIRES_IN` | Reserved for Phase 5 (authentication) — unused by anything right now |

## Folder structure

```
server/
├── api/
│   └── index.js      Vercel serverless entry point (see "Deploying to Vercel" below)
├── app.js             the Express app itself — no side effects, imported by both entry points
├── server.js           entry point for traditional hosting (local dev, Render, Railway, ...)
├── config/         env.js (central config object), db.js (cached Mongoose connection)
├── controllers/    thin HTTP handlers — call services, format the response
├── middleware/      errorHandler, notFound, logger, rateLimiter, sanitizeInput, upload
│   └── validators/  express-validator chains, one file per resource
├── models/          Mongoose schemas: Tool, Category, Blog, SiteSettings
├── routes/           Express routers, one file per resource, combined in index.js
├── services/         Mongoose queries live here, not in controllers (clean architecture)
├── utils/             ApiError, ApiResponse, asyncHandler, slugify, seed script + data
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
| POST | `/api/uploads` | `multipart/form-data`, field name `file`. Images only (jpg/png/webp/gif/svg), size limit from `UPLOAD_MAX_FILE_SIZE_MB`. Stores to **Vercel Blob** if `BLOB_READ_WRITE_TOKEN` is set (automatic on Vercel once you enable Blob storage), otherwise falls back to writing into the local `uploads/` folder for local development. |

## Deploying to Vercel

Full step-by-step instructions live in the root `README.md`'s "Deploying to Vercel" section, since it covers both the frontend and backend projects together (they need each other's URLs). The short version specific to this backend:

- Deploy this `server/` folder as its own Vercel project (**Root Directory** = `server`) — `vercel.json` and `api/index.js` here handle the serverless adaptation.
- Set `MONGODB_URI` and `CLIENT_URL` as environment variables.
- Enable **Vercel Blob** (project → Storage tab) so file uploads persist — Vercel sets `BLOB_READ_WRITE_TOKEN` automatically.
- Run `npm run seed` locally (pointed at your production `MONGODB_URI`) — it's a one-off script, not something that runs inside a serverless function.

## Write routes are open right now — by design

POST/PUT/DELETE routes currently have no auth check. Phase 4 explicitly excludes authentication — see the `// Auth-protected in Phase 5` comment above the relevant routes in each `routes/*.js` file. When auth is added, a `protect` (and optionally `authorize('admin')`) middleware slots into those exact lines with no other changes needed. **Do not deploy this API publicly before Phase 5 lands** — anyone with the URL can currently create/edit/delete data.

## Icon names

`Tool.icon` and `Category.icon` are string names (e.g. `"FaFileImage"`), not image files. The frontend's `src/lib/iconRegistry.js` maps these strings back to the actual `react-icons` component. If you add a tool/category with a new icon, add the matching import + entry to that registry, or it'll fall back to a generic placeholder icon.

## Security measures in place

- `helmet` — standard security headers
- `cors` — restricted to `CLIENT_URL`
- `express-rate-limit` — applied to all `/api` routes
- Custom `sanitizeInput` middleware — strips NoSQL-operator injection attempts (`$`, `.` in keys) and HTML tags from every request body/query/params, without mangling ordinary text like apostrophes
- `express-validator` — every write route validates its input before touching the database
- Centralized error handler — never leaks stack traces outside development
