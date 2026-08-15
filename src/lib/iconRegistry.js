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
import {
  FaFileImage,
  FaImage,
  FaCompress,
  FaExpand,
  FaCrop,
  FaRotate,
  FaArrowsLeftRight,
  FaObjectGroup,
  FaObjectUngroup,
  FaFilePdf,
  FaFileWord,
  FaFileArrowUp,
  FaFileArrowDown,
  FaCode,
  FaLock,
  FaMagnifyingGlass,
  FaBroom,
  FaFont,
  FaListOl,
  FaWandMagicSparkles,
  FaImages,
  FaEyeDropper,
  FaPalette,
  FaDroplet,
  FaSliders,
  FaKey,
  FaHashtag,
  FaFingerprint,
  FaLink,
  FaCircleCheck,
  FaClock,
  FaLayerGroup,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa6'
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi2'

/**
 * The API stores icons as string names (Category.icon / Tool.icon in the
 * backend schema) rather than component references, since MongoDB can't
 * store a React component. This registry is the single place that maps
 * those names back to real components for rendering — used by the data
 * hooks (useTools, useCategories) right after fetching, so every
 * downstream component (ToolCard, CategoryCard, MegaMenu, ...) keeps
 * receiving an actual component reference exactly as before, regardless
 * of whether the data came from the API or the local fallback.
 */
export const iconRegistry = {
  // Category icons (Heroicons 2)
  HiOutlinePhoto,
  HiOutlineDocumentText,
  HiOutlineCommandLine,
  HiOutlineLanguage,
  HiOutlineSparkles,
  HiOutlineSwatch,
  HiOutlineShieldCheck,
  HiOutlineShare,

  // Tool icons (Font Awesome 6)
  FaFileImage,
  FaImage,
  FaCompress,
  FaExpand,
  FaCrop,
  FaRotate,
  FaArrowsLeftRight,
  FaObjectGroup,
  FaObjectUngroup,
  FaFilePdf,
  FaFileWord,
  FaCode,
  FaLock,
  FaMagnifyingGlass,
  FaBroom,
  FaFont,
  FaListOl,
  FaWandMagicSparkles,
  FaImages,
  FaEyeDropper,
  FaPalette,
  FaDroplet,
  FaSliders,
  FaKey,
  FaHashtag,
  FaFingerprint,
  FaLink,
  FaCircleCheck,
  FaClock,
  FaLayerGroup,
  FaFileArrowUp,
  FaFileArrowDown,
  FaInstagram,
  FaYoutube,
}

/**
 * Resolve an icon name string to its component, falling back to a generic
 * question-mark icon (rather than crashing) if the API ever returns a name
 * this build doesn't recognize yet — e.g. a new tool category added on the
 * backend before the frontend has shipped its icon.
 */
export function resolveIcon(iconName) {
  return iconRegistry[iconName] || HiOutlineQuestionMarkCircle
}
