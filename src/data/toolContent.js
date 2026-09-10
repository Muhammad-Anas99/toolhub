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
  HiOutlineScissors,
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
  HiOutlineExclamationTriangle,
  HiOutlineArrowDownTray,
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
      'Converts JPEG photos into the PNG format, which supports transparency and lossless compression. It\u2019s the tool to reach for when an image needs to stop losing quality on repeated saves, or needs transparency added later.\n\nWorth understanding clearly: converting a JPG to PNG doesn\u2019t undo or improve whatever compression the original JPG already went through. JPEG is a lossy format, so any detail it already discarded when the file was first saved is gone for good. What PNG\u2019s lossless nature actually provides is protection from *further* loss going forward: once converted, the image can be opened, edited, and re-saved as PNG repeatedly with zero additional quality loss, unlike JPEG, which loses a small amount of quality every time it\u2019s re-saved (a real effect known as generation loss).\n\nPNG is also the format to reach for when transparency is specifically needed. JPEG has no way to represent a transparent background at all, so any workflow that needs a transparent or semi-transparent image (a logo overlay, a graphic meant to sit on different colored backgrounds) needs PNG or a similarly transparency-capable format.',
    features: [
      { title: 'Lossless output', description: 'PNG never re-compresses your image further. What you see is exactly what you get.', icon: HiOutlineSparkles },
      { title: 'Batch friendly', description: 'Convert up to 10 images in one pass and download them individually or as a ZIP.', icon: HiOutlineSquares2X2 },
      { title: 'Runs in your browser', description: 'No upload, no waiting on a server. Conversion happens instantly on your device.', icon: HiOutlineBolt },
      { title: 'No quality loss', description: 'Your original JPG content is preserved exactly, just re-encoded as PNG.', icon: HiOutlineShieldCheck },
    ],
    howToUse: [
      'Upload one or more JPG images (drag & drop or click to browse).',
      'Optionally adjust resize, rotate or flip settings, all combinable in one pass.',
      'Click Convert to PNG.',
      'Download each result individually, or grab them all at once as a ZIP.',
    ],
    useCases: [
      'Preparing a photo for a design tool that needs transparency support',
      'Archiving a photo in a lossless format before further editing',
      'Converting screenshots for documentation that needs crisp PNG output',
      'Getting a format that certain apps or CMS platforms require',
      'Avoiding further generation loss on an image that will be re-saved multiple times',
    ],
    supportedFormats: { input: 'JPG / JPEG', output: 'PNG', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'png-to-jpg': {
    about:
      'Converts PNG images into the widely-supported JPEG format, typically producing a much smaller file. The right choice when file size matters more than pixel-perfect transparency: photos, web images, and anything meant to be shared or uploaded elsewhere.\n\nFor photographic content specifically, the size difference between PNG and JPG can be dramatic. A PNG storing a photo losslessly is often several times larger than a JPG of the same image at a quality setting where the difference is barely visible, since PNG\u2019s lossless approach has to preserve every pixel exactly, while JPG\u2019s lossy compression can discard the fine detail human vision doesn\u2019t register.\n\nOne thing worth knowing before converting: JPEG has no transparency support at all, so any transparent areas in a PNG get filled with a solid white background during conversion, since there\u2019s no other way to represent them in a format that doesn\u2019t support an alpha channel. If a PNG has meaningful transparency that needs to be kept, converting to JPG isn\u2019t the right move. PNG stays the better choice, or convert to WebP instead, which supports both small file sizes and transparency together.',
    features: [
      { title: 'Smaller file sizes', description: 'JPEG\u2019s compression usually shrinks PNG files significantly with minimal visible difference.', icon: HiOutlineArrowsPointingOut },
      { title: 'Adjustable quality', description: 'Fine-tune the compression level to balance size against visual quality.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Batch friendly', description: 'Convert up to 10 images in one pass, with a ZIP download for all of them.', icon: HiOutlineSquares2X2 },
      { title: 'Runs in your browser', description: 'No upload, no waiting on a server, conversion happens instantly on your device.', icon: HiOutlineBolt },
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
      'Converting a photo saved as PNG down to a realistic file size',
    ],
    supportedFormats: { input: 'PNG', output: 'JPG', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'webp-to-png': {
    about:
      'Converts modern WEBP images into the universally-supported PNG format. WEBP offers great compression but isn\u2019t accepted everywhere, so this gets you a format that opens correctly in any image viewer, editor, or older software.\n\nWebP was developed by Google and has been supported by every major browser since 2020, with current adoption estimates generally above 95% of browsers in active use. Despite that, real compatibility gaps still show up in practice. Some older desktop software, certain email clients, specific CMS plugins, and print workflows either don\u2019t recognize WebP at all or handle it inconsistently. PNG remains the safer choice whenever it isn\u2019t clear what will open the file next.\n\nConverting WebP to PNG specifically preserves transparency correctly, since both formats support a full alpha channel, unlike converting to JPG, which has no way to represent transparency at all and would need to flatten it onto a solid background instead.',
    features: [
      { title: 'Universal compatibility', description: 'PNG opens in virtually every image tool, unlike WEBP.', icon: HiOutlineGlobeAlt },
      { title: 'Preserves transparency', description: 'Alpha transparency in the source WEBP carries over correctly.', icon: HiOutlineShieldCheck },
      { title: 'Batch friendly', description: 'Convert up to 10 images at once, download individually or as a ZIP.', icon: HiOutlineSquares2X2 },
      { title: 'Instant results', description: 'Conversion happens locally in your browser, no wait, no upload.', icon: HiOutlineBolt },
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
      'Converting a WEBP graphic that needs to keep its transparent background',
    ],
    supportedFormats: { input: 'WEBP', output: 'PNG', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'webp-to-jpg': {
    about:
      'Converts modern WEBP images into the widely-supported JPEG format, useful for an image that needs to open anywhere, from photo software to social platforms that don\u2019t yet handle WEBP well.\n\nJPEG has been the default photo format since 1992 and is recognized by essentially every piece of software, camera, printer, and platform ever built, a much longer and more universal track record than WebP\u2019s, even with WebP\u2019s strong current browser support. For photographs specifically, converting to JPG makes practical sense: JPEG\u2019s lossy compression was purpose-built for photographic content, so the visual difference at a reasonable quality setting is typically negligible.\n\nOne real tradeoff worth knowing: JPEG has no transparency support, so any transparent areas in the source WebP get filled with a solid background during conversion. If the image needs to keep its transparency, converting to PNG instead is the right call. This tool is specifically for cases where universal compatibility matters more than preserving an alpha channel.',
    features: [
      { title: 'Universal compatibility', description: 'JPG opens in virtually every application and platform.', icon: HiOutlineGlobeAlt },
      { title: 'Adjustable quality', description: 'Control the compression level to balance size and quality.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Batch friendly', description: 'Convert up to 10 images at once, download individually or as a ZIP.', icon: HiOutlineSquares2X2 },
      { title: 'Instant results', description: 'Conversion happens locally in your browser, no wait, no upload.', icon: HiOutlineBolt },
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
      'Preparing a WEBP photo for printing or a workflow that expects JPEG',
    ],
    supportedFormats: { input: 'WEBP', output: 'JPG', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'convert-to-webp': {
    about:
      'Turns JPG or PNG images into the modern WEBP format, which typically produces noticeably smaller files at the same visual quality. Ideal for faster-loading websites and reduced storage.\n\nWebP was built by Google specifically for the web, and consistently benchmarks 25\u201335% smaller than an equivalent-quality JPG, and around 25\u201335% smaller than a comparable lossless PNG. Unlike JPG or PNG individually, WebP supports both lossy and lossless compression in the same format, plus a full alpha transparency channel, meaning a single format can replace the role both JPG and PNG previously played, depending on which mode is used.\n\nFor a website specifically, switching images to WebP is one of the more reliable, low-effort ways to improve real page load performance, which in turn affects Core Web Vitals metrics that factor into how Google ranks a page. Browser support has been essentially universal across modern browsers since 2020, making WebP a safe default for a website\u2019s own images. The main remaining caution is for images that might be downloaded and opened in older, non-browser software, where compatibility is less certain than JPG or PNG.',
    features: [
      { title: 'Smaller files', description: 'WEBP often beats JPG and PNG on file size at equivalent quality.', icon: HiOutlineArrowsPointingOut },
      { title: 'Adjustable quality', description: 'Fine-tune compression to hit the size and quality you need.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Batch friendly', description: 'Convert up to 10 images at once, download individually or as a ZIP.', icon: HiOutlineSquares2X2 },
      { title: 'Instant results', description: 'Conversion happens locally in your browser, no wait, no upload.', icon: HiOutlineBolt },
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
      'Improving page load speed and Core Web Vitals scores with lighter images',
    ],
    supportedFormats: { input: 'JPG / PNG', output: 'WEBP', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'image-compressor': {
    about:
      'Drag the quality slider down, and a large photo shrinks for faster uploads and page loads, usually with no visible drop in quality. Compress up to 10 images at once, right in your browser.\n\nImage compression comes in two fundamentally different kinds. Lossy compression achieves large size reductions by selectively discarding image data that\u2019s least noticeable to the eye. The process is irreversible, and pushing the quality slider lower trades more file size for slightly more visible quality loss. Lossless compression shrinks a file by re-encoding the data more efficiently without discarding anything, which typically saves far less space, often just a small percentage rather than the large reductions lossy compression can achieve.\n\nBecause lossy compression is so much more effective at reducing file size, this tool outputs JPG by default regardless of the original format, since that gets the biggest size reduction for the common case of compressing a photo. If transparency or exact pixel accuracy matters, for a logo, an icon, or a screenshot with text, PNG is available as an explicit output choice instead, though its lossless approach won\u2019t shrink the file nearly as dramatically as JPG or WebP will. WebP is also available and generally produces smaller files than JPG at similar visual quality, though it\u2019s a newer format with slightly less universal compatibility in older software.\n\nAs a rule of thumb: use JPG or WebP for photographs and complex images with lots of color variation, where a moderate quality reduction is essentially invisible. Choose PNG only when exact pixel accuracy or transparency actually matters.',
    features: [
      { title: 'Adjustable quality', description: 'Drag the slider and see the size trade-off before committing.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Choice of output format', description: 'JPG by default for maximum compression, or explicitly choose PNG or WEBP.', icon: HiOutlineArrowsRightLeft },
      { title: 'Live before/after size', description: 'See exactly how much smaller your file gets at each setting.', icon: HiOutlineScale },
      { title: 'Batch friendly', description: 'Compress up to 10 images at once, download individually or as a ZIP.', icon: HiOutlineSquares2X2 },
      { title: 'Instant results', description: 'Compression happens locally in your browser, no wait, no upload.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Upload one or more images.',
      'Choose an output format if you need something other than the default (PNG for transparency, WEBP for smaller lossy files).',
      'Adjust the quality slider until you\u2019re happy with the size/quality balance.',
      'Click Compress.',
      'Download your results individually or as a ZIP.',
    ],
    useCases: [
      'Getting a photo under a website\u2019s or form\u2019s upload size limit',
      'Speeding up page load times by shrinking image assets',
      'Reducing storage or bandwidth use for large photo collections',
      'Making an email attachment small enough to send',
      'Compressing product photos for an online store without visible quality loss',
    ],
    supportedFormats: { input: 'JPG / PNG / WEBP', output: 'Same or JPG/PNG/WEBP', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'image-resizer': {
    about:
      'Changes an image\u2019s pixel dimensions, either to an exact width and height, or by a percentage scale, while keeping it sharp and correctly proportioned.\n\nResizing down (making an image smaller) is straightforward and essentially lossless in terms of the information that matters. The resizer combines groups of original pixels into each new, smaller pixel using high-quality smoothing, producing a clean, sharp result. Resizing up (making an image larger) works fundamentally differently: there\u2019s no real detail to recover that wasn\u2019t already in the original, so the tool has to interpolate, estimating what the in-between pixels probably look like based on their neighbors. That\u2019s why upscaling a small image significantly tends to look soft or blurry rather than genuinely sharper. No resizing algorithm can add detail that was never captured in the first place.\n\nLocking the aspect ratio (width-to-height proportion) keeps an image looking natural during a resize. Changing width and height by different amounts independently distorts the image, stretching or squashing it in a way that\u2019s usually visually obvious and rarely desired.',
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
      'Reducing image dimensions to speed up a website\u2019s page load',
    ],
    supportedFormats: { input: 'JPG / PNG / WEBP', output: 'Same format', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'image-crop': {
    about:
      'Select and cut out exactly the part of an image you want, with a draggable, resizable crop box controlled directly on the image. No guessing at coordinates.\n\nUnlike resizing, cropping doesn\u2019t need to interpolate or estimate anything. It simply keeps the pixels inside the selected area and discards the rest, so the kept portion retains its exact original quality with zero loss. This makes cropping a safe operation to experiment with, since the result is never blurrier or lower quality than the source, just smaller in extent.\n\nDifferent platforms and use cases often call for specific aspect ratios: 1:1 (square) for most profile pictures, 4:5 for an Instagram feed post, 16:9 for a video thumbnail or website hero banner. Cropping to a specific target ratio before uploading avoids a platform\u2019s own automatic crop, which won\u2019t always frame the subject the way intended.',
    features: [
      { title: 'Visual, draggable crop box', description: 'Drag, resize and reposition the crop area directly on your image.', icon: HiOutlineRectangleGroup },
      { title: 'Keyboard support', description: 'Fine-tune the crop area with arrow keys once it\u2019s focused.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Precise pixel control', description: 'The final crop uses your image\u2019s real pixel coordinates, not an approximation.', icon: HiOutlineViewfinderCircle },
      { title: 'Instant results', description: 'Cropping happens locally in your browser, no wait, no upload.', icon: HiOutlineBolt },
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
      'Framing a specific detail from a larger image precisely, with no quality loss',
    ],
    supportedFormats: { input: 'JPG / PNG / WEBP', output: 'Same format', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'image-rotate': {
    about:
      'Turns an image to any 90\u00b0 increment, useful for fixing a sideways photo or reorienting a scanned document.\n\nPhotos taken on phones often end up sideways for a specific, common reason: the camera saves the image data in its original sensor orientation, then records which way it should be displayed in a piece of metadata called an EXIF orientation tag, rather than actually rotating the pixels. Different apps, browsers, and operating systems read that metadata inconsistently, which is exactly why the same photo can appear right-side-up in one app and sideways in another.\n\nThis tool sidesteps that inconsistency entirely by performing a real, direct pixel rotation rather than relying on metadata. The output image is actually rotated, so it displays correctly everywhere, in any app or browser, regardless of how that particular software handles orientation flags.',
    features: [
      { title: '90\u00b0 increments', description: 'Rotate left, right, or all the way around, one click at a time.', icon: HiOutlineArrowsRightLeft },
      { title: 'Batch friendly', description: 'Rotate up to 10 images at once, download individually or as a ZIP.', icon: HiOutlineSquares2X2 },
      { title: 'No quality loss', description: 'Rotation is a pure pixel transform. Nothing about the image content changes.', icon: HiOutlineShieldCheck },
      { title: 'Instant results', description: 'Rotation happens locally in your browser, no wait, no upload.', icon: HiOutlineBolt },
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
      'Fixing a photo that displays correctly in one app but sideways in another',
    ],
    supportedFormats: { input: 'JPG / PNG / WEBP', output: 'Same format', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'flip-image': {
    about:
      'Mirrors an image horizontally or vertically. Different from rotating, since it reverses the image rather than turning it around a point.\n\nRotating and flipping are often confused but produce genuinely different results. Rotating turns an image around a center point, like spinning a photo on a table. A rotated square photo of a word would still show that word the right way round, just at a different angle. Flipping instead mirrors the image, reversing left and right (or top and bottom); the same photo of a word would show it backwards, like reading it in a mirror. Any real text or asymmetric detail in the image makes this difference immediately obvious.\n\nA specific, common real-world case: phone front cameras typically show a mirrored preview on screen while actually saving the photo unmirrored, which is why a selfie sometimes looks like it has your face oriented differently than what you saw while taking it. This is particularly noticeable if there\u2019s any text in the shot, like a shirt logo, which comes out backwards in the saved photo relative to what appeared in the mirrored preview. Flipping corrects that mismatch after the fact.',
    features: [
      { title: 'Horizontal or vertical', description: 'Mirror left-to-right or top-to-bottom, independently or together.', icon: HiOutlineArrowsRightLeft },
      { title: 'Batch friendly', description: 'Flip up to 10 images at once, download individually or as a ZIP.', icon: HiOutlineSquares2X2 },
      { title: 'No quality loss', description: 'Flipping is a pure pixel transform. Nothing about the image content changes.', icon: HiOutlineShieldCheck },
      { title: 'Instant results', description: 'Flipping happens locally in your browser, no wait, no upload.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Upload one or more images.',
      'Choose horizontal flip, vertical flip, or both.',
      'Click Flip.',
      'Download your results individually or as a ZIP.',
    ],
    useCases: [
      'Correcting a mirrored selfie or webcam photo, especially one with visible text',
      'Creating a mirrored version of a graphic for design purposes',
      'Fixing the orientation of a scanned image',
      'Reversing an image to face the opposite direction for a layout or composition',
    ],
    supportedFormats: { input: 'JPG / PNG / WEBP', output: 'Same format', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'favicon-generator': {
    about:
      'A single favicon.ico isn\u2019t enough anymore. Browsers use small square icons (16\u00d716 and 32\u00d732) for the tab itself, Apple devices need a 180\u00d7180 icon for the home screen, and Android/PWA installs need 192\u00d7192 and 512\u00d7512 versions. This tool takes one uploaded image and generates all six sizes in one pass, plus a real favicon.ico file, entirely in your browser.\n\nThat ICO file deserves a specific note. It\u2019s a container format that can bundle multiple resolutions into one file, and it\u2019s still the compatibility fallback browsers check for, even though they generally prefer the PNG versions when a page explicitly links to them. A canvas can only export PNG or JPEG directly, not ICO, so a real .ico file has to be constructed by hand: a small binary header and directory describing each embedded image, wrapping the PNG data for the 16, 32, and 48 pixel sizes. That\u2019s an actual binary format being built here, not a PNG with its extension swapped.\n\nTransparency is preserved throughout. A transparent PNG or SVG source stays transparent in every generated size, which matters since most favicons are meant to show through to the browser\u2019s own tab background rather than sit on a solid box.',
    features: [
      { title: 'All six standard sizes', description: '16, 32, 48, 180 (Apple), 192 and 512 (Android/PWA) generated in one pass.', icon: HiOutlinePhoto },
      { title: 'A real favicon.ico', description: 'A valid multi-resolution ICO file, not a renamed PNG.', icon: HiOutlineSquares2X2 },
      { title: 'Ready-to-use HTML tags', description: 'Copy the exact <link> tags for your page\u2019s <head>.', icon: HiOutlineDocumentDuplicate },
      { title: 'Everything in one ZIP', description: 'Download every size, the ICO file, and site.webmanifest together.', icon: HiOutlineArrowDownTray },
    ],
    howToUse: [
      'Upload a square image (PNG, JPG, or SVG).',
      'Click Generate Favicons.',
      'Download individual sizes, or everything as a ZIP.',
      'Copy the HTML tags into your page\u2019s <head>.',
    ],
    useCases: [
      'Setting up a complete, correct favicon for a new website',
      'Replacing an outdated single favicon.ico with a full modern set',
      'Getting the exact Apple Touch Icon and Android/PWA sizes for a web app',
      'Generating a site.webmanifest alongside the icon files it references',
    ],
    supportedFormats: { input: 'PNG / JPG / SVG', output: 'PNG (6 sizes) + ICO + webmanifest', maxSize: '10 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'jpg-to-pdf': {
    about:
      'Turns a JPG image into a single-page PDF document, sized to match the image exactly. Useful whenever a photo needs to be delivered as a proper PDF file.\n\nUnlike some converters that place an image onto a standard paper size like A4 or Letter (potentially leaving margins or requiring the image to be scaled to fit), this tool sizes the PDF page to the image\u2019s exact pixel dimensions. The result is a PDF that shows the image at its true size and aspect ratio with nothing cropped, stretched, or padded. What gets uploaded is exactly what appears on the page.\n\nOne practical implication worth knowing: since the page isn\u2019t a standard paper size, printing the resulting PDF may not align with a printer\u2019s default page settings the way a standard Letter or A4 document would. The print scale or paper size setting may need adjusting depending on the printer and the image\u2019s own dimensions. For on-screen use, sharing, or uploading to a system that expects a PDF, this isn\u2019t a concern at all.',
    features: [
      { title: 'Exact sizing', description: 'The PDF page matches your image\u2019s real pixel dimensions, no cropping or distortion.', icon: HiOutlineViewfinderCircle },
      { title: 'Real PDF output', description: 'Produces a standards-compliant PDF you can open in any reader.', icon: HiOutlineDocumentText },
      { title: 'Instant results', description: 'Conversion happens locally in your browser, no wait, no upload.', icon: HiOutlineBolt },
      { title: 'Combine with Merge PDF', description: 'Convert several images and merge them into one multi-page PDF afterward.', icon: HiOutlineSquares2X2 },
    ],
    howToUse: ['Upload a JPG image.', 'Click Convert to PDF.', 'Download your PDF file.'],
    useCases: [
      'Submitting a photo of a signed document as a PDF',
      'Turning a receipt photo into a PDF for expense reports',
      'Preparing a single-page PDF from a scanned image',
      'Meeting a system requirement that only accepts PDF uploads, not raw images',
    ],
    supportedFormats: { input: 'JPG', output: 'PDF', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'png-to-pdf': {
    about:
      'Turns a PNG image into a single-page PDF document, sized to match the image exactly. Handy for turning a screenshot, graphic, or scan into a shareable PDF.\n\nLike the JPG to PDF converter, this sizes the resulting page to the image\u2019s exact pixel dimensions rather than a standard paper size, so the image appears at its true size and aspect ratio with nothing cropped or padded.\n\nOne question worth answering specifically for PNG: what happens to transparency? The PNG\u2019s alpha channel is embedded into the PDF along with the rest of the image data, so the transparency information itself isn\u2019t discarded the way converting to JPG would discard it. In practice, since a PDF page is a solid surface rather than something that can itself be transparent, any transparent areas typically render against the page\u2019s own background, usually white in most PDF viewers, producing a similar visual result to how the same image looks against a white webpage background.',
    features: [
      { title: 'Exact sizing', description: 'The PDF page matches your image\u2019s real pixel dimensions, no cropping or distortion.', icon: HiOutlineViewfinderCircle },
      { title: 'Real PDF output', description: 'Produces a standards-compliant PDF you can open in any reader.', icon: HiOutlineDocumentText },
      { title: 'Instant results', description: 'Conversion happens locally in your browser, no wait, no upload.', icon: HiOutlineBolt },
      { title: 'Combine with Merge PDF', description: 'Convert several images and merge them into one multi-page PDF afterward.', icon: HiOutlineSquares2X2 },
    ],
    howToUse: ['Upload a PNG image.', 'Click Convert to PDF.', 'Download your PDF file.'],
    useCases: [
      'Turning a screenshot into a shareable PDF',
      'Converting a scanned document image into PDF form',
      'Preparing a graphic or diagram as a standalone PDF page',
      'Converting a design export or logo into a PDF for a client deliverable',
    ],
    supportedFormats: { input: 'PNG', output: 'PDF', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'compress-pdf': {
    about:
      'This reduces a PDF\u2019s file size entirely in your browser, no upload to a server, by rendering each page and recompressing it as an image at your chosen quality. The same core technique the Image Compressor uses.\n\nA PDF is typically large because of the images embedded in it, not the text. Plain text takes up very little space, so a text-only PDF rarely needs compressing in the first place. This tool targets that real cause directly: each page is rendered, recompressed at an adjustable quality level, and reassembled into a new, smaller PDF.\n\nOne honest, deliberate tradeoff worth knowing upfront: because each page becomes a single compressed image, any text in the original PDF is no longer selectable, searchable, or copyable in the compressed output. For a scanned document or an image-heavy PDF, the case that actually makes a PDF large enough to want compressing, this is rarely a real loss, since there often wasn\u2019t genuine selectable text to begin with. For a text-heavy PDF where staying searchable matters, this tool isn\u2019t the right fit, since that tradeoff would cost more than the size savings are worth.',
    features: [
      { title: 'Adjustable compression level', description: 'Choose how aggressively to compress, trading file size against visual quality.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Entirely client-side', description: 'Your PDF is never uploaded. Processing happens fully in your browser.', icon: HiOutlineShieldCheck },
      { title: 'Live progress', description: 'See exactly which page is being processed as it happens.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Upload your PDF.',
      'Choose a compression level.',
      'Click Compress PDF.',
      'Download the smaller result.',
    ],
    useCases: [
      'Shrinking a scanned document to fit an email attachment size limit',
      'Reducing an image-heavy PDF for faster upload to a form or portal',
      'Compressing a photo-heavy PDF portfolio or report for easier sharing',
      'Getting a large PDF under a specific website\u2019s upload size cap',
    ],
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'merge-pdf': {
    about:
      'Combines multiple PDF files into a single document, in whatever order you choose. Every page copied exactly as it appears in the source files, with nothing re-rendered or flattened.\n\n"Copied exactly" is a meaningful technical distinction, not just marketing language. Some PDF tools work by rendering each page as an image and reassembling those images into a new PDF, which loses any selectable text, shrinks quality, and bloats file size. This tool instead copies each page\u2019s actual underlying content, text, vector graphics, embedded fonts, and all, directly into the merged document, so a page with selectable, searchable text stays exactly that way in the result, and nothing about visual quality is degraded in the process.\n\nThe order files are arranged in before merging becomes the exact page order of the final document, which matters when assembling something like a report from separate sections or combining scanned pages that need to read in sequence.',
    features: [
      { title: 'Reorder before merging', description: 'Move files up or down to control the exact page order of the result.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Faithful page copying', description: 'Pages are copied exactly as they appear in the source, not re-rendered, so text stays selectable and quality is untouched.', icon: HiOutlineDocumentDuplicate },
      { title: 'No file limit', description: 'Merge as many PDFs as you need in one pass.', icon: HiOutlineSquares2X2 },
      { title: 'Instant results', description: 'Merging happens locally in your browser, no wait, no upload.', icon: HiOutlineBolt },
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
      'Combining several single-page PDFs (like ones made with JPG to PDF) into one multi-page document',
    ],
    supportedFormats: { input: 'PDF (multiple files)', output: 'PDF', maxSize: '25 MB per file' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'split-pdf': {
    about:
      'Tell it which pages you want, something like "1-3, 5, 8-10", and it builds a new PDF from exactly those pages.\n\nThe page selector accepts a flexible mix of individual page numbers and ranges in one entry, separated by commas. "1-3, 5, 8-10" pulls pages 1 through 3, page 5, and pages 8 through 10 into a single new document. Two behaviors worth knowing: if a page number appears more than once across the ranges entered, it\u2019s only included once in the result rather than duplicated, and the extracted pages always come out in ascending numeric order in the final document, regardless of what order the ranges were typed in.\n\nLike Merge PDF, extracted pages are copied faithfully from the source, not re-rendered as images, so any selectable text and original visual quality carry over exactly as they were.',
    features: [
      { title: 'Flexible page ranges', description: 'Specify individual pages, ranges, or a mix of both in one go.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Faithful page copying', description: 'Extracted pages are copied exactly as they appear in the source, text and quality untouched.', icon: HiOutlineDocumentDuplicate },
      { title: 'Automatic page count', description: 'See how many pages your PDF has before choosing what to extract.', icon: HiOutlineDocumentText },
      { title: 'Instant results', description: 'Splitting happens locally in your browser, no wait, no upload.', icon: HiOutlineBolt },
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
      'Creating a smaller PDF from just the pages a specific recipient needs',
    ],
    supportedFormats: { input: 'PDF', output: 'PDF', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'pdf-to-jpg': {
    about:
      'Renders a page from a PDF into a real JPG image: a real pixel rendering of that page\u2019s actual content, not a placeholder or text extraction.\n\nThis works by rendering the selected page at roughly double its native resolution before encoding it as JPG, producing a noticeably sharper result than a naive one-to-one render. Text and fine details stay crisp rather than looking soft, which matters when the output image will be viewed at a larger size than the original page or used somewhere detail matters, like a presentation slide.\n\nOne thing worth knowing about the workflow: this converts one specific page at a time, chosen from a page selector, rather than automatically batch-converting every page in a multi-page PDF into a folder of images. For extracting an image from just one or two specific pages, this is the more direct workflow. For every page of a longer PDF as separate images, the process repeats per page.',
    features: [
      { title: 'Real page rendering', description: 'Renders the actual visual content of the page, not just its text.', icon: HiOutlinePhoto },
      { title: 'Page selection', description: 'Choose exactly which page to convert on multi-page PDFs.', icon: HiOutlineDocumentText },
      { title: 'Sharp output', description: 'Pages render at roughly 2x native size for a crisp result.', icon: HiOutlineSparkles },
      { title: 'Instant results', description: 'Rendering happens locally in your browser, no wait, no upload.', icon: HiOutlineBolt },
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
      'Creating a thumbnail image representing a specific document page',
    ],
    supportedFormats: { input: 'PDF', output: 'JPG (one page at a time)', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'pdf-to-png': {
    about:
      'Renders a page from a PDF into a real PNG image: a real pixel rendering of that page\u2019s actual content, ideal for a lossless image, like a page with sharp text or line art.\n\nPDF pages containing text, diagrams, tables, or line art tend to have a lot of sharp edges and high-contrast detail, exactly the kind of content where JPEG\u2019s lossy compression can introduce visible artifacts around edges (a slight blur or ringing effect near sharp transitions), while PNG\u2019s lossless approach preserves it exactly. For a page that\u2019s mostly a photo or continuous-tone image, this difference matters less. For a page of text or a technical diagram, it can be quite noticeable.\n\nLike the JPG converter, this renders the selected page at roughly double its native resolution before encoding, and works on one specific page at a time via a page selector, rather than batch-converting an entire multi-page document automatically.',
    features: [
      { title: 'Real page rendering', description: 'Renders the actual visual content of the page, not just its text.', icon: HiOutlinePhoto },
      { title: 'Page selection', description: 'Choose exactly which page to convert on multi-page PDFs.', icon: HiOutlineDocumentText },
      { title: 'Lossless output', description: 'PNG won\u2019t introduce any further compression artifacts.', icon: HiOutlineSparkles },
      { title: 'Instant results', description: 'Rendering happens locally in your browser, no wait, no upload.', icon: HiOutlineBolt },
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
      'Capturing a page of line art or a technical drawing without compression artifacts',
    ],
    supportedFormats: { input: 'PDF', output: 'PNG (one page at a time)', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'pdf-to-word': {
    about:
      'This extracts the actual text content from a PDF and reconstructs it into an editable Word document. It doesn\u2019t claim to preserve the original layout, fonts, images, or tables, since that\u2019s a much harder problem even paid tools don\u2019t solve perfectly.\n\nThe reason it\u2019s hard, for any PDF-to-Word tool, comes down to what a PDF actually is under the hood: a page-layout format that records where each individual character or shape should be drawn, not a structured document format that understands the concept of a paragraph, a table, or a heading the way DOCX does. A Word document is built from real structural elements; a PDF is closer to a set of precise drawing instructions. Reconstructing document structure from those instructions means guessing at paragraph boundaries, table cells, and formatting. Those guesses are usually right for simple text and frequently wrong for anything visually complex.\n\nGiven that, this tool focuses on the part it can do reliably: extracting the text accurately and reconstructing sensible paragraph breaks based on real spacing patterns in the source, rather than attempting a full layout reconstruction and quietly getting it wrong. What comes out is edit-ready text, not a pixel-perfect replica. That\u2019s an honest tradeoff, not a shortcut.',
    features: [
      { title: 'Real text extraction', description: 'Pulls the actual text from your PDF, not a placeholder.', icon: HiOutlineDocumentText },
      { title: 'Smart paragraph detection', description: 'Reconstructs paragraph breaks based on the text\u2019s real spacing, not just line breaks.', icon: HiOutlineCpuChip },
      { title: 'Multi-page support', description: 'Every page\u2019s text is included, with a page break between each.', icon: HiOutlineSquares2X2 },
      { title: 'Real .docx output', description: 'Produces a valid Word file that opens correctly in Word or Google Docs.', icon: HiOutlineSparkles },
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
      'Extracting text from a PDF for repurposing in a new document',
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
      'Turns every page of a PDF into a slide, rendering each page as a real image so it looks exactly like the original. An honest approach, since reliably rebuilding editable slide layouts from a PDF isn\u2019t something that can be done accurately.\n\nGenerating a valid .pptx file is a harder problem than it might sound like. A .pptx is actually a zip archive containing a specific structure of XML files, and PowerPoint is notably strict about that structure. Files that look valid on inspection can still fail to open correctly if the relationship IDs between slides, layouts, and content types aren\u2019t exactly right. Building this reliably meant hand-constructing that OOXML structure correctly and then independently verifying the output actually opens and reads correctly, rather than assuming it would work just because the code ran without an error.\n\nEach page is rendered at high resolution before being placed into its own slide, which is why the result looks visually identical to the source PDF rather than an approximation. The tradeoff, stated plainly, is that the slide content is a picture, not editable text or shapes that can be clicked into and changed.',
    features: [
      { title: 'Every page becomes a slide', description: 'One slide per PDF page, in the original order.', icon: HiOutlinePresentationChartBar },
      { title: 'Looks exactly like your PDF', description: 'Each slide is a full-resolution image of that page, not a re-creation.', icon: HiOutlinePhoto },
      { title: 'Real .pptx output', description: 'A valid PowerPoint file that opens correctly in PowerPoint or Google Slides.', icon: HiOutlineSparkles },
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
      'Converting a PDF into a format that\u2019s easier to present page-by-page in a meeting',
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
      'This reads a spreadsheet\u2019s actual cell data and lays it out as a clean table in a PDF. Useful for sharing or printing simple data, though it doesn\u2019t attempt to reproduce charts, images, or complex formatting.\n\nOnly the first sheet in the workbook gets converted, not every sheet. That\u2019s a deliberate choice: a spreadsheet with multiple sheets often has very different content and purposes on each one (a summary, raw data, calculations), and automatically stacking all of them into one PDF table would usually produce a confusing result rather than a useful one. To convert a different sheet, move it to the first position in the workbook before converting.\n\nLong sheets are automatically paginated across multiple PDF pages rather than being cut off or shrunk to fit, continuing cleanly onto additional pages the way a printed spreadsheet normally would. Cell values too long for their column truncate cleanly with an ellipsis rather than overlapping into the next column, keeping the table readable instead of visually broken.',
    features: [
      { title: 'Real cell data', description: 'Reads the actual values in your spreadsheet, not a placeholder table.', icon: HiOutlineTableCells },
      { title: 'Automatic pagination', description: 'Long sheets automatically continue onto additional PDF pages.', icon: HiOutlineDocumentText },
      { title: 'Clean table layout', description: 'A bolded header row and alternating row shading for readability.', icon: HiOutlineSquares2X2 },
      { title: 'Real PDF output', description: 'A valid PDF that opens correctly everywhere.', icon: HiOutlineSparkles },
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
      'Attaching tabular data to an email or report as a PDF instead of a raw spreadsheet file',
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
      'Extracts a document\u2019s real text, headings, and bold formatting and lays it out as a proper, paginated PDF. A real conversion for text-focused documents, not a fake preview.\n\nA .docx file, like .pptx and .xlsx, is actually a zip archive containing a specific set of XML files describing the document\u2019s content and structure. This tool reads that XML directly, parsing paragraphs, paragraph styles (to detect headings), text runs, and bold formatting, rather than relying on a heavyweight document-rendering engine that a browser-based tool doesn\u2019t have access to.\n\nThe scope here is deliberately focused: tables, images, columns, and styling beyond headings and bold aren\u2019t reproduced, since reliably reconstructing those from raw XML with consistent visual fidelity is a substantially harder problem than accurately extracting structured text. Getting it wrong would produce a worse result than being upfront about the limitation. For a text-focused document like a letter, a report body, or a set of notes, this covers the content that actually matters. For a heavily designed document with tables and images, the source .docx remains the better format to share directly.',
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
      'Preparing a text-focused document for a system that only accepts PDF uploads',
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
      'Sample the exact color at any point on an uploaded image, reading the real pixel value directly, or pick a color directly with no image at all.\n\nSampling a color this way reads the actual stored pixel data at the exact coordinate clicked, rather than an estimate, so the hex, RGB, and HSL values shown are the true, exact color as it exists in the image file, not a visual approximation. This matters for tasks like matching a brand color precisely: eyeballing a color from a screenshot and typing a close guess almost never matches exactly, while sampling the actual pixel does.\n\nOne thing worth knowing when color-matching from a photo specifically: the exact pixel color can vary slightly across what looks like a single solid area, due to compression artifacts, lighting gradients, or anti-aliasing at edges. For the most reliable match, sample from the flattest, most uniform part of the color area rather than near an edge or a shadow.',
    features: [
      { title: 'Pixel-accurate sampling', description: 'Reads the real pixel data at the point you click, not an approximation.', icon: HiOutlineEyeDropper },
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
      'Matching a brand color from a logo or photo exactly',
      'Picking a color from a design mockup to reuse in CSS',
      'Identifying the exact shade used somewhere in an image',
      'Extracting a color from a screenshot to match in a new design',
    ],
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'hex-to-rgb': {
    about:
      'Converts hex color codes into their RGB equivalent instantly, alongside HSL, so there\u2019s never a need to look up a conversion by hand.\n\nA hex color code represents red, green, and blue as three two-digit hexadecimal pairs. For example, #3B6CF6 breaks down into red 3B (59), green 6C (108), and blue F6 (246). RGB notation writes out those same three channel values in plain decimal instead (0\u2013255 each), which is why hex and RGB always describe exactly the same underlying color, just in a different notation.\n\nRGB is generally the more useful format when manipulating colors programmatically or needing transparency. CSS\u2019s rgba() notation adds an alpha channel directly (rgba(59, 108, 246, 0.5) for 50% opacity), and individual RGB channels are simpler to adjust in JavaScript than parsing a hex string. Hex remains the more common format in design tools and style guides simply because it\u2019s shorter and more established, even though it encodes the identical color information.',
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
      'Getting RGB values to build a semi-transparent rgba() color in CSS',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'rgb-to-hex': {
    about:
      'Converts RGB color values into their hex equivalent instantly, alongside HSL. Useful whenever a source gives RGB but a hex code is needed for CSS or design tools.\n\nRGB and hex describe the exact same color information in different notations: RGB writes red, green, and blue as three decimal numbers from 0 to 255, while hex packs those same three values into a compact six-digit code using base-16 notation, prefixed with #. For example, rgb(59, 108, 246) and #3B6CF6 are the identical color: 59 in decimal is 3B in hexadecimal, and so on for each channel.\n\nHex tends to be the preferred format in design tools, brand style guides, and most CSS written by hand, largely because it\u2019s shorter and more established as the default. When working from a color picked in an image editor or returned by a JavaScript color API in RGB form, converting it to hex is a common step before dropping it into a stylesheet or design file.',
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
      'Preparing a color value for a brand guide that specifies hex codes',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'hex-to-hsl': {
    about:
      'Converts hex color codes into HSL (Hue, Saturation, Lightness) values instantly, useful when adjusting a color\u2019s vividness or lightness in a way that\u2019s more intuitive than raw RGB.\n\nUnlike hex and RGB, which describe a color as a mix of red, green, and blue light, HSL describes it the way people naturally think about color: a hue (the base color, as an angle from 0 to 360 degrees around a color wheel), a saturation percentage (how vivid or muted it is), and a lightness percentage (how close to black or white it is). This makes HSL convenient for generating color variations. Lighten or darken a color by changing only the lightness value, or create a muted version by lowering saturation, all while keeping the same underlying hue.\n\nWorth knowing: HSL\u2019s lightness value doesn\u2019t perfectly match how bright a color actually looks to the eye. hsl(60, 100%, 50%) (yellow) and hsl(240, 100%, 50%) (blue) share the same lightness number but look noticeably different in perceived brightness. It\u2019s still a useful, intuitive format for theming and generating color scales, just not a perfectly uniform one.',
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
      'Building a set of tints and shades from one base color',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'color-converter': {
    about:
      'A universal color tool: enter a color in any format (hex, RGB or HSL) and see it converted to all three at once, with a visual picker and live swatch preview.\n\nHex, RGB, and HSL all describe the exact same underlying colors, just through different notation, each suited to different situations. Hex (#3B6CF6) is compact and the most common format in design tools and style guides. RGB (rgb(59, 108, 246)) writes out the same red/green/blue channels in plain decimal, and is the more natural choice when adjusting channels programmatically or needing transparency via rgba(). HSL (hsl(226, 89%, 60%)) describes color the way people intuitively think about it: hue, saturation, and lightness, making it the easiest format for generating consistent tints, shades, and theme variations.\n\nBecause design tools, codebases, and style guides don\u2019t all standardize on the same format, converting between all three is a genuinely common need. This tool accepts any of the three as input and always shows the other two immediately, so there\u2019s no need to remember which conversion tool handles which specific direction.',
    features: [
      { title: 'Any format in, all formats out', description: 'Type hex, rgb(), or hsl(): the other two are always shown alongside it.', icon: HiOutlineSquares2X2 },
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
      'Avoiding the need to remember which single-direction converter to use',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'palette-generator': {
    about:
      'Builds a set of related colors from one base color, using real HSL hue and lightness math. Choose complementary, analogous, triadic or shade-based schemes.\n\nEach scheme follows an actual color-theory rule based on positions around the color wheel, defined by hue angle in HSL. A complementary scheme pairs a color with the one directly opposite it on the wheel (180 degrees away), high contrast, often used for accent colors that need to stand out against a primary color. An analogous scheme picks colors sitting close together on the wheel, producing a harmonious, low-contrast palette that feels cohesive rather than attention-grabbing. A triadic scheme picks three colors evenly spaced around the wheel (120 degrees apart), giving vibrant variety while still maintaining balance. Shades simply vary the lightness of a single hue, useful for UI states like hover and active colors that need to feel related to a base color without introducing a second hue at all.\n\nThere\u2019s no universally "correct" scheme; the right choice depends on what the palette is for. A brand palette often benefits from analogous or shade-based harmony. A call-to-action button that needs to visually pop against its background is a classic complementary use case. Triadic works well when a design needs several distinct colors that still feel intentionally chosen together, rather than random.',
    features: [
      { title: 'Four real color schemes', description: 'Complementary, analogous, triadic and shades, each using real color-wheel math.', icon: HiOutlinePaintBrush },
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
      'Finding a high-contrast complementary accent color for a call-to-action',
      'Generating a range of shades from one base color for UI hover/active states',
      'Exploring triadic color combinations for a design that needs several distinct colors',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'gradient-generator': {
    about:
      'Creates smooth linear and radial CSS gradients using a visual editor. Add color stops, adjust their position and direction, and get ready-to-use CSS code instantly, with no need to hand-write gradient syntax or guess at color-stop percentages.\n\nA CSS gradient is a smooth color transition rendered directly by the browser, defined with the linear-gradient() or radial-gradient() function, no image file required. Because gradients are pure CSS rather than a downloaded image, they scale perfectly at any resolution, add zero extra HTTP requests to a page, and stay crisp on high-density displays where a raster image would look blurry or need multiple exported sizes.\n\nLinear gradients transition along a straight line, controlled by a direction: either a keyword like "to right" or an exact angle in degrees, where 0deg runs bottom-to-top and 90deg runs left-to-right. Radial gradients instead radiate outward from a center point in a circle or ellipse, which is useful for spotlight effects, glows, or soft vignettes. (CSS also defines a third type, conic gradients, which sweep colors around a center point rather than along a line or outward from one. This tool currently generates linear and radial gradients.)\n\nEach color stop added sits at a specific position along the gradient, expressed as a percentage from 0% to 100%. Two stops create a simple two-color blend; adding more stops allows building a multi-color gradient or even a hard, sharp color split by placing two stops at the same position. More color stops mean more rendering work for the browser: two or three stops render with negligible cost, while ten or more can introduce a small amount of visible lag on lower-end devices, so it\u2019s worth using only as many stops as the design actually needs.',
    features: [
      { title: 'Linear & radial gradients', description: 'Build straight-line linear gradients with precise angle control, or circular/elliptical radial gradients.', icon: HiOutlinePaintBrush },
      { title: 'Multiple color stops', description: 'Add up to 5 colors and position each one precisely along the gradient.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Live preview', description: 'See the actual gradient rendered as you build it, not just a code preview.', icon: HiOutlineEyeDropper },
      { title: 'Ready-to-use CSS', description: 'Copy the exact background CSS value with one click, paste directly into your stylesheet.', icon: HiOutlineCodeBracket },
    ],
    howToUse: [
      'Choose linear or radial, and set a direction or angle if linear.',
      'Add and adjust color stops: their colors and positions along the gradient.',
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
      'Beautifies or minifies JSON data instantly, with clear error messages, including the exact line and column, if something isn\u2019t valid.\n\nFormatting (also called pretty-printing) adds consistent indentation and line breaks to JSON data, turning a dense, single-line blob into a structure that\u2019s actually readable and navigable. Nested objects and arrays become visually clear, and it\u2019s far easier to spot where one object ends and another begins. Minifying does the opposite: it strips all unnecessary whitespace to produce the smallest possible representation of the same data, which matters for production use, where every byte transferred over the network has a real, if usually small, cost.\n\nAPIs commonly return minified JSON by default, since there\u2019s no reason to waste bandwidth on formatting whitespace a machine doesn\u2019t need, which is exactly why a formatter tool is useful for a human trying to actually read that response while debugging. The reverse direction matters too: a formatted, human-edited JSON config file is often minified before being bundled into production, shaving a small amount of size off the final build.',
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
      'Cleaning up JSON copied from an inconsistent or badly-formatted source',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'json-validator': {
    about:
      'Checks whether JSON is syntactically correct, showing immediately whether it\u2019s valid, and if not, exactly where the problem is.\n\nJSON looks similar to a JavaScript object literal, but the two aren\u2019t the same thing, and the differences are exactly where most invalid JSON actually goes wrong. JSON requires every key to be wrapped in double quotes, not single quotes, and not left unquoted the way plain JavaScript object keys can be. JSON also doesn\u2019t allow a trailing comma after the last item in an object or array, doesn\u2019t support comments at all, and can\u2019t represent JavaScript-specific values like undefined, functions, or Date objects. Only strings, numbers, booleans, null, objects, and arrays are valid JSON values.\n\nThese rules exist because JSON was designed as a strict, minimal, language-independent data format, not a subset of JavaScript syntax that happens to look familiar. That strictness is a real feature, not a limitation. It\u2019s exactly what makes JSON reliably parseable the same way across every programming language, with no ambiguity about what a given piece of data means.',
    features: [
      { title: 'Instant validation', description: 'Know immediately whether your JSON parses correctly.', icon: HiOutlineBolt },
      { title: 'Precise error location', description: 'Get the exact line and column of any syntax error.', icon: HiOutlineCodeBracket },
      { title: 'No setup required', description: 'Just paste and check, no configuration or schema needed.', icon: HiOutlineSparkles },
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
      'Checking JSON copied from a JavaScript codebase for values that aren\u2019t actually valid JSON',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'base64-encoder': {
    about:
      'Converts text to and from Base64, with full Unicode support: accented letters, non-Latin scripts and emoji all round-trip correctly.\n\nBase64 is a binary-to-text encoding scheme that represents arbitrary data using only 64 printable ASCII characters (A\u2013Z, a\u2013z, 0\u20139, +, and /, with = used for padding). It exists because many older systems and protocols, email, some URL contexts, certain config formats, were built to handle plain text safely, not arbitrary binary bytes. Base64 shows up constantly in modern development too: embedding small images directly in HTML or CSS as data URLs, encoding the header and payload of a JWT, and attaching files in email all rely on it.\n\nThis tool produces standard Base64 output, using + and / as its two special characters. Worth knowing if you\u2019re working with JWTs or Base64 in a URL specifically: those contexts typically use a URL-safe variant instead, replacing + with -, / with _, and often dropping the = padding entirely, since + and / have special meaning inside a URL. For URL-safe output, substitute those characters manually after encoding here.\n\nOne thing worth remembering: Base64 is an encoding, not an encryption. Anyone can decode it back to the original text instantly, with no key or password required. It makes binary-safe data readable as text; it does not make data private or secure in any way.',
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
      'Encoding data for use in a config file or data URL',
      'Decoding a Base64 string from an API response or JWT payload',
      'Preparing binary-safe text for embedding in JSON or XML',
      'Inspecting the contents of a Base64-encoded token during debugging',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'url-encoder': {
    about:
      'Converts text and URLs to and from percent-encoded form, so special characters like spaces and ampersands are safely represented in a URL.\n\nPercent-encoding (also called URL encoding) replaces characters that aren\u2019t safe to use directly in a URL with a % followed by their hexadecimal byte value. A space becomes %20, an ampersand becomes %26, and so on. This is necessary because certain characters have structural meaning in a URL: & separates query parameters, = separates a parameter\u2019s name from its value, and / separates path segments, so a literal one of these characters inside a value would be misread as part of the URL\u2019s structure rather than actual data.\n\nThis tool specifically encodes each value the way a single query parameter or path segment should be encoded, escaping characters like &, =, ?, and / along with spaces and other unsafe characters. That\u2019s an important, commonly confused distinction: encoding a full, already-structured URL is different from encoding one individual value that will be placed inside a URL. Encoding an entire URL this way would also escape the slashes and colons that are supposed to remain as real URL structure, breaking it. Use this tool on individual values (a search term, a parameter, a piece of user input) being inserted into a URL, not on a complete URL that\u2019s already built.',
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
      'Safely building a query string value with special characters',
      'Decoding a percent-encoded URL parameter to read it clearly',
      'Preparing a search term or user input for insertion into a URL',
      'Debugging why a URL parameter containing special characters isn\u2019t working as expected',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'uuid-generator': {
    about:
      'Creates random, RFC-compliant version 4 UUIDs using your browser\u2019s cryptographically secure random number generator, one at a time or in bulk.\n\nA UUID (Universally Unique Identifier) is a 128-bit identifier, conventionally written as 32 hexadecimal digits split into five groups by hyphens, like 550e8400-e29b-41d4-a716-446655440000. The point of a UUID is that it can be generated independently, by different systems, with no central coordination or database lookup, while still being safe to treat as effectively unique. The chance of two randomly generated version 4 UUIDs colliding is astronomically small, far lower than the odds of a hardware failure happening at the same moment.\n\nVersion 4, which this tool generates, is entirely random except for a few fixed bits that identify it as a v4 UUID. It\u2019s the most common version for general-purpose unique IDs. A newer version, UUID v7, has also gained adoption. It embeds a timestamp in the leading bits, which makes v7 UUIDs sort roughly in creation order, something v4\u2019s pure randomness can\u2019t do. Databases sometimes prefer v7 specifically because sequentially-ish ordered IDs index more efficiently than fully random ones. Without a specific need for time-ordering, v4 remains a simple, solid default.',
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
      'Assigning a unique identifier to a resource, session, or object in code',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'qr-code-generator': {
    about:
      'Creates a scannable QR code from any text or URL, entirely in your browser. No sign-up, no watermark, no expiration, since the code never depends on any server staying online.\n\nThere are two fundamentally different kinds of QR code, and the difference matters a lot for anything printed or relied on long-term. A static QR code (what this tool creates) has the actual destination, the URL or text itself, encoded directly into the pattern. Once generated, it works forever, with nothing to maintain, because no external service is involved in scanning it. A dynamic QR code instead encodes a short redirect link controlled by a company\u2019s server. That lets the destination change later and adds scan analytics, but only for as long as that company keeps the redirect service running, which is typically tied to an ongoing paid plan.\n\nA common frustration with "free" QR generators is worth naming directly. Many quietly add a watermark, cap scans at a few hundred before demanding payment, or expire the code after a set period, none of it obvious until after it\u2019s already printed on packaging or a sign. Since this tool generates a real static code with the data baked in directly, none of that applies: no watermark because nothing is added to the output, no scan limit because scanning doesn\u2019t touch any server, and no expiration because there\u2019s nothing external to expire.\n\nThe error correction level controls how much of the code can be damaged, dirty, or obscured (by a logo placed on top, for instance) while still scanning correctly. Low allows about 7% damage, High allows about 30%, at the cost of a visually denser code for the same data.',
    features: [
      { title: 'Five real content types', description: 'Link, Text, Email, Phone, or SMS, each using the correct standard format so it opens the right app when scanned.', icon: HiOutlinePresentationChartBar },
      { title: 'Static, permanent codes', description: 'The destination is baked directly into the code, nothing to expire, no server dependency.', icon: HiOutlineShieldCheck },
      { title: 'No watermark, no sign-up', description: 'A clean, unbranded code, usable immediately.', icon: HiOutlineSparkles },
      { title: 'PNG or SVG export', description: 'PNG for quick use, or SVG for scaling to any size, like large print signage, with zero quality loss.', icon: HiOutlineArrowDownTray },
      { title: 'Adjustable error correction', description: 'Choose how much damage or obstruction the code can tolerate and still scan.', icon: HiOutlineAdjustmentsHorizontal },
    ],
    howToUse: [
      'Choose what you want to encode: Link, Text, Email, Phone, or SMS.',
      'Fill in the details for that type.',
      'Choose an error correction level, and customize the colors if you like.',
      'Preview the code live as you type, then download as PNG or SVG.',
    ],
    useCases: [
      'Linking a printed flyer, poster, or business card to a website',
      'Sharing a Wi-Fi password or contact detail without typing it out',
      'Putting a permanent, non-expiring code on product packaging',
      'Generating a QR code for a presentation slide or event signage',
    ],
    supportedFormats: { output: 'PNG or SVG', notes: 'A static code — the data is permanent and doesn\u2019t depend on any external service to keep working.' },
    privacy: NO_FILE_PRIVACY,
  },

  'url-shortener': {
    about:
      'This turns a long, unwieldy link into a short, clean one that redirects to the original destination. Free, no account required.\n\nOne thing to be upfront about: this is the one ToolHub tool that can\u2019t work entirely in your browser. A short link has to keep working for anyone who clicks it later, on any device, at any time, which means the destination URL is stored on ToolHub\u2019s server, unlike every other tool here. That\u2019s a deliberate, disclosed exception, not an oversight.\n\nThe redirect itself uses a real 301 (permanent redirect) response, the same kind reputable URL shorteners use, and the kind that correctly passes a page\u2019s SEO ranking value through to the destination. A short link built this way doesn\u2019t compete with or dilute the destination page\u2019s own search ranking, since search engines treat a 301 as "this content has permanently moved here."\n\nMost major URL shorteners gate real usage behind an account, often a paid plan, for anything beyond a handful of links. Branded domains, click analytics, and custom expiration dates are typically premium features. This tool skips all of that: no sign-up, no dashboard to manage, just a link that works and keeps working. If click analytics, custom branded domains, or the ability to edit a link\u2019s destination later matter to you, a dedicated service built for that will fit better. This is intentionally a simpler, more direct utility.',
    features: [
      { title: 'No account required', description: 'Paste a URL, get a short link. Nothing to sign up for.', icon: HiOutlineLink },
      { title: 'Permanent, standards-correct redirects', description: 'Uses a real 301 redirect, which properly passes SEO value to your destination page.', icon: HiOutlineShieldCheck },
      { title: 'One-click copy', description: 'Copy your new short link straight to your clipboard.', icon: HiOutlineDocumentDuplicate },
      { title: 'Instant results', description: 'Get your short link back immediately after submitting.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Paste your long URL into the field.',
      'Click Shorten URL.',
      'Copy your new short link.',
    ],
    useCases: [
      'Making a long link easier to share verbally or in print',
      'Cleaning up a long URL with tracking parameters before sharing it',
      'Fitting a link into a space with a character limit',
      'Sharing a cleaner-looking link on social media or in a message',
    ],
    supportedFormats: { notes: 'Accepts any valid http:// or https:// URL. The destination URL is stored on ToolHub\u2019s server so the short link keeps working for anyone who clicks it. This is the one tool on the site that isn\u2019t purely browser-based.' },
    privacy:
      'Unlike other ToolHub tools, the URL you shorten is stored on ToolHub\u2019s server. This is necessary for the short link to keep working for anyone who clicks it later. No account or personal information is required to create one.',
  },

  'user-agent-parser': {
    about:
      'Breaks down any browser User-Agent string into browser, operating system, device type, and rendering engine, including honest flags for the parts that can\u2019t be determined anymore, rather than guessing.\n\nUser-Agent strings have changed significantly in recent years. Chrome and Edge completed what\u2019s called "User-Agent reduction," deliberately freezing the detailed OS version and device model reported in the string to generic placeholder values, specifically to reduce passive fingerprinting. A modern Chrome-on-Android User-Agent, for example, reports the Android version as a frozen "10" and the device model as a frozen "K" regardless of what the real device actually is. The real details have moved to a separate, opt-in mechanism (Client Hints) that a server has to explicitly request. This tool recognizes that specific frozen pattern and says plainly when it\u2019s looking at a reduced string, instead of reporting the placeholder as if it were real, current device information.\n\nA similar honest limitation: Windows 10 and Windows 11 both report identically as "Windows NT 10.0" in the User-Agent string. There\u2019s no way to tell them apart from this string alone, and this tool says so directly rather than guessing one or the other.\n\nBot and crawler detection works by matching known patterns (Googlebot, Bingbot, and other common crawlers), which covers legitimate, well-behaved bots that identify themselves. It can\u2019t detect a bot deliberately disguising itself with a normal browser User-Agent string, since at that point there\u2019s nothing in the string itself to distinguish it.',
    features: [
      { title: 'Full breakdown', description: 'Browser, version, OS, device type and rendering engine in one view.', icon: HiOutlineCpuChip },
      { title: 'Honest about UA reduction', description: 'Flags modern Chrome\u2019s frozen, generic OS/device values instead of reporting them as real detected data.', icon: HiOutlineExclamationTriangle },
      { title: 'Detect your own', description: 'One click to parse the User-Agent your own browser is currently sending.', icon: HiOutlineDocumentText },
      { title: 'Bot detection', description: 'Recognizes common, self-identifying crawlers like Googlebot and Bingbot.', icon: HiOutlineGlobeAlt },
    ],
    howToUse: [
      'Paste a User-Agent string, or click "Detect My User-Agent" to use your own.',
      'Click Parse.',
      'Review the breakdown, including any honesty warnings about reduced or ambiguous data.',
      'Copy the results if needed.',
    ],
    useCases: [
      'Debugging a browser-specific issue reported by a user',
      'Checking what a specific device or browser reports itself as',
      'Understanding why a User-Agent string looks unexpectedly generic',
      'Verifying whether traffic is coming from a known, self-identifying crawler',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'htaccess-generator': {
    about:
      'Builds .htaccess configuration rules from a checklist of common options: HTTPS redirects, caching, security headers, access control, and more, using current, correct Apache syntax.\n\n.htaccess rules depend on your Apache configuration and hosting environment. Test changes before using them on a production website. Every generated block that depends on a specific Apache module says so directly in its comment, since a rule that needs mod_rewrite or mod_headers simply won\u2019t do anything on a server where that module isn\u2019t enabled. It won\u2019t necessarily error, it\u2019ll just silently not apply.\n\nOne technical detail worth being specific about: IP-based access control here uses the modern Apache 2.4+ syntax (Require ip, Require not ip), not the older Order/Allow/Deny directives many older tutorials still show. Apache\u2019s own official documentation states plainly that those older directives "are deprecated and will go away in a future version" and explicitly advises against outdated tutorials recommending their use. This tool generates the syntax Apache itself currently recommends, not the version that\u2019s technically still working today but on its way out.\n\nPassword protection is included as setup instructions rather than a fully self-contained rule, honestly so: .htaccess password protection requires a second file (.htpasswd, stored outside your web root) containing the username and a hashed password, which has to be created separately using a tool like htpasswd on your server. No .htaccess generator can create that second file for you from a web form alone.',
    features: [
      { title: 'Sixteen common configurations', description: 'HTTPS, redirects, caching, compression, security headers, access control and more.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Current, correct syntax', description: 'Uses Apache 2.4+\u2019s modern Require syntax for access control, not deprecated directives.', icon: HiOutlineShieldCheck },
      { title: 'Module dependencies labeled', description: 'Every rule that needs a specific Apache module says so directly in its comment.', icon: HiOutlineExclamationTriangle },
      { title: 'Copy or download', description: 'Copy the generated rules, or download a ready .htaccess file.', icon: HiOutlineArrowDownTray },
    ],
    howToUse: [
      'Check the options you need.',
      'Fill in any required details (a redirect target, an IP address, and so on).',
      'Review the generated .htaccess code.',
      'Copy it or download the file, then test it on your actual server.',
    ],
    useCases: [
      'Setting up HTTPS and www redirects for a new website',
      'Adding browser caching and compression to speed up page loads',
      'Blocking a specific IP address or restricting access to your own IP',
      'Adding baseline security headers without hand-writing Apache syntax from scratch',
    ],
    supportedFormats: { output: '.htaccess (plain text)', notes: 'Generated rules depend on your specific Apache configuration and available modules. Always test before deploying to production.' },
    privacy: NO_FILE_PRIVACY,
  },

  'cron-expression-generator': {
    about:
      'Cron syntax is compact and easy to misread. "0 0 1 * 0" looks like it should mean one specific thing, but getting it wrong is a common way to schedule a job for the wrong day. This tool builds a schedule field by field, explains what it actually does in plain English, and shows the next several times it will genuinely run.\n\nA cron expression has five fields: minute, hour, day-of-month, month, and day-of-week. Each can be a specific value, a range, a step (every 5th value, for instance), or a wildcard meaning "any." This is standard 5-field syntax, the format cron itself and most schedulers use. Some tools use a 6-field variant with an added seconds field; that\u2019s a different format entirely, and pasting one in here shows a clear error instead of silently misreading it.\n\nThe rule most people get backwards: when both day-of-month and day-of-week are restricted to something other than "*", cron combines them with OR, not AND. "0 0 1 * 0" doesn\u2019t mean "midnight on the 1st, but only if that\u2019s also a Sunday." It means "midnight on the 1st, or every Sunday, whichever comes first." This tool\u2019s next-run calculation follows that OR rule correctly, which is exactly the detail most people assume works the other way.\n\nThe next-run times aren\u2019t an estimate. They\u2019re calculated by checking forward through actual calendar time, so real month lengths and weekday patterns are accounted for, shown in your browser\u2019s own local time zone.',
    features: [
      { title: 'Visual builder or paste-to-parse', description: 'Build a schedule field by field, or paste an existing expression to see what it means.', icon: HiOutlineCalendarDays },
      { title: 'Plain-English explanation', description: 'A real description of what the schedule does, not just the raw syntax.', icon: HiOutlineDocumentText },
      { title: 'Real next-run times', description: 'See the actual next 5 times the schedule will run, calculated against real calendar time.', icon: HiOutlineClock },
      { title: 'Correct OR logic', description: 'Implements the standard cron rule for combined day-of-month and day-of-week fields correctly.', icon: HiOutlineExclamationTriangle },
    ],
    howToUse: [
      'Choose a preset, or set each field individually.',
      'Paste an existing cron expression to see its explanation instead.',
      'Review the plain-English explanation and the next scheduled run times.',
      'Copy the expression when you\u2019re ready to use it.',
    ],
    useCases: [
      'Building a cron schedule for a server task or CI/CD pipeline without memorizing cron syntax',
      'Understanding what an existing, unfamiliar cron expression actually does',
      'Verifying a schedule will run when you expect, before deploying it',
      'Checking a schedule that combines day-of-month and day-of-week behaves the way you actually intend',
    ],
    supportedFormats: { notes: 'Supports standard 5-field cron syntax only (minute, hour, day-of-month, month, day-of-week), not 6-field dialects with a seconds field.' },
    privacy: NO_FILE_PRIVACY,
  },

  'schema-markup-generator': {
    about:
      'Structured data is a standardized way of describing a page\u2019s content so search engines can understand it more precisely than by parsing visible text alone. This tool builds valid JSON-LD for common schema.org types (Article, Product, Organization, and more), showing only the fields that actually apply to whichever type you pick, ready to paste directly into a page.\n\nJSON-LD, generated here as a self-contained <script type="application/ld+json"> block, is the format Google explicitly recommends. It keeps structured data separate from the visible HTML, rather than requiring attributes scattered through the markup itself.\n\nWorth staying current on: structured data doesn\u2019t automatically earn a rich result or a higher ranking. Eligibility for any specific search feature depends on Google\u2019s own requirements, and those requirements change. Google deprecated the FAQ rich result in Search starting May 2026, and no longer supports the HowTo rich result at all. Both types are still included here as valid schema.org markup, since they can still be useful if something else reads them: another system, a different search engine, or simply as accurate machine-readable metadata. Adding either one today specifically expecting a Google rich result, though, would be working from an outdated assumption.\n\nOne rule applies regardless of type: only mark up content that\u2019s actually visible on the page. Structured data describing something a visitor can\u2019t see is treated as spam and can trigger a manual action against the site. The markup should always match what\u2019s really there.',
    features: [
      { title: 'Thirteen schema types', description: 'Article, Product, Organization, LocalBusiness, FAQPage, Event and more.', icon: HiOutlineCodeBracket },
      { title: 'Only the fields that apply', description: 'Each type shows its own real fields, never a generic form forcing irrelevant inputs.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Current, honest guidance', description: 'Flags schema types where Google\u2019s own rich-result support has changed, rather than assuming markup always helps.', icon: HiOutlineExclamationTriangle },
      { title: 'Copy, download, or grab the script tag', description: 'Get the raw JSON-LD, a ready-to-paste script tag, or a downloadable file.', icon: HiOutlineArrowDownTray },
    ],
    howToUse: [
      'Choose a schema type.',
      'Fill in the fields that apply \u2014 required fields are marked.',
      'Copy the JSON-LD or the full script tag, or download the file.',
      'Paste it into your page, typically inside the <head>.',
    ],
    useCases: [
      'Adding Article or Product structured data to a page for accurate machine-readable metadata',
      'Building an Organization or LocalBusiness schema for your site\u2019s homepage',
      'Generating BreadcrumbList markup that matches your site\u2019s actual navigation',
      'Creating structured data for internal systems or other platforms that read schema.org markup, independent of Google\u2019s current rich-result support',
    ],
    supportedFormats: { output: 'JSON-LD (script tag or standalone .json)', notes: 'Structured data helps search engines understand content but doesn\u2019t guarantee a rich result or ranking boost. Eligibility depends on Google\u2019s current requirements, which change over time.' },
    privacy: NO_FILE_PRIVACY,
  },

  'audio-to-wav-converter': {
    about:
      'A lot of audio tools only accept WAV files. Editing software, some game engines, older hardware, certain podcast pipelines: they want uncompressed audio and won\u2019t take an MP3 or an OGG file directly. This tool takes whatever format your audio is actually in and hands you back a proper WAV file, without installing anything or sending the file anywhere.\n\nWorth setting expectations correctly here: this converts into WAV specifically, not between every format under the sun. Going the other direction and shrinking a WAV down to MP3 needs a real MP3 encoder, which is a genuinely complicated piece of software this tool doesn\u2019t include. WAV, on the other hand, is a simple, well-documented format: raw audio samples with a short header describing the sample rate and channel count. That\u2019s exactly why it can be built correctly and checked thoroughly rather than approximated.\n\nYour browser does the actual decoding, using the same built-in audio engine that plays sound on any webpage. Whatever format your browser can already play back, this tool can read.',
    features: [
      { title: 'Reads what your browser already plays', description: 'MP3, OGG, M4A, WebM and more \u2014 if your browser can play it, this can decode it.', icon: HiOutlineDocumentText },
      { title: 'Real WAV output', description: 'A properly formed WAV file, not a renamed copy of the original.', icon: HiOutlineArrowDownTray },
      { title: 'Stereo handled correctly', description: 'Left and right channels stay separate and correctly interleaved.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Nothing leaves your device', description: 'Decoding and encoding both happen locally, using your browser\u2019s own audio engine.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Upload an audio file.', 'Click Convert to WAV.', 'Download the result.'],
    useCases: [
      'Getting a file into WAV for audio editing software that requires it',
      'Preparing a sound effect for a game engine that only accepts WAV',
      'Converting a voice memo or recording for a workflow that needs uncompressed audio',
      'Working around older hardware or software that won\u2019t accept compressed formats',
    ],
    supportedFormats: { input: 'MP3, WAV, OGG, M4A, WebM, FLAC (whatever your browser supports)', output: 'WAV', maxSize: '50 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'audio-trimmer': {
    about:
      'Sometimes you don\u2019t need the whole file. A 40-minute interview recording where you only need one 30-second quote. A voice memo with ten seconds of dead air at the start. This tool cuts an audio file down to just the part you actually want, using two sliders to mark the start and end.\n\nThe trim is a real edit, not a playback trick. The exported file only contains the selected range. Everything happens after your browser decodes the audio locally, and the result downloads as a standard WAV file.',
    features: [
      { title: 'Simple start/end sliders', description: 'Drag to set exactly where the clip begins and ends.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'A real cut, not a trick', description: 'The downloaded file only contains the selected range, nothing extra.', icon: HiOutlineDocumentDuplicate },
      { title: 'Works with common formats', description: 'MP3, WAV, OGG and more, whatever your browser can already play.', icon: HiOutlineDocumentText },
      { title: 'Entirely on your device', description: 'The file never leaves your browser at any point.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Upload an audio file.', 'Drag the start and end sliders to select the range you want.', 'Click Trim, then download.'],
    useCases: [
      'Pulling a short quote or clip out of a longer recording',
      'Cutting dead air or silence off the start or end of a voice memo',
      'Making a short ringtone-length clip from a song',
      'Extracting just the relevant part of a meeting or interview recording',
      'Preparing a short audio sample for a video project or presentation',
    ],
    supportedFormats: { input: 'MP3, WAV, OGG, M4A, WebM, FLAC (whatever your browser supports)', output: 'WAV', maxSize: '50 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'video-to-gif': {
    about:
      'GIFs are everywhere: reactions, short demos, looping clips shared in chats and on social media. Most video files aren\u2019t GIFs though, and most phones don\u2019t export them directly. This tool takes a short clip from a video and turns it into a real, working animated GIF.\n\nWhat actually happens: your browser reads the video frame by frame over the range you select, reduces each frame\u2019s colors down to a limited palette (GIF supports at most 256 colors per frame, nowhere near a real video\u2019s full color range), and compresses the result into the standard GIF format. All of that runs on your device, no upload, no server involved.\n\nClips are capped at 10 seconds. Beyond that, the file size and processing time both grow quickly, since every extra second means dozens more frames to process in JavaScript. For anything longer, a dedicated video editor will do better.',
    features: [
      { title: 'Real animated GIF output', description: 'A real multi-frame GIF file, built and verified frame by frame.', icon: HiOutlinePhoto },
      { title: 'Pick your frame rate', description: 'Choose 5, 10, or 15 fps depending on how smooth you need the motion.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'No watermark', description: 'The output is a clean file with nothing added to it.', icon: HiOutlineSparkles },
      { title: 'Nothing uploaded', description: 'Frame extraction and encoding both happen in your browser.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Upload a video file.', 'Drag the sliders to pick a clip up to 10 seconds long.', 'Choose a frame rate.', 'Click Create GIF, then download.'],
    useCases: [
      'Turning a short screen recording into a GIF for documentation or a chat',
      'Making a reaction or highlight clip from a longer video',
      'Creating a looping demo of a UI interaction for a presentation',
      'Sharing a quick moment from a video somewhere GIFs work better than video files',
    ],
    supportedFormats: { input: 'MP4, WebM, MOV, OGV', output: 'GIF', maxSize: '100 MB (clips limited to 10 seconds)' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'video-trimmer': {
    about:
      'This cuts a video down to a shorter clip, just the range between a start and end point you set. Worth knowing upfront: it works by actually playing through the selected range and recording it back using your browser\u2019s own built-in video encoder. That means trimming a clip takes roughly as long as the clip itself, not an instant operation.\n\nThat real-time approach is a deliberate tradeoff. Building a proper video encoder from scratch isn\u2019t something to attempt casually. Modern video codecs are genuinely complex, and a hand-rolled one would be a real risk of producing broken files. Using the browser\u2019s own encoder, the same one it already uses for any video on the web, means the actual encoding is handled by code that\u2019s already been tested at a scale no single tool could replicate.',
    features: [
      { title: 'Simple start/end sliders', description: 'Set exactly where the clip begins and ends.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Uses your browser\u2019s real encoder', description: 'The actual video encoding is handled by the same engine your browser already uses for video playback.', icon: HiOutlineShieldCheck },
      { title: 'Live progress', description: 'A progress bar tracks the trim as it happens in real time.', icon: HiOutlineClock },
      { title: 'Nothing uploaded', description: 'The video never leaves your device.', icon: HiOutlineDocumentDuplicate },
    ],
    howToUse: ['Upload a video file.', 'Set the start and end points with the sliders.', 'Click Trim and wait. It takes about as long as the clip itself.', 'Download the result.'],
    useCases: [
      'Cutting a long recording down to just the relevant part',
      'Removing dead time from the start or end of a screen recording',
      'Making a short clip from a longer video to share directly',
      'Extracting a specific moment from a longer video file',
    ],
    supportedFormats: { input: 'MP4, WebM, MOV, OGV', output: 'WebM', maxSize: '200 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'unit-converter': {
    about:
      'Cooking with a recipe in the wrong measurement system, checking a distance in miles when the sign says kilometers, converting a recipe\u2019s Fahrenheit oven temperature to Celsius: these small conversions come up constantly. This tool covers length, weight, volume, and temperature, with every conversion factor set to the actual internationally-defined standard, not a rounded approximation.\n\nOne distinction worth knowing about, since it trips people up: a US gallon and a UK (Imperial) gallon are not the same size. A US gallon is about 3.785 liters, while a UK gallon is about 4.546 liters, roughly 20% larger. Mixing the two up in a real recipe or fuel calculation gives a meaningfully wrong answer, not just a rounding difference, which is why this tool keeps them as separate, clearly labeled units instead of one generic "gallon."',
    features: [
      { title: 'Four common categories', description: 'Length, weight, volume and temperature, covering most everyday conversions.', icon: HiOutlineScale },
      { title: 'Exact standard conversion factors', description: 'Every conversion uses the real, internationally-defined value, not a rounded shortcut.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'US and UK volume units kept separate', description: 'Gallons, cups, and fluid ounces are explicitly labeled by system, since US and UK sizes genuinely differ.', icon: HiOutlineExclamationTriangle },
      { title: 'One-click swap', description: 'Flip the from/to units instantly instead of resetting both manually.', icon: HiOutlineArrowsRightLeft },
    ],
    howToUse: ['Choose a category.', 'Pick the units to convert from and to.', 'Type a value and the result updates instantly.'],
    useCases: [
      'Converting a recipe between metric and US measurements',
      'Checking a distance or speed limit in a different unit system while traveling',
      'Converting an oven temperature between Celsius and Fahrenheit',
      'Working out fuel or liquid volumes between US and UK gallons',
      'Converting a body weight or height between metric and imperial units',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'meta-tag-generator': {
    about:
      'A page\u2019s title and description are what actually show up in a Google search result. Its Open Graph and Twitter Card tags are what show up when someone shares the link on Facebook, Slack, Discord, or X. Without them, a shared link just shows as bare text with no image or preview. This tool generates all of that at once from a handful of fields, with a live preview of how the search result will actually look.\n\nOne detail worth knowing, since it causes real confusion: social platforms cache the preview they generate for a link. Update your meta tags after a link has already been shared once, and the old preview can keep showing for hours or days until that platform re-crawls the page. That\u2019s the platform\u2019s caching behavior, not a sign that something\u2019s wrong with the new tags. Most platforms have a debugging tool that can force a fresh re-scrape if you need the update to show sooner.\n\nA smaller but accurate detail: Twitter/X checks its own twitter:card tag first and has no fallback if it\u2019s missing. Skip it, and a shared link shows as plain text with no image at all, even if the Open Graph tags are otherwise complete.',
    features: [
      { title: 'Search result preview', description: 'See how your title and description will actually look in a search result.', icon: HiOutlineDocumentText },
      { title: 'Length warnings', description: 'A heads-up when a title or description is likely to get cut off in search results.', icon: HiOutlineExclamationTriangle },
      { title: 'Open Graph and Twitter Card together', description: 'Generates both sets of tags in one pass, correctly cross-referencing shared fields.', icon: HiOutlineCodeBracket },
      { title: 'Properly escaped output', description: 'Special characters like quotes are correctly escaped, so the generated HTML is always valid.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Enter a title, description, and canonical URL.', 'Add a social share image and site name.', 'Copy the generated tags into your page\u2019s <head>.'],
    useCases: [
      'Setting up complete meta tags for a new page from scratch',
      'Making sure a link looks right when shared on social media',
      'Checking whether a title or description is too long before it goes live',
      'Adding Open Graph and Twitter Card tags to a page that only has a basic title so far',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'text-diff-checker': {
    about:
      'Paste two versions of something (a paragraph, a config file, a block of code) and this shows exactly which lines were added, removed, or left alone. Added lines are highlighted in green, removed lines in red, and everything unchanged stays plain.\n\nThe comparison uses the same underlying approach as the Unix diff command: it finds the longest sequence of lines the two texts have in common, then works out what was added or removed around that shared sequence. A changed line, not just added or deleted but edited, shows up as its old version being removed and its new version being added, right next to each other, rather than as some separate "modified" category.\n\nComparisons are capped at 2,000 lines per side. The underlying algorithm does more work as texts get longer, and beyond that size a browser tab can start to lag. For anything bigger, a dedicated diff tool built for large files will hold up better.',
    features: [
      { title: 'Line-by-line comparison', description: 'See precisely which lines changed, in the order they appear.', icon: HiOutlineDocumentText },
      { title: 'Color-coded results', description: 'Green for added, red for removed, no color for unchanged, scannable at a glance.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Change summary', description: 'A quick count of how many lines were added, removed, and left unchanged.', icon: HiOutlineCodeBracket },
      { title: 'Nothing uploaded', description: 'The comparison runs entirely in your browser.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste the original text on the left.', 'Paste the changed version on the right.', 'Click Compare to see the differences.'],
    useCases: [
      'Reviewing what changed between two drafts of a document',
      'Comparing two versions of a config file or a small code snippet',
      'Checking whether two blocks of text are actually identical',
      'Spotting an accidental change between two versions of something pasted from different places',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'audio-merger': {
    about:
      'Add two or more audio files, put them in the order you want, and this stitches them into one continuous file.\n\nMerging works at the sample level: each file is decoded, and the actual audio data is concatenated end to end, not just referenced or linked together. If the files use different channel setups, say one is mono and another is stereo, the mono file is automatically upmixed (duplicated into both channels) so everything lines up correctly rather than producing a mismatched or broken result.\n\nThe order the files are listed in is the order they play in the final result. Reordering them before merging changes nothing about the individual files themselves, just the sequence they\u2019re combined in.',
    features: [
      { title: 'Any order you choose', description: 'Reorder files with simple up/down controls before merging.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Handles mono and stereo together', description: 'Mixed channel counts are automatically upmixed so nothing breaks.', icon: HiOutlineShieldCheck },
      { title: 'Real sample-level merging', description: 'Files are decoded and their actual audio data is joined together.', icon: HiOutlineSparkles },
      { title: 'Add or remove files freely', description: 'Add more files or remove one before committing to the merge.', icon: HiOutlineArrowsRightLeft },
    ],
    howToUse: [
      'Upload two or more audio files.',
      'Reorder them using the up/down arrows if needed.',
      'Click Merge.',
      'Download the combined file.',
    ],
    useCases: [
      'Combining several voice memos into one continuous recording',
      'Joining separate music clips into a single track',
      'Merging an intro clip with a main recording',
      'Stitching together audio segments recorded at different times',
      'Assembling separate podcast segments recorded in different sessions into one episode',
    ],
    supportedFormats: { input: 'MP3, WAV, OGG, M4A, WebM, FLAC (whatever your browser supports)', output: 'WAV', maxSize: '50 MB per file' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'audio-volume-changer': {
    about:
      'Slide the volume up or down and get back an audio file with that change actually applied, not just previewed.\n\nThe adjustment works by multiplying every audio sample by a gain factor: 150% multiplies by 1.5, 50% multiplies by 0.5, and so on. Values are clamped to the valid audio range, so pushing the volume up on already-loud audio won\u2019t wrap around or produce garbled noise, it\u2019ll cap out cleanly instead.\n\nWorth knowing: this changes overall loudness uniformly across the whole file. It won\u2019t fix audio that\u2019s quiet in one section and loud in another, since it applies the same multiplier everywhere rather than analyzing and balancing different sections independently.\n\nA practical way to think about the range: 200% doubles the actual signal amplitude, which sounds noticeably louder, though not necessarily "twice as loud" to the ear, since human loudness perception isn\u2019t a straight linear scale. Small adjustments, in the 110-130% range, are often enough to fix a recording that\u2019s just slightly too quiet, without pushing toward the point where clipping becomes audible.',
    features: [
      { title: 'Simple percentage control', description: '100% is unchanged; go up to 300% or down to 10%.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Safe clamping', description: 'Values are capped at the valid range, avoiding distorted, wrapped-around audio.', icon: HiOutlineShieldCheck },
      { title: 'Instant results', description: 'Processing happens locally in your browser.', icon: HiOutlineSparkles },
    ],
    howToUse: ['Upload an audio file.', 'Adjust the volume slider.', 'Click Apply Volume Change, then download.'],
    useCases: [
      'Boosting a quiet voice recording so it\u2019s easier to hear',
      'Reducing the volume of a clip that\u2019s too loud relative to others',
      'Matching the loudness of two clips before combining them',
      'Turning down background music under a voiceover',
    ],
    supportedFormats: { input: 'MP3, WAV, OGG, M4A, WebM, FLAC (whatever your browser supports)', output: 'WAV', maxSize: '50 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'audio-reverser': {
    about:
      'Flips an audio file so it plays backwards, start to end.\n\nThis works by reversing the actual sample order of the decoded audio: the very last sample becomes the first, and vice versa, all the way through. It\u2019s a direct manipulation of the raw audio data, not a playback trick, so the reversed file plays backwards in any player, not just this one.\n\nA fun, common use is checking what a piece of speech or a phrase sounds like reversed, though it\u2019s equally useful for straightforward sound-design purposes, like a reversed cymbal swell or a backwards intro effect. Reversed audio has a long history in music production too, most famously in "backmasking," where a message or sound is recorded so it\u2019s only recognizable when the track is played in reverse, a technique used on and off since the 1960s.\n\nReversing is fully lossless: the same samples are simply reordered, nothing is discarded or re-encoded in the process, so a reversed file contains exactly as much information as the original, just running the opposite direction.',
    features: [
      { title: 'One-click reverse', description: 'No settings to configure, just upload and reverse.', icon: HiOutlineArrowsRightLeft },
      { title: 'True sample reversal', description: 'The actual audio data is reversed, not just played backwards in this tool alone.', icon: HiOutlineSparkles },
      { title: 'Instant results', description: 'Processing happens locally in your browser.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Upload an audio file.', 'Click Reverse Audio.', 'Download the result.'],
    useCases: [
      'Creating a reversed sound effect for a video or music project',
      'Checking how a phrase or word sounds played backwards',
      'Making a backwards intro or transition effect',
      'Experimenting with reversed audio for a creative project',
      'Recreating a classic backmasking effect for a music production',
    ],
    supportedFormats: { input: 'MP3, WAV, OGG, M4A, WebM, FLAC (whatever your browser supports)', output: 'WAV', maxSize: '50 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'audio-fade': {
    about:
      'Adds a smooth fade-in at the start and a fade-out at the end of an audio file, with independent control over how long each one lasts.\n\nThe fade is a linear ramp: volume rises steadily from silent to full over the fade-in duration, and falls steadily from full to silent over the fade-out duration, with the untouched middle of the file left exactly as it was. A hard cut at the start or end of a clip is often the difference between an amateur-sounding edit and a clean one, and a short fade is usually all it takes to fix it.\n\nFade durations can be set independently, and each is capped at half the file\u2019s total length, since a fade-in and fade-out that each tried to cover the entire file wouldn\u2019t leave anything at full volume.\n\nA short fade, often well under a second, is enough to smooth out a click or pop at the very start or end of a recording without anyone noticing the fade itself happened. Longer fades, several seconds or more, are more of a deliberate stylistic choice, commonly used to close out a song or transition a podcast segment.',
    features: [
      { title: 'Independent fade in/out', description: 'Set different durations for the start and end.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Smooth linear ramp', description: 'A genuine gradual volume change, not an abrupt cut.', icon: HiOutlineSparkles },
      { title: 'Middle stays untouched', description: 'Only the start and end are affected; everything else plays exactly as it was.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Upload an audio file.', 'Set the fade-in and fade-out durations.', 'Click Apply Fade, then download.'],
    useCases: [
      'Smoothing out an abrupt start or end on a recorded clip',
      'Adding a professional-sounding fade to a podcast intro or outro',
      'Softening the transition into and out of a music clip',
      'Fixing a hard cut where audio starts or stops too suddenly',
    ],
    supportedFormats: { input: 'MP3, WAV, OGG, M4A, WebM, FLAC (whatever your browser supports)', output: 'WAV', maxSize: '50 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'silence-trimmer': {
    about:
      'Finds where the real audio actually starts and ends, and trims away the silence before and after it, automatically.\n\nThe detection works by scanning the audio for the first and last point where the volume rises above an adjustable threshold. Everything before that first point and after that last point gets cut, leaving just the part that was actually audible. Raising the sensitivity treats quieter sounds as real audio (trimming less); lowering it requires a louder sound to count (trimming more aggressively).\n\nThis specifically handles silence at the start and end, not brief pauses in the middle of a recording. A long pause partway through a voice memo will be left exactly as it was; only the leading and trailing edges are affected.\n\nGetting the sensitivity right sometimes takes a little trial and error. A room with a faint background hum or hiss might need a slightly higher threshold so that constant low-level noise isn\u2019t mistaken for real audio content; a very quiet, clean recording usually works fine at a lower threshold, catching even soft speech near the true start and end.',
    features: [
      { title: 'Automatic detection', description: 'No need to manually find where the silence ends.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Adjustable sensitivity', description: 'Fine-tune the threshold if quiet background noise is being kept or real audio is getting cut.', icon: HiOutlineExclamationTriangle },
      { title: 'Start and end only', description: 'Trims leading and trailing silence without touching pauses in the middle.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Upload an audio file.', 'Adjust the sensitivity if needed.', 'Click Trim Silence, then download.'],
    useCases: [
      'Cleaning up dead air at the start of a voice memo or recording',
      'Removing silence before and after a music clip',
      'Tightening up a podcast segment before publishing',
      'Preparing a clip for a project where extra silence wastes space',
    ],
    supportedFormats: { input: 'MP3, WAV, OGG, M4A, WebM, FLAC (whatever your browser supports)', output: 'WAV', maxSize: '50 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'video-to-audio': {
    about:
      'Pulls the audio track out of a video file and hands it back as a standalone audio file, ready to use on its own.\n\nThis works the same way the Audio Converter does: your browser\u2019s own built-in media decoder reads the file and extracts whatever audio it contains. Since that decoder doesn\u2019t distinguish between "a video file" and "an audio file" internally, it works the same way whether the audio came packaged inside an MP4 or as a standalone MP3.\n\nLike the other audio tools here, the extracted output is a WAV file: a real, uncompressed format this tool can encode correctly, rather than something this tool would need a much heavier MP3 encoder library to produce reliably.\n\nThis is genuinely different from muting a video, which keeps the video but removes its sound. This tool does the opposite: it keeps only the sound and discards the video entirely, useful whenever the audio itself, not the visuals, is what\u2019s actually needed.\n\nUnlike most of the other video tools here, this one doesn\u2019t need to play through the video in real time. Decoding the audio track directly is a much faster operation than the play-and-record approach video trimming, resizing, or speed-changing rely on, so extraction typically finishes well before a video of the same length would take to simply watch.',
    features: [
      { title: 'Real audio extraction', description: 'Pulls the actual audio track, not a placeholder or silent file.', icon: HiOutlineArrowsRightLeft },
      { title: 'Works with common video formats', description: 'MP4, WebM, MOV and more, whatever your browser can already play.', icon: HiOutlineDocumentText },
      { title: 'Nothing uploaded', description: 'The video never leaves your device.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Upload a video file.', 'Click Extract Audio.', 'Download the resulting WAV file.'],
    useCases: [
      'Pulling music or a voiceover out of a video for reuse elsewhere',
      'Getting just the audio from a recorded lecture or meeting',
      'Saving a video\u2019s soundtrack as a standalone file',
      'Extracting spoken narration from a video for transcription',
      'Getting a podcast-ready audio file from a recorded video interview',
    ],
    supportedFormats: { input: 'MP4, WebM, MOV, OGV', output: 'WAV', maxSize: '200 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'video-muter': {
    about:
      'Removes the audio track from a video, leaving the visuals untouched and completely silent.\n\nLike Video Trimmer, this genuinely plays through the video and re-records it, this time explicitly excluding the audio track from the stream being captured. The video itself isn\u2019t edited or re-cut in any way, only the audio is dropped from the output.\n\nBecause this is a real-time capture rather than an instant file edit, muting takes about as long as the video itself. A 2-minute video takes roughly 2 minutes to process, not an instant operation.\n\nA muted video is a real, complete file with no audio track at all, not a video with its volume simply set to zero. That distinction matters for some platforms and editing tools, which treat "no audio track" and "silent audio track" differently.\n\nA video\u2019s own visual quality isn\u2019t the goal of this process, removing audio is, but because the video does get re-encoded during the real-time capture, it\u2019s worth expecting a result broadly similar in visual quality to the original rather than a byte-for-byte identical copy.',
    features: [
      { title: 'Complete audio removal', description: 'The output video has no audio track at all, not just silenced audio.', icon: HiOutlineShieldCheck },
      { title: 'Uses your browser\u2019s real encoder', description: 'The same engine your browser already uses for video playback handles the actual encoding.', icon: HiOutlineArrowsRightLeft },
      { title: 'Live progress', description: 'A progress bar tracks the process as it happens in real time.', icon: HiOutlineClock },
    ],
    howToUse: ['Upload a video file.', 'Click Remove Audio and wait \u2014 it takes about as long as the video itself.', 'Download the result.'],
    useCases: [
      'Removing a copyrighted soundtrack before reusing a video clip',
      'Preparing a silent video meant to have new audio added separately',
      'Creating a background video loop with no audio for a website',
      'Stripping unwanted narration or noise from a screen recording',
    ],
    supportedFormats: { input: 'MP4, WebM, MOV, OGV', output: 'WebM', maxSize: '200 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'video-speed-changer': {
    about:
      'Speeds up or slows down a video\u2019s playback, from half speed up to double speed.\n\nThis works by setting the video\u2019s own playback rate before recording it, then capturing that altered playback in real time. At 2x speed, a video plays through and gets captured in half its original duration; at 0.5x, it takes twice as long. The recorded result reflects whatever speed was actually played, since it\u2019s a genuine real-time capture rather than a post-processing time-stretch.\n\nAudio speeds up or slows down along with the video, which naturally raises or lowers its pitch too, the familiar chipmunk-voice effect at high speed or the deep, slowed-down effect at low speed. This tool doesn\u2019t correct pitch independently of speed, since that requires a much more complex audio-processing technique than a straightforward playback-rate change.\n\nThe available range, 0.5x to 2x, was chosen deliberately. More extreme speeds start to push audio pitch shifting into territory where speech becomes genuinely hard to understand, and very slow playback can run into diminishing returns for most practical purposes.',
    features: [
      { title: 'Five speed options', description: '0.5x, 0.75x, 1.25x, 1.5x, and 2x.', icon: HiOutlineBolt },
      { title: 'Audio and video stay in sync', description: 'Both are captured together at the new speed, so timing stays aligned.', icon: HiOutlineArrowsRightLeft },
      { title: 'Live progress', description: 'A progress bar tracks the process as it happens in real time.', icon: HiOutlineClock },
    ],
    howToUse: ['Upload a video file.', 'Choose a playback speed.', 'Click Change Speed and wait for it to process.', 'Download the result.'],
    useCases: [
      'Speeding up a long screen recording or tutorial for faster viewing',
      'Slowing down a clip to analyze motion or detail more closely',
      'Creating a sped-up timelapse-style effect from a normal recording',
      'Adjusting a video\u2019s pace to match music or a specific runtime',
      'Speeding through a long meeting recording to review it faster',
    ],
    supportedFormats: { input: 'MP4, WebM, MOV, OGV', output: 'WebM', maxSize: '200 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'video-resizer': {
    about:
      'Scales a video down to a smaller resolution, at 75%, 50%, or 25% of its original size.\n\nEach frame is redrawn onto a canvas at the new, smaller size as the video plays, and that canvas is what actually gets recorded, combined with the original audio track. This is a genuine resolution change, not a display-only resize; the output file itself has fewer pixels per frame.\n\nA smaller resolution also means a smaller file, since there\u2019s simply less pixel data to store per frame. Resizing to 50% of the original dimensions, for instance, reduces the total pixel count to roughly a quarter of the original, which typically translates to a meaningfully smaller file as well.\n\nThe target dimensions are always rounded to the nearest even number, since some video encoders specifically require even width and height values to work correctly.\n\nA smaller video also generally uploads and loads faster wherever it ends up, which matters beyond just the raw file size number: a lighter file means less waiting, whether that\u2019s for a page to load a video or for an upload to finish over a slower connection.',
    features: [
      { title: 'Three scale options', description: '75%, 50%, or 25% of the original resolution.', icon: HiOutlineArrowsPointingOut },
      { title: 'Real dimension change', description: 'The output file genuinely has fewer pixels per frame, not just a smaller display size.', icon: HiOutlineScale },
      { title: 'Audio preserved', description: 'The original audio track carries over unchanged.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Upload a video file.', 'Choose a size (75%, 50%, or 25%).', 'Click Resize Video and wait for it to process.', 'Download the result.'],
    useCases: [
      'Shrinking a video\u2019s dimensions to reduce its file size',
      'Preparing a smaller video for a platform with upload size limits',
      'Reducing resolution for faster uploading over a slow connection',
      'Creating a smaller preview version of a larger video file',
      'Matching a video\u2019s resolution to a specific display or embed size requirement',
    ],
    supportedFormats: { input: 'MP4, WebM, MOV, OGV', output: 'WebM', maxSize: '200 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'video-compressor': {
    about:
      'Reduces a video\u2019s file size, mainly by shrinking its resolution, with three compression levels to choose from.\n\nResolution reduction is the most reliable way to genuinely shrink a video\u2019s file size directly in a browser. Asking the recorder for a lower bitrate can help too, and this tool does request one alongside the resolution change, but that request isn\u2019t guaranteed to be honored the same way by every browser. A smaller resolution, on the other hand, always means less pixel data to store, so it\u2019s the dependable part of the compression here.\n\nThe three levels trade size against quality differently: Light keeps 75% of the original resolution for a modest reduction with minor visible change, Medium drops to 50% for a more noticeable but still reasonable balance, and Aggressive goes down to 35% for the smallest possible file, at the cost of visibly reduced detail.\n\nThere\u2019s a real, practical limit to how much a single pass can shrink a file, since resolution alone can only go so far before a video looks noticeably different from the original. For a video that\u2019s still too large even at the Aggressive setting, trimming its length first (with Video Trimmer) alongside compressing its resolution will generally get further than pushing resolution reduction alone.',
    features: [
      { title: 'Three compression levels', description: 'Light, Medium, and Aggressive, trading file size against visual quality.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Real, reliable size reduction', description: 'Resolution reduction genuinely shrinks the file, not just a bitrate request that may or may not be honored.', icon: HiOutlineScale },
      { title: 'Before/after size shown', description: 'See exactly how much smaller the result is.', icon: HiOutlineArrowDownTray },
    ],
    howToUse: ['Upload a video file.', 'Choose a compression level.', 'Click Compress Video and wait for it to process.', 'Download the result.'],
    useCases: [
      'Shrinking a large video file before uploading it somewhere with a size limit',
      'Reducing storage space used by a video library',
      'Making a video small enough to send as an email attachment',
      'Preparing a lighter video file for a slower internet connection',
      'Compressing a screen recording that came out larger than expected',
    ],
    supportedFormats: { input: 'MP4, WebM, MOV, OGV', output: 'WebM', maxSize: '200 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'background-remover': {
    about:
      'Removes the background from a photo, leaving the subject on a transparent PNG. Worth being upfront about how this actually works: it\u2019s a classical color-detection technique, not an AI model, so it works best on photos with a fairly plain, uniform backdrop, a product shot on a solid color, a portrait against a plain wall, that kind of thing.\n\nThe technique works by starting from the photo\u2019s outer edges and spreading inward through connected pixels that are similar in color to their neighbors, the same underlying idea as a "magic wand" selection tool in an image editor. Since the edges of most photos are the background, that gives a reasonable starting assumption for where the background actually is, without needing a trained model to guess at it.\n\nThat starting assumption is also the source of this tool\u2019s most important limitation, worth stating directly rather than glossing over: because it starts flood-filling from the literal edges of the image, any part of the subject that touches the photo\u2019s border gets treated as background too, regardless of its own color. A portrait where a shoulder or the top of someone\u2019s head runs right up to the frame edge will have that part removed along with the real background. Recompose or crop the photo so the subject has a little breathing room from the edges for a cleaner result.\n\nA sensitivity slider controls how aggressively colors are treated as background. Push it higher on a background with some texture or gradient; keep it lower if the background and subject are close in color, to avoid eating into the subject itself. The preview renders against a checkerboard pattern, the standard way to show transparency, so what needs adjusting is visible before downloading.',
    features: [
      { title: 'Real, working background removal', description: 'A genuine, tested computer-vision technique, not a placeholder.', icon: HiOutlineScissors },
      { title: 'Honestly labeled', description: 'This uses classical color detection, not an AI model, and says so directly.', icon: HiOutlineShieldCheck },
      { title: 'Adjustable sensitivity', description: 'Fine-tune how aggressively the background gets detected.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Live transparency preview', description: 'See the actual result on a checkerboard background before downloading.', icon: HiOutlineEyeDropper },
    ],
    howToUse: [
      'Upload a photo with a fairly plain or uniform background.',
      'Adjust the sensitivity slider if needed.',
      'Click Remove Background.',
      'Preview the result, adjust and retry if needed, then download the PNG.',
    ],
    useCases: [
      'Isolating a product photo shot against a solid-color background',
      'Removing a plain wall or backdrop from a portrait',
      'Preparing a subject to place onto a different background',
      'Cutting out a logo or graphic shot against a flat color',
    ],
    supportedFormats: { input: 'JPG / PNG / WEBP', output: 'PNG (with transparency)', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'hash-generator': {
    about:
      'Produces MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes from text. SHA hashes use your browser\u2019s native Web Crypto API, and MD5 (not included in Web Crypto since it\u2019s cryptographically broken for security purposes) uses a standard, verified implementation for file-checksum and compatibility use cases.\n\nA hash function takes input of any length and produces a fixed-length output, called a hash or digest. The same input always produces the same hash, and even a tiny, single-character change in the input produces a completely different result. That property makes hashes useful for verifying that a piece of text or a file hasn\u2019t been altered, without needing to compare the full content directly.\n\nMD5 and SHA-1 are both considered cryptographically broken: collisions (two different inputs producing the same hash) can be computed quickly with modern hardware, which makes them unsuitable for anything security-sensitive. They\u2019re still commonly used for non-security purposes like file checksums, cache keys, and deduplication, where the risk of a deliberate, malicious collision doesn\u2019t apply. SHA-256 is the current practical standard for real security-relevant work. It\u2019s what software projects typically publish alongside a download so users can verify the file wasn\u2019t corrupted or tampered with, and it\u2019s a building block in TLS, Git\u2019s newer object format, and Bitcoin\u2019s proof-of-work.\n\nOne important distinction worth being explicit about: none of these algorithms should be used to store passwords, even SHA-512. They\u2019re deliberately fast to compute, which is exactly what makes them weak for password storage. An attacker with a list of leaked hashes can try billions of guesses per second against a fast hash. Password storage needs a deliberately slow algorithm designed for that purpose, like bcrypt, scrypt, or Argon2, not a general-purpose hash function.',
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
      'Verifying a downloaded file\u2019s checksum matches what the publisher posted',
      'Generating a hash for a cache key or content-addressed identifier during development',
      'Comparing two pieces of text for exact equality without displaying either in full',
      'Checking that a piece of text or data hasn\u2019t been altered since a hash was first recorded',
    ],
    supportedFormats: { notes: 'SHA-256 or higher is recommended for anything security-relevant; MD5 and SHA-1 are best treated as checksums only, not for security purposes. None of these algorithms are appropriate for storing passwords, use bcrypt, scrypt, or Argon2 for that instead.' },
    privacy: NO_FILE_PRIVACY,
  },

  'timestamp-converter': {
    about:
      'Converts between Unix timestamps and human-readable dates in both directions, showing the result in local time, UTC, ISO 8601, and relative form.\n\nA Unix timestamp (also called epoch time or POSIX time) is the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC, a fixed reference point known as the Unix epoch. It represents an absolute point in time as a single number, independent of timezone: the timestamp 1700000000 refers to the exact same instant whether checked from Karachi, New York, or Tokyo, even though the human-readable date and time shown for it will differ by timezone. That single-number simplicity is why timestamps are used everywhere in software. Databases store them, APIs return them, and server logs are full of them, because comparing two integers or subtracting one from another is far simpler than comparing calendar dates across timezones.\n\nThis tool works with timestamps in seconds, which is the standard Unix format. Some systems and APIs (including JavaScript\u2019s own Date.now()) use milliseconds instead, a 13-digit number rather than 10 digits. A millisecond value should be divided by 1000 before pasting it in here to get the equivalent seconds-based timestamp.\n\nWorth knowing for anyone who works with timestamps regularly: many older systems store Unix time as a signed 32-bit integer, which can only count up to a certain point before it overflows, known as the Year 2038 problem, since that\u2019s when 32-bit timestamps run out of room. It doesn\u2019t affect this converter, but it\u2019s a real, still-relevant limitation in some legacy systems and embedded devices.',
    features: [
      { title: 'Bidirectional conversion', description: 'Convert a timestamp to a date, or a date to a timestamp.', icon: HiOutlineArrowsRightLeft },
      { title: 'Multiple date formats', description: 'See local time, UTC, ISO 8601, and a human-friendly relative time all at once.', icon: HiOutlineCalendarDays },
      { title: 'Current time shortcut', description: 'Fill in the current Unix timestamp with one click.', icon: HiOutlineClock },
    ],
    howToUse: [
      'Enter a Unix timestamp (in seconds) to see its date, or pick a date to get its timestamp.',
      'View the result in local time, UTC, ISO 8601, and relative form.',
      'Copy whichever format you need.',
    ],
    useCases: [
      'Debugging a Unix timestamp found in server logs or a database',
      'Converting a date into a timestamp for an API request',
      'Checking what time a timestamp actually represents in your own timezone',
      'Comparing two events stored as timestamps to see which happened first',
      'Understanding a raw timestamp value returned by a third-party API',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'regex-tester': {
    about:
      'Build and debug regular expressions against real text, with matches highlighted live as you type. No more guessing whether a pattern actually works.\n\nA regular expression (regex) is a pattern that describes a set of strings, used for validating input (checking whether something looks like an email address), extracting data (pulling all phone numbers out of a block of text), or find-and-replace operations far more powerful than a literal text search. Regex syntax is notoriously easy to get subtly wrong, since small changes in a pattern can change what it matches in ways that aren\u2019t obvious just by reading it. Testing against real, representative text before using a pattern in actual code is the reliable way to know it behaves as intended.\n\nThe four flags supported here each change matching behavior in a specific way. Global (g) finds every match in the text instead of stopping at the first one. Case-insensitive (i) makes the pattern match regardless of letter case. Multiline (m) changes how ^ and $ behave, making them match the start and end of each individual line rather than only the very start and end of the whole string. Dot-matches-newline (s) makes the . character also match newline characters, which it doesn\u2019t by default, useful when a pattern needs to match across multiple lines.',
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
      'Checking a pattern correctly rejects invalid input, not just accepts valid input',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'word-counter': {
    about:
      'Gives live word, character, sentence and paragraph counts as text is typed or pasted, plus an estimated reading time.\n\nThe reading time estimate is based on 200 words per minute, a commonly-cited average adult silent-reading speed, useful as an estimate, though actual reading speed varies a fair amount by person and by how dense or technical the text is. Treat it as a reasonable ballpark for planning purposes, like how long a blog post or speech will take to read, not an exact prediction for any specific reader.\n\nThe character counts, shown both with and without spaces, matter because different platforms and forms count differently. Some character limits count every character including spaces, others exclude them, and the difference can matter for text close to a hard limit. Having both numbers visible at once removes the guesswork about which one a specific platform is actually enforcing.',
    features: [
      { title: 'Live counting', description: 'Every stat updates instantly as you type or paste.', icon: HiOutlineBolt },
      { title: 'Five real metrics', description: 'Words, characters (with and without spaces), sentences and paragraphs.', icon: HiOutlineSquares2X2 },
      { title: 'Reading time estimate', description: 'Based on an average adult reading speed of 200 words per minute.', icon: HiOutlineClock },
    ],
    howToUse: ['Paste or type your text into the box.', 'Watch the stats update live below it.'],
    useCases: [
      'Checking an essay or article meets a word count requirement',
      'Estimating how long a piece of writing will take to read aloud or silently',
      'Getting a quick character count for a form field or social post with a strict limit',
      'Checking a document\u2019s paragraph count for a formatting requirement',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'case-converter': {
    about:
      'Transforms text into seven different case styles at once, covering everyday writing conventions and the naming styles used in code.\n\nThe programming-focused styles each have a real, specific home: camelCase (like myVariableName) is the standard convention for variable and function names in JavaScript, Java, and several other languages. snake_case (like my_variable_name) is the idiomatic convention in Python and Ruby. kebab-case (like my-variable-name) is the standard for URL slugs and CSS class names, since underscores and camelCase aren\u2019t valid in a URL and CSS class names are conventionally hyphenated. Using the wrong convention in the wrong context won\u2019t break anything technically in most cases, but it does stand out as inconsistent with a codebase or platform\u2019s established style.\n\nThe everyday styles, UPPERCASE, lowercase, Title Case, and Sentence case, cover the more familiar writing conventions: Title Case for headings, Sentence case for normal prose, and the other two for emphasis or specific formatting needs.',
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
      'Matching a codebase\u2019s existing naming convention when adding new code',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'lorem-ipsum-generator': {
    about:
      'Produces classic placeholder text, by words, sentences, or paragraphs, for filling mockups and designs before real content is ready.\n\nThe text itself has a traceable origin: it\u2019s derived from a scrambled, altered passage of Cicero\u2019s "de Finibus Bonorum et Malorum," a real Latin philosophical text written in 45 BC. The words are garbled and rearranged enough that the result isn\u2019t meaningful Latin, which is actually the point. Placeholder text needs to look like real, natural language at a glance without being readable, so a viewer\u2019s attention stays on the layout and typography rather than getting pulled into reading the actual words.\n\nThat\u2019s the real reason lorem ipsum remains the standard choice over just using repeated "text text text" or random keyboard mashing: real language has natural variation in word length and letter frequency that placeholder gibberish doesn\u2019t, giving a more realistic preview of how actual content will look in a layout.',
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
      'Demonstrating a typography or font choice without distracting real content',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'code-minifier': {
    about:
      'Strips comments and unnecessary whitespace from JavaScript, CSS, and HTML to reduce file size. Built to never break your code, even at the cost of a slightly smaller size reduction than a more aggressive minifier would achieve.\n\nMost minifiers built with simple text-replacement rules run into a well-known problem: a naive search for "//" to strip a JavaScript comment will also match "//" inside a URL string like "https://example.com", or inside a regex literal, silently corrupting working code. This tool is built as a proper character-by-character scanner that tracks whether it\u2019s currently inside a string, a template literal, or a regex literal before touching anything, so a URL or regex containing // is correctly left alone, while a real comment is correctly removed.\n\nThis tool deliberately does not rename variables or remove unused code. Those transformations can meaningfully shrink a file further, but doing them safely requires a full parser that understands the code\u2019s structure. Getting it wrong risks silently breaking working code, which is a worse outcome than a more modest size reduction. For CSS specifically, the same care applies to content strings (like a CSS content: "/* not a comment */" property) and url() values, which are preserved exactly rather than having their contents mistaken for syntax to strip.',
    features: [
      { title: 'Three languages', description: 'Minify JavaScript, CSS, or HTML from the same tool.', icon: HiOutlineCodeBracket },
      { title: 'Safety-first design', description: 'Correctly distinguishes real comments from comment-like text inside strings, regex, and URLs.', icon: HiOutlineShieldCheck },
      { title: 'Live size comparison', description: 'See the exact before/after size and percentage saved.', icon: HiOutlineScale },
    ],
    howToUse: [
      'Choose JavaScript, CSS, or HTML.',
      'Paste your code.',
      'View the minified result and the size reduction.',
      'Copy or download the minified output.',
    ],
    useCases: [
      'Reducing a JavaScript or CSS file\u2019s size before deploying to production',
      'Cleaning up code copied from a formatted source before pasting elsewhere',
      'Understanding the real size savings minification offers for a specific file',
      'Preparing a smaller HTML snippet for embedding somewhere with limited space',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'password-generator': {
    about:
      'Creates strong, random passwords using your browser\u2019s cryptographically secure random number generator, with adjustable length and character types, plus a real entropy-based strength indicator, not a cosmetic strength bar.\n\nModern security guidance generally recommends at least 14\u201316 characters for a standard account password, and 20 or more characters for anything critical, like an email account, banking, or a password manager\u2019s own master password. Length matters more than clever substitutions. A longer random password is harder to crack than a shorter one with symbols swapped in for letters, since attackers already check common substitution patterns like replacing "a" with "@" or "e" with "3" as a standard part of password-cracking tools.\n\nThe strength indicator here is based on entropy, measured in bits: a real, calculable measure of how unpredictable a password actually is, based on its length and the size of the character set it draws from. This is a meaningfully different, and more honest, approach than the cosmetic red/yellow/green bars many sites show, which often reward things like mixed case or a single symbol without actually reflecting how hard the password would be to guess or brute-force.\n\nA password generated this way is different from a passphrase (a string of random, unrelated words, like the well-known "correct horse battery staple" example). Both are legitimate approaches to a strong credential, but a passphrase trades some randomness for being easier to type and remember, while a fully random character-based password maximizes entropy for a given length. This tool generates the traditional character-based kind.\n\nThe most common password mistakes are worth knowing even with a generator in hand: reusing the same password across multiple accounts, so a single breach exposes everything, using dictionary words or common keyboard patterns like "qwerty", and relying on security questions with real, guessable answers. A generated, unique password for every account avoids the first and second of these directly.',
    features: [
      { title: 'Cryptographically secure', description: 'Uses the browser\u2019s native secure random generator (crypto.getRandomValues), never Math.random() or another weak pseudo-random function.', icon: HiOutlineKey },
      { title: 'Adjustable length & charset', description: 'Choose length from 6\u201364 characters and which character types to include: uppercase, lowercase, numbers, and symbols.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Real entropy calculation', description: 'A bits-of-entropy strength calculation based on length and character set size, not a cosmetic bar.', icon: HiOutlineShieldCheck },
    ],
    howToUse: [
      'Set your desired length and character types (uppercase, lowercase, numbers, symbols).',
      'Click Generate Password.',
      'Check the entropy-based strength indicator.',
      'Copy your password and store it in a password manager.',
    ],
    useCases: [
      'Creating a strong, unique password for a new account',
      'Generating a secure password to store in a password manager',
      'Replacing a weak or reused password on an existing account',
      'Getting a random string for an API key, token, or temporary credential',
      'Setting a strong Wi-Fi network password',
    ],
    privacy:
      'Passwords are generated entirely on your device using your browser\u2019s cryptographically secure random number generator. Nothing about the password generated is ever sent to ToolHub\u2019s servers, and nothing is stored. Closing the tab without copying it means it\u2019s gone.',
  },

  'password-strength-checker': {
    about:
      'Type in a password you already have, and this tells you how it would actually hold up. Entirely on your device, with the password itself never sent anywhere, not even briefly.\n\nThis is a different job from the Password Generator: that tool creates a new random password, while this one evaluates a password already in use and explains specifically what\u2019s wrong with it, if anything. Raw entropy math alone is well known to be misleading here. A password like "Password123!" has decent character variety and would score reasonably well on character-count math alone, but it\u2019s also a notoriously common real-world pattern that automated cracking tools check for immediately. This tool combines entropy calculation with a real check against commonly used passwords and well-known weak patterns (sequential runs like "123" or "abc", repeated characters, keyboard patterns like "qwerty"), so the rating reflects how a password would actually perform against real cracking attempts, not just an abstract character-count formula.\n\nA useful way to think about why length and unpredictability matter so much: password cracking happens at two very different speeds depending on the attack. An online attack, someone trying to log into an actual account, is generally rate-limited to a small number of attempts, since the target service can block repeated failures. An offline attack, where someone has obtained a stolen password database and is cracking the hashes on their own hardware, can attempt billions of guesses per second with no rate limit at all. That\u2019s exactly why relying on a password being merely "not obvious to a human" isn\u2019t enough; it needs to hold up against automated, high-speed guessing too.\n\nOne legitimate technique worth knowing about, even though this tool doesn\u2019t implement it: some password checkers verify whether a password has appeared in a known data breach using a privacy-preserving method called k-anonymity, where only the first few characters of the password\u2019s hash are ever sent to a breach-checking service, never the password or the full hash itself. It\u2019s a well-designed approach, just outside the scope of what this specific tool checks.',
    features: [
      { title: 'Real pattern detection', description: 'Catches common passwords, sequential runs, repeated characters and keyboard patterns, not just raw character count.', icon: HiOutlineExclamationTriangle },
      { title: 'Entirely on your device', description: 'The password you type is never transmitted anywhere, ever.', icon: HiOutlineShieldCheck },
      { title: 'Specific, actionable feedback', description: 'See exactly why a password is weak, not just a vague color bar.', icon: HiOutlineDocumentText },
      { title: 'Instant results', description: 'Updates live as you type, no button to click.', icon: HiOutlineBolt },
    ],
    howToUse: [
      'Type or paste a password into the field.',
      'Use the eye icon to reveal it if you want to double-check what you typed.',
      'Review the strength rating and any specific warnings.',
    ],
    useCases: [
      'Checking whether a password you\u2019re about to use is actually strong before committing to it',
      'Understanding specifically why a password is considered weak, not just that it is',
      'Auditing an old password you\u2019ve reused for a while',
      'Learning what patterns make a password easy to crack, to build better habits going forward',
    ],
    privacy:
      'Everything happens locally in your browser using JavaScript. The password you type is never transmitted to ToolHub\u2019s servers or anywhere else, not even briefly, and nothing about it is stored.',
  },

  'instagram-post-resizer': {
    about:
      'Fits an image to Instagram\u2019s exact post, story and profile picture dimensions. Choose to crop-to-fill with no empty space, or fit-with-padding so nothing gets cropped.\n\nEach preset targets Instagram\u2019s real, specific dimensions: Square Post at 1080\u00d71080, Portrait Post at 1080\u00d71350, Landscape Post at 1080\u00d7566, Story/Reel at 1080\u00d71920, and Profile Picture at 320\u00d7320. Instagram itself will resize or crop an image that doesn\u2019t already match these dimensions on upload, using its own logic, which doesn\u2019t always frame the subject the way intended. Resizing to the exact target dimensions beforehand keeps the framing under direct control instead of the platform\u2019s.\n\nThe choice between Fill and Fit matters for how the image actually ends up looking. Fill crops the image to completely cover the target frame with no empty space, which can cut off parts of the image near the edges if the aspect ratio doesn\u2019t already match. Fit instead scales the image down to fit entirely within the frame, adding padding around it rather than cropping anything, the right choice when nothing in the image can be cropped without losing something important.',
    features: [
      { title: 'Five real presets', description: 'Square, Portrait, Landscape, Story/Reel and Profile Picture: Instagram\u2019s actual dimensions.', icon: HiOutlineSquares2X2 },
      { title: 'Fill or fit', description: 'Crop to completely fill the frame, or fit within it with padding, whichever suits the image.', icon: HiOutlineArrowsPointingOut },
      { title: 'Instant results', description: 'Resizing happens locally in your browser, no wait, no upload.', icon: HiOutlineBolt },
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
      'Controlling exactly how a photo gets cropped instead of leaving it to Instagram\u2019s own auto-crop',
    ],
    supportedFormats: { input: 'JPG / PNG / WEBP', output: 'JPG or PNG', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'youtube-thumbnail-downloader': {
    about:
      'View and download the thumbnail images YouTube generates for any public video, at every resolution that video actually has available.\n\nYouTube automatically generates a video\u2019s thumbnail at several fixed resolutions: Max Resolution (1280\u00d7720), Standard Definition (640\u00d7480), High Quality (480\u00d7360), Medium Quality (320\u00d7180), and Default (120\u00d790). Not every video actually has all of these available. Max Resolution specifically depends on the video\u2019s own upload resolution and isn\u2019t generated for lower-resolution or very old uploads, so this tool checks which resolutions genuinely exist for the specific video entered rather than showing options that would just fail to load.\n\nThese thumbnail images are already publicly accessible directly from YouTube\u2019s own image servers for any public video. That\u2019s how thumbnails display correctly when a video is embedded or linked anywhere across the web. This tool simply makes them easy to browse and download in one place, rather than requiring anyone to know YouTube\u2019s specific image URL pattern themselves.',
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
      'Getting the highest available resolution of a thumbnail for a specific use',
    ],
    supportedFormats: {
      output: 'JPG (thumbnail image)',
      notes: 'Works only with thumbnails YouTube already makes publicly available for a video, not the video itself.',
    },
    privacy:
      'This tool fetches thumbnail images directly from YouTube\u2019s own public image servers (img.youtube.com), the same publicly accessible thumbnails YouTube serves for embedding anywhere. No video content, account data, or anything beyond the video ID provided is involved.',
  },
}
