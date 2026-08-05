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

**Next up:** Express backend, MongoDB, authentication, and dashboards (explicitly out of scope for Phase 3).
