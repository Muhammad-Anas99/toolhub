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
  { name: 'Merge PDF', slug: 'merge-pdf', path: '/tools/merge-pdf', category: 'pdf-tools', description: 'Combine multiple PDF files into a single document.', icon: 'FaObjectGroup', badge: 'popular', comingSoon: true },
  { name: 'Split PDF', slug: 'split-pdf', path: '/tools/split-pdf', category: 'pdf-tools', description: 'Split a PDF into separate pages or page ranges.', icon: 'FaObjectUngroup', comingSoon: true },
  { name: 'Compress PDF', slug: 'compress-pdf', path: '/tools/compress-pdf', category: 'pdf-tools', description: 'Shrink PDF file size while keeping it readable.', icon: 'FaFilePdf', comingSoon: true },
  { name: 'PDF to Word', slug: 'pdf-to-word', path: '/tools/pdf-to-word', category: 'pdf-tools', description: 'Convert PDF documents into editable Word files.', icon: 'FaFileWord', badge: 'new', comingSoon: true },

  // ---------- Developer Tools ----------
  { name: 'JSON Formatter', slug: 'json-formatter', path: '/tools/json-formatter', category: 'developer-tools', description: 'Format, validate and beautify JSON data instantly.', icon: 'FaCode', badge: 'popular', comingSoon: true },
  { name: 'Base64 Encoder / Decoder', slug: 'base64-encoder', path: '/tools/base64-encoder', category: 'developer-tools', description: 'Encode or decode Base64 strings and files.', icon: 'FaLock', comingSoon: true },
  { name: 'Regex Tester', slug: 'regex-tester', path: '/tools/regex-tester', category: 'developer-tools', description: 'Test and debug regular expressions with live matches.', icon: 'FaMagnifyingGlass', comingSoon: true },
  { name: 'Code Minifier', slug: 'code-minifier', path: '/tools/code-minifier', category: 'developer-tools', description: 'Minify CSS, JavaScript and HTML to reduce file size.', icon: 'FaBroom', badge: 'new', comingSoon: true },

  // ---------- Text Tools ----------
  { name: 'Word Counter', slug: 'word-counter', path: '/tools/word-counter', category: 'text-tools', description: 'Count words, characters, sentences and paragraphs.', icon: 'FaFont', badge: 'popular', comingSoon: true },
  { name: 'Case Converter', slug: 'case-converter', path: '/tools/case-converter', category: 'text-tools', description: 'Convert text between upper, lower, title and sentence case.', icon: 'FaListOl', comingSoon: true },
  { name: 'Lorem Ipsum Generator', slug: 'lorem-ipsum-generator', path: '/tools/lorem-ipsum-generator', category: 'text-tools', description: 'Generate placeholder text for mockups and designs.', icon: 'FaFont', comingSoon: true },

  // ---------- AI Tools ----------
  { name: 'AI Background Remover', slug: 'ai-background-remover', path: '/tools/ai-background-remover', category: 'ai-tools', description: 'Remove image backgrounds automatically using AI.', icon: 'FaWandMagicSparkles', badge: 'new', comingSoon: true },
  { name: 'AI Image Upscaler', slug: 'ai-image-upscaler', path: '/tools/ai-image-upscaler', category: 'ai-tools', description: 'Upscale images to higher resolution with AI.', icon: 'FaImages', badge: 'new', comingSoon: true },

  // ---------- Color Tools ----------
  { name: 'Color Picker', slug: 'color-picker', path: '/tools/color-picker', category: 'color-tools', description: 'Pick colors from an image and get their exact codes.', icon: 'FaEyeDropper', comingSoon: true },
  { name: 'Palette Generator', slug: 'palette-generator', path: '/tools/palette-generator', category: 'color-tools', description: 'Generate beautiful, harmonious color palettes.', icon: 'FaPalette', badge: 'popular', comingSoon: true },
  { name: 'Gradient Generator', slug: 'gradient-generator', path: '/tools/gradient-generator', category: 'color-tools', description: 'Create smooth CSS gradients with a visual editor.', icon: 'FaPalette', comingSoon: true },

  // ---------- Security Tools ----------
  { name: 'Password Generator', slug: 'password-generator', path: '/tools/password-generator', category: 'security-tools', description: 'Generate strong, random and secure passwords.', icon: 'FaKey', badge: 'popular', comingSoon: true },
  { name: 'Hash Generator', slug: 'hash-generator', path: '/tools/hash-generator', category: 'security-tools', description: 'Generate MD5, SHA-1 and SHA-256 hashes from text.', icon: 'FaHashtag', comingSoon: true },

  // ---------- Social Media Tools ----------
  { name: 'Instagram Post Resizer', slug: 'instagram-post-resizer', path: '/tools/instagram-post-resizer', category: 'social-media-tools', description: 'Resize images to fit Instagram posts and stories.', icon: 'FaInstagram', comingSoon: true },
  { name: 'YouTube Thumbnail Downloader', slug: 'youtube-thumbnail-downloader', path: '/tools/youtube-thumbnail-downloader', category: 'social-media-tools', description: 'Download thumbnail images from any YouTube video.', icon: 'FaYoutube', badge: 'new', comingSoon: true },
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
]
