import {
  HiOutlinePhoto,
  HiOutlineDocumentText,
  HiOutlineCommandLine,
  HiOutlineLanguage,
  HiOutlineSparkles,
  HiOutlineSwatch,
  HiOutlineShieldCheck,
  HiOutlineShare,
  HiOutlineMusicalNote,
} from 'react-icons/hi2'

export const categories = [
  {
    id: 'image-tools',
    name: 'Image Tools',
    slug: 'image-tools',
    description: 'Convert, compress, resize, crop and rotate images.',
    intro:
      'Everyday image editing without installing anything — compress a photo before uploading it somewhere, convert between JPG, PNG and WebP, resize an image to exact dimensions, or crop and rotate it. Every tool here runs in your browser, so your images are never uploaded to a server.',
    icon: HiOutlinePhoto,
    color: 'brand',
    promoImage: '/images/promo/image-tools.png',
  },
  {
    id: 'pdf-tools',
    name: 'PDF Tools',
    slug: 'pdf-tools',
    description: 'Merge, split, compress and convert PDF files.',
    intro:
      'Work with PDF files without needing a paid app — merge multiple PDFs into one, split one apart, compress a large file down, or convert between PDF and image, Word, or PowerPoint formats. Processing happens locally in your browser wherever technically possible.',
    icon: HiOutlineDocumentText,
    color: 'rose',
    promoImage: '/images/promo/pdf-tools.png',
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    slug: 'developer-tools',
    description: 'Formatters, encoders and testers for everyday dev work.',
    intro:
      'Small, focused utilities for everyday development work — format and validate JSON, test a regular expression, encode or decode Base64 and URLs, generate a UUID or hash, or parse a User-Agent string. Built for quick, in-browser use without needing a full IDE or command line.',
    icon: HiOutlineCommandLine,
    color: 'violet',
    promoImage: '/images/promo/developer-tools.png',
  },
  {
    id: 'text-tools',
    name: 'Text Tools',
    slug: 'text-tools',
    description: 'Count, convert, format and generate text content.',
    intro:
      'Quick, browser-based tools for working with plain text — count words and characters, convert between letter cases, or generate placeholder text for a design mockup. Nothing you type here is ever sent anywhere.',
    icon: HiOutlineLanguage,
    color: 'emerald',
    promoImage: '/images/promo/text-tools.png',
  },
  {
    id: 'ai-tools',
    name: 'AI Tools',
    slug: 'ai-tools',
    description: 'AI-powered background removal, upscaling and more.',
    intro: 'AI-powered image editing tools, including background removal and image upscaling.',
    icon: HiOutlineSparkles,
    color: 'fuchsia',
  },
  {
    id: 'color-tools',
    name: 'Color Tools',
    slug: 'color-tools',
    description: 'Pick colors, build palettes and generate gradients.',
    intro:
      'Tools for working with color in design and development — pick a color from an image, convert between HEX, RGB and HSL, build a coordinated palette, or generate a CSS gradient. Useful for both quick lookups and building out a full design system.',
    icon: HiOutlineSwatch,
    color: 'amber',
    promoImage: '/images/promo/color-tools.png',
  },
  {
    id: 'security-tools',
    name: 'Security Tools',
    slug: 'security-tools',
    description: 'Generate passwords, hashes and check data safety.',
    intro:
      'Tools for everyday security tasks — generate a strong random password, check how strong an existing password actually is, or generate a cryptographic hash. Everything runs locally in your browser, so nothing you type is ever transmitted.',
    icon: HiOutlineShieldCheck,
    color: 'sky',
  },
  {
    id: 'social-media-tools',
    name: 'Social Media Tools',
    slug: 'social-media-tools',
    description: 'Resize and prepare images for every social platform.',
    intro:
      'Prepare images for social platforms with the exact dimensions each one expects — resize a photo for an Instagram post or Story, or download a YouTube video\u2019s thumbnail. Saves the guesswork of matching a platform\u2019s specific size requirements by hand.',
    icon: HiOutlineShare,
    color: 'indigo',
  },
  {
    id: 'audio-video-tools',
    name: 'Audio & Video Tools',
    slug: 'audio-video-tools',
    description: 'Convert, trim and edit audio and video files.',
    intro:
      'A few things come up over and over with audio and video: converting a file to a format that actually plays where you need it, cutting a clip down to just the part you want, pulling a GIF out of a longer video. These tools handle the common cases directly in your browser.',
    icon: HiOutlineMusicalNote,
    color: 'cyan',
  },
]

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug)
}

// Tailwind's JIT scanner only picks up class names it can see literally in source
// files, so dynamic `bg-${color}-50` strings would be purged. This map keeps every
// class name literal so category accent colors render correctly in production builds.
export const categoryColorClasses = {
  brand: {
    bg: 'bg-brand-50 dark:bg-brand-950',
    text: 'text-brand-600 dark:text-brand-400',
    ring: 'ring-brand-500/20',
    gradient: 'from-brand-500 to-brand-600',
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-950',
    text: 'text-rose-600 dark:text-rose-400',
    ring: 'ring-rose-500/20',
    gradient: 'from-rose-500 to-rose-600',
  },
  violet: {
    bg: 'bg-violet-50 dark:bg-violet-950',
    text: 'text-violet-600 dark:text-violet-400',
    ring: 'ring-violet-500/20',
    gradient: 'from-violet-500 to-violet-600',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-950',
    text: 'text-emerald-600 dark:text-emerald-400',
    ring: 'ring-emerald-500/20',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  fuchsia: {
    bg: 'bg-fuchsia-50 dark:bg-fuchsia-950',
    text: 'text-fuchsia-600 dark:text-fuchsia-400',
    ring: 'ring-fuchsia-500/20',
    gradient: 'from-fuchsia-500 to-fuchsia-600',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-950',
    text: 'text-amber-600 dark:text-amber-400',
    ring: 'ring-amber-500/20',
    gradient: 'from-amber-500 to-amber-600',
  },
  sky: {
    bg: 'bg-sky-50 dark:bg-sky-950',
    text: 'text-sky-600 dark:text-sky-400',
    ring: 'ring-sky-500/20',
    gradient: 'from-sky-500 to-sky-600',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-950',
    text: 'text-indigo-600 dark:text-indigo-400',
    ring: 'ring-indigo-500/20',
    gradient: 'from-indigo-500 to-indigo-600',
  },
  cyan: {
    bg: 'bg-cyan-50 dark:bg-cyan-950',
    text: 'text-cyan-600 dark:text-cyan-400',
    ring: 'ring-cyan-500/20',
    gradient: 'from-cyan-500 to-cyan-600',
  },
}

const TOOL_COLOR_KEYS = Object.keys(categoryColorClasses)

/**
 * Deterministically assigns one of the same 8 curated category colors to
 * an individual tool, by id — used for tool card icons so cards within
 * one category (e.g. all Image Tools) each get a distinct, pleasant
 * color instead of every card looking identical. Deterministic (not
 * random) so a given tool always gets the same color across re-renders,
 * re-sorts, or repeat visits — it's a stable visual identity, not a
 * decoration that shifts around.
 */
export function getToolColorClasses(toolId) {
  const str = String(toolId)
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0
  }
  // Mixing/finalizer step — a plain DJB2 hash has known-weak low bits
  // against a power-of-2 modulus (8 colors), which was verified to
  // produce badly clustered results (one color covering 40%+ of real
  // tool ids) before this was added. Same principle as Murmur3's fmix:
  // spread entropy across all bits before the modulo.
  hash = Math.imul(hash ^ (hash >>> 16), 2246822507)
  hash = hash ^ (hash >>> 13)
  const key = TOOL_COLOR_KEYS[Math.abs(hash) % TOOL_COLOR_KEYS.length]
  return categoryColorClasses[key]
}
