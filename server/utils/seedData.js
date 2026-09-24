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
  {
    name: 'Audio & Video Tools',
    slug: 'audio-video-tools',
    description: 'Convert, trim and edit audio and video files.',
    icon: 'HiOutlineMusicalNote',
    color: 'cyan',
    order: 9,
  },
  {
    name: 'Unit Converters',
    slug: 'unit-converters',
    description: 'Convert length, weight, volume, temperature and more.',
    icon: 'HiOutlineCalculator',
    color: 'teal',
    order: 10,
  },
  {
    name: 'Calculator Tools',
    slug: 'calculator-tools',
    description: 'Percentage, loan, interest, margin and age calculators.',
    icon: 'HiOutlineChartBar',
    color: 'fuchsia',
    order: 11,
  },
  {
    name: 'Fun Tools',
    slug: 'fun-tools',
    description: 'Random pickers, dice, coin flips and a decision wheel.',
    icon: 'HiOutlineFaceSmile',
    color: 'orange',
    order: 12,
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
  { name: 'Favicon Generator', slug: 'favicon-generator', path: '/tools/favicon-generator', category: 'image-tools', description: 'Generate every favicon size you need from one image, including favicon.ico.', icon: 'FaIcons', badge: 'new', comingSoon: false },

  // ---------- PDF Tools ----------
  { name: 'JPG to PDF', slug: 'jpg-to-pdf', path: '/tools/jpg-to-pdf', category: 'pdf-tools', description: 'Turn a JPG image into a single-page PDF document.', icon: 'FaFileArrowUp', badge: 'new', comingSoon: false },
  { name: 'PNG to PDF', slug: 'png-to-pdf', path: '/tools/png-to-pdf', category: 'pdf-tools', description: 'Turn a PNG image into a single-page PDF document.', icon: 'FaFileArrowUp', comingSoon: false },
  { name: 'Merge PDF', slug: 'merge-pdf', path: '/tools/merge-pdf', category: 'pdf-tools', description: 'Combine multiple PDF files into a single document, in any order.', icon: 'FaObjectGroup', badge: 'popular', comingSoon: false },
  { name: 'Split PDF', slug: 'split-pdf', path: '/tools/split-pdf', category: 'pdf-tools', description: 'Extract specific pages or page ranges from a PDF into a new document.', icon: 'FaObjectUngroup', comingSoon: false },
  { name: 'PDF to JPG', slug: 'pdf-to-jpg', path: '/tools/pdf-to-jpg', category: 'pdf-tools', description: 'Convert PDF pages into JPG images, one page at a time.', icon: 'FaFileArrowDown', badge: 'new', comingSoon: false },
  { name: 'PDF to PNG', slug: 'pdf-to-png', path: '/tools/pdf-to-png', category: 'pdf-tools', description: 'Convert PDF pages into PNG images, one page at a time.', icon: 'FaFileArrowDown', comingSoon: false },
  { name: 'Compress PDF', slug: 'compress-pdf', path: '/tools/compress-pdf', category: 'pdf-tools', description: 'Shrink a scanned or image-heavy PDF file size significantly while keeping it readable — free, right in your browser, and up to 10 PDFs at once.', icon: 'FaFilePdf', comingSoon: false },
  { name: 'PDF to Word', slug: 'pdf-to-word', path: '/tools/pdf-to-word', category: 'pdf-tools', description: 'Extract text from a PDF into an editable Word document.', icon: 'FaFileWord', comingSoon: false },
  { name: 'PDF to PowerPoint', slug: 'pdf-to-powerpoint', path: '/tools/pdf-to-powerpoint', category: 'pdf-tools', description: 'Turn every page of a PDF into a slide in a PowerPoint presentation.', icon: 'FaFilePowerpoint', comingSoon: false },
  { name: 'PowerPoint to PDF', slug: 'powerpoint-to-pdf', path: '/tools/powerpoint-to-pdf', category: 'pdf-tools', description: 'Extract the text and images from a PowerPoint file into a PDF.', icon: 'FaFilePowerpoint', badge: 'new', comingSoon: false },
  { name: 'Excel to PDF', slug: 'excel-to-pdf', path: '/tools/excel-to-pdf', category: 'pdf-tools', description: 'Convert an Excel spreadsheet into a clean, printable PDF.', icon: 'FaFileExcel', comingSoon: false },
  { name: 'Word to PDF', slug: 'word-to-pdf', path: '/tools/word-to-pdf', category: 'pdf-tools', description: 'Convert a Word document into a PDF, keeping headings and basic formatting.', icon: 'FaFileWord', comingSoon: false },

  // ---------- Color Tools (fully working) ----------
  { name: 'Color Picker', slug: 'color-picker', path: '/tools/color-picker', category: 'color-tools', description: 'Pick colors from an image and get their exact hex, RGB and HSL codes.', icon: 'FaEyeDropper', comingSoon: false },
  { name: 'HEX to RGB', slug: 'hex-to-rgb', path: '/tools/hex-to-rgb', category: 'color-tools', description: 'Convert HEX color codes to RGB values instantly.', icon: 'FaDroplet', badge: 'popular', comingSoon: false },
  { name: 'RGB to HEX', slug: 'rgb-to-hex', path: '/tools/rgb-to-hex', category: 'color-tools', description: 'Convert RGB color values to HEX codes instantly.', icon: 'FaDroplet', comingSoon: false },
  { name: 'HEX to HSL', slug: 'hex-to-hsl', path: '/tools/hex-to-hsl', category: 'color-tools', description: 'Convert HEX color codes to HSL values instantly.', icon: 'FaSliders', comingSoon: false },
  { name: 'Color Converter', slug: 'color-converter', path: '/tools/color-converter', category: 'color-tools', description: 'Convert between HEX, RGB and HSL color formats in one place.', icon: 'FaPalette', badge: 'new', comingSoon: false },
  { name: 'Color Palette Generator', slug: 'palette-generator', path: '/tools/palette-generator', category: 'color-tools', description: 'Generate complementary, analogous, triadic and shade palettes from any color.', icon: 'FaPalette', badge: 'popular', comingSoon: false },
  { name: 'Gradient Generator', slug: 'gradient-generator', path: '/tools/gradient-generator', category: 'color-tools', description: 'Build linear and radial CSS gradients visually and copy ready-to-use code instantly. Free, no image files, no sign-up required.', icon: 'FaPalette', comingSoon: false },
  { name: 'Power BI Theme Generator', slug: 'power-bi-theme-generator', path: '/tools/power-bi-theme-generator', category: 'color-tools', description: 'Build a custom Power BI report theme visually and export a ready-to-import theme.json file. Free, no sign-up, runs entirely in your browser.', icon: 'FaChartBar', comingSoon: false },

  // ---------- Developer Tools (fully working) ----------
  { name: 'JSON Formatter', slug: 'json-formatter', path: '/tools/json-formatter', category: 'developer-tools', description: 'Format, validate, and beautify messy JSON instantly. Minify for production or pretty-print for readability, free, right in your browser.', icon: 'FaCode', badge: 'popular', comingSoon: false },
  { name: 'JSON Validator', slug: 'json-validator', path: '/tools/json-validator', category: 'developer-tools', description: 'Check whether your JSON is valid, with the exact line and column of any error.', icon: 'FaCircleCheck', comingSoon: false },
  { name: 'Base64 Encoder / Decoder', slug: 'base64-encoder', path: '/tools/base64-encoder', category: 'developer-tools', description: 'Encode or decode Base64 strings, with full Unicode support.', icon: 'FaLock', comingSoon: false },
  { name: 'URL Encoder / Decoder', slug: 'url-encoder', path: '/tools/url-encoder', category: 'developer-tools', description: 'Encode or decode URLs and query string components.', icon: 'FaLink', comingSoon: false },
  { name: 'UUID Generator', slug: 'uuid-generator', path: '/tools/uuid-generator', category: 'developer-tools', description: 'Generate random, RFC-compliant UUIDs (v4), one or in bulk.', icon: 'FaFingerprint', badge: 'new', comingSoon: false },
  { name: 'QR Code Generator', slug: 'qr-code-generator', path: '/tools/qr-code-generator', category: 'developer-tools', description: 'Create a QR code from any text or URL — no sign-up, no watermark, no expiry.', icon: 'FaQrcode', badge: 'new', comingSoon: false },
  { name: 'URL Shortener', slug: 'url-shortener', path: '/tools/url-shortener', category: 'developer-tools', description: 'Shorten any long URL into a clean, permanent link — no account required.', icon: 'FaLink', badge: 'new', comingSoon: false },
  { name: 'User-Agent Parser', slug: 'user-agent-parser', path: '/tools/user-agent-parser', category: 'developer-tools', description: 'Parse any User-Agent string into browser, OS, device and engine details.', icon: 'FaDesktop', badge: 'new', comingSoon: false },
  { name: 'HTAccess Generator', slug: 'htaccess-generator', path: '/tools/htaccess-generator', category: 'developer-tools', description: 'Generate .htaccess rules for HTTPS, redirects, caching, security headers and more.', icon: 'FaServer', badge: 'new', comingSoon: false },
  { name: 'Cron Expression Generator', slug: 'cron-expression-generator', path: '/tools/cron-expression-generator', category: 'developer-tools', description: 'Build cron expressions visually, with a plain-English explanation and next run times.', icon: 'FaClock', badge: 'new', comingSoon: false },
  { name: 'Schema Markup Generator', slug: 'schema-markup-generator', path: '/tools/schema-markup-generator', category: 'developer-tools', description: 'Generate valid JSON-LD structured data for Article, Product, Organization and more.', icon: 'FaCode', badge: 'new', comingSoon: false },
  { name: 'Audio to WAV Converter', slug: 'audio-to-wav-converter', path: '/tools/audio-to-wav-converter', category: 'audio-video-tools', description: 'Convert MP3, OGG and other audio files to WAV, right in your browser.', icon: 'FaFileAudio', badge: 'new', comingSoon: false },
  { name: 'Audio Trimmer', slug: 'audio-trimmer', path: '/tools/audio-trimmer', category: 'audio-video-tools', description: 'Cut an audio file down to just the part you need, with a simple drag-to-select range.', icon: 'FaScissors', badge: 'new', comingSoon: false },
  { name: 'Video to GIF', slug: 'video-to-gif', path: '/tools/video-to-gif', category: 'audio-video-tools', description: 'Turn a video clip into an animated GIF, right in your browser.', icon: 'FaFileVideo', badge: 'new', comingSoon: false },
  { name: 'Video Trimmer', slug: 'video-trimmer', path: '/tools/video-trimmer', category: 'audio-video-tools', description: 'Trim a video down to just the part you need, with simple start and end sliders.', icon: 'FaScissors', badge: 'new', comingSoon: false },
  { name: 'Unit Converter', slug: 'unit-converter', path: '/tools/unit-converter', category: 'developer-tools', description: 'Convert between length, weight, volume and temperature units instantly.', icon: 'FaRuler', badge: 'new', comingSoon: false },
  { name: 'Meta Tag Generator', slug: 'meta-tag-generator', path: '/tools/meta-tag-generator', category: 'developer-tools', description: 'Generate title, description, Open Graph and Twitter Card meta tags for any page.', icon: 'FaTags', badge: 'new', comingSoon: false },
  { name: 'Text Diff Checker', slug: 'text-diff-checker', path: '/tools/text-diff-checker', category: 'text-tools', description: 'Compare two pieces of text and see exactly what changed, line by line.', icon: 'FaCodeCompare', badge: 'new', comingSoon: false },
  { name: 'Audio Merger', slug: 'audio-merger', path: '/tools/audio-merger', category: 'audio-video-tools', description: 'Combine two or more audio files into one, in whatever order you choose.', icon: 'FaLayerGroup', badge: 'new', comingSoon: false },
  { name: 'Audio Volume Changer', slug: 'audio-volume-changer', path: '/tools/audio-volume-changer', category: 'audio-video-tools', description: 'Increase or decrease an audio file\u2019s volume.', icon: 'FaVolumeHigh', badge: 'new', comingSoon: false },
  { name: 'Audio Reverser', slug: 'audio-reverser', path: '/tools/audio-reverser', category: 'audio-video-tools', description: 'Reverse an audio file so it plays backwards.', icon: 'FaRepeat', badge: 'new', comingSoon: false },
  { name: 'Audio Fade In/Out', slug: 'audio-fade', path: '/tools/audio-fade', category: 'audio-video-tools', description: 'Add a smooth fade-in and fade-out to the start and end of an audio file.', icon: 'FaWaveSquare', badge: 'new', comingSoon: false },
  { name: 'Audio Speed Changer', slug: 'audio-speed-changer', path: '/tools/audio-speed-changer', category: 'audio-video-tools', description: 'Speed up or slow down an audio file\u2019s playback.', icon: 'FaForwardFast', badge: 'new', comingSoon: false },
  { name: 'Silence Trimmer', slug: 'silence-trimmer', path: '/tools/silence-trimmer', category: 'audio-video-tools', description: 'Automatically detect and trim silence from the start and end of an audio file.', icon: 'FaVolumeXmark', badge: 'new', comingSoon: false },
  { name: 'Video to Audio Extractor', slug: 'video-to-audio', path: '/tools/video-to-audio', category: 'audio-video-tools', description: 'Pull the audio track out of a video file and download it as a standalone audio file.', icon: 'FaFileWaveform', badge: 'new', comingSoon: false },
  { name: 'Video Muter', slug: 'video-muter', path: '/tools/video-muter', category: 'audio-video-tools', description: 'Remove the audio track from a video, keeping the visuals silent.', icon: 'FaVolumeOff', badge: 'new', comingSoon: false },
  { name: 'Video Speed Changer', slug: 'video-speed-changer', path: '/tools/video-speed-changer', category: 'audio-video-tools', description: 'Speed up or slow down a video\u2019s playback.', icon: 'FaGauge', badge: 'new', comingSoon: false },
  { name: 'Video Format Converter', slug: 'video-converter', path: '/tools/video-converter', category: 'audio-video-tools', description: 'Convert a video file between MP4 and WebM formats directly in your browser, free and with no upload.', icon: 'FaFileExport', badge: 'new', comingSoon: false },
  { name: 'Video Resizer', slug: 'video-resizer', path: '/tools/video-resizer', category: 'audio-video-tools', description: 'Scale a video down to a smaller resolution.', icon: 'FaExpand', badge: 'new', comingSoon: false },
  { name: 'Video Compressor', slug: 'video-compressor', path: '/tools/video-compressor', category: 'audio-video-tools', description: 'Shrink a video\u2019s file size by reducing its resolution.', icon: 'FaCompress', badge: 'new', comingSoon: false },
  { name: 'Background Remover', slug: 'background-remover', path: '/tools/background-remover', category: 'image-tools', description: 'Remove the background from a photo with a plain or uniform backdrop.', icon: 'FaEraser', badge: 'new', comingSoon: false },
  { name: 'Length Converter', slug: 'length-converter', path: '/tools/length-converter', category: 'unit-converters', description: 'Convert between millimeters, centimeters, meters, kilometers, inches, feet, yards and miles.', icon: 'FaRulerHorizontal', badge: 'new', comingSoon: false },
  { name: 'Weight Converter', slug: 'weight-converter', path: '/tools/weight-converter', category: 'unit-converters', description: 'Convert between milligrams, grams, kilograms, ounces, pounds and metric tons.', icon: 'FaWeightHanging', badge: 'new', comingSoon: false },
  { name: 'Volume Converter', slug: 'volume-converter', path: '/tools/volume-converter', category: 'unit-converters', description: 'Convert between milliliters, liters, US and UK gallons, fluid ounces and cups.', icon: 'FaFlask', badge: 'new', comingSoon: false },
  { name: 'Temperature Converter', slug: 'temperature-converter', path: '/tools/temperature-converter', category: 'unit-converters', description: 'Convert between Celsius, Fahrenheit and Kelvin.', icon: 'FaTemperatureHalf', badge: 'new', comingSoon: false },
  { name: 'Area Converter', slug: 'area-converter', path: '/tools/area-converter', category: 'unit-converters', description: 'Convert between square meters, square feet, acres, hectares and more.', icon: 'FaVectorSquare', badge: 'new', comingSoon: false },
  { name: 'Speed Converter', slug: 'speed-converter', path: '/tools/speed-converter', category: 'unit-converters', description: 'Convert between meters per second, kilometers per hour, miles per hour and knots.', icon: 'FaGaugeHigh', badge: 'new', comingSoon: false },
  { name: 'Time Converter', slug: 'time-converter', path: '/tools/time-converter', category: 'unit-converters', description: 'Convert between milliseconds, seconds, minutes, hours, days and weeks.', icon: 'FaHourglassHalf', badge: 'new', comingSoon: false },
  { name: 'Data Storage Converter', slug: 'data-converter', path: '/tools/data-converter', category: 'unit-converters', description: 'Convert between bytes, KB, MB, GB, TB, and their binary KiB/MiB/GiB/TiB equivalents.', icon: 'FaDatabase', badge: 'new', comingSoon: false },
  { name: 'Pressure Converter', slug: 'pressure-converter', path: '/tools/pressure-converter', category: 'unit-converters', description: 'Convert between Pascals, kilopascals, bar, PSI, atmospheres, and Torr.', icon: 'FaGaugeSimple', badge: 'new', comingSoon: false },
  { name: 'Energy Converter', slug: 'energy-converter', path: '/tools/energy-converter', category: 'unit-converters', description: 'Convert between joules, calories, kilocalories, watt-hours, kWh, and BTU.', icon: 'FaBolt', badge: 'new', comingSoon: false },
  { name: 'Power Converter', slug: 'power-converter', path: '/tools/power-converter', category: 'unit-converters', description: 'Convert between watts, kilowatts, horsepower, metric horsepower, and BTU/hour.', icon: 'FaPlug', badge: 'new', comingSoon: false },
  { name: 'Angle Converter', slug: 'angle-converter', path: '/tools/angle-converter', category: 'unit-converters', description: 'Convert between degrees, radians, gradians, and turns.', icon: 'FaCompass', badge: 'new', comingSoon: false },
  { name: 'Hash Generator', slug: 'hash-generator', path: '/tools/hash-generator', category: 'developer-tools', description: 'Generate MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes from text.', icon: 'FaHashtag', comingSoon: false },
  { name: 'Timestamp Converter', slug: 'timestamp-converter', path: '/tools/timestamp-converter', category: 'developer-tools', description: 'Free timestamp converter — convert Unix epoch time to a human-readable date and back, instantly. Runs entirely in your browser, no sign-up.', icon: 'FaClock', comingSoon: false },
  { name: 'Regex Tester', slug: 'regex-tester', path: '/tools/regex-tester', category: 'developer-tools', description: 'Test and debug regular expressions with live, highlighted matches.', icon: 'FaMagnifyingGlass', badge: 'popular', comingSoon: false },
  { name: 'Code Minifier', slug: 'code-minifier', path: '/tools/code-minifier', category: 'developer-tools', description: 'Minify CSS, JavaScript and HTML to reduce file size.', icon: 'FaBroom', comingSoon: false },

  // ---------- Text Tools ----------
  { name: 'Word Counter', slug: 'word-counter', path: '/tools/word-counter', category: 'text-tools', description: 'Count words, characters, sentences and paragraphs, with a reading time estimate.', icon: 'FaFont', badge: 'popular', comingSoon: false },
  { name: 'Case Converter', slug: 'case-converter', path: '/tools/case-converter', category: 'text-tools', description: 'Convert text between upper, lower, title, sentence, camel, snake and kebab case.', icon: 'FaListOl', comingSoon: false },
  { name: 'Lorem Ipsum Generator', slug: 'lorem-ipsum-generator', path: '/tools/lorem-ipsum-generator', category: 'text-tools', description: 'Generate placeholder text for mockups and designs, by words, sentences or paragraphs.', icon: 'FaFont', comingSoon: false },

  // ---------- AI Tools ----------
  { name: 'Image Upscaler', slug: 'image-upscaler', path: '/tools/image-upscaler', category: 'image-tools', description: 'Enlarge up to 10 images at once, 2-4x, using high-quality interpolation and sharpening.', icon: 'FaImages', badge: 'new', comingSoon: false },
  { name: 'Image Enhancer', slug: 'image-enhancer', path: '/tools/image-enhancer', category: 'image-tools', description: 'Sharpen detail and reduce noise across up to 10 photos at once, with adjustable controls.', icon: 'FaWandMagicSparkles', badge: 'new', comingSoon: false },

  // ---------- Security Tools ----------
  { name: 'Password Generator', slug: 'password-generator', path: '/tools/password-generator', category: 'security-tools', description: 'Generate a cryptographically secure random password online free. Adjustable length, character types, and a real entropy-based strength score.', icon: 'FaKey', badge: 'popular', comingSoon: false },
  { name: 'Password Strength Checker', slug: 'password-strength-checker', path: '/tools/password-strength-checker', category: 'security-tools', description: 'Check how strong a password really is, entirely on your device — nothing is ever sent anywhere.', icon: 'FaShieldHalved', badge: 'new', comingSoon: false },

  // ---------- Social Media Tools ----------
  { name: 'Instagram Post Resizer', slug: 'instagram-post-resizer', path: '/tools/instagram-post-resizer', category: 'social-media-tools', description: 'Resize images to fit Instagram posts, stories and profile pictures.', icon: 'FaInstagram', comingSoon: false },
  { name: 'YouTube Thumbnail Downloader', slug: 'youtube-thumbnail-downloader', path: '/tools/youtube-thumbnail-downloader', category: 'social-media-tools', description: 'Download thumbnail images from any YouTube video.', icon: 'FaYoutube', badge: 'new', comingSoon: false },
  { name: 'X (Twitter) Image Resizer', slug: 'twitter-image-resizer', path: '/tools/twitter-image-resizer', category: 'social-media-tools', description: 'Resize an image for X (Twitter) posts, headers, and profile pictures.', icon: 'FaXTwitter', badge: 'new', comingSoon: false },
  { name: 'Facebook Image Resizer', slug: 'facebook-image-resizer', path: '/tools/facebook-image-resizer', category: 'social-media-tools', description: 'Resize an image for Facebook posts, cover photos, and profile pictures.', icon: 'FaFacebook', badge: 'new', comingSoon: false },
  { name: 'LinkedIn Image Resizer', slug: 'linkedin-image-resizer', path: '/tools/linkedin-image-resizer', category: 'social-media-tools', description: 'Resize an image for LinkedIn posts, cover banners, and profile pictures.', icon: 'FaLinkedin', badge: 'new', comingSoon: false },
  { name: 'Pinterest Pin Resizer', slug: 'pinterest-pin-resizer', path: '/tools/pinterest-pin-resizer', category: 'social-media-tools', description: 'Resize an image to Pinterest\u2019s standard and square pin dimensions.', icon: 'FaPinterest', badge: 'new', comingSoon: false },
  { name: 'WhatsApp Link Generator', slug: 'whatsapp-link-generator', path: '/tools/whatsapp-link-generator', category: 'social-media-tools', description: 'Create a WhatsApp Click-to-Chat link with an optional pre-filled message.', icon: 'FaWhatsapp', badge: 'new', comingSoon: false },
  { name: 'WhatsApp Text Formatter', slug: 'whatsapp-text-formatter', path: '/tools/whatsapp-text-formatter', category: 'social-media-tools', description: 'Format text with WhatsApp\u2019s own bold, italic, strikethrough, and monospace markup.', icon: 'FaWhatsapp', badge: 'new', comingSoon: false },
  { name: 'WhatsApp QR Code Generator', slug: 'whatsapp-qr-generator', path: '/tools/whatsapp-qr-generator', category: 'social-media-tools', description: 'Generate a scannable QR code that opens a WhatsApp chat with a pre-filled message.', icon: 'FaWhatsapp', badge: 'new', comingSoon: false },
  { name: 'WhatsApp Status Resizer', slug: 'whatsapp-status-resizer', path: '/tools/whatsapp-status-resizer', category: 'social-media-tools', description: 'Resize an image to WhatsApp\u2019s Status and profile picture dimensions.', icon: 'FaWhatsapp', badge: 'new', comingSoon: false },
  { name: 'Remove Duplicate Lines', slug: 'remove-duplicate-lines', path: '/tools/remove-duplicate-lines', category: 'text-tools', description: 'Remove duplicate lines from a block of text, keeping the first occurrence of each.', icon: 'FaListUl', badge: 'new', comingSoon: false },
  { name: 'Text Reverser', slug: 'text-reverser', path: '/tools/text-reverser', category: 'text-tools', description: 'Reverse the character order of any text instantly.', icon: 'FaArrowRightArrowLeft', badge: 'new', comingSoon: false },
  { name: 'Upside Down Text Generator', slug: 'upside-down-text-generator', path: '/tools/upside-down-text-generator', category: 'text-tools', description: 'Flip your text upside down using Unicode lookalike characters.', icon: 'FaArrowsUpDown', badge: 'new', comingSoon: false },
  { name: 'Trim Whitespace', slug: 'trim-whitespace', path: '/tools/trim-whitespace', category: 'text-tools', description: 'Remove extra spaces and blank lines from text.', icon: 'FaMinimize', badge: 'new', comingSoon: false },
  { name: 'Slug Generator', slug: 'slug-generator', path: '/tools/slug-generator', category: 'text-tools', description: 'Convert any title into a clean, URL-friendly slug.', icon: 'FaLink', badge: 'new', comingSoon: false },
  { name: 'Line Counter', slug: 'line-counter', path: '/tools/line-counter', category: 'text-tools', description: 'Count the total and non-empty lines in a block of text.', icon: 'Fa1', badge: 'new', comingSoon: false },
  { name: 'Text to Binary Converter', slug: 'text-to-binary', path: '/tools/text-to-binary', category: 'text-tools', description: 'Convert text into its binary (0s and 1s) representation.', icon: 'Fa0', badge: 'new', comingSoon: false },
  { name: 'Binary to Text Converter', slug: 'binary-to-text', path: '/tools/binary-to-text', category: 'text-tools', description: 'Convert binary code back into readable text.', icon: 'FaFileLines', badge: 'new', comingSoon: false },
  { name: 'Find and Replace Text', slug: 'find-and-replace', path: '/tools/find-and-replace', category: 'text-tools', description: 'Find and replace words or phrases in text, with case-sensitive and whole-word options.', icon: 'FaMagnifyingGlassPlus', badge: 'new', comingSoon: false },
  { name: 'Percentage Calculator', slug: 'percentage-calculator', path: '/tools/percentage-calculator', category: 'calculator-tools', description: 'Calculate percentages, percentage of a number, and percentage change.', icon: 'FaPercent', badge: 'new', comingSoon: false },
  { name: 'Compound Interest Calculator', slug: 'compound-interest-calculator', path: '/tools/compound-interest-calculator', category: 'calculator-tools', description: 'Calculate compound interest and final investment value over time.', icon: 'FaChartLine', badge: 'new', comingSoon: false },
  { name: 'Loan & Mortgage Calculator', slug: 'loan-calculator', path: '/tools/loan-calculator', category: 'calculator-tools', description: 'Calculate monthly loan or mortgage payments, total paid, and total interest.', icon: 'FaHouseChimney', badge: 'new', comingSoon: false },
  { name: 'Profit Margin Calculator', slug: 'profit-margin-calculator', path: '/tools/profit-margin-calculator', category: 'calculator-tools', description: 'Calculate profit margin and markup percentage from revenue and cost.', icon: 'FaCoins', badge: 'new', comingSoon: false },
  { name: 'Age Calculator', slug: 'age-calculator', path: '/tools/age-calculator', category: 'calculator-tools', description: 'Calculate exact age in years, months, and days between two dates.', icon: 'FaCakeCandles', badge: 'new', comingSoon: false },
  { name: 'Color Contrast Checker', slug: 'color-contrast-checker', path: '/tools/color-contrast-checker', category: 'color-tools', description: 'Check color contrast ratio for WCAG AA and AAA accessibility compliance.', icon: 'FaCircleHalfStroke', badge: 'new', comingSoon: false },
  { name: 'Darken/Lighten Color Tool', slug: 'darken-lighten-color', path: '/tools/darken-lighten-color', category: 'color-tools', description: 'Generate lighter and darker shades of any color.', icon: 'FaSun', badge: 'new', comingSoon: false },
  { name: 'Random Color Generator', slug: 'random-color-generator', path: '/tools/random-color-generator', category: 'color-tools', description: 'Generate random hex colors for design inspiration.', icon: 'FaShuffle', badge: 'new', comingSoon: false },
  { name: 'CSS Formatter', slug: 'css-formatter', path: '/tools/css-formatter', category: 'developer-tools', description: 'Format and beautify minified or messy CSS code with proper indentation.', icon: 'FaFileCode', badge: 'new', comingSoon: false },
  { name: 'CSS Minifier', slug: 'css-minifier', path: '/tools/css-minifier', category: 'developer-tools', description: 'Minify CSS code by removing whitespace and comments to reduce file size.', icon: 'FaFileZipper', badge: 'new', comingSoon: false },
  { name: 'HTML Formatter', slug: 'html-formatter', path: '/tools/html-formatter', category: 'developer-tools', description: 'Format and beautify minified or messy HTML code with proper indentation.', icon: 'FaFileCode', badge: 'new', comingSoon: false },
  { name: 'HTML Minifier', slug: 'html-minifier', path: '/tools/html-minifier', category: 'developer-tools', description: 'Minify HTML code by removing whitespace and comments to reduce file size.', icon: 'FaFileZipper', badge: 'new', comingSoon: false },
  { name: 'XML Formatter', slug: 'xml-formatter', path: '/tools/xml-formatter', category: 'developer-tools', description: 'Format and beautify minified or messy XML code with proper indentation.', icon: 'FaFileCode', badge: 'new', comingSoon: false },
  { name: 'XML Minifier', slug: 'xml-minifier', path: '/tools/xml-minifier', category: 'developer-tools', description: 'Minify XML code by removing whitespace and comments to reduce file size.', icon: 'FaFileZipper', badge: 'new', comingSoon: false },
  { name: 'JavaScript Minifier', slug: 'javascript-minifier', path: '/tools/javascript-minifier', category: 'developer-tools', description: 'Minify JavaScript code by removing comments and whitespace, safely preserving string contents.', icon: 'FaFileZipper', badge: 'new', comingSoon: false },
  { name: 'HTML Entities Encoder', slug: 'html-entities-encoder', path: '/tools/html-entities-encoder', category: 'developer-tools', description: 'Encode special characters into HTML entities.', icon: 'FaQuoteRight', badge: 'new', comingSoon: false },
  { name: 'HTML Entities Decoder', slug: 'html-entities-decoder', path: '/tools/html-entities-decoder', category: 'developer-tools', description: 'Decode HTML entities back into their original characters.', icon: 'FaQuoteRight', badge: 'new', comingSoon: false },
  { name: 'JWT Decoder', slug: 'jwt-decoder', path: '/tools/jwt-decoder', category: 'developer-tools', description: 'Decode a JWT\u2019s header and payload without verifying its signature.', icon: 'FaTicket', badge: 'new', comingSoon: false },
  { name: 'MD5 Hash Generator', slug: 'md5-hash-generator', path: '/tools/md5-hash-generator', category: 'developer-tools', description: 'Generate an MD5 hash from any text.', icon: 'FaFingerprint', badge: 'new', comingSoon: false },
  { name: 'SHA-1 Hash Generator', slug: 'sha1-hash-generator', path: '/tools/sha1-hash-generator', category: 'developer-tools', description: 'Generate a SHA-1 hash from any text.', icon: 'FaFingerprint', badge: 'new', comingSoon: false },
  { name: 'SHA-256 Hash Generator', slug: 'sha256-hash-generator', path: '/tools/sha256-hash-generator', category: 'developer-tools', description: 'Generate a SHA-256 hash from any text.', icon: 'FaFingerprint', badge: 'new', comingSoon: false },
  { name: 'SHA-512 Hash Generator', slug: 'sha512-hash-generator', path: '/tools/sha512-hash-generator', category: 'developer-tools', description: 'Generate a SHA-512 hash from any text.', icon: 'FaFingerprint', badge: 'new', comingSoon: false },
  { name: 'JSON to CSV', slug: 'json-to-csv', path: '/tools/json-to-csv', category: 'developer-tools', description: 'Convert a JSON array of objects into CSV format.', icon: 'FaFileCsv', badge: 'new', comingSoon: false },
  { name: 'CSV to JSON', slug: 'csv-to-json', path: '/tools/csv-to-json', category: 'developer-tools', description: 'Convert CSV data into a JSON array of objects.', icon: 'FaFileCsv', badge: 'new', comingSoon: false },
  { name: 'XML to JSON', slug: 'xml-to-json', path: '/tools/xml-to-json', category: 'developer-tools', description: 'Convert XML data into JSON format.', icon: 'FaTable', badge: 'new', comingSoon: false },
  { name: 'JSON to XML', slug: 'json-to-xml', path: '/tools/json-to-xml', category: 'developer-tools', description: 'Convert JSON data into XML format.', icon: 'FaTable', badge: 'new', comingSoon: false },
  { name: 'YAML to JSON', slug: 'yaml-to-json', path: '/tools/yaml-to-json', category: 'developer-tools', description: 'Convert YAML data into JSON format.', icon: 'FaTable', badge: 'new', comingSoon: false },
  { name: 'JSON to YAML', slug: 'json-to-yaml', path: '/tools/json-to-yaml', category: 'developer-tools', description: 'Convert JSON data into YAML format.', icon: 'FaTable', badge: 'new', comingSoon: false },
  { name: 'CSV to XML', slug: 'csv-to-xml', path: '/tools/csv-to-xml', category: 'developer-tools', description: 'Convert CSV data into XML format.', icon: 'FaFileCsv', badge: 'new', comingSoon: false },
  { name: 'XML to CSV', slug: 'xml-to-csv', path: '/tools/xml-to-csv', category: 'developer-tools', description: 'Convert XML data into CSV format.', icon: 'FaFileCsv', badge: 'new', comingSoon: false },
  { name: 'Excel to JSON', slug: 'excel-to-json', path: '/tools/excel-to-json', category: 'developer-tools', description: 'Convert an Excel spreadsheet into JSON format.', icon: 'FaFileExcel', badge: 'new', comingSoon: false },
  { name: 'CSV to Excel', slug: 'csv-to-excel', path: '/tools/csv-to-excel', category: 'developer-tools', description: 'Convert CSV data into a downloadable Excel spreadsheet.', icon: 'FaFileExcel', badge: 'new', comingSoon: false },
  { name: 'Random Name Picker', slug: 'random-name-picker', path: '/tools/random-name-picker', category: 'fun-tools', description: 'Pick a random name from a list.', icon: 'FaUserGroup', badge: 'new', comingSoon: false },
  { name: 'Random Word Generator', slug: 'random-word-generator', path: '/tools/random-word-generator', category: 'fun-tools', description: 'Generate one or more random words.', icon: 'FaFont', badge: 'new', comingSoon: false },
  { name: 'Random Number Generator', slug: 'random-number-generator', path: '/tools/random-number-generator', category: 'fun-tools', description: 'Generate a random number within a custom range.', icon: 'FaHashtag', badge: 'new', comingSoon: false },
  { name: 'Coin Flipper', slug: 'coin-flipper', path: '/tools/coin-flipper', category: 'fun-tools', description: 'Flip a virtual coin for a random heads or tails result.', icon: 'FaCircleDot', badge: 'new', comingSoon: false },
  { name: 'Dice Roller', slug: 'dice-roller', path: '/tools/dice-roller', category: 'fun-tools', description: 'Roll one or more virtual six-sided dice.', icon: 'FaDice', badge: 'new', comingSoon: false },
  { name: 'Choice Wheel Spinner', slug: 'choice-wheel-spinner', path: '/tools/choice-wheel-spinner', category: 'fun-tools', description: 'Spin a wheel to randomly pick from a custom list of options.', icon: 'FaCirclePlay', badge: 'new', comingSoon: false },
  { name: 'Digital Signature Generator', slug: 'digital-signature-generator', path: '/tools/digital-signature-generator', category: 'developer-tools', description: 'Draw a signature and download it as a transparent PNG image.', icon: 'FaSignature', badge: 'new', comingSoon: false },
  { name: 'Text Encryption/Decryption (AES)', slug: 'aes-encryption', path: '/tools/aes-encryption', category: 'security-tools', description: 'Encrypt or decrypt text using AES-256 with a passphrase.', icon: 'FaLock', badge: 'new', comingSoon: false },
  { name: 'Htpasswd Generator', slug: 'htpasswd-generator', path: '/tools/htpasswd-generator', category: 'security-tools', description: 'Generate an Apache htpasswd entry from a username and password.', icon: 'FaUserLock', badge: 'new', comingSoon: false },
  { name: 'RSA Key Pair Generator', slug: 'rsa-key-pair-generator', path: '/tools/rsa-key-pair-generator', category: 'security-tools', description: 'Generate a real 2048-bit RSA public/private key pair in your browser.', icon: 'FaKey', badge: 'new', comingSoon: false },
  { name: 'Subnet Calculator', slug: 'subnet-calculator', path: '/tools/subnet-calculator', category: 'security-tools', description: 'Calculate network address, broadcast address, and usable host range from an IP and CIDR prefix.', icon: 'FaNetworkWired', badge: 'new', comingSoon: false },
  { name: 'What Is My IP Address', slug: 'my-ip-address', path: '/tools/my-ip-address', category: 'security-tools', description: 'Instantly see your public IPv4 or IPv6 address, the one websites and servers see when you connect.', icon: 'FaGlobe', badge: 'new', comingSoon: false },
  { name: 'DNS Lookup', slug: 'dns-lookup', path: '/tools/dns-lookup', category: 'security-tools', description: 'Look up a domain\u2019s A, AAAA, MX, TXT, NS, and CNAME DNS records.', icon: 'FaServer', badge: 'new', comingSoon: false },
  { name: 'HTTP Header Checker', slug: 'http-header-checker', path: '/tools/http-header-checker', category: 'security-tools', description: 'Check the HTTP response headers returned by any URL.', icon: 'FaListCheck', badge: 'new', comingSoon: false },
  { name: 'URL Redirect Checker', slug: 'url-redirect-checker', path: '/tools/url-redirect-checker', category: 'security-tools', description: 'Trace a URL\u2019s full redirect chain to its final destination.', icon: 'FaArrowRightArrowLeft', badge: 'new', comingSoon: false },
  { name: 'Barcode Generator', slug: 'barcode-generator', path: '/tools/barcode-generator', category: 'developer-tools', description: 'Generate a real, scannable EAN-13 or UPC-A barcode with automatic checksum calculation.', icon: 'FaBarcode', badge: 'new', comingSoon: false },
  { name: 'Barcode Scanner', slug: 'barcode-scanner', path: '/tools/barcode-scanner', category: 'developer-tools', description: 'Scan a barcode using your camera and read its value instantly.', icon: 'FaBarcode', badge: 'new', comingSoon: false },
  { name: 'QR Code Scanner', slug: 'qr-code-scanner', path: '/tools/qr-code-scanner', category: 'developer-tools', description: 'Scan a QR code using your camera and read its content instantly.', icon: 'FaQrcode', badge: 'new', comingSoon: false },
  { name: 'SVG to PNG/Icon Converter', slug: 'svg-converter', path: '/tools/svg-converter', category: 'image-tools', description: 'Convert an SVG into a PNG at any size, or a real multi-resolution .ico icon file.', icon: 'FaIcons', badge: 'new', comingSoon: false },
  { name: 'SRT to VTT Converter', slug: 'srt-to-vtt', path: '/tools/srt-to-vtt', category: 'developer-tools', description: 'Convert SubRip (.srt) subtitle files into the WebVTT format.', icon: 'FaClosedCaptioning', badge: 'new', comingSoon: false },
  { name: 'SQL to Markdown Table Generator', slug: 'sql-to-markdown-table', path: '/tools/sql-to-markdown-table', category: 'developer-tools', description: 'Convert a SQL INSERT statement into a Markdown table.', icon: 'FaDatabase', badge: 'new', comingSoon: false },
  { name: 'JSON to HTML Table Viewer', slug: 'json-to-html-table', path: '/tools/json-to-html-table', category: 'developer-tools', description: 'Convert a JSON array of objects into an HTML table.', icon: 'FaTable', badge: 'new', comingSoon: false },
  { name: 'YAML to TOML Converter', slug: 'yaml-to-toml', path: '/tools/yaml-to-toml', category: 'developer-tools', description: 'Convert YAML configuration data into TOML format.', icon: 'FaGears', badge: 'new', comingSoon: false },
  { name: 'Robots.txt Validator', slug: 'robots-txt-validator', path: '/tools/robots-txt-validator', category: 'developer-tools', description: 'Check a robots.txt file for syntax errors and common mistakes.', icon: 'FaRobot', badge: 'new', comingSoon: false },
  { name: 'JSON String Escape / Unescape', slug: 'json-string-escape', path: '/tools/json-string-escape', category: 'developer-tools', description: 'Escape or unescape a string for safe use inside JSON.', icon: 'FaQuoteLeft', badge: 'new', comingSoon: false },
  { name: 'Anagram Name Shuffler', slug: 'anagram-name-shuffler', path: '/tools/anagram-name-shuffler', category: 'fun-tools', description: 'Shuffle the letters of a name into a random anagram.', icon: 'FaShuffle', badge: 'new', comingSoon: false },
  { name: 'Sarcastic Text Alternator', slug: 'sarcastic-text-alternator', path: '/tools/sarcastic-text-alternator', category: 'fun-tools', description: 'Convert text into aLtErNaTiNg CaPs, the classic sarcasm meme format.', icon: 'FaMasksTheater', badge: 'new', comingSoon: false },
  { name: 'Tailwind CSS Grid Generator', slug: 'tailwind-grid-generator', path: '/tools/tailwind-grid-generator', category: 'developer-tools', description: 'Visually build a CSS grid layout and get the matching Tailwind classes.', icon: 'FaTableCells', badge: 'new', comingSoon: false },
  { name: 'CSS Glassmorphism UI Builder', slug: 'glassmorphism-builder', path: '/tools/glassmorphism-builder', category: 'developer-tools', description: 'Visually build a frosted-glass UI effect and get the matching CSS.', icon: 'FaLayerGroup', badge: 'new', comingSoon: false },
  { name: 'Data URI Image Encoder', slug: 'data-uri-encoder', path: '/tools/data-uri-encoder', category: 'developer-tools', description: 'Encode an image as a base64 data URI for embedding directly in CSS or HTML.', icon: 'FaFileImage', badge: 'new', comingSoon: false },
  { name: 'Base64 to Image Decoder', slug: 'base64-to-image', path: '/tools/base64-to-image', category: 'developer-tools', description: 'Decode a base64 string or data URI back into a viewable, downloadable image.', icon: 'FaImage', badge: 'new', comingSoon: false },
  { name: 'Corporate Buzzword Bingo', slug: 'buzzword-bingo', path: '/tools/buzzword-bingo', category: 'fun-tools', description: 'Generate a random corporate buzzword bingo card for your next meeting.', icon: 'FaBriefcase', badge: 'new', comingSoon: false },
  { name: 'Color Palette Hex Code Scroller', slug: 'hex-code-scroller', path: '/tools/hex-code-scroller', category: 'color-tools', description: 'Browse an endless scrolling feed of random hex colors to copy.', icon: 'FaPalette', badge: 'new', comingSoon: false },
  { name: 'Lorem Ipsum Fantasy Text Spinner', slug: 'lorem-ipsum-fantasy', path: '/tools/lorem-ipsum-fantasy', category: 'fun-tools', description: 'Generate fantasy-themed placeholder text instead of classic Latin lorem ipsum.', icon: 'FaFeatherPointed', badge: 'new', comingSoon: false },
  { name: 'Dumb Phone Contact Formatter', slug: 'dumb-phone-formatter', path: '/tools/dumb-phone-formatter', category: 'fun-tools', description: 'Clean up contact names and numbers for import into an older feature phone.', icon: 'FaMobileScreen', badge: 'new', comingSoon: false },
  { name: 'Text to Morse Code Audio Player', slug: 'morse-audio-player', path: '/tools/morse-audio-player', category: 'fun-tools', description: 'Convert text to Morse code and play it back as audio beeps.', icon: 'FaTowerBroadcast', badge: 'new', comingSoon: false },
  { name: 'Morse Code Tap Transmitter', slug: 'morse-tap-transmitter', path: '/tools/morse-tap-transmitter', category: 'fun-tools', description: 'Tap out Morse code by hand and see it decoded into text live.', icon: 'FaHandPointer', badge: 'new', comingSoon: false },
  { name: 'Drum Pad Beat Mixer', slug: 'drum-pad', path: '/tools/drum-pad', category: 'fun-tools', description: 'Play kick, snare, hi-hat, and clap sounds on a virtual drum pad.', icon: 'FaDrum', badge: 'new', comingSoon: false },
  { name: 'Sound Effect Soundboard', slug: 'soundboard', path: '/tools/soundboard', category: 'fun-tools', description: 'Play buzzer, bell, whoosh, and other sound effects instantly.', icon: 'FaVolumeHigh', badge: 'new', comingSoon: false },
  { name: 'White Noise Ambient Sound Mixer', slug: 'white-noise-mixer', path: '/tools/white-noise-mixer', category: 'fun-tools', description: 'Mix white, pink, and brown noise for focus, relaxation, or sleep.', icon: 'FaWater', badge: 'new', comingSoon: false },
  { name: 'Text-to-Speech Voice Pitcher', slug: 'tts-pitcher', path: '/tools/tts-pitcher', category: 'fun-tools', description: 'Have text read aloud with adjustable pitch and speaking rate.', icon: 'FaMicrophone', badge: 'new', comingSoon: false },
  { name: 'EXIF Metadata Scrubber', slug: 'exif-scrubber', path: '/tools/exif-scrubber', category: 'image-tools', description: 'Remove EXIF metadata (location, camera info, and more) from a photo before sharing it.', icon: 'FaEraser', badge: 'new', comingSoon: false },
  { name: 'CSV Filter & Column Extractor', slug: 'csv-filter', path: '/tools/csv-filter', category: 'developer-tools', description: 'Filter CSV rows by a column value and extract only the columns you need.', icon: 'FaFilterCircleXmark', badge: 'new', comingSoon: false },
  { name: 'UPS/FedEx Address Cleaner', slug: 'address-cleaner', path: '/tools/address-cleaner', category: 'developer-tools', description: 'Standardize a US address into the uppercase, abbreviated format shipping carriers expect.', icon: 'FaTruckFast', badge: 'new', comingSoon: false },
  { name: 'ASCII Art Image Visualizer', slug: 'ascii-art', path: '/tools/ascii-art', category: 'image-tools', description: 'Convert a photo into ASCII art text.', icon: 'FaTerminal', badge: 'new', comingSoon: false },
  { name: 'Virtual Bubble Wrap Popper', slug: 'bubble-wrap-popper', path: '/tools/bubble-wrap-popper', category: 'fun-tools', description: 'Pop a virtual sheet of bubble wrap, complete with a satisfying pop sound.', icon: 'FaSoap', badge: 'new', comingSoon: false },
  { name: 'Pixel Art Doodle Pad', slug: 'pixel-art-pad', path: '/tools/pixel-art-pad', category: 'fun-tools', description: 'Draw simple pixel art on a grid and download it as a PNG.', icon: 'FaPaintbrush', badge: 'new', comingSoon: false },
  { name: 'Retro 8-Bit Character Creator', slug: '8bit-character-creator', path: '/tools/8bit-character-creator', category: 'fun-tools', description: 'Design a symmetric 8-bit style character sprite and export it as a PNG.', icon: 'FaGamepad', badge: 'new', comingSoon: false },
  { name: 'Emoji Mashup Canvas', slug: 'emoji-mashup', path: '/tools/emoji-mashup', category: 'fun-tools', description: 'Combine two emoji into a custom mashup image you can download.', icon: 'FaFaceGrinStars', badge: 'new', comingSoon: false },
  { name: 'AI Prompt Idea Roulette', slug: 'prompt-roulette', path: '/tools/prompt-roulette', category: 'fun-tools', description: 'Spin up a random creative writing prompt to spark an idea.', icon: 'FaDice', badge: 'new', comingSoon: false },
  { name: 'Random Trivia Flashcard Deck', slug: 'trivia-flashcards', path: '/tools/trivia-flashcards', category: 'fun-tools', description: 'Test your knowledge with a deck of random trivia flashcards.', icon: 'FaGraduationCap', badge: 'new', comingSoon: false },
  { name: 'Tarot Card Daily Reader', slug: 'tarot-reader', path: '/tools/tarot-reader', category: 'fun-tools', description: 'Draw a random tarot card with its meaning, for entertainment purposes.', icon: 'FaMoon', badge: 'new', comingSoon: false },
  { name: 'Custom Meme Text Overlay Tool', slug: 'meme-overlay', path: '/tools/meme-overlay', category: 'fun-tools', description: 'Add classic top and bottom meme text to any image.', icon: 'FaImage', badge: 'new', comingSoon: false },
  { name: 'Fake Loading Screen Generator', slug: 'fake-loading-screen', path: '/tools/fake-loading-screen', category: 'fun-tools', description: 'Generate a customizable fake loading screen for fun or pranks.', icon: 'FaSpinner', badge: 'new', comingSoon: false },
  { name: 'Daily Habit Streaks Counter', slug: 'habit-streak-counter', path: '/tools/habit-streak-counter', category: 'fun-tools', description: 'Track daily habits and see your current streak.', icon: 'FaFire', badge: 'new', comingSoon: false },
  { name: 'Rickroll Link Generator', slug: 'rickroll-generator', path: '/tools/rickroll-generator', category: 'fun-tools', description: 'Get a copyable link to the classic internet rickroll video.', icon: 'FaMusic', badge: 'new', comingSoon: false },
  { name: 'Fake Error Message Designer', slug: 'fake-error-designer', path: '/tools/fake-error-designer', category: 'fun-tools', description: 'Design a fun, obviously-a-joke error message card for memes and pranks.', icon: 'FaBug', badge: 'new', comingSoon: false },
]


export const blogSeed = [
  {
    title: 'JPG vs PNG vs WEBP: Which Image Format Should You Use?',
    slug: 'jpg-vs-png-vs-webp',
    excerpt: 'A practical breakdown of the three most common image formats, when to use each one, and how they affect quality and file size.',
    content: `Every image on the web is stored in one format or another, and the choice genuinely matters. Pick the wrong one and a photo comes out blurry, a logo loses its transparent background, or a page loads noticeably slower than it needs to. The three formats that come up constantly, JPG, PNG, and WebP, each work in a fundamentally different way, and understanding that difference makes the right choice obvious most of the time.

## JPG: built for photographs

JPEG has been the default photo format since 1992, and it's still the right choice for most photographs today. It uses lossy compression, meaning it deliberately discards some image data to shrink the file, targeting the kind of detail human vision is least likely to notice, subtle color gradients and fine texture rather than sharp edges or major shapes.

That tradeoff works well specifically because photographs are full of exactly the kind of gradual color variation JPEG is good at approximating. A sunset, a portrait, a landscape: all forgiving of the small compromises JPEG makes, which is why a JPEG photo can look nearly identical to the original at a fraction of the file size.

JPEG has two real limitations worth knowing. It has no transparency support at all, so it can't represent a see-through background. And it suffers from generation loss: every time a JPEG is opened, edited, and re-saved, it loses a little more quality, since each save re-applies lossy compression on top of whatever was already lost before.

## PNG: built for precision

PNG takes the opposite approach: lossless compression, meaning the decompressed image is pixel-for-pixel identical to the original, no data thrown away. That makes PNG the right choice whenever exactness matters more than file size, screenshots, logos, diagrams, and anything with sharp text or clean lines, where JPEG's compression would introduce visible blur or ringing artifacts around the edges.

PNG also supports a full alpha transparency channel, so a logo or icon can have a genuinely transparent background that displays correctly over any color or image behind it. That's something JPEG simply cannot do.

The tradeoff is size. A PNG storing a full photograph losslessly is often several times larger than a JPEG of the same photo at a quality setting where the visual difference is barely noticeable. PNG's lossless approach has to preserve every pixel exactly, while JPEG can discard detail human vision doesn't register anyway.

## WebP: the newer format trying to do both

WebP was developed by Google specifically for the web, and it supports both lossy and lossless compression in a single format, along with full alpha transparency, essentially combining what JPEG and PNG each do separately. Real, independent benchmarking backs up Google's own published figures: WebP typically runs 25 to 35% smaller than an equivalent-quality JPEG, and around 25 to 35% smaller than a comparable lossless PNG.

Browser support has been effectively universal since 2020, which is long enough that WebP is now a safe default for a website's own images in nearly every case. The one place to be more careful is images that might be downloaded and opened outside a browser, in older desktop software, certain email clients, or some older editing tools, where WebP support is less consistently guaranteed than JPEG or PNG.

## A practical way to decide

For a photograph destined for the web: WebP first, JPEG as the universally-safe fallback — use [Convert to WebP](/tools/convert-to-webp) or [JPG to PNG](/tools/jpg-to-png) to switch between them without losing more quality than the format change itself requires. For anything needing transparency, a logo, an icon, a graphic with a see-through background: PNG, or WebP if the file only needs to work in modern browsers. For a screenshot, a diagram, or anything with sharp text and fine lines where exactness matters: PNG, since JPEG's compression would visibly soften those sharp edges.

None of these formats is universally "best". Each one was built to solve a different problem, and the right choice depends entirely on what the image actually contains and where it's going to be used.`,
    category: 'Image Tools',
    author: 'ToolHub Team',
    readTime: '6 min read',
    published: true,
  },
  {
    title: 'How to Reduce Image File Size Without Losing Quality',
    slug: 'how-to-reduce-image-file-size-without-losing-quality',
    excerpt: 'Compression techniques, format choices and simple habits that shrink your images while keeping them sharp.',
    content: `A large image slows down a website, eats up storage, and makes email attachments bounce. The good news is that shrinking a file usually doesn't require sacrificing visible quality, as long as the right technique is used for the right reason. The mistake most people make is treating "make it smaller" as one problem, when it's actually at least three different ones.

## Resizing and compressing are not the same thing

This distinction matters more than almost anything else here. Resizing changes an image's pixel dimensions, how many pixels wide and tall it is. Compressing changes how efficiently those pixels are stored, without necessarily changing how many there are. A 4000-pixel-wide photo displayed at 800 pixels on a webpage is carrying nearly 25 times more pixel data than it needs to, regardless of how well-compressed the file already is.

That makes resizing the first and often the biggest win. If an image is only ever going to be viewed at a specific size, there is no reason to store it at native camera resolution. Cutting it down to the size it's actually displayed at with a tool like our [Image Resizer](/tools/image-resizer) reduces file size dramatically, before compression is even considered.

## Compression: the real quality tradeoff

Once an image is at the right dimensions, compression is the next lever — our [Image Compressor](/tools/image-compressor) handles this automatically, without needing to manually tune a quality slider. Lossy compression (used by JPEG and one of WebP's two modes) discards some image data permanently to shrink the file, targeting detail that's least noticeable to the eye. At a well-chosen quality setting, typically somewhere in the 70 to 85 percent range for JPEG, the size reduction is substantial while the visual difference is close to invisible at normal viewing size.

Push the quality setting too low and the tradeoff becomes visible: blocky artifacts around sharp edges, smudged detail in busy areas, banding in smooth gradients. The right approach is incremental: reduce quality, compare the result at actual viewing size, and stop before artifacts become noticeable rather than applying the same aggressive setting to every image regardless of content.

## Choosing the right format actually matters

Format choice by itself can be a bigger factor than compression quality. A photograph saved as PNG is typically several times larger than the same photo saved as a reasonably-compressed JPEG, since PNG's lossless approach has to store every pixel exactly rather than approximating. For anything that's genuinely a photograph, not a screenshot or a graphic with sharp text, JPEG or WebP will almost always beat PNG on file size by a wide margin.

WebP specifically is worth defaulting to for web use: independently verified benchmarks put it 25 to 35% smaller than an equivalent-quality JPEG, and it's been supported by every major browser since 2020.

## A habit worth avoiding: repeated re-saving

Every time a JPEG is opened, edited, and re-saved, lossy compression gets reapplied on top of whatever was already discarded in previous saves. This effect, called generation loss, compounds with each round trip. A photo that's been opened and re-saved a dozen times over the years can look noticeably softer than the same photo saved once at a sensible quality setting, even if no one intentionally changed the quality level. When repeated editing is expected, working from a lossless master (PNG, or the original unedited file) and only exporting to JPEG once, at the end, avoids this compounding effect entirely.

## Putting it together

For most images headed to a website: resize to the actual display dimensions first, then export as WebP or a well-compressed JPEG, checking the result at real viewing size rather than trusting a percentage number alone. For anything with sharp text, transparency, or fine line detail, stick with PNG despite the larger file size, since compression artifacts would be more noticeable there than the size savings are worth. Getting the order right, dimensions first, then format and compression, tends to matter more than any single setting.`,
    category: 'Image Tools',
    author: 'ToolHub Team',
    readTime: '5 min read',
    published: true,
  },
  {
    title: 'The 2026 Social Media Image Size Guide',
    slug: 'social-media-image-size-guide-2026',
    excerpt: 'Up-to-date dimensions for Instagram, YouTube, and other platforms, plus tips for exporting crisp images every time.',
    content: `Every social platform crops, compresses, or stretches an image that doesn't match its expected dimensions, which is exactly why a photo that looked sharp on your device can come out blurry, cropped strangely, or letterboxed once it's actually posted. These are the current recommended sizes for the platforms people upload to most, current as of 2026 — resize any image to the exact dimensions below with our [Image Resizer](/tools/image-resizer).

## Instagram

Square posts: 1080 x 1080 pixels. Portrait feed posts: 1080 x 1350 pixels (a 4:5 ratio), which Meta's own guidance now favors over square, since it takes up more vertical space in the mobile feed. Landscape: 1080 x 566 pixels. Stories and Reels: 1080 x 1920 pixels (9:16), designed to fill the entire phone screen. Profile picture: displayed at 110 x 110 pixels but stored at 320 x 320, so uploading at 320 x 320 or larger keeps it sharp.

## Facebook

Feed images generally follow the same dimensions as Instagram, since both are part of Meta. The one Facebook-specific number worth knowing is the Open Graph link-preview size, 1200 x 630 pixels, which controls how a shared link's preview card looks when the URL is pasted anywhere, not just on Facebook itself. Stories: 1080 x 1920 pixels, matching Instagram's. Event cover photos: 1920 x 1005 pixels, a size Meta updated specifically to keep key content inside the safe zone on mobile.

## X (formerly Twitter)

In-feed landscape images: 1600 x 900 pixels (16:9), the current standard after X moved away from its older preview ratio. Square and 16:9 are both considered safe choices for how images actually render in the timeline.

## LinkedIn

Personal profile picture: 400 x 400 pixels minimum. Profile banner: 1584 x 396 pixels. A single image post: 1200 x 627 pixels for landscape, or 1080 x 1080 for square. Portrait posts (1080 x 1350) get reported engagement advantages similar to Instagram, for the same reason: more vertical space in a mobile feed.

## YouTube

Thumbnails: 1280 x 720 pixels (16:9) is the widely-recommended size; note the file has a 2MB limit for uploads made from a phone. Channel banner: 2560 x 1440 pixels. Shorts thumbnails, since Shorts are vertical video: 1080 x 1920 pixels (9:16).

## TikTok

Vertical photo posts: 1080 x 1920 pixels (9:16), matching TikTok's video format. Profile picture: at least 200 x 200 pixels recommended for a sharp result on larger screens, though the platform's technical minimum is much smaller.

## Pinterest

Standard Pin: 1000 x 1500 pixels (a 2:3 ratio), which Pinterest's own layout favors for how Pins display in the grid.

## A general-purpose size, if you need one image for multiple platforms

If exporting one asset that needs to work reasonably well across Instagram, Facebook, and LinkedIn feeds specifically, 1080 x 1350 pixels (4:5 portrait) is the closest thing to a universal choice among those three. It won't be optimal everywhere, a 4:5 image on X or a 9:16 Story placement will still get cropped, but it's a reasonable starting point when a single export has to cover several feed-based platforms at once.

## Why these numbers are worth re-checking later

Every platform listed here has changed its recommended dimensions at least once in recent memory, sometimes without much announcement. Instagram's shift toward taller feed posts, Meta unifying its Stories and Reels formats, X changing its preview ratio: these are not one-time updates, they're an ongoing pattern. Treat the numbers above as a solid, current starting point, and when a specific image genuinely matters, like a paid ad or a campaign launch, it's worth a quick check against the platform's own current help documentation before exporting the final file.`,
    category: 'Social Media Tools',
    author: 'ToolHub Team',
    readTime: '7 min read',
    published: true,
  },
  {
    title: 'JSON Formatting and Validation Tips for Developers',
    slug: 'json-formatting-and-validation-tips-for-developers',
    excerpt: 'Common JSON mistakes, how to catch them early, and habits that keep your data clean across a project.',
    content: `JSON looks close enough to a JavaScript object literal that it's easy to assume the two are interchangeable. They aren't, and the gap between them is exactly where most invalid JSON actually comes from. Knowing the specific rules, and why they exist, makes these mistakes much easier to catch before they cause a real problem.

## Why JSON is stricter than it looks

JSON was designed as a strict, minimal, language-independent data format, not a subset of JavaScript syntax that happens to look familiar. That strictness isn't arbitrary. It's what makes JSON reliably parseable the exact same way across every programming language, with no ambiguity about what a given piece of data actually means, regardless of which language reads it.

## The mistakes that come up constantly

**Unquoted or single-quoted keys.** JavaScript object literals allow unquoted keys ({ name: "value" }) and single-quoted strings. JSON requires every key, and every string value, to use double quotes specifically. {'name': 'value'} and {name: "value"} are both invalid JSON, even though both are perfectly valid JavaScript.

**Trailing commas.** JavaScript tolerates a trailing comma after the last item in an array or object. JSON does not, at all. ["a", "b",] with that trailing comma after "b" is invalid JSON and will fail to parse, even though the equivalent JavaScript array literal works fine.

**Comments.** JSON has no comment syntax whatsoever, neither // nor /* */. This surprises people coming from JavaScript or a config-file background, but it's a deliberate part of the spec, not an oversight.

**Values JSON can't represent.** JavaScript's undefined, functions, and Date objects have no JSON equivalent. Only strings, numbers, booleans, null, objects, and arrays are valid JSON values. Trying to serialize a JavaScript object containing a function or undefined value with JSON.stringify() will silently drop that property rather than error, which is its own common source of confusion.

## Formatting versus minifying, and when each matters

Pretty-printing adds consistent indentation and line breaks, turning a dense, single-line blob into something a person can actually read and navigate. Minifying strips all of that whitespace back out to produce the smallest possible file. APIs commonly return minified JSON by default, since there's no reason to spend bandwidth on formatting a machine doesn't need, which is exactly why a formatter is useful when a human is trying to read that same response while debugging.

The reverse direction matters too. A human-edited, nicely-formatted JSON config file is often minified before being bundled into a production build, shaving a small amount of size off the final result. Neither direction changes the underlying data, only the whitespace around it.

## Catching problems early

The most reliable habit is validating JSON immediately after writing or editing it by hand, rather than waiting until something downstream fails to parse it. A validator that reports the exact line and column of a syntax error turns a vague "invalid JSON" failure into something fixable in seconds, especially in a large, deeply-nested config file where the actual mistake might be nowhere near where the error first surfaces. ToolHub's [JSON Formatter](/tools/json-formatter) does exactly this, entirely in the browser, with no file ever uploaded anywhere.

It's also worth being specifically suspicious of JSON that was copied from a JavaScript codebase rather than generated as JSON in the first place, since that's exactly the scenario where an unquoted key or a trailing comma is most likely to sneak in unnoticed.`,
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

For everyday, non-sensitive files, the distinction genuinely doesn't matter much. For anything above, it's worth choosing a tool that processes locally, like our [Compress PDF](/tools/compress-pdf) or [PDF to Word](/tools/pdf-to-word), both of which run entirely in your browser — not because every upload-based tool is doing something wrong, but because there's no reason to accept even a small, well-intentioned risk when a browser-based alternative exists and costs nothing extra to use.`,
    category: 'PDF Tools',
    author: 'ToolHub Team',
    readTime: '5 min read',
    published: true,
  },
  {
    title: 'Power BI Theme JSON Explained: What It Controls and How to Build One',
    slug: 'power-bi-theme-json-explained',
    excerpt: 'A practical breakdown of what a Power BI theme.json file actually controls, why the dataColors order matters, and how to build one without hand-writing the structure yourself.',
    content: `Every Power BI report either uses the default theme or a custom one, and the difference shows immediately: a report styled with intention versus one where every chart is fighting a slightly different shade of blue. The custom option is a single JSON file, and once you understand what it actually controls, building one stops being a hand-editing exercise and becomes a fairly mechanical process.

## What a theme file actually is

A Power BI theme is a JSON file that sets the default appearance of an entire report. Apply it once, and Power BI uses its settings for every page and every visual, unless you manually override a specific element afterward. That's the entire point: set your colors once instead of formatting each chart by hand across every report your team builds.

The elementary version of a theme file needs only one field:

\`\`\`json
{ "name": "My Theme" }
\`\`\`

Everything past that is optional, and Power BI falls back to its own defaults for anything you don't specify.

## The three things a theme genuinely controls

**Data colors.** The \`dataColors\` array is an ordered list of hex colors assigned to chart series and categories in the sequence they're encountered. This is the part people usually mean when they say "our brand colors." Order matters here in a way that's easy to miss: the first category a chart encounters gets the first color in the array, the second gets the second, and so on. Once a report has more categories than the array has colors, Power BI cycles back to the start and reuses them — which is exactly why a palette of only three or four colors starts producing repeated colors on any chart with five or more categories. Eight to twelve colors is a practical range for most real reports.

**Structural colors.** \`background\`, \`foreground\`, and \`tableAccent\` style the report's canvas itself — general text color, page background, and default table styling — none of which represents data. It's a genuinely different role from dataColors, and conflating the two is a common mistake: setting your brand color as a data color applies it to a chart series (and gets reused cyclically); setting the same color as \`tableAccent\` applies it consistently to table styling instead.

**KPI colors.** \`good\`, \`neutral\`, and \`bad\` are used specifically by KPI visuals and conditional formatting, following the widely recognized traffic-light convention. These stay separate from the general data palette on purpose — a KPI needs to consistently mean "good" regardless of which colors happen to be cycling through unrelated charts on the same page.

## Why hand-writing the JSON is where most mistakes happen

The properties above are genuinely simple. The mistakes come from three predictable places: an invalid hex value slipped into the array, a missing comma somewhere in a long JSON file (which invalidates the *entire* file, not just that line), or accidentally setting a brand color as a data color when it was meant to be the table accent. Microsoft's own guidance for a "This isn't a valid theme file" error is to run the JSON through a validator and find the exact line the syntax breaks on — our [JSON Formatter](/tools/json-formatter) does exactly that, pinpointing the error instead of leaving you to scan the whole file by eye.

## Building one without hand-writing any of it

This is exactly the gap our [Power BI Theme Generator](/tools/power-bi-theme-generator) is built around: set your data colors, structural colors, and KPI colors visually, watch the JSON update live, then copy it or download a ready-to-import \`theme.json\`. It deliberately covers the properties every theme actually needs — name, dataColors, structural colors, KPI colors — rather than attempting Power BI's full \`visualStyles\` specification, which handles granular per-visual-type formatting (borders, shadows, padding, independently for every chart type Power BI supports). That fuller specification is a considerably larger, more error-prone surface, and it's genuinely better handled through Power BI Desktop's own Format pane, which can still be saved back into your theme file afterward.

## What's out there already, and where the gaps are

PowerBI.tips built what the community widely considers the best free generator — a genuinely capable interface with gradient and multi-select color tools. Creating and actually downloading a finished theme there now requires a paid subscription, something that's drawn real frustration in Microsoft's own Fabric community forums. A couple of older free generators are still around too, but they tend to output a theme.json compressed onto a single unbroken line — technically valid, but painful to open and hand-edit later if you need to tweak one value. BIBB's generator is a genuinely different option worth knowing about, notably supporting image upload to pull a color palette directly from a logo, though it's positioned as a lead-in to their paid UI templates rather than a standalone free tool. None of this is a knock on any of them — it's just useful to know the landscape before picking a tool, especially if you've already hit a paywall on one and are looking for a straightforward alternative that stays free end to end.

## Applying the finished file

Once you have a \`theme.json\`, open Power BI Desktop, go to the View tab, open the Themes dropdown, and choose "Browse for themes." Select your file, and it applies to the whole report immediately. Keep the file itself somewhere your team can find it — a shared drive, a repo, wherever your other report assets live — so every new report starts from the same baseline instead of someone recreating the colors from memory six months later.`,
    category: 'Design',
    author: 'ToolHub Team',
    readTime: '7 min read',
    published: true,
  },
  {
    title: 'Simple Interest vs. Compound Interest: What\u2019s the Real Difference?',
    slug: 'simple-vs-compound-interest',
    excerpt: 'Both calculate what a loan or investment earns over time, but they diverge fast. A worked example showing exactly how much that difference is worth, and where each one actually shows up in real financial products.',
    content: `Two loans with the identical rate and term can end up costing completely different amounts, and the reason usually isn't the interest rate at all — it's whether that interest is simple or compound. The distinction sounds like a technicality until you see the actual numbers, at which point it stops being abstract fast.

## Simple interest: calculated only on the original amount

Simple interest is calculated exclusively on the principal, the original amount borrowed or invested, for the entire term. It never touches interest that's already accumulated, no matter how long the term runs. The formula is genuinely straightforward: Interest = Principal \u00d7 Rate \u00d7 Time.

Lend \\$10,000 at 5% simple interest for 10 years, and the calculation is the same in year one as it is in year ten: \\$10,000 \u00d7 0.05 \u00d7 10 = \\$5,000 in total interest, regardless of when during those 10 years you check. The interest accumulates in a straight, predictable line.

## Compound interest: interest earning interest

Compound interest is calculated on the principal *plus* whatever interest has already accumulated, which means each compounding period's interest is calculated on a slightly larger base than the one before it. The formula: Final Amount = Principal \u00d7 (1 + Rate)^Time, for annual compounding specifically (more frequent compounding, monthly or daily, uses a modified version of this same formula).

Apply that same \\$10,000 at 5%, compounded annually, for 10 years: \\$10,000 \u00d7 (1.05)^10 = \\$16,288.95, meaning \\$6,288.95 in interest, not \\$5,000. The difference, \\$1,288.95, comes entirely from interest earning its own interest along the way.

## The gap grows the longer money sits

This is the part that surprises people the most: the gap between the two isn't fixed, it widens the longer the term runs. Extend that same example to 20 years instead of 10, and simple interest reaches \\$20,000 total, while compound interest reaches \\$26,532.98, a gap of \\$6,532.98, more than five times wider than the 10-year gap, despite the time period only doubling. Compounding doesn't just add more over a longer term, it accelerates, which is exactly why it's described as growing exponentially rather than linearly.

A quick way to get a feel for that acceleration without doing the full calculation: the Rule of 72. Divide 72 by the interest rate, and the result is roughly how many years it takes for money to double under compound interest. At 5%, that's 72 \u00f7 5 \u2248 14.4 years, close to the precise answer of 14.21 years, accurate enough for a fast mental estimate even though it's not exact. Our [Compound Interest Calculator](/tools/compound-interest-calculator) shows this estimate automatically alongside the precise result, for whatever rate you're actually working with.

## Where each one actually shows up in real financial products

Compound interest is the default for most everyday financial products: savings accounts, most investment accounts, credit cards, and the majority of mortgages all compound, typically daily or monthly rather than annually, which means the real-world gap versus simple interest is usually even larger than an annual-compounding example shows. This works in your favor as a saver or investor and against you as a borrower carrying a balance.

Simple interest shows up less often, but genuinely does in specific products: some auto loans, certain short-term personal loans, and some bonds use it, generally because it's simpler for both sides to calculate and predict exactly what's owed at any point in the term.

## Why this matters more for debt than for savings

The practical takeaway differs depending on which side of the transaction you're on. As a saver or investor, compound interest working in your favor is exactly why starting early matters more than almost any other single factor, the earlier money starts compounding, the more time it has for that acceleration to take effect. As a borrower, compound interest working against you is exactly why a credit card balance can grow substantially even without new spending, the interest owed compounds right alongside the principal.

Run your own numbers, whatever the actual amount, rate, and term are, with our [Compound Interest Calculator](/tools/compound-interest-calculator) rather than estimating — the exponential part of compound growth is genuinely easy to underestimate by eye, which is exactly why seeing the real figure for your own specific numbers is worth the 30 seconds it takes.`,
    category: 'Calculators',
    author: 'ToolHub Team',
    readTime: '6 min read',
    published: true,
  },
  {
    title: 'The Rule of 72: How to Estimate Doubling Time Without a Calculator',
    slug: 'rule-of-72-explained',
    excerpt: 'Divide 72 by the interest rate and you\u2019ve got a close estimate of how many years it takes money to double. Where the number 72 actually comes from, how accurate it really is, and the lesser-known Rule of 114 and Rule of 144 for tripling and quadrupling.',
    content: `Divide 72 by an interest rate, and the result is roughly how many years it takes money to double at that rate. That's the entire Rule of 72, a mental-math shortcut old enough that nobody can point to exactly who first wrote it down, yet accurate enough that it's still the fastest way to size up an investment without opening a calculator.

## The formula and a worked example

Years to double \u2248 72 \u00f7 interest rate. At a 12% annual return, that's 72 \u00f7 12 = 6 years. At a more conservative 6%, it's 72 \u00f7 6 = 12 years, twice as long for half the rate, which is itself a useful intuition the rule makes obvious at a glance.

Checked against the actual precise doubling-time formula, the estimate holds up well across the range most real investments fall into: at 8%, the Rule of 72 gives 9.00 years against a precise 9.01, essentially exact. At 4%, it gives 18.00 years against a precise 17.67, off by about four months. The rule is genuinely most accurate in roughly the 6% to 15% range, and drifts further (though still usably close) outside it.

## Why 72, specifically

The real mathematical relationship behind doubling time comes from a natural logarithm: precisely, years to double = ln(2) \u00f7 ln(1 + rate), and ln(2) itself works out to approximately 0.693. Multiplied by 100 to work with whole-number percentage rates, that's 69.3, the actual, precise constant.

72 is a deliberate rounding up from 69.3, not the mathematically purest choice, but a far more practical one: 72 divides evenly by 1, 2, 3, 4, 6, 8, 9, and 12, exactly the small numbers a real interest rate is likely to be. 69.3 divides cleanly by almost none of them. Trading a small amount of theoretical precision for a number that's actually fast to divide in your head is the entire reason 72 won out over the more "correct" 69.3.

## The lesser-known extensions: Rule of 114 and Rule of 144

The same shortcut extends naturally past doubling. The **Rule of 114** estimates years to triple: divide 114 by the rate. The **Rule of 144** estimates years to quadruple: divide 144 by the rate. Both follow the identical logic as the Rule of 72, just built around ln(3) and ln(4) instead of ln(2).

At a 12% return: doubling takes about 72 \u00f7 12 = 6 years, tripling about 114 \u00f7 12 = 9.5 years, and quadrupling about 144 \u00f7 12 = 12 years.

Worth knowing honestly: these two extensions are somewhat less precise than the Rule of 72 itself. The pure log-derived constants are 109.9 (for tripling) and 138.6 (for quadrupling), and 114 and 144 round further away from those than 72 does from 69.3, prioritizing easy divisibility (both numbers share many of the same clean factors as 72) over exactness. At 8%, the Rule of 114 gives 14.25 years against a precise 14.27, still excellent. At 15%, it gives 7.60 against a precise 7.86, a gap of about three months, noticeable but still a reasonable, fast estimate for a back-of-envelope decision.

## What this is genuinely useful for, and where it isn't

The Rule of 72 shines specifically for quick, comparative decisions: sizing up two investment options at a glance, sanity-checking whether a stated return sounds plausible, or explaining compound growth to someone without walking through the full formula. It's not built for precision, and it assumes a fixed, unchanging rate the entire period, a simplifying assumption real investments rarely honor exactly.

For the actual, precise figure, our [Compound Interest Calculator](/tools/compound-interest-calculator) includes a Rule of 72 estimate alongside the exact calculation, so you can see both the fast mental shortcut and the real number for your own specific principal, rate, and term side by side.`,
    category: 'Calculators',
    author: 'ToolHub Team',
    readTime: '6 min read',
    published: true,
  },
]
