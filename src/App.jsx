import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import PageLoader from './components/ui/PageLoader.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import DashboardLayout from './components/dashboard/DashboardLayout.jsx'
import AdminLayout from './components/admin/AdminLayout.jsx'

// Route-level code splitting: each page is only downloaded when it's
// visited, instead of bundling all pages into a single initial chunk.
const Home = lazy(() => import('./pages/Home.jsx'))
const Tools = lazy(() => import('./pages/Tools.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'))
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'))
const Terms = lazy(() => import('./pages/Terms.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

// Image tools (Phase 3 - fully working, browser-based)
const JpgToPng = lazy(() => import('./pages/tools/JpgToPng.jsx'))
const PngToJpg = lazy(() => import('./pages/tools/PngToJpg.jsx'))
const WebpToPng = lazy(() => import('./pages/tools/WebpToPng.jsx'))
const WebpToJpg = lazy(() => import('./pages/tools/WebpToJpg.jsx'))
const ConvertToWebp = lazy(() => import('./pages/tools/ConvertToWebp.jsx'))
const ImageCompressor = lazy(() => import('./pages/tools/ImageCompressor.jsx'))
const ImageResizer = lazy(() => import('./pages/tools/ImageResizer.jsx'))
const ImageCrop = lazy(() => import('./pages/tools/ImageCrop.jsx'))
const ImageRotate = lazy(() => import('./pages/tools/ImageRotate.jsx'))
const FlipImage = lazy(() => import('./pages/tools/FlipImage.jsx'))
const JpgToPdf = lazy(() => import('./pages/tools/JpgToPdf.jsx'))
const PngToPdf = lazy(() => import('./pages/tools/PngToPdf.jsx'))
const MergePdf = lazy(() => import('./pages/tools/MergePdf.jsx'))
const SplitPdf = lazy(() => import('./pages/tools/SplitPdf.jsx'))
const ColorPicker = lazy(() => import('./pages/tools/ColorPicker.jsx'))
const HexToRgb = lazy(() => import('./pages/tools/HexToRgb.jsx'))
const RgbToHex = lazy(() => import('./pages/tools/RgbToHex.jsx'))
const HexToHsl = lazy(() => import('./pages/tools/HexToHsl.jsx'))
const ColorConverter = lazy(() => import('./pages/tools/ColorConverter.jsx'))
const PaletteGenerator = lazy(() => import('./pages/tools/PaletteGenerator.jsx'))
const JsonFormatter = lazy(() => import('./pages/tools/JsonFormatter.jsx'))
const JsonValidator = lazy(() => import('./pages/tools/JsonValidator.jsx'))
const Base64Encoder = lazy(() => import('./pages/tools/Base64Encoder.jsx'))
const UrlEncoder = lazy(() => import('./pages/tools/UrlEncoder.jsx'))
const UuidGenerator = lazy(() => import('./pages/tools/UuidGenerator.jsx'))
const HashGenerator = lazy(() => import('./pages/tools/HashGenerator.jsx'))
const TimestampConverter = lazy(() => import('./pages/tools/TimestampConverter.jsx'))
const RegexTester = lazy(() => import('./pages/tools/RegexTester.jsx'))
const PdfToJpg = lazy(() => import('./pages/tools/PdfToJpg.jsx'))
const PdfToPng = lazy(() => import('./pages/tools/PdfToPng.jsx'))
const GradientGenerator = lazy(() => import('./pages/tools/GradientGenerator.jsx'))
const PdfToWord = lazy(() => import('./pages/tools/PdfToWord.jsx'))
const YoutubeThumbnailDownloader = lazy(() => import('./pages/tools/YoutubeThumbnailDownloader.jsx'))
const WordCounter = lazy(() => import('./pages/tools/WordCounter.jsx'))
const CaseConverter = lazy(() => import('./pages/tools/CaseConverter.jsx'))
const LoremIpsumGenerator = lazy(() => import('./pages/tools/LoremIpsumGenerator.jsx'))
const PasswordGenerator = lazy(() => import('./pages/tools/PasswordGenerator.jsx'))
const InstagramPostResizer = lazy(() => import('./pages/tools/InstagramPostResizer.jsx'))
const AiBackgroundRemover = lazy(() => import('./pages/tools/AiBackgroundRemover.jsx'))
const AiImageUpscaler = lazy(() => import('./pages/tools/AiImageUpscaler.jsx'))
const AiImageEnhancer = lazy(() => import('./pages/tools/AiImageEnhancer.jsx'))

// Auth (Phase 5)
const Login = lazy(() => import('./pages/auth/Login.jsx'))
const Register = lazy(() => import('./pages/auth/Register.jsx'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword.jsx'))
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword.jsx'))
const VerifyEmail = lazy(() => import('./pages/auth/VerifyEmail.jsx'))
const CheckEmail = lazy(() => import('./pages/auth/CheckEmail.jsx'))

// User dashboard (Phase 5)
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard.jsx'))
const AdminOverview = lazy(() => import('./pages/admin/AdminOverview.jsx'))
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers.jsx'))
const AdminTools = lazy(() => import('./pages/admin/AdminTools.jsx'))
const AdminBlogList = lazy(() => import('./pages/admin/AdminBlogList.jsx'))
const AdminBlogEditor = lazy(() => import('./pages/admin/AdminBlogEditor.jsx'))
const Profile = lazy(() => import('./pages/dashboard/Profile.jsx'))
const Favorites = lazy(() => import('./pages/dashboard/Favorites.jsx'))
const History = lazy(() => import('./pages/dashboard/History.jsx'))
const Downloads = lazy(() => import('./pages/dashboard/Downloads.jsx'))
const Settings = lazy(() => import('./pages/dashboard/Settings.jsx'))
const Subscription = lazy(() => import('./pages/dashboard/Subscription.jsx'))

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />

          {/* Image tools */}
          <Route path="/tools/jpg-to-png" element={<JpgToPng />} />
          <Route path="/tools/png-to-jpg" element={<PngToJpg />} />
          <Route path="/tools/webp-to-png" element={<WebpToPng />} />
          <Route path="/tools/webp-to-jpg" element={<WebpToJpg />} />
          <Route path="/tools/convert-to-webp" element={<ConvertToWebp />} />
          <Route path="/tools/image-compressor" element={<ImageCompressor />} />
          <Route path="/tools/image-resizer" element={<ImageResizer />} />
          <Route path="/tools/image-crop" element={<ImageCrop />} />
          <Route path="/tools/image-rotate" element={<ImageRotate />} />
          <Route path="/tools/flip-image" element={<FlipImage />} />
          <Route path="/tools/jpg-to-pdf" element={<JpgToPdf />} />
          <Route path="/tools/png-to-pdf" element={<PngToPdf />} />
          <Route path="/tools/merge-pdf" element={<MergePdf />} />
          <Route path="/tools/split-pdf" element={<SplitPdf />} />
          <Route path="/tools/color-picker" element={<ColorPicker />} />
          <Route path="/tools/hex-to-rgb" element={<HexToRgb />} />
          <Route path="/tools/rgb-to-hex" element={<RgbToHex />} />
          <Route path="/tools/hex-to-hsl" element={<HexToHsl />} />
          <Route path="/tools/color-converter" element={<ColorConverter />} />
          <Route path="/tools/palette-generator" element={<PaletteGenerator />} />
          <Route path="/tools/json-formatter" element={<JsonFormatter />} />
          <Route path="/tools/json-validator" element={<JsonValidator />} />
          <Route path="/tools/base64-encoder" element={<Base64Encoder />} />
          <Route path="/tools/url-encoder" element={<UrlEncoder />} />
          <Route path="/tools/uuid-generator" element={<UuidGenerator />} />
          <Route path="/tools/hash-generator" element={<HashGenerator />} />
          <Route path="/tools/timestamp-converter" element={<TimestampConverter />} />
          <Route path="/tools/regex-tester" element={<RegexTester />} />
          <Route path="/tools/pdf-to-jpg" element={<PdfToJpg />} />
          <Route path="/tools/pdf-to-png" element={<PdfToPng />} />
          <Route path="/tools/gradient-generator" element={<GradientGenerator />} />
          <Route path="/tools/pdf-to-word" element={<PdfToWord />} />
          <Route path="/tools/youtube-thumbnail-downloader" element={<YoutubeThumbnailDownloader />} />
          <Route path="/tools/word-counter" element={<WordCounter />} />
          <Route path="/tools/case-converter" element={<CaseConverter />} />
          <Route path="/tools/lorem-ipsum-generator" element={<LoremIpsumGenerator />} />
          <Route path="/tools/password-generator" element={<PasswordGenerator />} />
          <Route path="/tools/instagram-post-resizer" element={<InstagramPostResizer />} />
          <Route path="/tools/ai-background-remover" element={<AiBackgroundRemover />} />
          <Route path="/tools/ai-image-upscaler" element={<AiImageUpscaler />} />
          <Route path="/tools/ai-image-enhancer" element={<AiImageEnhancer />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/check-email" element={<CheckEmail />} />

          {/* User dashboard - requires authentication */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="history" element={<History />} />
              <Route path="downloads" element={<Downloads />} />
              <Route path="settings" element={<Settings />} />
              <Route path="subscription" element={<Subscription />} />
            </Route>
          </Route>

          {/* Admin dashboard - requires authentication AND the admin role.
              Non-admins hitting /admin/* are redirected to / by
              ProtectedRoute itself (see requireRole handling there) —
              there's no separate check needed in AdminLayout or any
              admin page below it. */}
          <Route element={<ProtectedRoute requireRole="admin" />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="tools" element={<AdminTools />} />
              <Route path="blog" element={<AdminBlogList />} />
              <Route path="blog/new" element={<AdminBlogEditor />} />
              <Route path="blog/:slug/edit" element={<AdminBlogEditor />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
