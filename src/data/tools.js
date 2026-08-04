import {
  FaFileImage,
  FaImage,
  FaCompress,
  FaExpand,
  FaCrop,
  FaRotate,
} from 'react-icons/fa6'

export const categories = [
  {
    id: 'image-tools',
    name: 'Image Tools',
    slug: 'image-tools',
    description: 'Convert, compress, resize, crop and rotate images in your browser.',
  },
]

export const tools = [
  {
    id: 'jpg-to-png',
    name: 'JPG to PNG',
    slug: 'jpg-to-png',
    path: '/tools/jpg-to-png',
    category: 'image-tools',
    description: 'Convert JPG images to PNG format while preserving quality.',
    icon: FaFileImage,
    comingSoon: true,
  },
  {
    id: 'png-to-jpg',
    name: 'PNG to JPG',
    slug: 'png-to-jpg',
    path: '/tools/png-to-jpg',
    category: 'image-tools',
    description: 'Convert PNG images to JPG format with adjustable quality.',
    icon: FaImage,
    comingSoon: true,
  },
  {
    id: 'webp-converter',
    name: 'WEBP Converter',
    slug: 'webp-converter',
    path: '/tools/webp-converter',
    category: 'image-tools',
    description: 'Convert images to and from the modern WEBP format.',
    icon: FaFileImage,
    comingSoon: true,
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    slug: 'image-compressor',
    path: '/tools/image-compressor',
    category: 'image-tools',
    description: 'Reduce image file size without noticeably affecting quality.',
    icon: FaCompress,
    comingSoon: true,
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    slug: 'image-resizer',
    path: '/tools/image-resizer',
    category: 'image-tools',
    description: 'Resize images to exact pixel dimensions or a percentage scale.',
    icon: FaExpand,
    comingSoon: true,
  },
  {
    id: 'image-cropper',
    name: 'Image Cropper',
    slug: 'image-cropper',
    path: '/tools/image-cropper',
    category: 'image-tools',
    description: 'Crop images to the exact area you need with a live preview.',
    icon: FaCrop,
    comingSoon: true,
  },
  {
    id: 'image-rotator',
    name: 'Image Rotator',
    slug: 'image-rotator',
    path: '/tools/image-rotator',
    category: 'image-tools',
    description: 'Rotate or flip images horizontally and vertically.',
    icon: FaRotate,
    comingSoon: true,
  },
]

export function getToolsByCategory(categorySlug) {
  return tools.filter((tool) => tool.category === categorySlug)
}

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug)
}
