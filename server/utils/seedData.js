/**
 * Plain-object mirror of the frontend's current static data
 * (client/src/data/categories.js, tools.js, blog.js), with icons stored as
 * string names instead of component references — Node can't import JSX
 * icon components, and the frontend's iconRegistry.js resolves these same
 * string names back to components on read. Keeping the two in sync by hand
 * is a known tradeoff of this seed-based approach; once the frontend is
 * fully API-driven this file becomes the single source of truth instead.
 */

export const categorySeed = [
  {
    name: 'Image Tools',
    slug: 'image-tools',
    description: 'Convert, compress, resize, crop and rotate images.',
    icon: 'HiOutlinePhoto',
    color: 'brand',
    order: 1,
  },
  {
    name: 'PDF Tools',
    slug: 'pdf-tools',
    description: 'Merge, split, compress and convert PDF files.',
    icon: 'HiOutlineDocumentText',
    color: 'rose',
    order: 2,
  },
  {
    name: 'Developer Tools',
    slug: 'developer-tools',
    description: 'Formatters, encoders and testers for everyday dev work.',
    icon: 'HiOutlineCommandLine',
    color: 'violet',
    order: 3,
  },
  {
    name: 'Text Tools',
    slug: 'text-tools',
    description: 'Count, convert, format and generate text content.',
    icon: 'HiOutlineLanguage',
    color: 'emerald',
    order: 4,
  },
  {
    name: 'AI Tools',
    slug: 'ai-tools',
    description: 'AI-powered background removal, upscaling and more.',
    icon: 'HiOutlineSparkles',
    color: 'fuchsia',
    order: 5,
  },
  {
    name: 'Color Tools',
    slug: 'color-tools',
    description: 'Pick colors, build palettes and generate gradients.',
    icon: 'HiOutlineSwatch',
    color: 'amber',
    order: 6,
  },
  {
    name: 'Security Tools',
    slug: 'security-tools',
    description: 'Generate passwords, hashes and check data safety.',
    icon: 'HiOutlineShieldCheck',
    color: 'sky',
    order: 7,
  },
  {
    name: 'Social Media Tools',
    slug: 'social-media-tools',
    description: 'Resize and prepare images for every social platform.',
    icon: 'HiOutlineShare',
    color: 'indigo',
    order: 8,
  },
]

export const toolSeed = [
  // ---------- Image Tools (fully working) ----------
  { name: 'JPG to PNG', slug: 'jpg-to-png', path: '/tools/jpg-to-png', category: 'image-tools', description: 'Convert JPG images to PNG format while preserving quality.', icon: 'FaFileImage', badge: 'popular', comingSoon: false },
  { name: 'PNG to JPG', slug: 'png-to-jpg', path: '/tools/png-to-jpg', category: 'image-tools', description: 'Convert PNG images to JPG format with adjustable quality.', icon: 'FaImage', badge: 'popular', comingSoon: false },
  { name: 'WEBP to PNG', slug: 'webp-to-png', path: '/tools/webp-to-png', category: 'image-tools', description: 'Convert modern WEBP images to the widely-supported PNG format.', icon: 'FaFileImage', comingSoon: false },
  { name: 'WEBP to JPG', slug: 'webp-to-jpg', path: '/tools/webp-to-jpg', category: 'image-tools', description: 'Convert modern WEBP images to the widely-supported JPG format.', icon: 'FaFileImage', comingSoon: false },
  { name: 'Convert to WEBP', slug: 'convert-to-webp', path: '/tools/convert-to-webp', category: 'image-tools', description: 'Convert JPG or PNG images to the modern, smaller WEBP format.', icon: 'FaFileImage', badge: 'new', comingSoon: false },
  { name: 'Image Compressor', slug: 'image-compressor', path: '/tools/image-compressor', category: 'image-tools', description: 'Reduce image file size with an adjustable quality slider and live preview.', icon: 'FaCompress', badge: 'popular', comingSoon: false },
  { name: 'Image Resizer', slug: 'image-resizer', path: '/tools/image-resizer', category: 'image-tools', description: 'Resize images to exact pixel dimensions or a percentage scale.', icon: 'FaExpand', comingSoon: false },
  { name: 'Image Cropper', slug: 'image-crop', path: '/tools/image-crop', category: 'image-tools', description: 'Crop images to the exact area you need with drag, zoom and rotate.', icon: 'FaCrop', badge: 'new', comingSoon: false },
  { name: 'Image Rotator', slug: 'image-rotate', path: '/tools/image-rotate', category: 'image-tools', description: 'Rotate images left, right, or to any 90\u00b0 increment.', icon: 'FaRotate', comingSoon: false },
  { name: 'Flip Image', slug: 'flip-image', path: '/tools/flip-image', category: 'image-tools', description: 'Flip images horizontally or vertically in one click.', icon: 'FaArrowsLeftRight', comingSoon: false },

  // ---------- PDF Tools ----------
  { name: 'JPG to PDF', slug: 'jpg-to-pdf', path: '/tools/jpg-to-pdf', category: 'pdf-tools', description: 'Turn a JPG image into a single-page PDF document.', icon: 'FaFileArrowUp', badge: 'new', comingSoon: false },
  { name: 'PNG to PDF', slug: 'png-to-pdf', path: '/tools/png-to-pdf', category: 'pdf-tools', description: 'Turn a PNG image into a single-page PDF document.', icon: 'FaFileArrowUp', comingSoon: false },
  { name: 'Merge PDF', slug: 'merge-pdf', path: '/tools/merge-pdf', category: 'pdf-tools', description: 'Combine multiple PDF files into a single document, in any order.', icon: 'FaObjectGroup', badge: 'popular', comingSoon: false },
  { name: 'Split PDF', slug: 'split-pdf', path: '/tools/split-pdf', category: 'pdf-tools', description: 'Extract specific pages or page ranges from a PDF into a new document.', icon: 'FaObjectUngroup', comingSoon: false },
  { name: 'PDF to JPG', slug: 'pdf-to-jpg', path: '/tools/pdf-to-jpg', category: 'pdf-tools', description: 'Convert PDF pages into JPG images, one page at a time.', icon: 'FaFileArrowDown', badge: 'new', comingSoon: false },
  { name: 'PDF to PNG', slug: 'pdf-to-png', path: '/tools/pdf-to-png', category: 'pdf-tools', description: 'Convert PDF pages into PNG images, one page at a time.', icon: 'FaFileArrowDown', comingSoon: false },
  { name: 'Compress PDF', slug: 'compress-pdf', path: '/tools/compress-pdf', category: 'pdf-tools', description: 'Shrink PDF file size while keeping it readable.', icon: 'FaFilePdf', comingSoon: false },
  { name: 'PDF to Word', slug: 'pdf-to-word', path: '/tools/pdf-to-word', category: 'pdf-tools', description: 'Extract text from a PDF into an editable Word document.', icon: 'FaFileWord', comingSoon: false },
  { name: 'PDF to PowerPoint', slug: 'pdf-to-powerpoint', path: '/tools/pdf-to-powerpoint', category: 'pdf-tools', description: 'Turn every page of a PDF into a slide in a PowerPoint presentation.', icon: 'FaFilePowerpoint', comingSoon: false },
  { name: 'Excel to PDF', slug: 'excel-to-pdf', path: '/tools/excel-to-pdf', category: 'pdf-tools', description: 'Convert an Excel spreadsheet into a clean, printable PDF.', icon: 'FaFileExcel', comingSoon: false },
  { name: 'Word to PDF', slug: 'word-to-pdf', path: '/tools/word-to-pdf', category: 'pdf-tools', description: 'Convert a Word document into a PDF, keeping headings and basic formatting.', icon: 'FaFileWord', comingSoon: false },

  // ---------- Color Tools (fully working) ----------
  { name: 'Color Picker', slug: 'color-picker', path: '/tools/color-picker', category: 'color-tools', description: 'Pick colors from an image and get their exact hex, RGB and HSL codes.', icon: 'FaEyeDropper', comingSoon: false },
  { name: 'HEX to RGB', slug: 'hex-to-rgb', path: '/tools/hex-to-rgb', category: 'color-tools', description: 'Convert HEX color codes to RGB values instantly.', icon: 'FaDroplet', badge: 'popular', comingSoon: false },
  { name: 'RGB to HEX', slug: 'rgb-to-hex', path: '/tools/rgb-to-hex', category: 'color-tools', description: 'Convert RGB color values to HEX codes instantly.', icon: 'FaDroplet', comingSoon: false },
  { name: 'HEX to HSL', slug: 'hex-to-hsl', path: '/tools/hex-to-hsl', category: 'color-tools', description: 'Convert HEX color codes to HSL values instantly.', icon: 'FaSliders', comingSoon: false },
  { name: 'Color Converter', slug: 'color-converter', path: '/tools/color-converter', category: 'color-tools', description: 'Convert between HEX, RGB and HSL color formats in one place.', icon: 'FaPalette', badge: 'new', comingSoon: false },
  { name: 'Color Palette Generator', slug: 'palette-generator', path: '/tools/palette-generator', category: 'color-tools', description: 'Generate complementary, analogous, triadic and shade palettes from any color.', icon: 'FaPalette', badge: 'popular', comingSoon: false },
  { name: 'Gradient Generator', slug: 'gradient-generator', path: '/tools/gradient-generator', category: 'color-tools', description: 'Create smooth linear and radial CSS gradients with a visual editor.', icon: 'FaPalette', comingSoon: false },

  // ---------- Developer Tools (fully working) ----------
  { name: 'JSON Formatter', slug: 'json-formatter', path: '/tools/json-formatter', category: 'developer-tools', description: 'Format, beautify or minify JSON data instantly.', icon: 'FaCode', badge: 'popular', comingSoon: false },
  { name: 'JSON Validator', slug: 'json-validator', path: '/tools/json-validator', category: 'developer-tools', description: 'Check whether your JSON is valid, with the exact line and column of any error.', icon: 'FaCircleCheck', comingSoon: false },
  { name: 'Base64 Encoder / Decoder', slug: 'base64-encoder', path: '/tools/base64-encoder', category: 'developer-tools', description: 'Encode or decode Base64 strings, with full Unicode support.', icon: 'FaLock', comingSoon: false },
  { name: 'URL Encoder / Decoder', slug: 'url-encoder', path: '/tools/url-encoder', category: 'developer-tools', description: 'Encode or decode URLs and query string components.', icon: 'FaLink', comingSoon: false },
  { name: 'UUID Generator', slug: 'uuid-generator', path: '/tools/uuid-generator', category: 'developer-tools', description: 'Generate random, RFC-compliant UUIDs (v4), one or in bulk.', icon: 'FaFingerprint', badge: 'new', comingSoon: false },
  { name: 'Hash Generator', slug: 'hash-generator', path: '/tools/hash-generator', category: 'developer-tools', description: 'Generate MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes from text.', icon: 'FaHashtag', comingSoon: false },
  { name: 'Timestamp Converter', slug: 'timestamp-converter', path: '/tools/timestamp-converter', category: 'developer-tools', description: 'Convert between Unix timestamps and human-readable dates.', icon: 'FaClock', comingSoon: false },
  { name: 'Regex Tester', slug: 'regex-tester', path: '/tools/regex-tester', category: 'developer-tools', description: 'Test and debug regular expressions with live, highlighted matches.', icon: 'FaMagnifyingGlass', badge: 'popular', comingSoon: false },
  { name: 'Code Minifier', slug: 'code-minifier', path: '/tools/code-minifier', category: 'developer-tools', description: 'Minify CSS, JavaScript and HTML to reduce file size.', icon: 'FaBroom', comingSoon: false },

  // ---------- Text Tools ----------
  { name: 'Word Counter', slug: 'word-counter', path: '/tools/word-counter', category: 'text-tools', description: 'Count words, characters, sentences and paragraphs, with a reading time estimate.', icon: 'FaFont', badge: 'popular', comingSoon: false },
  { name: 'Case Converter', slug: 'case-converter', path: '/tools/case-converter', category: 'text-tools', description: 'Convert text between upper, lower, title, sentence, camel, snake and kebab case.', icon: 'FaListOl', comingSoon: false },
  { name: 'Lorem Ipsum Generator', slug: 'lorem-ipsum-generator', path: '/tools/lorem-ipsum-generator', category: 'text-tools', description: 'Generate placeholder text for mockups and designs, by words, sentences or paragraphs.', icon: 'FaFont', comingSoon: false },

  // ---------- AI Tools ----------
  { name: 'AI Background Remover', slug: 'ai-background-remover', path: '/tools/ai-background-remover', category: 'ai-tools', description: 'Remove image backgrounds automatically using AI.', icon: 'FaWandMagicSparkles', badge: 'new', comingSoon: true },
  { name: 'AI Image Upscaler', slug: 'ai-image-upscaler', path: '/tools/ai-image-upscaler', category: 'ai-tools', description: 'Upscale images to higher resolution with AI.', icon: 'FaImages', badge: 'new', comingSoon: true },
  { name: 'AI Image Enhancer', slug: 'ai-image-enhancer', path: '/tools/ai-image-enhancer', category: 'ai-tools', description: 'Automatically sharpen, denoise and improve photo quality using AI.', icon: 'FaWandMagicSparkles', comingSoon: true },

  // ---------- Security Tools ----------
  { name: 'Password Generator', slug: 'password-generator', path: '/tools/password-generator', category: 'security-tools', description: 'Generate strong, random and secure passwords with adjustable length and character types.', icon: 'FaKey', badge: 'popular', comingSoon: false },

  // ---------- Social Media Tools ----------
  { name: 'Instagram Post Resizer', slug: 'instagram-post-resizer', path: '/tools/instagram-post-resizer', category: 'social-media-tools', description: 'Resize images to fit Instagram posts, stories and profile pictures.', icon: 'FaInstagram', comingSoon: false },
  { name: 'YouTube Thumbnail Downloader', slug: 'youtube-thumbnail-downloader', path: '/tools/youtube-thumbnail-downloader', category: 'social-media-tools', description: 'Download thumbnail images from any YouTube video.', icon: 'FaYoutube', badge: 'new', comingSoon: false },
]


export const blogSeed = [
  {
    title: 'JPG vs PNG vs WEBP: Which Image Format Should You Use?',
    slug: 'jpg-vs-png-vs-webp',
    excerpt: 'A practical breakdown of the three most common image formats, when to use each one, and how they affect quality and file size.',
    content: 'A practical breakdown of the three most common image formats, when to use each one, and how they affect quality and file size. JPG suits photos, PNG suits graphics needing transparency, and WEBP often beats both for web delivery.',
    category: 'Image Tools',
    author: 'ToolHub Team',
    readTime: '6 min read',
    published: true,
  },
  {
    title: 'How to Reduce Image File Size Without Losing Quality',
    slug: 'how-to-reduce-image-file-size-without-losing-quality',
    excerpt: 'Compression techniques, format choices and simple habits that shrink your images while keeping them sharp.',
    content: 'Compression techniques, format choices and simple habits that shrink your images while keeping them sharp. Start with format choice, then adjust quality incrementally while comparing the visual result.',
    category: 'Image Tools',
    author: 'ToolHub Team',
    readTime: '5 min read',
    published: true,
  },
  {
    title: 'The 2026 Social Media Image Size Guide',
    slug: 'social-media-image-size-guide-2026',
    excerpt: 'Up-to-date dimensions for Instagram, YouTube, and other platforms, plus tips for exporting crisp images every time.',
    content: 'Up-to-date dimensions for Instagram, YouTube, and other platforms, plus tips for exporting crisp images every time. Platform requirements change often, so re-check before a big campaign.',
    category: 'Social Media Tools',
    author: 'ToolHub Team',
    readTime: '7 min read',
    published: true,
  },
  {
    title: 'JSON Formatting and Validation Tips for Developers',
    slug: 'json-formatting-and-validation-tips-for-developers',
    excerpt: 'Common JSON mistakes, how to catch them early, and habits that keep your data clean across a project.',
    content: 'Common JSON mistakes, how to catch them early, and habits that keep your data clean across a project. Trailing commas and unquoted keys are the most frequent culprits.',
    category: 'Developer Tools',
    author: 'ToolHub Team',
    readTime: '4 min read',
    published: true,
  },
  {
    title: 'Is It Safe to Upload Contracts and Financial Documents to Online PDF Tools?',
    slug: 'is-it-safe-to-upload-contracts-financial-documents-online-pdf-tools',
    excerpt: 'Most free PDF tools work by uploading your file to a server first. For a client contract or a financial statement, that step is worth understanding before you use one.',
    content: `Most free online PDF tools follow the same basic pattern: you upload your file, their server processes it, and you download the result. For a random screenshot or a public flyer, that's a non-issue. For a signed client contract, a tax document, or a financial statement, it's worth actually thinking about.

**What "upload first, process second" actually means**

When a tool works this way, your file leaves your device and sits on a server you don't control, even if only for a few seconds. Most services delete files after processing and say so in their privacy policy — and most of the time that's true. But it's still a step where your document exists somewhere outside your own machine, governed by someone else's infrastructure and someone else's mistakes, not yours.

For a birthday invite, that risk is meaningless. For a contract with a client's signature, banking details, or negotiated terms, it's a real question worth two extra minutes of thought.

**The alternative: processing that never leaves your browser**

Not every tool works the upload-first way. Some — including most of the tools on ToolHub — process files entirely client-side, meaning the actual compression, conversion, or merging happens inside your own browser tab using your device's own resources. The file is never transmitted anywhere for the operation to complete.

This isn't a marketing claim to take on faith — it's a consequence of how the tool is built. A tool that never sends your file to a server architecturally *can't* leak it in transit or leave a copy sitting on someone else's disk, because there's nothing to intercept and nowhere for a copy to exist.

**A simple way to check any tool you're using**

You don't have to take any site's word for it. Open your browser's developer tools (Network tab), use the tool, and watch what happens. If you see your file being uploaded as a network request, it's server-side. If you don't, it's processing locally. It's a two-minute check that tells you definitively, rather than relying on a privacy policy you'd have to trust.

**Where this actually matters most**

- Contracts with signatures, terms, or negotiated pricing
- Financial statements, invoices, tax documents
- Anything under an NDA or containing a client's business details
- HR documents with personal or salary information

For everyday, non-sensitive files, the distinction genuinely doesn't matter much. For anything above, it's worth choosing a tool that processes locally — not because every upload-based tool is doing something wrong, but because there's no reason to accept even a small, well-intentioned risk when a browser-based alternative exists and costs nothing extra to use.`,
    category: 'PDF Tools',
    author: 'ToolHub Team',
    readTime: '5 min read',
    published: true,
  },
]
