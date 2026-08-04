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
│   │   │   ├── MegaMenu.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   └── ui/
│   │       ├── Container.jsx
│   │       ├── ThemeToggle.jsx
│   │       ├── ToolCard.jsx
│   │       ├── CategoryCard.jsx
│   │       ├── StatCounter.jsx
│   │       ├── TestimonialCard.jsx
│   │       ├── BlogCard.jsx
│   │       ├── FAQAccordion.jsx
│   │       ├── SearchModal.jsx
│   │       └── SEO.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── data/
│   │   ├── tools.js
│   │   ├── categories.js
│   │   ├── blog.js
│   │   ├── testimonials.js
│   │   └── faq.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Tools.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Blog.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   ├── Terms.jsx
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

1. Add an entry to the `tools` array in `src/data/tools.js` (name, slug, path, category, description, icon, optional `badge: 'popular' | 'new'`).
2. Once the tool's page is built, remove `comingSoon: true` from its entry so its card becomes clickable.
3. Create the tool's page component under `src/pages/tools/` and register its route in `src/App.jsx`.

## Adding a new category

Add an entry to the `categories` array in `src/data/categories.js`, including an icon and a `color` key that matches one of the palettes defined in `categoryColorClasses` in that same file.

## Status

**Phase 1 (complete):** Frontend scaffold, routing, layout, dark/light mode, homepage, and tools listing page.

**Phase 2 (complete):** Premium SaaS-style redesign — categories mega menu, command-palette search (⌘K), redesigned homepage (hero, featured tools, categories, features, stats, testimonials, FAQ, blog preview), improved Tools page with URL-synced filters, About/Contact/Blog/Privacy Policy/Terms pages, upgraded footer.

**Phase 3 (upcoming):** Express backend, MongoDB, authentication, dashboards, and the actual tool logic (currently all tools are marked `comingSoon` in the data layer and are non-clickable in the UI).
