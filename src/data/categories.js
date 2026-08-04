import {
  HiOutlinePhoto,
  HiOutlineDocumentText,
  HiOutlineCommandLine,
  HiOutlineLanguage,
  HiOutlineSparkles,
  HiOutlineSwatch,
  HiOutlineShieldCheck,
  HiOutlineShare,
} from 'react-icons/hi2'

export const categories = [
  {
    id: 'image-tools',
    name: 'Image Tools',
    slug: 'image-tools',
    description: 'Convert, compress, resize, crop and rotate images.',
    icon: HiOutlinePhoto,
    color: 'brand',
  },
  {
    id: 'pdf-tools',
    name: 'PDF Tools',
    slug: 'pdf-tools',
    description: 'Merge, split, compress and convert PDF files.',
    icon: HiOutlineDocumentText,
    color: 'rose',
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    slug: 'developer-tools',
    description: 'Formatters, encoders and testers for everyday dev work.',
    icon: HiOutlineCommandLine,
    color: 'violet',
  },
  {
    id: 'text-tools',
    name: 'Text Tools',
    slug: 'text-tools',
    description: 'Count, convert, format and generate text content.',
    icon: HiOutlineLanguage,
    color: 'emerald',
  },
  {
    id: 'ai-tools',
    name: 'AI Tools',
    slug: 'ai-tools',
    description: 'AI-powered background removal, upscaling and more.',
    icon: HiOutlineSparkles,
    color: 'fuchsia',
  },
  {
    id: 'color-tools',
    name: 'Color Tools',
    slug: 'color-tools',
    description: 'Pick colors, build palettes and generate gradients.',
    icon: HiOutlineSwatch,
    color: 'amber',
  },
  {
    id: 'security-tools',
    name: 'Security Tools',
    slug: 'security-tools',
    description: 'Generate passwords, hashes and check data safety.',
    icon: HiOutlineShieldCheck,
    color: 'sky',
  },
  {
    id: 'social-media-tools',
    name: 'Social Media Tools',
    slug: 'social-media-tools',
    description: 'Resize and prepare images for every social platform.',
    icon: HiOutlineShare,
    color: 'indigo',
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
}
