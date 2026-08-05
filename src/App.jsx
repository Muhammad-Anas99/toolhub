import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import Tools from './pages/Tools.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Blog from './pages/Blog.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Terms from './pages/Terms.jsx'
import NotFound from './pages/NotFound.jsx'

// Image tools (Phase 3 - fully working, browser-based)
import JpgToPng from './pages/tools/JpgToPng.jsx'
import PngToJpg from './pages/tools/PngToJpg.jsx'
import WebpToPng from './pages/tools/WebpToPng.jsx'
import WebpToJpg from './pages/tools/WebpToJpg.jsx'
import ConvertToWebp from './pages/tools/ConvertToWebp.jsx'
import ImageCompressor from './pages/tools/ImageCompressor.jsx'
import ImageResizer from './pages/tools/ImageResizer.jsx'
import ImageCrop from './pages/tools/ImageCrop.jsx'
import ImageRotate from './pages/tools/ImageRotate.jsx'
import FlipImage from './pages/tools/FlipImage.jsx'

export default function App() {
  return (
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
  )
}
