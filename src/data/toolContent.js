import {
  HiOutlineBolt,
  HiOutlineShieldCheck,
  HiOutlineCloudArrowUp,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineSquares2X2,
  HiOutlineLockClosed,
  HiOutlineClock,
  HiOutlineGlobeAlt,
  HiOutlineCpuChip,
  HiOutlineDocumentDuplicate,
  HiOutlineScale,
  HiOutlineArrowsPointingOut,
  HiOutlineArrowsRightLeft,
  HiOutlineFingerPrint,
  HiOutlineHashtag,
  HiOutlineCalendarDays,
  HiOutlineCodeBracket,
  HiOutlineLink,
  HiOutlineKey,
  HiOutlinePaintBrush,
  HiOutlineRectangleGroup,
  HiOutlineDocumentText,
  HiOutlinePhoto,
  HiOutlineSparkles,
  HiOutlineEyeDropper,
  HiOutlineViewfinderCircle,
  HiOutlinePresentationChartBar,
  HiOutlineTableCells,
} from 'react-icons/hi2'

// Reused across most browser-only tools — this is genuinely the same
// answer for the same reason, not lazy duplication: every tool listed
// here really does process entirely client-side, so the accurate privacy
// statement really is identical. Tools with real exceptions (the YouTube
// Thumbnail Downloader fetches from YouTube's CDN) get their own entry.
const BROWSER_ONLY_PRIVACY =
  'This tool runs entirely in your browser using standard web technology \u2014 your original file is never uploaded to ToolHub\u2019s servers. If you\u2019re signed in, the result is automatically kept in your Downloads for 14 days so you can come back for it later, then permanently deleted; if you\u2019re not signed in, nothing about the result is stored anywhere.'

const NO_FILE_PRIVACY =
  'This tool works entirely on data you type or paste directly in your browser. Nothing you enter is sent to ToolHub\u2019s servers \u2014 only the fact that you used this tool is logged, for your own history if you\u2019re signed in.'

export const toolContent = {
  'jpg-to-png': {
    about:
      'JPG to PNG converts your JPEG photos into the PNG format, which supports transparency and lossless compression. It\u2019s the tool to reach for when you need an image that won\u2019t lose any more quality on repeated saves, or when you need to add transparency later.',
    features: [
      { title: 'Lossless output', description: 'PNG never re-compresses your image further \u2014 what you see is exactly what you get.', icon: HiOutlineSparkles },
      { title: 'Batch friendly', description: 'Convert up to 10 images in one pass and download them individually or as a ZIP.', icon: HiOutlineSquares2X2 },
      { title: 'Runs in your browser', description: 'No upload, no waiting on a server \u2014 conversion happens instantly on your device.', icon: HiOutlineBolt },
      { title: 'No quality loss', description: 'Your original JPG content is preserved exactly, just re-encoded as PNG.', icon: HiOutlineShieldCheck },
    ],
    howToUse: [
      'Upload one or more JPG images (drag & drop or click to browse).',
      'Optionally adjust resize, rotate or flip settings \u2014 all combinable in one pass.',
      'Click Convert to PNG.',
      'Download each result individually, or grab them all at once as a ZIP.',
    ],
    useCases: [
      'Preparing a photo for a design tool that needs transparency support',
      'Archiving a photo in a lossless format before further editing',
      'Converting screenshots for documentation that needs crisp PNG output',
      'Getting a format that certain apps or CMS platforms require',
    ],
    supportedFormats: { input: 'JPG / JPEG', output: 'PNG', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'png-to-jpg': {
    about:
      'PNG to JPG converts PNG images into the widely-supported JPEG format, typically producing a much smaller file. It\u2019s the right choice when file size matters more than pixel-perfect transparency \u2014 photos, web images, and anything you plan to share or upload elsewhere.',
    features: [
      { title: 'Smaller file sizes', description: 'JPEG\u2019s compression usually shrinks PNG files significantly with minimal visible difference.', icon: HiOutlineArrowsPointingOut },
      { title: 'Adjustable quality', description: 'Fine-tune the compression level to balance size against visual quality.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Batch friendly', description: 'Convert up to 10 images in one pass, with a ZIP download for all of them.', icon: HiOutlineSquares2X2 },
      { title: 'Runs in your browser', description: 'No upload, no waiting on a server \u2014 conversion happens instantly on your device.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Upload one or more PNG images.',
      'Set the JPG quality level, and optionally resize, rotate or flip.',
      'Click Convert to JPG.',
      'Download each result individually, or all at once as a ZIP.',
    ],
    useCases: [
      'Shrinking screenshots before attaching them to an email or ticket',
      'Preparing images for a website where load time matters',
      'Converting a PNG design export to a format most platforms accept',
      'Reducing storage space for a large batch of images',
    ],
    supportedFormats: { input: 'PNG', output: 'JPG', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'webp-to-png': {
    about:
      'WEBP to PNG converts modern WEBP images into the universally-supported PNG format. WEBP offers great compression but isn\u2019t accepted everywhere \u2014 this tool gets you a format that opens correctly in any image viewer, editor, or older software.',
    features: [
      { title: 'Universal compatibility', description: 'PNG opens in virtually every image tool, unlike WEBP.', icon: HiOutlineGlobeAlt },
      { title: 'Preserves transparency', description: 'Alpha transparency in the source WEBP carries over correctly.', icon: HiOutlineShieldCheck },
      { title: 'Batch friendly', description: 'Convert up to 10 images at once, download individually or as a ZIP.', icon: HiOutlineSquares2X2 },
      { title: 'Instant results', description: 'Conversion happens locally in your browser \u2014 no wait, no upload.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Upload one or more WEBP images.',
      'Optionally resize, rotate or flip before converting.',
      'Click Convert to PNG.',
      'Download your results individually or as a ZIP.',
    ],
    useCases: [
      'Opening a WEBP image in software that doesn\u2019t support the format',
      'Preparing a WEBP asset for a platform that requires PNG uploads',
      'Editing a WEBP image in a tool with better PNG support',
    ],
    supportedFormats: { input: 'WEBP', output: 'PNG', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'webp-to-jpg': {
    about:
      'WEBP to JPG converts modern WEBP images into the widely-supported JPEG format \u2014 useful when you need an image that opens anywhere, from photo software to social platforms that don\u2019t yet handle WEBP well.',
    features: [
      { title: 'Universal compatibility', description: 'JPG opens in virtually every application and platform.', icon: HiOutlineGlobeAlt },
      { title: 'Adjustable quality', description: 'Control the compression level to balance size and quality.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Batch friendly', description: 'Convert up to 10 images at once, download individually or as a ZIP.', icon: HiOutlineSquares2X2 },
      { title: 'Instant results', description: 'Conversion happens locally in your browser \u2014 no wait, no upload.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Upload one or more WEBP images.',
      'Set your desired quality, and optionally resize, rotate or flip.',
      'Click Convert to JPG.',
      'Download your results individually or as a ZIP.',
    ],
    useCases: [
      'Sharing a WEBP image on a platform that expects JPG uploads',
      'Opening a WEBP photo in older photo-editing software',
      'Standardizing a mixed batch of images into one common format',
    ],
    supportedFormats: { input: 'WEBP', output: 'JPG', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'convert-to-webp': {
    about:
      'Convert to WEBP turns JPG or PNG images into the modern WEBP format, which typically produces noticeably smaller files at the same visual quality \u2014 ideal for faster-loading websites and reduced storage.',
    features: [
      { title: 'Smaller files', description: 'WEBP often beats JPG and PNG on file size at equivalent quality.', icon: HiOutlineArrowsPointingOut },
      { title: 'Adjustable quality', description: 'Fine-tune compression to hit the size and quality you need.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Batch friendly', description: 'Convert up to 10 images at once, download individually or as a ZIP.', icon: HiOutlineSquares2X2 },
      { title: 'Instant results', description: 'Conversion happens locally in your browser \u2014 no wait, no upload.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Upload one or more JPG or PNG images.',
      'Set your desired quality, and optionally resize, rotate or flip.',
      'Click Convert to WEBP.',
      'Download your results individually or as a ZIP.',
    ],
    useCases: [
      'Speeding up a website by shrinking image payloads',
      'Reducing storage space for large photo libraries',
      'Preparing modern, efficient assets for a web or app project',
    ],
    supportedFormats: { input: 'JPG / PNG', output: 'WEBP', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'image-compressor': {
    about:
      'Image Compressor reduces your image\u2019s file size using an adjustable quality slider, so you can shrink large photos down for faster uploads and page loads without a visible drop in quality.',
    features: [
      { title: 'Adjustable quality', description: 'Drag the slider and see the size trade-off before committing.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Live before/after size', description: 'See exactly how much smaller your file gets at each setting.', icon: HiOutlineScale },
      { title: 'Batch friendly', description: 'Compress up to 10 images at once, download individually or as a ZIP.', icon: HiOutlineSquares2X2 },
      { title: 'Instant results', description: 'Compression happens locally in your browser \u2014 no wait, no upload.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Upload one or more images.',
      'Adjust the quality slider until you\u2019re happy with the size/quality balance.',
      'Click Compress.',
      'Download your results individually or as a ZIP.',
    ],
    useCases: [
      'Getting a photo under a website\u2019s or form\u2019s upload size limit',
      'Speeding up page load times by shrinking image assets',
      'Reducing storage or bandwidth use for large photo collections',
      'Making an email attachment small enough to send',
    ],
    supportedFormats: { input: 'JPG / PNG / WEBP', output: 'Same or JPG/PNG/WEBP', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'image-resizer': {
    about:
      'Image Resizer changes your image\u2019s pixel dimensions \u2014 either to an exact width and height, or by a percentage scale \u2014 while keeping it sharp and correctly proportioned.',
    features: [
      { title: 'Exact or proportional', description: 'Resize to precise pixel dimensions, or scale by percentage to preserve aspect ratio automatically.', icon: HiOutlineArrowsPointingOut },
      { title: 'Aspect ratio lock', description: 'Lock width and height together so your image never looks stretched.', icon: HiOutlineLockClosed },
      { title: 'Batch friendly', description: 'Resize up to 10 images at once, download individually or as a ZIP.', icon: HiOutlineSquares2X2 },
      { title: 'High-quality scaling', description: 'Uses high-quality image smoothing, not a blurry naive resize.', icon: HiOutlineSparkles },
    ],
    howToUse: [
      'Upload one or more images.',
      'Choose exact width & height, or a percentage scale.',
      'Click Resize.',
      'Download your results individually or as a ZIP.',
    ],
    useCases: [
      'Meeting an exact pixel-dimension requirement for a website or form',
      'Shrinking a huge camera photo down to a manageable size',
      'Preparing a batch of images to the same consistent size',
    ],
    supportedFormats: { input: 'JPG / PNG / WEBP', output: 'Same format', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'image-crop': {
    about:
      'Image Cropper lets you select and cut out exactly the part of an image you want, with a draggable, resizable crop box you control directly on the image \u2014 no guessing at coordinates.',
    features: [
      { title: 'Visual, draggable crop box', description: 'Drag, resize and reposition the crop area directly on your image.', icon: HiOutlineRectangleGroup },
      { title: 'Keyboard support', description: 'Fine-tune the crop area with arrow keys once it\u2019s focused.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Precise pixel control', description: 'The final crop uses your image\u2019s real pixel coordinates, not an approximation.', icon: HiOutlineViewfinderCircle },
      { title: 'Instant results', description: 'Cropping happens locally in your browser \u2014 no wait, no upload.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Upload an image.',
      'Drag the crop box to the area you want to keep, and resize its edges as needed.',
      'Click Crop.',
      'Download your cropped image.',
    ],
    useCases: [
      'Cutting a subject out of a wider photo',
      'Removing unwanted edges or borders from a screenshot',
      'Preparing a square or specific-ratio crop for a profile picture',
    ],
    supportedFormats: { input: 'JPG / PNG / WEBP', output: 'Same format', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'image-rotate': {
    about:
      'Image Rotator turns your image to any 90\u00b0 increment \u2014 useful for fixing a sideways photo or reorienting a scanned document.',
    features: [
      { title: '90\u00b0 increments', description: 'Rotate left, right, or all the way around, one click at a time.', icon: HiOutlineArrowsRightLeft },
      { title: 'Batch friendly', description: 'Rotate up to 10 images at once, download individually or as a ZIP.', icon: HiOutlineSquares2X2 },
      { title: 'No quality loss', description: 'Rotation is a pure pixel transform \u2014 nothing about the image content changes.', icon: HiOutlineShieldCheck },
      { title: 'Instant results', description: 'Rotation happens locally in your browser \u2014 no wait, no upload.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Upload one or more images.',
      'Choose a rotation angle (90\u00b0, 180\u00b0 or 270\u00b0).',
      'Click Rotate.',
      'Download your results individually or as a ZIP.',
    ],
    useCases: [
      'Fixing a photo that was taken or scanned sideways',
      'Correcting the orientation of a phone photo before sharing it',
      'Straightening out a batch of scanned pages',
    ],
    supportedFormats: { input: 'JPG / PNG / WEBP', output: 'Same format', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'flip-image': {
    about:
      'Flip Image mirrors your image horizontally or vertically \u2014 different from rotating, since it reverses the image rather than turning it around a point.',
    features: [
      { title: 'Horizontal or vertical', description: 'Mirror left-to-right or top-to-bottom, independently or together.', icon: HiOutlineArrowsRightLeft },
      { title: 'Batch friendly', description: 'Flip up to 10 images at once, download individually or as a ZIP.', icon: HiOutlineSquares2X2 },
      { title: 'No quality loss', description: 'Flipping is a pure pixel transform \u2014 nothing about the image content changes.', icon: HiOutlineShieldCheck },
      { title: 'Instant results', description: 'Flipping happens locally in your browser \u2014 no wait, no upload.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Upload one or more images.',
      'Choose horizontal flip, vertical flip, or both.',
      'Click Flip.',
      'Download your results individually or as a ZIP.',
    ],
    useCases: [
      'Correcting a mirrored selfie or webcam photo',
      'Creating a mirrored version of a graphic for design purposes',
      'Fixing the orientation of a scanned image',
    ],
    supportedFormats: { input: 'JPG / PNG / WEBP', output: 'Same format', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'jpg-to-pdf': {
    about:
      'JPG to PDF turns a JPG image into a single-page PDF document, sized to match your image exactly \u2014 useful whenever you need a photo delivered as a proper PDF file.',
    features: [
      { title: 'Exact sizing', description: 'The PDF page matches your image\u2019s real pixel dimensions \u2014 no cropping or distortion.', icon: HiOutlineViewfinderCircle },
      { title: 'Real PDF output', description: 'Produces a genuine, standards-compliant PDF you can open in any reader.', icon: HiOutlineDocumentText },
      { title: 'Instant results', description: 'Conversion happens locally in your browser \u2014 no wait, no upload.', icon: HiOutlineBolt },
      { title: 'Combine with Merge PDF', description: 'Convert several images and merge them into one multi-page PDF afterward.', icon: HiOutlineSquares2X2 },
    ],
    howToUse: ['Upload a JPG image.', 'Click Convert to PDF.', 'Download your PDF file.'],
    useCases: [
      'Submitting a photo of a signed document as a PDF',
      'Turning a receipt photo into a PDF for expense reports',
      'Preparing a single-page PDF from a scanned image',
    ],
    supportedFormats: { input: 'JPG', output: 'PDF', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'png-to-pdf': {
    about:
      'PNG to PDF turns a PNG image into a single-page PDF document, sized to match your image exactly \u2014 handy for turning a screenshot, graphic, or scan into a shareable PDF.',
    features: [
      { title: 'Exact sizing', description: 'The PDF page matches your image\u2019s real pixel dimensions \u2014 no cropping or distortion.', icon: HiOutlineViewfinderCircle },
      { title: 'Real PDF output', description: 'Produces a genuine, standards-compliant PDF you can open in any reader.', icon: HiOutlineDocumentText },
      { title: 'Instant results', description: 'Conversion happens locally in your browser \u2014 no wait, no upload.', icon: HiOutlineBolt },
      { title: 'Combine with Merge PDF', description: 'Convert several images and merge them into one multi-page PDF afterward.', icon: HiOutlineSquares2X2 },
    ],
    howToUse: ['Upload a PNG image.', 'Click Convert to PDF.', 'Download your PDF file.'],
    useCases: [
      'Turning a screenshot into a shareable PDF',
      'Converting a scanned document image into PDF form',
      'Preparing a graphic or diagram as a standalone PDF page',
    ],
    supportedFormats: { input: 'PNG', output: 'PDF', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'merge-pdf': {
    about:
      'Merge PDF combines multiple PDF files into a single document, in whatever order you choose \u2014 every page copied exactly as it appears in the source files, with nothing re-rendered or flattened.',
    features: [
      { title: 'Reorder before merging', description: 'Move files up or down to control the exact page order of the result.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Faithful page copying', description: 'Pages are copied exactly as they appear in the source \u2014 not re-rendered.', icon: HiOutlineDocumentDuplicate },
      { title: 'No file limit', description: 'Merge as many PDFs as you need in one pass.', icon: HiOutlineSquares2X2 },
      { title: 'Instant results', description: 'Merging happens locally in your browser \u2014 no wait, no upload.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Upload two or more PDF files.',
      'Reorder them using the up/down arrows if needed.',
      'Click Merge.',
      'Download your combined PDF.',
    ],
    useCases: [
      'Combining multiple scanned pages into one document',
      'Assembling a report from several separate PDF sections',
      'Merging an invoice and its supporting attachments into one file',
    ],
    supportedFormats: { input: 'PDF (multiple files)', output: 'PDF', maxSize: '25 MB per file' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'split-pdf': {
    about:
      'Split PDF extracts specific pages or page ranges from a PDF into a brand new document \u2014 tell it which pages you want (like "1-3, 5, 8-10") and it builds a new PDF from exactly those.',
    features: [
      { title: 'Flexible page ranges', description: 'Specify individual pages, ranges, or a mix of both in one go.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Faithful page copying', description: 'Extracted pages are copied exactly as they appear in the source.', icon: HiOutlineDocumentDuplicate },
      { title: 'Automatic page count', description: 'See how many pages your PDF has before choosing what to extract.', icon: HiOutlineDocumentText },
      { title: 'Instant results', description: 'Splitting happens locally in your browser \u2014 no wait, no upload.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Upload a PDF file.',
      'Enter the pages you want, e.g. "1-3, 5, 8-10".',
      'Click Extract Pages.',
      'Download your new PDF containing just those pages.',
    ],
    useCases: [
      'Pulling out just the relevant pages from a long report',
      'Separating a signature page from a larger contract',
      'Extracting a chapter from a longer PDF document',
    ],
    supportedFormats: { input: 'PDF', output: 'PDF', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'pdf-to-jpg': {
    about:
      'PDF to JPG renders a page from your PDF into a real JPG image \u2014 genuine pixel rendering of that page\u2019s actual content, not a placeholder or text extraction.',
    features: [
      { title: 'Real page rendering', description: 'Renders the actual visual content of the page, not just its text.', icon: HiOutlinePhoto },
      { title: 'Page selection', description: 'Choose exactly which page to convert on multi-page PDFs.', icon: HiOutlineDocumentText },
      { title: 'Sharp output', description: 'Pages render at roughly 2x native size for a crisp result.', icon: HiOutlineSparkles },
      { title: 'Instant results', description: 'Rendering happens locally in your browser \u2014 no wait, no upload.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Upload a PDF file.',
      'Choose which page to convert (if it has more than one).',
      'Click Convert.',
      'Download the resulting JPG image.',
    ],
    useCases: [
      'Turning a PDF page into an image for a slide or presentation',
      'Getting a shareable image preview of a document page',
      'Extracting a diagram or figure from a PDF as an image file',
    ],
    supportedFormats: { input: 'PDF', output: 'JPG (one page at a time)', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'pdf-to-png': {
    about:
      'PDF to PNG renders a page from your PDF into a real PNG image \u2014 genuine pixel rendering of that page\u2019s actual content, ideal when you need a lossless image, like for a page with sharp text or line art.',
    features: [
      { title: 'Real page rendering', description: 'Renders the actual visual content of the page, not just its text.', icon: HiOutlinePhoto },
      { title: 'Page selection', description: 'Choose exactly which page to convert on multi-page PDFs.', icon: HiOutlineDocumentText },
      { title: 'Lossless output', description: 'PNG won\u2019t introduce any further compression artifacts.', icon: HiOutlineSparkles },
      { title: 'Instant results', description: 'Rendering happens locally in your browser \u2014 no wait, no upload.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Upload a PDF file.',
      'Choose which page to convert (if it has more than one).',
      'Click Convert.',
      'Download the resulting PNG image.',
    ],
    useCases: [
      'Getting a crisp, lossless image of a text-heavy page',
      'Extracting a diagram or chart from a PDF for editing',
      'Creating a page preview image for a document',
    ],
    supportedFormats: { input: 'PDF', output: 'PNG (one page at a time)', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'pdf-to-word': {
    about:
      'PDF to Word extracts the actual text content from your PDF and reconstructs it into an editable Word document \u2014 a genuine starting point for editing, not a fake conversion. It intentionally does not claim to preserve the original layout, fonts, images or tables, since that\u2019s a much harder problem even paid tools don\u2019t solve perfectly.',
    features: [
      { title: 'Real text extraction', description: 'Pulls the actual text from your PDF, not a placeholder.', icon: HiOutlineDocumentText },
      { title: 'Smart paragraph detection', description: 'Reconstructs paragraph breaks based on the text\u2019s real spacing, not just line breaks.', icon: HiOutlineCpuChip },
      { title: 'Multi-page support', description: 'Every page\u2019s text is included, with a page break between each.', icon: HiOutlineSquares2X2 },
      { title: 'Genuine .docx output', description: 'Produces a real, valid Word file that opens correctly in Word or Google Docs.', icon: HiOutlineSparkles },
    ],
    howToUse: [
      'Upload a PDF file.',
      'Click Convert to Word.',
      'Download the resulting .docx file.',
      'Open it in Word or Google Docs to continue editing.',
    ],
    useCases: [
      'Getting an editable starting point from a text-heavy PDF',
      'Pulling the wording out of an old PDF to reuse elsewhere',
      'Converting a PDF report into something you can revise',
    ],
    supportedFormats: {
      input: 'PDF (with real, selectable text)',
      output: 'DOCX',
      notes: 'Scanned/image-only PDFs have no text to extract and won\u2019t work with this tool',
      maxSize: '25 MB',
    },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'pdf-to-powerpoint': {
    about:
      'PDF to PowerPoint turns every page of your PDF into a slide, rendering each page as a real image so it looks exactly like the original \u2014 an honest approach, since reliably rebuilding editable slide layouts from a PDF isn\u2019t something that can be done accurately.',
    features: [
      { title: 'Every page becomes a slide', description: 'One slide per PDF page, in the original order.', icon: HiOutlinePresentationChartBar },
      { title: 'Looks exactly like your PDF', description: 'Each slide is a full-resolution image of that page, not a re-creation.', icon: HiOutlinePhoto },
      { title: 'Genuine .pptx output', description: 'A real, valid PowerPoint file that opens correctly in PowerPoint or Google Slides.', icon: HiOutlineSparkles },
      { title: 'Multi-page support', description: 'Works through PDFs of any length, one slide at a time.', icon: HiOutlineSquares2X2 },
    ],
    howToUse: [
      'Upload a PDF file.',
      'Click Convert to PowerPoint.',
      'Download the resulting .pptx file.',
      'Open it in PowerPoint or Google Slides.',
    ],
    useCases: [
      'Turning a PDF report into a slide deck for a meeting',
      'Presenting a PDF document without switching apps to show it',
      'Getting a PDF\u2019s pages into a format you can annotate slide-by-slide',
    ],
    supportedFormats: {
      input: 'PDF',
      output: 'PPTX',
      notes: 'Slides contain each page as an image, not editable text or shapes',
      maxSize: '25 MB',
    },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'excel-to-pdf': {
    about:
      'Excel to PDF reads your spreadsheet\u2019s actual cell data and lays it out as a clean table in a PDF \u2014 genuinely useful for sharing or printing simple data, though it doesn\u2019t attempt to reproduce charts, images, or complex formatting.',
    features: [
      { title: 'Real cell data', description: 'Reads the actual values in your spreadsheet, not a placeholder table.', icon: HiOutlineTableCells },
      { title: 'Automatic pagination', description: 'Long sheets automatically continue onto additional PDF pages.', icon: HiOutlineDocumentText },
      { title: 'Clean table layout', description: 'A bolded header row and alternating row shading for readability.', icon: HiOutlineSquares2X2 },
      { title: 'Genuine PDF output', description: 'A real, valid PDF that opens correctly everywhere.', icon: HiOutlineSparkles },
    ],
    howToUse: [
      'Upload an Excel file (.xlsx or .xls).',
      'Click Convert to PDF.',
      'Download the resulting PDF.',
    ],
    useCases: [
      'Sharing a spreadsheet with someone who just needs to view it',
      'Printing a data table without opening Excel',
      'Archiving a simple spreadsheet in a format that won\u2019t change',
    ],
    supportedFormats: {
      input: 'XLSX, XLS',
      output: 'PDF',
      notes: 'Only the first sheet is converted; charts, images and merged cells aren\u2019t reproduced',
      maxSize: '15 MB',
    },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'word-to-pdf': {
    about:
      'Word to PDF extracts your document\u2019s real text, headings, and bold formatting and lays it out as a proper, paginated PDF \u2014 a genuine conversion for text-focused documents, not a fake preview.',
    features: [
      { title: 'Real text extraction', description: 'Pulls the actual text from your document, not a placeholder.', icon: HiOutlineDocumentText },
      { title: 'Headings preserved', description: 'Heading styles are kept larger and bold, so document structure stays clear.', icon: HiOutlineRectangleGroup },
      { title: 'Bold text preserved', description: 'Bold formatting within paragraphs carries over correctly.', icon: HiOutlineSparkles },
      { title: 'Proper pagination', description: 'Text wraps and flows across pages naturally, like a real document.', icon: HiOutlineSquares2X2 },
    ],
    howToUse: [
      'Upload a Word document (.docx).',
      'Click Convert to PDF.',
      'Download the resulting PDF.',
    ],
    useCases: [
      'Sending a document to someone without a Word-compatible app',
      'Locking a document\u2019s content before sharing it',
      'Converting a report or letter into a PDF for printing',
    ],
    supportedFormats: {
      input: 'DOCX only (not older .doc files)',
      output: 'PDF',
      notes: 'Tables, images, columns and styles beyond headings/bold aren\u2019t preserved',
      maxSize: '15 MB',
    },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'color-picker': {
    about:
      'Color Picker lets you sample the exact color at any point on an uploaded image, reading the real pixel value directly \u2014 or pick a color directly with no image at all.',
    features: [
      { title: 'Pixel-accurate sampling', description: 'Reads the real pixel data at the point you click \u2014 not an approximation.', icon: HiOutlineEyeDropper },
      { title: 'Works without an image', description: 'A standalone color picker is available even if you don\u2019t upload anything.', icon: HiOutlinePaintBrush },
      { title: 'All formats at once', description: 'See the picked color as HEX, RGB and HSL simultaneously.', icon: HiOutlineSquares2X2 },
      { title: 'One-click copy', description: 'Copy any format straight to your clipboard.', icon: HiOutlineDocumentDuplicate },
    ],
    howToUse: [
      'Upload an image, or use the standalone picker if you don\u2019t have one.',
      'Click anywhere on the image to sample that pixel\u2019s color.',
      'View the result as HEX, RGB and HSL.',
      'Copy whichever format you need.',
    ],
    useCases: [
      'Matching a brand color from a logo or photo',
      'Picking a color from a design mockup to reuse in CSS',
      'Identifying the exact shade used somewhere in an image',
    ],
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'hex-to-rgb': {
    about:
      'HEX to RGB converts hex color codes into their RGB equivalent instantly, alongside HSL, so you never have to look up a conversion by hand.',
    features: [
      { title: 'Instant conversion', description: 'See the RGB (and HSL) equivalent the moment you type a valid hex code.', icon: HiOutlineBolt },
      { title: 'Visual picker included', description: 'Use the color swatch picker if you\u2019d rather not type a hex code.', icon: HiOutlinePaintBrush },
      { title: 'One-click copy', description: 'Copy the result straight to your clipboard.', icon: HiOutlineDocumentDuplicate },
    ],
    howToUse: [
      'Type or paste a hex color code (e.g. #3b6cf6).',
      'The equivalent RGB and HSL values appear instantly.',
      'Copy whichever format you need.',
    ],
    useCases: [
      'Converting a design tool\u2019s hex color for use in RGB-based code',
      'Translating a brand color guide\u2019s hex values to RGB',
      'Checking what a hex code actually looks like as RGB channels',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'rgb-to-hex': {
    about:
      'RGB to HEX converts RGB color values into their hex equivalent instantly, alongside HSL \u2014 useful whenever your source gives you RGB but you need a hex code for CSS or design tools.',
    features: [
      { title: 'Instant conversion', description: 'See the hex (and HSL) equivalent the moment you enter a valid RGB value.', icon: HiOutlineBolt },
      { title: 'Flexible input', description: 'Accepts rgb(r, g, b) notation directly.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'One-click copy', description: 'Copy the result straight to your clipboard.', icon: HiOutlineDocumentDuplicate },
    ],
    howToUse: [
      'Type an RGB value, e.g. rgb(59, 108, 246).',
      'The equivalent hex and HSL values appear instantly.',
      'Copy whichever format you need.',
    ],
    useCases: [
      'Converting an RGB value from code into a hex code for design tools',
      'Getting a hex code from a color picked in an image editor',
      'Translating RGB values from a style guide into CSS-ready hex',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'hex-to-hsl': {
    about:
      'HEX to HSL converts hex color codes into HSL (Hue, Saturation, Lightness) values instantly \u2014 useful when you want to adjust a color\u2019s vividness or lightness in a way that\u2019s more intuitive than raw RGB.',
    features: [
      { title: 'Instant conversion', description: 'See the HSL (and RGB) equivalent the moment you type a valid hex code.', icon: HiOutlineBolt },
      { title: 'Visual picker included', description: 'Use the color swatch picker if you\u2019d rather not type a hex code.', icon: HiOutlinePaintBrush },
      { title: 'One-click copy', description: 'Copy the result straight to your clipboard.', icon: HiOutlineDocumentDuplicate },
    ],
    howToUse: [
      'Type or paste a hex color code.',
      'The equivalent HSL and RGB values appear instantly.',
      'Copy whichever format you need.',
    ],
    useCases: [
      'Adjusting a color\u2019s lightness or saturation for a UI theme',
      'Understanding a brand color\u2019s hue and vividness numerically',
      'Converting design-tool hex codes to HSL for CSS custom properties',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'color-converter': {
    about:
      'Color Converter is a universal color tool \u2014 enter a color in any format (hex, RGB or HSL) and see it converted to all three at once, with a visual picker and live swatch preview.',
    features: [
      { title: 'Any format in, all formats out', description: 'Type hex, rgb(), or hsl() \u2014 the other two are always shown alongside it.', icon: HiOutlineSquares2X2 },
      { title: 'Visual picker included', description: 'Use the native color swatch picker for a fully visual workflow.', icon: HiOutlinePaintBrush },
      { title: 'Live preview', description: 'See the actual color as a swatch, not just numbers.', icon: HiOutlineEyeDropper },
      { title: 'One-click copy', description: 'Copy any format straight to your clipboard.', icon: HiOutlineDocumentDuplicate },
    ],
    howToUse: [
      'Type a color in hex, rgb() or hsl() format, or use the picker.',
      'See it instantly converted to all three formats.',
      'Copy whichever one you need.',
    ],
    useCases: [
      'Working across design tools and codebases that use different color formats',
      'Quickly checking what a color looks like before committing to it',
      'Converting between formats when handing off a design to a developer',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'palette-generator': {
    about:
      'Color Palette Generator builds a set of related colors from one base color, using real HSL hue and lightness math \u2014 choose complementary, analogous, triadic or shade-based schemes.',
    features: [
      { title: 'Four real color schemes', description: 'Complementary, analogous, triadic and shades \u2014 each using genuine color-wheel math.', icon: HiOutlinePaintBrush },
      { title: 'One-click copy per swatch', description: 'Copy any generated color\u2019s hex code individually.', icon: HiOutlineDocumentDuplicate },
      { title: 'Instant regeneration', description: 'Change the base color or scheme and see results immediately.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Pick or type a base color.',
      'Choose a palette scheme: complementary, analogous, triadic or shades.',
      'View the generated palette of related colors.',
      'Copy any swatch\u2019s hex code.',
    ],
    useCases: [
      'Building a coordinated color scheme for a design project',
      'Finding complementary accent colors for a brand palette',
      'Generating a range of shades from one base color for a UI',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'gradient-generator': {
    about:
      'Gradient Generator is a free CSS gradient generator that creates smooth linear and radial gradients using a visual editor \u2014 add color stops, adjust their position and direction, and get ready-to-use CSS code instantly, with no need to hand-write gradient syntax or guess at color-stop percentages.\n\nA CSS gradient is a smooth color transition rendered directly by the browser, defined with the linear-gradient() or radial-gradient() function \u2014 no image file required. Because gradients are pure CSS rather than a downloaded image, they scale perfectly at any resolution, add zero extra HTTP requests to your page, and stay crisp on high-density displays where a raster image would look blurry or need multiple exported sizes.\n\nLinear gradients transition along a straight line, controlled by a direction \u2014 either a keyword like "to right" or an exact angle in degrees, where 0deg runs bottom-to-top and 90deg runs left-to-right. Radial gradients instead radiate outward from a center point in a circle or ellipse, which is useful for spotlight effects, glows, or soft vignettes. (CSS also defines a third type, conic gradients, which sweep colors around a center point rather than along a line or outward from one \u2014 this tool currently generates linear and radial gradients.)\n\nEach color stop you add sits at a specific position along the gradient, expressed as a percentage from 0% to 100%. Two stops create a simple two-color blend; adding more stops lets you build a multi-color gradient or even a hard, sharp color split by placing two stops at the same position. Keep in mind that more color stops mean more rendering work for the browser \u2014 two or three stops render with negligible cost, while ten or more can introduce a small amount of visible lag on lower-end devices, so it is worth using only as many stops as the design actually needs.',
    features: [
      { title: 'Linear & radial gradients', description: 'Build straight-line linear gradients with precise angle control, or circular/elliptical radial gradients.', icon: HiOutlinePaintBrush },
      { title: 'Multiple color stops', description: 'Add up to 5 colors and position each one precisely along the gradient.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Live preview', description: 'See the actual gradient rendered as you build it, not just a code preview.', icon: HiOutlineEyeDropper },
      { title: 'Ready-to-use CSS', description: 'Copy the exact background CSS value with one click \u2014 paste directly into your stylesheet.', icon: HiOutlineCodeBracket },
    ],
    howToUse: [
      'Choose linear or radial, and set a direction or angle if linear.',
      'Add and adjust color stops \u2014 their colors and positions along the gradient.',
      'Watch the live preview update as you edit.',
      'Copy the generated CSS gradient code and paste it into your stylesheet.',
    ],
    useCases: [
      'Building a background gradient for a website, landing page, or app screen',
      'Designing a smooth color transition for a button, card, or hero section',
      'Creating a subtle radial glow or spotlight effect behind an element',
      'Getting exact, browser-ready CSS gradient code without hand-writing linear-gradient() or radial-gradient() syntax',
      'Prototyping a gradient direction and color combination quickly before committing to it in code',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'json-formatter': {
    about:
      'JSON Formatter beautifies or minifies JSON data instantly, with clear error messages (including the exact line and column) if something\u2019s not valid.',
    features: [
      { title: 'Format or minify', description: 'Switch between readable indentation and a fully compact single line.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Precise error location', description: 'Invalid JSON shows exactly which line and column the problem is on.', icon: HiOutlineCodeBracket },
      { title: 'Copy or download', description: 'Copy the result to your clipboard, or download it as a .json file.', icon: HiOutlineDocumentDuplicate },
    ],
    howToUse: [
      'Paste your JSON into the input box.',
      'Choose Format (readable) or Minify (compact).',
      'Review the result, or fix any reported error.',
      'Copy or download the output.',
    ],
    useCases: [
      'Making a minified API response readable for debugging',
      'Shrinking a JSON config file before deploying it',
      'Finding exactly where a syntax error is in malformed JSON',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'json-validator': {
    about:
      'JSON Validator checks whether your JSON is syntactically correct, telling you immediately whether it\u2019s valid \u2014 and if not, exactly where the problem is.',
    features: [
      { title: 'Instant validation', description: 'Know immediately whether your JSON parses correctly.', icon: HiOutlineBolt },
      { title: 'Precise error location', description: 'Get the exact line and column of any syntax error.', icon: HiOutlineCodeBracket },
      { title: 'No setup required', description: 'Just paste and check \u2014 no configuration or schema needed.', icon: HiOutlineSparkles },
    ],
    howToUse: [
      'Paste your JSON into the input box.',
      'See immediately whether it\u2019s valid or not.',
      'If invalid, review the exact line and column of the problem.',
    ],
    useCases: [
      'Quickly checking if an API payload is well-formed before debugging further',
      'Verifying a config file is syntactically correct',
      'Catching a trailing comma or missing bracket before it causes an error',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'base64-encoder': {
    about:
      'Base64 Encoder/Decoder converts text to and from Base64, with full Unicode support \u2014 accented letters, non-Latin scripts and emoji all round-trip correctly.',
    features: [
      { title: 'Encode and decode', description: 'Switch between both directions instantly.', icon: HiOutlineArrowsRightLeft },
      { title: 'Full Unicode support', description: 'Handles emoji and non-Latin text correctly, not just plain ASCII.', icon: HiOutlineGlobeAlt },
      { title: 'Clear error handling', description: 'Invalid Base64 input is flagged clearly rather than producing garbage output.', icon: HiOutlineShieldCheck },
    ],
    howToUse: [
      'Choose Encode or Decode.',
      'Type or paste your text or Base64 string.',
      'View the result instantly.',
      'Copy it to your clipboard.',
    ],
    useCases: [
      'Encoding data for use in a URL or config file',
      'Decoding a Base64 string from an API response or JWT payload',
      'Preparing binary-safe text for embedding in JSON or XML',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'url-encoder': {
    about:
      'URL Encoder/Decoder converts text and URLs to and from percent-encoded form, so special characters like spaces and ampersands are safely represented in a URL.',
    features: [
      { title: 'Encode and decode', description: 'Switch between both directions instantly.', icon: HiOutlineArrowsRightLeft },
      { title: 'Handles reserved characters', description: 'Correctly encodes spaces, &, =, ? and other special characters.', icon: HiOutlineLink },
      { title: 'Instant results', description: 'See the converted output as you type.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Choose Encode or Decode.',
      'Type or paste your text or URL.',
      'View the result instantly.',
      'Copy it to your clipboard.',
    ],
    useCases: [
      'Safely building a query string with special characters',
      'Decoding a percent-encoded URL to read it clearly',
      'Preparing a value for use in a URL parameter',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'uuid-generator': {
    about:
      'UUID Generator creates random, RFC-compliant version 4 UUIDs using your browser\u2019s cryptographically secure random number generator \u2014 one at a time or in bulk.',
    features: [
      { title: 'Cryptographically random', description: 'Uses the browser\u2019s native secure random generator, not a predictable pattern.', icon: HiOutlineFingerPrint },
      { title: 'Bulk generation', description: 'Generate up to 50 UUIDs at once.', icon: HiOutlineSquares2X2 },
      { title: 'Copy individually or all at once', description: 'Copy one UUID or the whole batch with a single click.', icon: HiOutlineDocumentDuplicate },
    ],
    howToUse: ['Choose how many UUIDs you want.', 'Click Generate.', 'Copy an individual UUID, or all of them at once.'],
    useCases: [
      'Generating unique IDs for database records during development',
      'Creating test data with realistic unique identifiers',
      'Getting a quick unique token for a one-off use',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'hash-generator': {
    about:
      'Hash Generator produces MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes from text \u2014 SHA hashes use your browser\u2019s native Web Crypto API, and MD5 (not included in Web Crypto since it\u2019s cryptographically broken for security purposes) uses a standard, verified implementation for file-checksum and compatibility use cases.',
    features: [
      { title: 'Five algorithms at once', description: 'See MD5, SHA-1, SHA-256, SHA-384 and SHA-512 all generated together.', icon: HiOutlineHashtag },
      { title: 'Real cryptographic hashing', description: 'SHA variants use the browser\u2019s native Web Crypto API.', icon: HiOutlineShieldCheck },
      { title: 'One-click copy', description: 'Copy any hash individually.', icon: HiOutlineDocumentDuplicate },
    ],
    howToUse: [
      'Type or paste the text you want to hash.',
      'View all five hash values, generated instantly.',
      'Copy whichever one you need.',
    ],
    useCases: [
      'Verifying a file or string\u2019s checksum for integrity',
      'Generating a hash for a password reset token or cache key during development',
      'Comparing two pieces of text for exact equality via their hash',
    ],
    supportedFormats: { notes: 'SHA-256 or higher is recommended for anything security-sensitive; MD5 and SHA-1 are best treated as checksums only.' },
    privacy: NO_FILE_PRIVACY,
  },

  'timestamp-converter': {
    about:
      'Timestamp Converter converts between Unix timestamps and human-readable dates in both directions, showing the result in local time, UTC, ISO 8601 and relative form.',
    features: [
      { title: 'Bidirectional conversion', description: 'Convert a timestamp to a date, or a date to a timestamp.', icon: HiOutlineArrowsRightLeft },
      { title: 'Multiple date formats', description: 'See local time, UTC, ISO 8601, and a human-friendly relative time all at once.', icon: HiOutlineCalendarDays },
      { title: 'Current time shortcut', description: 'Fill in the current Unix timestamp with one click.', icon: HiOutlineClock },
    ],
    howToUse: [
      'Enter a Unix timestamp to see its date, or pick a date to get its timestamp.',
      'View the result in local time, UTC, ISO 8601 and relative form.',
      'Copy whichever format you need.',
    ],
    useCases: [
      'Debugging a Unix timestamp found in logs or a database',
      'Converting a date into a timestamp for an API request',
      'Checking what time a timestamp actually represents in your timezone',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'regex-tester': {
    about:
      'Regex Tester lets you build and debug regular expressions against real text, with matches highlighted live as you type \u2014 no more guessing whether your pattern actually works.',
    features: [
      { title: 'Live match highlighting', description: 'See every match highlighted directly in your test text as you type.', icon: HiOutlineEyeDropper },
      { title: 'All standard flags', description: 'Toggle global, case-insensitive, multiline and dotall matching.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Instant feedback', description: 'Invalid patterns are flagged immediately with a clear error.', icon: HiOutlineCodeBracket },
    ],
    howToUse: [
      'Type your regular expression pattern.',
      'Toggle any flags you need (g, i, m, s).',
      'Paste your test text.',
      'See matches highlighted live, with a count.',
    ],
    useCases: [
      'Debugging a regex pattern before using it in code',
      'Testing whether a validation pattern catches the right inputs',
      'Learning how a specific regex feature behaves against real text',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'word-counter': {
    about:
      'Word Counter gives you live word, character, sentence and paragraph counts as you type or paste text, plus an estimated reading time.',
    features: [
      { title: 'Live counting', description: 'Every stat updates instantly as you type or paste.', icon: HiOutlineBolt },
      { title: 'Five real metrics', description: 'Words, characters (with and without spaces), sentences and paragraphs.', icon: HiOutlineSquares2X2 },
      { title: 'Reading time estimate', description: 'Based on an average adult reading speed of 200 words per minute.', icon: HiOutlineClock },
    ],
    howToUse: ['Paste or type your text into the box.', 'Watch the stats update live below it.'],
    useCases: [
      'Checking an essay or article meets a word count requirement',
      'Estimating how long a piece of writing will take to read',
      'Getting a quick character count for a form field or social post',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'case-converter': {
    about:
      'Case Converter transforms your text into seven different case styles at once \u2014 covering everyday writing conventions and the naming styles used in code.',
    features: [
      { title: 'Seven case styles', description: 'UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case and kebab-case.', icon: HiOutlineSquares2X2 },
      { title: 'All shown at once', description: 'See every conversion simultaneously, no need to pick one first.', icon: HiOutlineBolt },
      { title: 'One-click copy', description: 'Copy any result individually.', icon: HiOutlineDocumentDuplicate },
    ],
    howToUse: [
      'Type or paste your text.',
      'View it instantly converted into all seven case styles.',
      'Copy whichever one you need.',
    ],
    useCases: [
      'Converting a heading into Title Case for consistency',
      'Getting a variable name in camelCase or snake_case for code',
      'Turning a URL slug into kebab-case',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'lorem-ipsum-generator': {
    about:
      'Lorem Ipsum Generator produces classic placeholder text \u2014 by words, sentences, or paragraphs \u2014 for filling mockups and designs before real content is ready.',
    features: [
      { title: 'Three units', description: 'Generate by words, sentences, or full paragraphs.', icon: HiOutlineSquares2X2 },
      { title: 'Classic opening', description: 'Starts with the recognizable "Lorem ipsum dolor sit amet..." rather than random Latin-looking words.', icon: HiOutlineSparkles },
      { title: 'Instant regeneration', description: 'Change the count or unit and get new text immediately.', icon: HiOutlineBolt },
    ],
    howToUse: ['Choose how many words, sentences or paragraphs you want.', 'Click Generate.', 'Copy the result into your mockup or design.'],
    useCases: [
      'Filling a design mockup with realistic-looking placeholder text',
      'Testing how a layout handles varying amounts of text',
      'Populating a CMS template before real content is written',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'password-generator': {
    about:
      'Password Generator creates strong, random passwords using your browser\u2019s cryptographically secure random number generator \u2014 with adjustable length and character types, plus a real entropy-based strength indicator.',
    features: [
      { title: 'Cryptographically secure', description: 'Uses the browser\u2019s native secure random generator, never a weak pseudo-random function.', icon: HiOutlineKey },
      { title: 'Adjustable length & charset', description: 'Choose length from 6\u201364 characters and which character types to include.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Real strength calculation', description: 'A genuine bits-of-entropy calculation, not a cosmetic bar.', icon: HiOutlineShieldCheck },
    ],
    howToUse: [
      'Set your desired length and character types (uppercase, lowercase, numbers, symbols).',
      'Click Generate Password.',
      'Check the strength indicator.',
      'Copy your password.',
    ],
    useCases: [
      'Creating a strong password for a new account',
      'Generating a secure password to store in a password manager',
      'Getting a random string for a token or temporary credential',
    ],
    privacy:
      'Passwords are generated entirely on your device using your browser\u2019s cryptographically secure random number generator. Nothing about the password you generate is ever sent to ToolHub\u2019s servers.',
  },

  'instagram-post-resizer': {
    about:
      'Instagram Post Resizer fits your image to Instagram\u2019s exact post, story and profile picture dimensions \u2014 choose to crop-to-fill with no empty space, or fit-with-padding so nothing gets cropped.',
    features: [
      { title: 'Five real presets', description: 'Square, Portrait, Landscape, Story/Reel and Profile Picture \u2014 Instagram\u2019s actual dimensions.', icon: HiOutlineSquares2X2 },
      { title: 'Fill or fit', description: 'Crop to completely fill the frame, or fit within it with padding \u2014 your choice.', icon: HiOutlineArrowsPointingOut },
      { title: 'Instant results', description: 'Resizing happens locally in your browser \u2014 no wait, no upload.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Upload your image.',
      'Choose the Instagram format you need.',
      'Choose Fill (crop to fit) or Fit (add padding).',
      'Click Resize, then download your result.',
    ],
    useCases: [
      'Getting a photo to the exact size for an Instagram feed post',
      'Preparing an image for Stories or Reels without stretching it',
      'Resizing a profile picture to Instagram\u2019s exact requirement',
    ],
    supportedFormats: { input: 'JPG / PNG / WEBP', output: 'JPG or PNG', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'youtube-thumbnail-downloader': {
    about:
      'YouTube Thumbnail Downloader lets you view and download the thumbnail images YouTube generates for any public video, at every resolution that video actually has available.',
    features: [
      { title: 'Any URL format', description: 'Paste a full link, a short youtu.be link, a Shorts link, or just the video ID.', icon: HiOutlineLink },
      { title: 'Every available resolution', description: 'Automatically detects and shows only the resolutions that genuinely exist for that video.', icon: HiOutlinePhoto },
      { title: 'Real downloads', description: 'Actually downloads the image file to your device, not just a link to view it.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Paste a YouTube video URL or ID.',
      'Click Find Thumbnails.',
      'Browse the available resolutions.',
      'Click Download on whichever one you want.',
    ],
    useCases: [
      'Grabbing a video\u2019s thumbnail for a blog post or reference',
      'Checking what thumbnail resolutions are available for a video',
      'Saving a thumbnail image before it might change',
    ],
    supportedFormats: {
      output: 'JPG (thumbnail image)',
      notes: 'Works only with thumbnails YouTube already makes publicly available for a video \u2014 not the video itself.',
    },
    privacy:
      'This tool fetches thumbnail images directly from YouTube\u2019s own public image servers (img.youtube.com) \u2014 the same publicly accessible thumbnails YouTube serves for embedding anywhere. No video content, account data, or anything beyond the video ID you provide is involved.',
  },
}
