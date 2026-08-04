# ToolHub

Free online tools — starting with image conversion, compression, resizing, cropping and rotation. Built to be fast, responsive, SEO-friendly, and easy to extend with new tools and categories over time.

## Tech Stack

- **Frontend:** React + Vite, Tailwind CSS, React Router, Framer Motion, React Icons, react-helmet-async
- **Backend (Phase 2):** Node.js, Express.js, MongoDB, JWT Authentication

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

### Other scripts

```bash
npm run build    # production build to /dist
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

## Project Structure

```
toolhub/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   └── ui/
│   │       ├── Container.jsx
│   │       ├── ThemeToggle.jsx
│   │       ├── ToolCard.jsx
│   │       └── SEO.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── data/
│   │   └── tools.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Tools.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## Adding a new tool

1. Add an entry to the `tools` array in `src/data/tools.js` (name, slug, path, category, description, icon).
2. Once the tool's page is built, remove `comingSoon: true` from its entry so its card becomes clickable.
3. Create the tool's page component under `src/pages/tools/` and register its route in `src/App.jsx`.

## Status

**Phase 1 (in progress):** Frontend scaffold, routing, layout, dark/light mode, homepage, and tools listing page.
Individual tool pages (JPG to PNG, Image Compressor, etc.) will be built one at a time in Phase 3.
