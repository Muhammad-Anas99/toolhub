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
│   │   ├── tools/
│   │   │   ├── ToolLayout.jsx        (shell every tool page uses)
│   │   │   ├── Breadcrumb.jsx
│   │   │   ├── ToolHeader.jsx
│   │   │   ├── DropZone.jsx          (drag & drop + click upload)
│   │   │   ├── FileInfoCard.jsx
│   │   │   ├── PreviewPanel.jsx      (single or before/after preview)
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── DownloadPanel.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── RelatedTools.jsx
│   │   │   ├── ToolFAQSection.jsx
│   │   │   ├── ImageConverterTool.jsx (generic core: powers 5 format-conversion tools)
│   │   │   ├── RotateFlipTool.jsx     (shared core: powers Rotate + Flip)
│   │   │   └── CropStage.jsx          (draggable/resizable crop box)
│   │   └── ui/
│   │       ├── Container.jsx, ThemeToggle.jsx, ToolCard.jsx, CategoryCard.jsx
│   │       ├── StatCounter.jsx, TestimonialCard.jsx, BlogCard.jsx
│   │       ├── FAQAccordion.jsx, SearchModal.jsx, Slider.jsx, SEO.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   └── useImageUpload.js         (shared upload/drag-drop/validation state)
│   ├── lib/
│   │   ├── imageProcessing.js        (canvas-based convert/compress/resize/rotate/crop)
│   │   ├── fileValidation.js
│   │   ├── formatBytes.js
│   │   └── downloadBlob.js
│   ├── data/
│   │   ├── tools.js, categories.js, blog.js, testimonials.js, faq.js, toolFaq.js
│   ├── pages/
│   │   ├── Home.jsx, Tools.jsx, About.jsx, Contact.jsx, Blog.jsx
│   │   ├── PrivacyPolicy.jsx, Terms.jsx, NotFound.jsx
│   │   └── tools/
│   │       ├── JpgToPng.jsx, PngToJpg.jsx, WebpToPng.jsx, WebpToJpg.jsx
│   │       ├── ConvertToWebp.jsx, ImageCompressor.jsx, ImageResizer.jsx
│   │       └── ImageCrop.jsx, ImageRotate.jsx, FlipImage.jsx
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

**Next up:** Express backend, MongoDB, authentication, and dashboards.

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
