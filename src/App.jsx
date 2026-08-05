import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import PageLoader from './components/ui/PageLoader.jsx'

// Route-level code splitting: each page is only downloaded when it's
// visited, instead of bundling all 17 pages into a single initial chunk.
const Home = lazy(() => import('./pages/Home.jsx'))
const Tools = lazy(() => import('./pages/Tools.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'))
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

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
