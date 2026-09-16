import {
  HiOutlineBolt,
  HiOutlineAcademicCap,
  HiOutlineFire,
  HiOutlineMoon,
  HiOutlineMapPin,
  HiOutlineTruck,
  HiOutlineFunnel,
  HiOutlineHandRaised,
  HiOutlineMusicalNote,
  HiOutlineSpeakerWave,
  HiOutlineMicrophone,
  HiOutlineDevicePhoneMobile,
  HiOutlineFaceSmile,
  HiOutlineCamera,
  HiOutlineBarsArrowDown,
  HiOutlineQrCode,
  HiOutlineServerStack,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiOutlineLanguage,
  HiOutlinePencil,
  HiOutlineCube,
  HiOutlineCodeBracketSquare,
  HiOutlineArchiveBox,
  HiOutlineSwatch,
  HiOutlineEye,
  HiOutlineCalculator,
  HiOutlineChartBar,
  HiOutlineCurrencyDollar,
  HiOutlineHome,
  HiOutlineArrowPath,
  HiOutlineForward,
  HiOutlineCheckCircle,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCursorArrowRays,
  HiOutlineClipboard,
  HiOutlineListBullet,
  HiOutlineQueueList,
  HiOutlineArrowsUpDown,
  HiOutlineArrowsPointingIn,
  HiOutlineMagnifyingGlassPlus,
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

  'powerpoint-to-pdf': {
    about:
      'Reads the real text and images directly out of a PowerPoint file\u2019s internal structure and lays them out clearly on their own PDF page per slide. Worth being upfront about what this is not: a visual copy of your actual slide design.\n\nHere is the honest reason why. A .pptx file is a zip archive containing an XML description of each slide\u2019s content, not a picture of what that slide looks like. Reliably turning a PDF page into an image is possible because PDF.js, a mature, complete PDF-rendering engine, already exists and runs in the browser. There is no equivalent engine available for rendering an arbitrary PowerPoint slide\u2019s exact visual layout the way it actually appears in PowerPoint, colors, fonts, and shape positions included. Building one from scratch, well enough to match real-world presentations reliably, is a different scale of problem than reading text and images out of the file directly.\n\nWhat this tool does instead is extract what can genuinely be extracted accurately: the real words on each slide, in the order they actually appear, correctly joined even when part of a sentence has different formatting applied to it (PowerPoint stores that as separate text runs internally), plus any images that were actually placed on that slide. Slide order is resolved through the presentation\u2019s own internal relationships rather than assumed from file naming, since slides can be reordered in PowerPoint without the underlying files being renamed to match.\n\nEach slide becomes its own PDF page, sized to match the presentation\u2019s actual slide dimensions rather than a fixed page size, so the proportions stay consistent with the original.',
    features: [
      { title: 'Real slide text extracted', description: 'Every word from every slide, in the correct reading order.', icon: HiOutlineDocumentText },
      { title: 'Embedded images included', description: 'Pictures actually placed on a slide come through onto its PDF page.', icon: HiOutlinePhoto },
      { title: 'Correct slide order', description: 'Resolved through the file\u2019s own internal structure, not file naming.', icon: HiOutlineSquares2X2 },
      { title: 'Honest about its limits', description: 'Extracts content accurately; doesn\u2019t claim to visually recreate your slide design.', icon: HiOutlineShieldCheck },
    ],
    howToUse: [
      'Upload a .pptx file.',
      'Click Convert to PDF.',
      'Download the resulting PDF, one page per slide.',
    ],
    useCases: [
      'Getting the text content of a presentation into a format that\u2019s easy to share or print',
      'Archiving what a presentation actually said, without needing PowerPoint installed to read it',
      'Pulling slide content into a document for reference, without the original visual design',
      'Sharing a presentation\u2019s content with someone who only has a PDF reader available',
    ],
    supportedFormats: {
      input: 'PPTX',
      output: 'PDF',
      notes: 'Extracts real text and images; does not visually reproduce the original slide design',
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
    guideTitle: 'The Complete Guide to CSS Gradients',
    guide: [
      {
        heading: 'What Is a CSS Gradient Generator, and Why Use One Instead of an Image?',
        body:
          'A CSS gradient generator lets you build a smooth color transition visually and get the exact linear-gradient() or radial-gradient() CSS code to use in your project, without hand-writing the syntax or guessing at color-stop percentages. The output is pure CSS, not an image file, which matters more than it might seem: a gradient rendered as CSS adds zero extra HTTP requests to a page, scales perfectly at any resolution, and stays crisp on high-density retina displays where an exported PNG or JPG background would need multiple sizes to avoid looking blurry or pixelated.\n\nThis is exactly why gradients defined in CSS have largely replaced gradient background images in modern web design. A single line of CSS can do what once required exporting, optimizing, and hosting an image file, with the added benefit that the color and angle stay easy to tweak later without re-exporting anything.',
      },
      {
        heading: 'Linear vs. Radial Gradients: Which One Should You Use?',
        body:
          'The two gradient types solve different visual problems, and picking the right one is usually obvious once the difference is clear. A linear gradient transitions in a straight line across a chosen direction or exact angle, useful for backgrounds, buttons, and hero sections where the color should shift consistently across the whole element. A radial gradient instead radiates outward from a center point in a circle or ellipse, which works well specifically for spotlight effects, soft glows behind an icon or heading, and vignettes that darken toward the edges of an image.\n\nA practical way to decide: if the effect should look the same no matter where on the element you\u2019re looking (just shifting color left-to-right or top-to-bottom), use linear. If the effect should radiate from a specific point, like light appearing to shine from behind an object, use radial.',
      },
      {
        heading: 'How to Create a CSS Gradient Background Without Writing Code by Hand',
        body:
          'Hand-writing gradient CSS means remembering the exact function syntax, calculating color-stop percentages, and converting a visual idea in your head into precise degree values, all before you can actually see whether it looks right. A visual gradient generator flips that order: you build the gradient by eye first, watching it update in real time, and only copy the finished CSS code once it actually looks correct.\n\nThis matters most for angle values specifically, since CSS gradient angles don\u2019t follow the same convention most people expect from a compass or protractor (0deg points bottom-to-top, not left-to-right, and 90deg points left-to-right rather than straight up). Building the gradient visually sidesteps needing to remember this convention at all, since the tool translates your chosen direction into the correct degree value automatically.',
      },
      {
        heading: 'Multi-Color Gradients and Color Stop Positioning Explained',
        body:
          'A gradient with just two colors is a simple blend from one to the other, but CSS gradients support any number of color stops, each placed at a specific position from 0% to 100% along the gradient. Adding a third, fourth, or fifth stop lets you build a genuinely multi-color transition, or even control exactly how much of the gradient each color occupies by spacing the stops unevenly rather than at even intervals.\n\nA particularly useful trick: placing two color stops at the exact same position creates a hard, sharp split between two solid colors rather than a smooth blend, useful for a two-tone background or a striped design effect, all still using a single gradient declaration rather than multiple layered elements.\n\nIt\u2019s worth knowing that more color stops mean more rendering work for the browser. Two or three stops render with genuinely negligible cost on any device. Ten or more can introduce a small amount of visible lag specifically on lower-end mobile devices, so it\u2019s worth using only as many stops as the design actually calls for rather than adding extras without a clear visual reason.',
      },
      {
        heading: 'Common Use Cases for Developers and Designers',
        body:
          'Gradients show up constantly in real interface work, well beyond decorative backgrounds. A subtle two-color gradient on a button gives it visual depth without needing a separate hover-state image. A radial gradient behind a hero section heading can draw the eye toward the text without a distracting photograph competing for attention. A gradient overlay on top of a background photo (layering a semi-transparent gradient using rgba() color stops) is a common technique for keeping text readable over a busy image, darkening just enough of the photo behind the text without editing the image file itself.\n\nFor data visualization and dashboards, gradients are often used as a fill for charts or progress indicators, giving a single data series visual distinction without needing multiple flat colors. And for quick prototyping, generating a gradient visually and copying the CSS is meaningfully faster than iterating in browser dev tools, since the color-stop sliders here make it possible to try several combinations in the time it would take to hand-edit one.',
      },
      {
        heading: 'Browser Support and Performance Notes',
        body:
          'Both linear-gradient() and radial-gradient() have been supported in every major browser without a vendor prefix for many years now, so there\u2019s no compatibility concern for a modern website; a gradient generated here will render identically across Chrome, Firefox, Safari, and Edge. Because the gradient is calculated by the browser\u2019s own rendering engine rather than decoded from an image file, it also tends to be genuinely fast even on modest hardware, provided the color-stop count stays reasonable as mentioned above.',
      },
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

  'image-upscaler': {
    about:
      'Enlarges an image 2x to 4x while keeping it as sharp as reasonably possible at the new size. Worth being upfront about the technique: this uses high-quality interpolation combined with sharpening, both real, classical image-processing methods, not an AI model.\n\nEnlarging an image is fundamentally different from shrinking one. When an image gets smaller, existing pixels are simply combined, no guessing required. When an image gets bigger, new pixels have to be created that were never actually captured, so the tool has to estimate what they probably look like based on their neighbors. That estimation is why a plain, naive upscale tends to look soft, the interpolation is doing its best, but it\u2019s working with less information than the final image actually contains.\n\nThis tool addresses that softness directly with a second step: after the high-quality interpolation, unsharp-mask sharpening is applied specifically to counteract the blur that comes from enlarging. Unsharp masking works by isolating the fine detail in an image (the difference between the image and a blurred version of itself) and adding a boosted amount of that detail back in, which is a real, well-established sharpening technique, not a cosmetic filter.\n\nNo upscaling method, including genuine AI-based approaches, can perfectly reconstruct detail that was never captured in the original photo. What this tool does is make a larger version look as clean and sharp as the original information reasonably allows, at a scale reasonable for browser-based processing (2x to 4x), rather than promising something no technique can actually deliver.',
    features: [
      { title: 'Real, working upscaling', description: 'High-quality interpolation plus sharpening, not a fabricated AI claim.', icon: HiOutlineArrowsPointingOut },
      { title: 'Honestly labeled', description: 'A classical technique, clearly described as such, not disguised as AI.', icon: HiOutlineShieldCheck },
      { title: 'Sharpening built in', description: 'Automatically counteracts the softness that comes from enlarging an image.', icon: HiOutlineSparkles },
      { title: '2x to 4x scaling', description: 'Choose how much to enlarge, with results shown before downloading.', icon: HiOutlineAdjustmentsHorizontal },
    ],
    howToUse: [
      'Upload an image.',
      'Choose a scale factor (2x, 3x, or 4x).',
      'Click Upscale Image.',
      'Preview the result and download the PNG.',
    ],
    useCases: [
      'Enlarging a small product photo for a listing that requires a minimum resolution',
      'Making a low-resolution image usable for a larger print or display',
      'Scaling up a graphic or icon while keeping edges reasonably clean',
      'Preparing an old, smaller photo for a modern high-resolution screen',
    ],
    supportedFormats: { input: 'JPG / PNG / WEBP', output: 'PNG', maxSize: '15 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'image-enhancer': {
    about:
      'Sharpens detail and reduces noise in a photo with two independent, adjustable controls. This uses real, classical image-processing techniques, not an AI model, and is labeled that way deliberately.\n\nSharpening here uses unsharp masking: the image is blurred, that blur is subtracted from the original to isolate its fine detail, and a boosted amount of that detail is added back in. It\u2019s a well-established, real sharpening technique used in photo editing software for decades, not a placebo filter. Pushed too far, it produces a visible "halo" effect around hard edges, a real, expected characteristic of the technique itself, not a bug, which is why the sharpen control is adjustable rather than fixed at one aggressive setting.\n\nNoise reduction uses a Gaussian blur, smoothing out the small random variations that show up as visual noise, particularly in photos taken in low light. The honest tradeoff here is real: noise and genuine fine detail look similar to a blur-based filter, so reducing one always costs a little of the other. There\u2019s no way around that tradeoff with this technique, which is exactly why the control starts at zero and is meant to be raised only as much as a specific photo actually needs, rather than applied at a fixed high value by default.\n\nWhen both are used together, denoising is applied first and sharpening second, deliberately in that order. Sharpening a noisy image first would amplify the noise right along with the real detail, so cleaning up the noise before sharpening gives the sharpening step cleaner information to actually work with.',
    features: [
      { title: 'Independent sharpen and denoise', description: 'Two separate sliders, since these two adjustments trade off differently depending on the photo.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Real classical techniques', description: 'Unsharp masking and Gaussian blur, honestly labeled, not an AI model.', icon: HiOutlineShieldCheck },
      { title: 'Correct processing order', description: 'Denoises first, then sharpens, so sharpening doesn\u2019t amplify leftover noise.', icon: HiOutlineSparkles },
      { title: 'Preview before downloading', description: 'See the actual result before committing to a download.', icon: HiOutlineExclamationTriangle },
    ],
    howToUse: [
      'Upload an image.',
      'Adjust the Sharpen and Reduce Noise sliders.',
      'Click Enhance Image.',
      'Preview the result and download the PNG.',
    ],
    useCases: [
      'Sharpening a slightly soft or out-of-focus photo',
      'Reducing visible grain in a photo taken in low light',
      'Cleaning up a scanned photo before sharing or printing it',
      'Giving a photo a bit more visual punch before posting it online',
    ],
    supportedFormats: { input: 'JPG / PNG / WEBP', output: 'PNG', maxSize: '15 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'length-converter': {
    about:
      'Converts between eight common length units: millimeters, centimeters, meters, kilometers, inches, feet, yards and miles, using the exact, internationally-defined conversion factors, not rounded approximations.\n\nThe metric units here (millimeters through kilometers) are all simple powers of ten apart, which is the whole point of the metric system: no memorizing odd ratios, just moving a decimal point. The imperial units (inches, feet, yards, miles) don\u2019t share that clean relationship with each other, let alone with the metric side, which is exactly why a dedicated converter is more reliable than trying to do the math by hand. An inch is defined as exactly 0.0254 meters, and every other imperial-to-metric figure here is derived from that single, official definition.\n\nThis is the same conversion logic used in ToolHub\u2019s combined Unit Converter, on its own dedicated page for length specifically, so a bookmark or shared link always lands directly on length, without needing to select a category first.',
    features: [
      { title: 'Eight common units', description: 'Millimeters, centimeters, meters, kilometers, inches, feet, yards and miles.', icon: HiOutlineScale },
      { title: 'Exact conversion factors', description: 'Every value uses the real, internationally-defined standard, not a rounded shortcut.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'One-click swap', description: 'Flip the from/to units instantly instead of resetting both manually.', icon: HiOutlineArrowsRightLeft },
    ],
    howToUse: ['Choose the units to convert from and to.', 'Type a value and the result updates instantly.'],
    useCases: [
      'Converting a distance from miles to kilometers for travel planning',
      'Checking a measurement in centimeters against an inch-based spec',
      'Converting a height or dimension between metric and imperial',
      'Quickly converting a recipe or DIY measurement to a different unit',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'weight-converter': {
    about:
      'Converts between six common weight units, milligrams, grams, kilograms, ounces, pounds and metric tons, using the exact, standardized conversion factors.\n\nAn ounce and a pound are defined in terms of the gram, not the other way around: one avoirdupois pound is exactly 453.59237 grams, and an ounce is one-sixteenth of that. That\u2019s the official international definition, agreed on in 1959 by the US, UK and several other countries specifically to standardize these units against the metric system, which is why this tool\u2019s imperial-to-metric figures are exact values, not measured approximations.\n\nWorth a quick note on terminology: "weight" and "mass" are technically different physical concepts (weight depends on gravity, mass doesn\u2019t), but in everyday and even most commercial use, a kilogram or a pound is used to mean mass, and that\u2019s the sense this tool works in, the same way a kitchen scale or a shipping label does.\n\nA metric ton here specifically means 1,000 kilograms, distinct from the US short ton (2,000 pounds) and the UK long ton (2,240 pounds), two other, separately-defined units that happen to share the word "ton" but aren\u2019t the same size.',
    features: [
      { title: 'Six common units', description: 'Milligrams, grams, kilograms, ounces, pounds and metric tons.', icon: HiOutlineScale },
      { title: 'Exact conversion factors', description: 'Based on the official 1959 international agreement defining the pound in grams.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'One-click swap', description: 'Flip the from/to units instantly instead of resetting both manually.', icon: HiOutlineArrowsRightLeft },
    ],
    howToUse: ['Choose the units to convert from and to.', 'Type a value and the result updates instantly.'],
    useCases: [
      'Converting a recipe\u2019s ingredient weight between grams and ounces',
      'Checking a package\u2019s weight in pounds against a kilogram-based limit',
      'Converting a body weight reading between kg and lb',
      'Working out a shipment\u2019s weight in metric tons from a pounds figure',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'volume-converter': {
    about:
      'Converts between six volume units, including both US and UK gallons and fluid ounces kept as explicitly separate, correctly labeled units, since they\u2019re genuinely different sizes.\n\nA US gallon is about 3.785 liters; a UK (Imperial) gallon is about 4.546 liters, roughly 20% larger. Mixing the two up in a real recipe, fuel calculation, or product spec gives a meaningfully wrong answer, not just a rounding error, which is exactly why this tool never collapses them into one generic "gallon."\n\nThe metric side (milliliters, liters) scales in simple powers of ten, the same clean relationship as the rest of the metric system. The US customary side (fluid ounces, cups, gallons) doesn\u2019t share that pattern, and its exact relationship to the metric system is itself a matter of legal definition rather than something derivable from first principles, which is why the standardized, official values matter here.\n\nA milliliter and a cubic centimeter (cc) are, for practical purposes, exactly the same volume, just conventionally used in different fields, milliliters in everyday and medical contexts, cubic centimeters in engineering and automotive contexts, like an engine\u2019s displacement.',
    features: [
      { title: 'US and UK units kept separate', description: 'Gallons and fluid ounces are explicitly labeled by system, since the sizes genuinely differ.', icon: HiOutlineExclamationTriangle },
      { title: 'Exact conversion factors', description: 'Every value uses the real, standardized definition, not a rounded shortcut.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'One-click swap', description: 'Flip the from/to units instantly instead of resetting both manually.', icon: HiOutlineArrowsRightLeft },
    ],
    howToUse: ['Choose the units to convert from and to.', 'Type a value and the result updates instantly.'],
    useCases: [
      'Converting a recipe between milliliters and US cups',
      'Checking fuel economy figures that mix US and UK gallons',
      'Converting a bottle or container\u2019s volume between liters and fluid ounces',
      'Working out a US gallon figure from a UK gallon spec, or vice versa',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'temperature-converter': {
    about:
      'Converts between Celsius, Fahrenheit and Kelvin, the three temperature scales that actually come up in everyday and scientific use.\n\nUnlike length or weight, temperature scales don\u2019t all share a common zero point, so converting between them isn\u2019t just a matter of multiplying by a fixed factor, it involves an offset too. Celsius and Kelvin share the same size of degree but a different zero point, 0\u00b0C is exactly 273.15 K, since Kelvin is defined to start at absolute zero. Fahrenheit uses a different degree size entirely, which is why its conversion formula involves both a multiplication and an offset.\n\nOne genuinely useful reference point: -40\u00b0 is the exact temperature where Celsius and Fahrenheit read the same number, -40\u00b0C equals -40\u00b0F precisely. It\u2019s a real mathematical coincidence of the two scales\u2019 formulas, and a handy way to sanity-check that a conversion is working correctly.\n\nKelvin has no negative values at all, since it\u2019s defined to start at absolute zero, the physical limit of how cold anything can possibly get. That\u2019s why Kelvin is the standard scale in physics and chemistry: there\u2019s no ambiguity about what "zero" means, unlike Celsius\u2019s zero (water freezing) or Fahrenheit\u2019s zero (an arbitrary historical reference point).',
    features: [
      { title: 'Three temperature scales', description: 'Celsius, Fahrenheit and Kelvin, covering everyday and scientific use.', icon: HiOutlineScale },
      { title: 'Correct offset math', description: 'Properly accounts for each scale\u2019s different zero point, not just a multiplication.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'One-click swap', description: 'Flip the from/to units instantly instead of resetting both manually.', icon: HiOutlineArrowsRightLeft },
    ],
    howToUse: ['Choose the units to convert from and to.', 'Type a value and the result updates instantly.'],
    useCases: [
      'Converting a weather forecast from Fahrenheit to Celsius',
      'Checking a recipe\u2019s oven temperature in the right scale',
      'Converting a scientific measurement to or from Kelvin',
      'Double-checking a thermostat or lab reading in a different scale',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'area-converter': {
    about:
      'Converts between ten area units, from square millimeters up to square miles, including hectares and acres.\n\nArea units scale by the square of their underlying length unit, which is why the numbers involved grow so quickly. Since 1 meter is 100 centimeters, 1 square meter is 100 \u00d7 100 = 10,000 square centimeters, not just 100. That squaring effect is worth keeping in mind whenever converting between area units at very different scales, like square millimeters and square kilometers.\n\nHectares and acres are both units specifically for land area, and both come up constantly in real estate and agriculture, but they\u2019re not interchangeable: one hectare is about 2.471 acres. A hectare is a clean metric unit (exactly 10,000 square meters), while an acre\u2019s definition traces back to old English land-measurement units, which is exactly why the two don\u2019t convert to any tidy round number between them.\n\nThis converter handles two-dimensional area specifically, not three-dimensional volume. Square meters, acres, and hectares describe how much surface a shape covers; for how much a container holds, ToolHub\u2019s separate Volume Converter is the right tool instead.',
    features: [
      { title: 'Ten area units', description: 'From square millimeters to square miles, including hectares and acres.', icon: HiOutlineScale },
      { title: 'Exact conversion factors', description: 'Every value uses the real, standardized definition, not a rounded shortcut.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'One-click swap', description: 'Flip the from/to units instantly instead of resetting both manually.', icon: HiOutlineArrowsRightLeft },
    ],
    howToUse: ['Choose the units to convert from and to.', 'Type a value and the result updates instantly.'],
    useCases: [
      'Converting a property\u2019s land size between acres and hectares',
      'Checking a room or floor plan\u2019s area in square feet vs square meters',
      'Converting a farm or field\u2019s area for an agricultural calculation',
      'Working out square footage from a metric building spec',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'speed-converter': {
    about:
      'Converts between five speed units: meters per second, kilometers per hour, miles per hour, knots and feet per second.\n\nEach of these units combines a distance unit with a time unit, which is why the conversion factors look less tidy than something like length alone. A kilometer per hour is exactly 1000/3600 meters per second (1000 meters in a kilometer, divided by 3600 seconds in an hour), and miles per hour follows the same logic using the exact mile-to-meter definition.\n\nKnots specifically are used in aviation and maritime navigation, not casually, but because a nautical mile (the distance a knot is based on) is defined to correspond to one minute of latitude on the Earth\u2019s surface, which makes navigation calculations more direct for anyone plotting a course on a nautical chart. One knot is exactly 1852 meters per hour, based on the internationally standardized nautical mile.\n\nFor context on the actual numbers here: 100 km/h is about 62 mph, a common highway speed limit in metric countries. A brisk walking pace is roughly 5 km/h, and most commercial airliners cruise somewhere around 900 km/h, or roughly 485 knots.',
    features: [
      { title: 'Five speed units', description: 'Meters/second, km/h, mph, knots and feet/second.', icon: HiOutlineScale },
      { title: 'Exact conversion factors', description: 'Derived from the standardized definitions of the mile and nautical mile.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'One-click swap', description: 'Flip the from/to units instantly instead of resetting both manually.', icon: HiOutlineArrowsRightLeft },
    ],
    howToUse: ['Choose the units to convert from and to.', 'Type a value and the result updates instantly.'],
    useCases: [
      'Converting a speed limit or car spec between km/h and mph',
      'Understanding a boat or aircraft\u2019s speed in knots',
      'Converting a scientific or physics measurement in m/s to another unit',
      'Checking a wind speed reading given in an unfamiliar unit',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'time-converter': {
    about:
      'Converts between six time units, from milliseconds up to weeks.\n\nTime units are unusual among physical measurements in that they don\u2019t follow a single consistent base like 10 or 1000, seconds to minutes is a factor of 60, minutes to hours another factor of 60, hours to days a factor of 24. That\u2019s a legacy of ancient Babylonian base-60 counting for the first two, and the Earth\u2019s actual rotation period for the third, not a designed, clean system the way metric length or weight units are.\n\nFor converting an actual date or a Unix timestamp rather than a duration, ToolHub\u2019s separate Timestamp Converter is the more direct tool, since this one is specifically for converting a length of time (how long something takes or lasts), not a specific point in time.\n\nMonths and years are deliberately left out of this converter, since neither has one fixed length, a month runs 28 to 31 days, and a year averages about 365.25 days (accounting for leap years) rather than a clean 365. Converting to or from those units meaningfully requires an actual calendar date, not just a fixed ratio, which is outside what a plain duration converter can do accurately.',
    features: [
      { title: 'Six time units', description: 'Milliseconds, seconds, minutes, hours, days and weeks.', icon: HiOutlineScale },
      { title: 'Handles mixed bases correctly', description: 'Correctly converts through time\u2019s inconsistent 60/24/7 relationships.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'One-click swap', description: 'Flip the from/to units instantly instead of resetting both manually.', icon: HiOutlineArrowsRightLeft },
    ],
    howToUse: ['Choose the units to convert from and to.', 'Type a value and the result updates instantly.'],
    useCases: [
      'Converting a duration in minutes to hours for a schedule',
      'Working out how many days a given number of hours amounts to',
      'Converting a video or audio length between seconds and minutes',
      'Checking a project timeline given in weeks against a daily estimate',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'data-converter': {
    about:
      'Converts between data storage units, both the decimal (SI, 1000-based) family, kilobytes through terabytes, and the binary (IEC, 1024-based) family, kibibytes through tebibytes, kept explicitly separate.\n\nThis is a genuinely common source of confusion worth explaining directly: a "kilobyte" has historically meant two different things. Storage manufacturers and the formal SI standard define it as exactly 1000 bytes, while operating systems and file managers have traditionally used 1024 bytes (since computers work naturally in powers of two). That\u2019s the real reason a drive labeled "1 TB" often shows up as roughly 931 GB in an operating system, both numbers are correct, they\u2019re just using different definitions of the unit.\n\nTo remove that ambiguity, this tool uses the proper IEC binary prefixes (KiB, MiB, GiB, TiB) specifically for the 1024-based values, and the standard SI prefixes (KB, MB, GB, TB) for the 1000-based ones, so a conversion here always means exactly what it says, with nothing left to guess at.\n\nInternet connection speeds add one more layer worth knowing: they\u2019re typically quoted in bits per second, not bytes, and there are 8 bits in a byte. A "100 Mbps" connection tops out around 12.5 megabytes per second in practice, a genuinely common point of confusion when comparing a quoted internet speed to an actual file download size.',
    features: [
      { title: 'Decimal and binary, clearly separated', description: 'KB/MB/GB/TB (1000-based) and KiB/MiB/GiB/TiB (1024-based) as distinct, correctly labeled units.', icon: HiOutlineExclamationTriangle },
      { title: 'Explains the "missing" storage', description: 'The reason a drive shows less space than advertised is a genuine unit difference, not an error.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'One-click swap', description: 'Flip the from/to units instantly instead of resetting both manually.', icon: HiOutlineArrowsRightLeft },
    ],
    howToUse: ['Choose the units to convert from and to.', 'Type a value and the result updates instantly.'],
    useCases: [
      'Understanding why a drive shows less capacity than its advertised size',
      'Converting a file size between MB and GB for an upload limit',
      'Working out how many GB a given number of MB amounts to',
      'Converting between decimal and binary storage units precisely',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'pressure-converter': {
    about:
      'Converts between six pressure units: Pascals, kilopascals, bar, PSI, atmospheres, and Torr, each of which shows up in a genuinely different real-world context rather than being interchangeable jargon for the same thing.\n\nThe Pascal is the actual SI unit of pressure, defined as one newton of force per square meter, but it\u2019s an inconveniently small unit for everyday use: normal atmospheric pressure at sea level is about 101,325 Pascals, an awkward number to work with directly. That\u2019s why kilopascals and bar exist as more practical everyday sizes, and why bar in particular became the standard for things like tire pressure gauges and weather reports across most of the world, a bar being close enough to one atmosphere to feel intuitive.\n\nPSI (pounds per square inch) is the unit most familiar to anyone in the United States checking tire pressure or working with plumbing, derived directly from the pound-force and square inch, both exactly defined units in their own right. Atmospheres are defined as a fixed reference value, exactly 101,325 Pascals, representing a standard average sea-level pressure, useful as a natural benchmark rather than a unit tied to a specific measuring instrument.\n\nTorr is the odd one out historically: it\u2019s named after Evangelista Torricelli, the physicist who invented the mercury barometer in the 17th century, and it\u2019s defined as exactly 1/760th of an atmosphere. Torr is functionally identical to millimeters of mercury (mmHg), the unit still used on blood pressure monitors today, a direct link back to Torricelli\u2019s original mercury-column instrument nearly 400 years later.',
    features: [
      { title: 'Six pressure units', description: 'Pascals, kilopascals, bar, PSI, atmospheres, and Torr.', icon: HiOutlineScale },
      { title: 'Exact conversion factors', description: 'Derived from the standardized definitions of the pound-force, square inch, and standard atmosphere.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'One-click swap', description: 'Flip the from/to units instantly instead of resetting both manually.', icon: HiOutlineArrowsRightLeft },
    ],
    howToUse: ['Choose the units to convert from and to.', 'Type a value and the result updates instantly.'],
    useCases: [
      'Converting a tire pressure reading between PSI and bar',
      'Understanding a weather report\u2019s atmospheric pressure in a different unit',
      'Converting a blood pressure reading\u2019s mmHg into another pressure unit',
      'Working with pressure specifications on industrial or scientific equipment',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'energy-converter': {
    about:
      'Converts between joules, calories, kilocalories, watt-hours, kilowatt-hours, and BTU, units that come from genuinely different fields, physics, food science, electricity billing, and heating and cooling, but all describe the same underlying physical quantity.\n\nThe joule is the SI unit of energy, but it\u2019s worth clearing up a genuinely common point of confusion around calories specifically. A food label\u2019s \"Calorie\" (capitalized) is actually a kilocalorie, equal to 1,000 of the lowercase \"calories\" used in chemistry and physics. That\u2019s not a rounding convention, it\u2019s a real, if confusing, difference in what the same word means depending on context, and it\u2019s why a food package\u2019s \"200 Calories\" is genuinely 200,000 calories in the strict scientific sense.\n\nThe kilowatt-hour is the unit that shows up directly on an electricity bill: it\u2019s the amount of energy used by a one-kilowatt device running for one hour, and it\u2019s a practical, human-scaled unit specifically because household energy use adds up to a convenient range of kWh per month rather than an unwieldy number of joules. The watt-hour is the same idea at a smaller scale, useful for describing a phone battery\u2019s capacity, for instance.\n\nBTU (British Thermal Unit) is the unit most commonly seen on air conditioner and heater specifications in the United States, originally defined as the energy needed to raise one pound of water by one degree Fahrenheit. An appliance rated in BTU per hour is really describing a rate of energy transfer, which is why converting a BTU rating meaningfully often means thinking of it alongside a time unit, not just a raw energy amount.',
    features: [
      { title: 'Seven energy units', description: 'Joules, kilojoules, calories, kilocalories, watt-hours, kilowatt-hours, and BTU.', icon: HiOutlineScale },
      { title: 'Clears up the Calorie confusion', description: 'A food \"Calorie\" is a kilocalorie, 1,000 times the scientific calorie.', icon: HiOutlineExclamationTriangle },
      { title: 'One-click swap', description: 'Flip the from/to units instantly instead of resetting both manually.', icon: HiOutlineArrowsRightLeft },
    ],
    howToUse: ['Choose the units to convert from and to.', 'Type a value and the result updates instantly.'],
    useCases: [
      'Converting a food label\u2019s Calories into kilojoules',
      'Working out an appliance\u2019s energy use in kWh for an electricity bill estimate',
      'Converting a BTU air conditioner rating into watts or kilowatts',
      'Converting a battery capacity between watt-hours and joules',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'power-converter': {
    about:
      'Converts between watts, kilowatts, horsepower, metric horsepower (PS), and BTU per hour, five units that measure the same thing, the rate energy is used or produced, but come from very different origins.\n\nThe watt is the SI unit, named after James Watt, the engineer whose steam engine improvements made the unit\u2019s namesake practically synonymous with mechanical power in the first place. Horsepower itself, somewhat fittingly, was a unit Watt helped popularize, originally as a marketing comparison letting factory owners understand how many horses one of his steam engines could replace, defined as exactly 550 foot-pounds of work per second.\n\nA detail worth knowing specifically: imperial horsepower and metric horsepower (commonly labeled PS, from the German Pferdest\u00e4rke) are genuinely different sizes, not just a units label difference. One mechanical horsepower is about 745.7 watts, while one metric horsepower is about 735.5 watts, a real, if small, difference that shows up when comparing a car\u2019s power rating between US and European specifications, since manufacturers don\u2019t always specify which horsepower they mean.\n\nBTU per hour, the same BTU used for energy but expressed as a rate over time, is the unit most often seen on air conditioner and furnace specifications, describing how quickly the unit can move heat rather than a one-time energy amount.',
    features: [
      { title: 'Five power units', description: 'Watts, kilowatts, horsepower, metric horsepower (PS), and BTU/hour.', icon: HiOutlineScale },
      { title: 'Imperial vs metric horsepower', description: 'Correctly distinguishes the two genuinely different horsepower definitions.', icon: HiOutlineExclamationTriangle },
      { title: 'One-click swap', description: 'Flip the from/to units instantly instead of resetting both manually.', icon: HiOutlineArrowsRightLeft },
    ],
    howToUse: ['Choose the units to convert from and to.', 'Type a value and the result updates instantly.'],
    useCases: [
      'Converting a car\u2019s horsepower rating into kilowatts',
      'Comparing a European PS power rating against a US horsepower spec',
      'Converting an air conditioner\u2019s BTU/hour rating into watts',
      'Working out a motor or appliance\u2019s power draw in a different unit',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'angle-converter': {
    about:
      'Converts between degrees, radians, gradians, and turns, the four angle units that come up across everyday use, mathematics and programming, and specialized surveying work.\n\nDegrees are the everyday, intuitive unit, and the 360-degree convention traces back to ancient Babylonian mathematics, which used a base-60 number system, the same root that gives clocks 60 minutes and 60 seconds. Radians, by contrast, are the unit mathematics actually treats as fundamental: one radian is defined as the angle where the arc length along a circle equals the circle\u2019s radius, which is exactly why trigonometric functions in essentially every programming language expect radians, not degrees, as their input.\n\nThat last point trips up a genuinely large number of people writing their first bit of graphics or physics code: calling a sine or cosine function with a degree value instead of converting to radians first produces a result that looks like a bug but is actually the function working exactly as documented, just on units the code didn\u2019t expect.\n\nGradians are less commonly encountered but still show up in specific fields like surveying and some European engineering contexts, dividing a full circle into 400 units instead of 360, chosen specifically to make a right angle a clean 100 gradians. Turns (or revolutions) describe a full 360-degree rotation as the unit \"1,\" a natural way to express rotational quantities like how many full turns a wheel or motor shaft completes.',
    features: [
      { title: 'Four angle units', description: 'Degrees, radians, gradians, and turns.', icon: HiOutlineScale },
      { title: 'Built for developers too', description: 'Useful for converting degrees to the radians trigonometric functions actually expect in code.', icon: HiOutlineCodeBracket },
      { title: 'One-click swap', description: 'Flip the from/to units instantly instead of resetting both manually.', icon: HiOutlineArrowsRightLeft },
    ],
    howToUse: ['Choose the units to convert from and to.', 'Type a value and the result updates instantly.'],
    useCases: [
      'Converting degrees to radians for a trigonometric function in code',
      'Converting a surveying measurement between gradians and degrees',
      'Working out how many full turns a given number of degrees represents',
      'Converting an angle for a CAD, physics, or engineering calculation',
    ],
    privacy: NO_FILE_PRIVACY,
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
    guideTitle: 'The Complete Guide to Strong Passwords',
    guide: [
      {
        heading: 'What Actually Makes a Password Strong (It\u2019s Not What Most Advice Says)',
        body:
          'Most password advice focuses on complexity rules, requiring a mix of uppercase, lowercase, numbers, and symbols, but complexity rules alone are a weaker signal of real strength than most people assume. A 10-character password with every character type checked off can still be weaker than a 16-character password using only lowercase letters, because the total number of possible combinations (which is what actually determines how long a brute-force attack takes) grows explosively with length, far faster than it grows with character variety.\n\nThis is why the strength indicator on this tool is based on entropy rather than a checklist of character types. Entropy measures the actual number of possible passwords a given length and character set could produce, expressed in bits, which is a real, calculable number rather than a subjective "good/medium/weak" label. Two passwords with different character mixes but the same entropy value are, mathematically, equally hard to crack.',
      },
      {
        heading: 'How Long Should a Password Be in 2026?',
        body:
          'Password length guidance has shifted meaningfully over the past decade as computing power available to attackers has grown. Current guidance from security organizations generally recommends a minimum of 14 to 16 characters for a standard account, with 20 or more characters recommended specifically for high-value accounts: your primary email (since it\u2019s usually the recovery method for everything else), banking, and the master password protecting a password manager itself.\n\nThe reasoning is straightforward: modern password-cracking hardware can attempt billions of combinations per second for weaker hash algorithms. An 8-character password, even a fairly complex one, falls within a range that determined, well-resourced attackers can brute-force in a practical amount of time. Each additional character multiplies the total combination space, which is why length has become the primary lever security guidance now emphasizes over complexity alone.',
      },
      {
        heading: 'Why Cryptographically Secure Randomness Actually Matters',
        body:
          'Not all "random" is equally random from a security standpoint. A password generator built on a standard pseudo-random function (the kind used for things like shuffling a playlist or picking a random game outcome) can, in some implementations, be predictable enough for an attacker to narrow down or reproduce if they know or can guess the underlying seed value. A cryptographically secure random number generator is specifically designed so that its output can\u2019t be predicted or reverse-engineered, even by someone who knows the algorithm being used, which is the actual security bar a password generator should meet.\n\nThis distinction is invisible in the output itself, a weak and a strong random password can look equally random to a human, which is exactly why it matters to know which kind of randomness a generator actually uses rather than assuming all "random password generators" are built the same way underneath.',
      },
      {
        heading: 'Password vs. Passphrase: Which Should You Actually Use?',
        body:
          'A passphrase, a string of several random, unrelated words like the widely-cited "correct horse battery staple" example, and a traditional random character password are both legitimate approaches to a strong credential, but they make different tradeoffs. A passphrase is generally easier to type accurately and remember without writing down, since it\u2019s built from real words rather than an arbitrary character string. A character-based random password maximizes entropy for a given length, since it draws from a much larger pool of possible characters at each position than a passphrase drawn from a dictionary of words does.\n\nIn practice, the right choice often depends on whether the password needs to be typed manually and remembered (where a passphrase\u2019s memorability is a real advantage) or will live exclusively in a password manager and never be typed by hand (where a fully random character password\u2019s higher entropy per character has no real downside, since you\u2019ll never need to recall or type it).',
      },
      {
        heading: 'Common Password Mistakes That Undermine Even a Strong One',
        body:
          'A strong, randomly generated password can still leave an account vulnerable if it\u2019s undermined by a separate habit. Reusing the same password, even a genuinely strong one, across multiple accounts means a single breach at any one of those services exposes every account using it, since credential-stuffing attacks specifically try leaked username/password combinations against other popular sites. A password generated fresh for every single account closes this gap entirely, regardless of how the password itself was created.\n\nSecurity questions are a less obvious but genuinely common weak point: an answer like a mother\u2019s maiden name or first pet is often discoverable through public records or social media, meaning a strong password can be sidestepped entirely through account recovery rather than cracked directly.',
      },
      {
        heading: 'Where to Store a Generated Password Safely',
        body:
          'A random, high-entropy password is only as useful as your ability to actually retrieve it later without writing it somewhere insecure. A dedicated password manager (a purpose-built application that stores passwords in an encrypted vault behind a single master password) is the standard, recommended approach, since it means you only need to remember one strong password yourself while every other account can use a fully random, unique one without any memorability tradeoff at all.\n\nStoring passwords in an unencrypted document, a note-taking app without encryption, or a browser\u2019s basic autofill without a master password set are all meaningfully weaker options, since each represents a single point of failure if the device itself is ever compromised.',
      },
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

  'twitter-image-resizer': {
    about:
      'Resizes an image to the three dimensions that actually matter on X: a 1200\u00d7675 post image, a 1500\u00d7500 header, and a 400\u00d7400 profile picture.\n\nThe post image size deserves a bit of context. When a link or image is shared, the platform generates a preview card, and getting the aspect ratio wrong is exactly why some shared links show an image that\u2019s been awkwardly cropped or padded with empty bars. 1200\u00d7675 is a 16:9 ratio, matching a genuinely common video and photo aspect ratio, which is part of why it was chosen as the standard.\n\nThe profile picture is displayed as a circle everywhere on the platform, including next to every post and reply, which matters for what to put near the edges of the image: anything too close to a corner gets clipped by the circular crop, so centering the important part of the image is worth doing deliberately rather than assuming a square crop will look right once it\u2019s circular.\n\nThe header image sits behind the profile picture and bio at the top of a profile, and its wide, short aspect ratio (3:1) means a portrait or square photo will need significant cropping to fit, another case where knowing the target dimensions before designing the image saves a redo later.',
    features: [
      { title: 'Three real X sizes', description: 'Post image, header, and profile picture, matching X\u2019s current specifications.', icon: HiOutlinePhoto },
      { title: 'Fill or fit', description: 'Crop to fill the frame exactly, or fit the whole image with padding.', icon: HiOutlineArrowsPointingOut },
      { title: 'Works entirely in your browser', description: 'The image is resized locally; nothing is uploaded anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Upload an image.', 'Choose Post, Header, or Profile Picture.', 'Choose Fill or Fit.', 'Download the resized image.'],
    useCases: [
      'Preparing a post image that won\u2019t get awkwardly cropped in the link preview',
      'Resizing a photo to fit X\u2019s profile picture circle correctly',
      'Creating a header image sized to X\u2019s wide banner dimensions',
      'Fixing an image that displayed stretched or cropped after a previous upload',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'facebook-image-resizer': {
    about:
      'Resizes an image to three Facebook-specific sizes: a 1200\u00d7630 post image, an 820\u00d7312 cover photo, and a 170\u00d7170 profile picture.\n\nThe 1200\u00d7630 dimension is worth knowing about beyond just Facebook: it\u2019s become the de facto standard link-preview image size shared across Facebook, X, and LinkedIn alike, since all three platforms converged on a very similar ratio for how a shared link\u2019s preview card renders. Getting this one size right effectively covers link previews across all three platforms at once.\n\nThe cover photo is the wide banner image at the top of a profile or page, and it\u2019s worth knowing it displays differently on mobile versus desktop, sometimes cropping the top and bottom more aggressively on a phone screen. Keeping the most important part of a cover photo centered vertically, not just horizontally, avoids it being cut off on the device where most people will actually see it.\n\nThe profile picture displays as a circle, the same consideration as other platforms\u2019 circular profile crops: whatever sits closest to the corners of a square image is what gets clipped once the circular mask is applied, so centering matters more than it might seem from looking at the square original.',
    features: [
      { title: 'Three real Facebook sizes', description: 'Post image, cover photo, and profile picture, matching Facebook\u2019s current specifications.', icon: HiOutlinePhoto },
      { title: 'Fill or fit', description: 'Crop to fill the frame exactly, or fit the whole image with padding.', icon: HiOutlineArrowsPointingOut },
      { title: 'Works entirely in your browser', description: 'The image is resized locally; nothing is uploaded anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Upload an image.', 'Choose Post, Cover Photo, or Profile Picture.', 'Choose Fill or Fit.', 'Download the resized image.'],
    useCases: [
      'Preparing a cover photo that won\u2019t get cropped oddly on mobile',
      'Resizing a photo to fit Facebook\u2019s circular profile picture correctly',
      'Creating a 1200\u00d7630 image that also works as a link preview on other platforms',
      'Fixing a page cover photo that displayed stretched after uploading the wrong size',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'linkedin-image-resizer': {
    about:
      'Resizes an image to four LinkedIn-specific sizes: a 1200\u00d7627 post image, a 1200\u00d71200 square post, a 1584\u00d7396 cover banner, and a 400\u00d7400 profile picture.\n\nBoth a landscape and a square post size are included deliberately, since LinkedIn\u2019s feed genuinely treats them differently: square images tend to take up more visible vertical space when scrolling past on mobile, which is part of why square posts often get more attention on the platform than a landscape image with the same content. Which shape to use depends on whether wider mobile-feed presence or a more traditional link-preview shape matters more for a given post.\n\nThe cover banner sits behind the profile picture and headline, and its 4:1 aspect ratio is notably wider and shorter than most other platforms\u2019 cover images, meaning a photo designed for Facebook or X\u2019s cover size will need very different cropping to fit LinkedIn\u2019s banner well, not just a resize.\n\nA personal profile\u2019s cover banner and a LinkedIn Company Page\u2019s cover image are technically separate assets with their own upload locations, worth keeping in mind since they\u2019re easy to mix up when managing both a personal profile and a company page.',
    features: [
      { title: 'Four real LinkedIn sizes', description: 'Post, square post, cover banner, and profile picture, matching LinkedIn\u2019s current specifications.', icon: HiOutlinePhoto },
      { title: 'Fill or fit', description: 'Crop to fill the frame exactly, or fit the whole image with padding.', icon: HiOutlineArrowsPointingOut },
      { title: 'Works entirely in your browser', description: 'The image is resized locally; nothing is uploaded anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Upload an image.', 'Choose a size: Post, Square Post, Cover Banner, or Profile Picture.', 'Choose Fill or Fit.', 'Download the resized image.'],
    useCases: [
      'Resizing a landscape photo into a square post for more mobile feed presence',
      'Creating a cover banner sized correctly for LinkedIn\u2019s wide, short aspect ratio',
      'Preparing a professional profile picture that fits LinkedIn\u2019s circular crop well',
      'Converting an image built for another platform\u2019s cover size into LinkedIn\u2019s banner shape',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'pinterest-pin-resizer': {
    about:
      'Resizes an image to three Pinterest-specific sizes: a 1000\u00d71500 standard Pin, a 1000\u00d71000 square Pin, and a 165\u00d7165 profile picture.\n\nPinterest is worth calling out specifically because its design philosophy is genuinely different from most other platforms: where X, Facebook, and LinkedIn all default to landscape or square shapes optimized for a horizontally-scrolling or centered feed, Pinterest\u2019s masonry-style grid is built around vertical images from the ground up. The standard Pin\u2019s 2:3 portrait ratio isn\u2019t an afterthought, it\u2019s the shape the whole platform\u2019s layout is designed to showcase, which is why a vertical Pin consistently takes up more visible space and gets more attention than a square or landscape one dropped into the same grid.\n\nThe square Pin size still has a place though, particularly for content like quote graphics or product shots where the vertical extra space of a standard Pin would just mean empty padding rather than useful content.\n\nThe profile picture, like most platforms, displays as a circle, so keeping the subject centered rather than close to any edge avoids an awkward, unintended crop once that circular mask gets applied to the square original.',
    features: [
      { title: 'Three real Pinterest sizes', description: 'Standard Pin, square Pin, and profile picture, matching Pinterest\u2019s current specifications.', icon: HiOutlinePhoto },
      { title: 'Fill or fit', description: 'Crop to fill the frame exactly, or fit the whole image with padding.', icon: HiOutlineArrowsPointingOut },
      { title: 'Works entirely in your browser', description: 'The image is resized locally; nothing is uploaded anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Upload an image.', 'Choose Standard Pin, Square Pin, or Profile Picture.', 'Choose Fill or Fit.', 'Download the resized image.'],
    useCases: [
      'Resizing a photo into Pinterest\u2019s tall standard Pin shape for better grid visibility',
      'Creating a square Pin for a quote graphic or product image with no extra vertical content',
      'Preparing a profile picture that fits Pinterest\u2019s circular crop correctly',
      'Converting a landscape image built for another platform into Pinterest\u2019s vertical format',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'video-converter': {
    about:
      'Converts a video between MP4 and WebM by playing it through and re-recording the output in the target container format.\n\nWorth understanding upfront: MP4 and WebM differ in more than just file extension. MP4 typically wraps H.264 video, a codec that was patent-encumbered for years (those patents have since expired), which is part of why it became the dominant, universally-supported format across devices and software. WebM was developed specifically as a royalty-free, open alternative, built around the VP8 and VP9 codecs, and it\u2019s the format most browsers default to when recording video directly, since no licensing is involved.\n\nThat licensing history is also exactly why MP4 output isn\u2019t guaranteed here: Chromium-based browsers (Chrome, Edge) support recording directly to MP4, but Firefox generally doesn\u2019t. This tool checks what your specific browser actually supports and is upfront about it, converting to WebM instead and clearly saying so if MP4 genuinely isn\u2019t available, rather than silently handing back a file in a different format than requested.\n\nBecause this works by playing the video through in real time and capturing the output, a longer video takes proportionally longer to convert, similar to how a physical recording device can\u2019t work faster than the material it\u2019s recording plays.',
    features: [
      { title: 'Convert to MP4 or WebM', description: 'Choose the target container format.', icon: HiOutlineArrowPath },
      { title: 'Honest about browser support', description: 'Reports back which format was actually achieved if MP4 isn\u2019t available.', icon: HiOutlineExclamationTriangle },
      { title: 'Works entirely in your browser', description: 'No file is ever uploaded to a server.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Upload a video.', 'Choose MP4 or WebM.', 'Click Convert Video.', 'Download the result once processing finishes.'],
    useCases: [
      'Converting a WebM file to MP4 for compatibility with software that only accepts MP4',
      'Converting a video to WebM for a smaller, royalty-free web format',
      'Getting a video into a specific container format required by another tool or platform',
      'Standardizing a mix of video files into one consistent format',
    ],
    supportedFormats: {
      input: 'MP4, WebM, MOV, OGV',
      output: 'MP4 (where supported) or WebM',
      maxSize: '200 MB',
    },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'audio-speed-changer': {
    about:
      'Speeds up or slows down an audio file\u2019s playback by resampling it, reading through the original audio at a scaled rate to produce a shorter or longer output.\n\nWorth being upfront about: this changes pitch along with speed, the same effect as playing a vinyl record faster or slower than intended, where a faster record sounds noticeably higher-pitched, not just quicker. Preserving the original pitch independently of speed requires a meaningfully more complex kind of audio processing (commonly called a phase vocoder), which this tool doesn\u2019t attempt, in favor of a simpler, honestly-described approach.\n\nThat tradeoff is fine for a genuinely common set of use cases: speeding up a podcast or lecture recording for faster listening, where a bit of pitch shift is barely noticeable at moderate speeds, or slowing down a piece of music to work out a fast passage by ear, where the pitch drop is an accepted part of how musicians have always used slowed-down playback to learn quickly-played parts.\n\nThe six preset speeds range from half speed to double speed, covering the range most people actually reach for, while still allowing exact repeated use of the same setting rather than needing to fine-tune a slider back to a specific value each time.',
    features: [
      { title: 'Six speed presets', description: '0.5x through 2x, covering the most commonly used range.', icon: HiOutlineForward },
      { title: 'Honest about pitch', description: 'Clearly states that pitch changes along with speed, rather than hiding the tradeoff.', icon: HiOutlineExclamationTriangle },
      { title: 'Works entirely in your browser', description: 'No file is ever uploaded to a server.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Upload an audio file.', 'Choose a speed preset.', 'Click Change Speed.', 'Download the result.'],
    useCases: [
      'Speeding up a podcast or lecture recording for faster listening',
      'Slowing down a piece of music to learn a fast passage by ear',
      'Speeding up a long voice memo before sharing it',
      'Slowing down spoken audio for more careful transcription',
    ],
    supportedFormats: {
      input: 'MP3, WAV, OGG, M4A, WebM, FLAC',
      output: 'WAV',
      maxSize: '50 MB',
    },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'whatsapp-link-generator': {
    about:
      'Builds a WhatsApp Click-to-Chat link (a wa.me address) from a phone number and an optional pre-filled message, ready to paste into a website, email signature, or social bio.\n\nThis isn\u2019t a workaround or a third-party trick: Click-to-Chat is a real, official WhatsApp feature, meant specifically for exactly this use case. Clicking or scanning a wa.me link opens a chat with that number directly, with any pre-filled message already typed in and ready to send, skipping the step of a visitor needing to save a number to their contacts first just to say hello.\n\nThe number format matters more than it might seem. WhatsApp\u2019s wa.me links expect the full international number as plain digits, no plus sign, no spaces, no leading zero before the country code. Typing a number the way it\u2019s normally written, with a + and spaces, is completely fine here since the actual cleanup happens automatically before the link is built, but a link built by hand without that cleanup is a common, quiet cause of "click to chat" buttons that mysteriously don\u2019t work.\n\nA pre-filled message is optional but worth using for a business context specifically: "Hi, I\u2019m interested in [product]" already sitting in the message box removes a small but real bit of friction for someone who was on the fence about reaching out at all, since starting a conversation from a blank message box can itself feel like a bigger step than it should.',
    features: [
      { title: 'Real wa.me links', description: 'Uses WhatsApp\u2019s own official Click-to-Chat feature, not a workaround.', icon: HiOutlineLink },
      { title: 'Handles messy number formats', description: 'Spaces, dashes, and a leading + are all cleaned up automatically.', icon: HiOutlineCheckCircle },
      { title: 'Optional pre-filled message', description: 'Give visitors a head start instead of a blank chat box.', icon: HiOutlineChatBubbleLeftRight },
    ],
    howToUse: ['Enter a phone number with its country code.', 'Optionally add a pre-filled message.', 'Copy the generated link, or click it to test.'],
    useCases: [
      'Adding a "Message us on WhatsApp" button to a website with no backend needed',
      'Putting a Click-to-Chat link in an email signature or social media bio',
      'Sharing a direct chat link with a pre-filled question for a specific product',
      'Testing whether a wa.me link is formatted correctly before publishing it',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'whatsapp-text-formatter': {
    about:
      'Applies WhatsApp\u2019s own text formatting: bold, italic, strikethrough, and monospace, using the exact markup characters WhatsApp itself recognizes when a message is actually sent.\n\nThis is worth being precise about, since it\u2019s a common point of confusion: WhatsApp doesn\u2019t use a rich-text editor with a bold button built into the chat window. It recognizes plain characters typed around a word or phrase, an asterisk on each side for *bold*, an underscore for _italic_, a tilde for ~strikethrough~, and three backticks around ```monospace```, and renders them as formatted text once sent. Anyone who\u2019s seen bold text in a WhatsApp message has seen this system already; anyone who hasn\u2019t used it themselves often simply doesn\u2019t know the exact characters or that it exists at all.\n\nThis tool removes the need to remember the syntax or count characters by hand: select a word or phrase in the text box, click the format wanted, and the correct markup gets added around exactly what was selected. The result is real, working WhatsApp formatting the moment it\u2019s pasted into an actual chat, not a preview or approximation of one.\n\nWorth knowing: this formatting only renders inside WhatsApp itself. Pasted somewhere else, like an email or a text document, it\u2019ll show the literal asterisks or underscores rather than bold or italic text, since those other places don\u2019t interpret WhatsApp\u2019s specific markup.',
    features: [
      { title: 'WhatsApp\u2019s real markup', description: 'Bold, italic, strikethrough, and monospace, using WhatsApp\u2019s actual formatting characters.', icon: HiOutlineBolt },
      { title: 'Select and click', description: 'No need to remember or manually type the correct symbols.', icon: HiOutlineCursorArrowRays },
      { title: 'Copy when ready', description: 'One click copies the formatted text, ready to paste into a real chat.', icon: HiOutlineClipboard },
    ],
    howToUse: ['Type a message.', 'Select a word or phrase.', 'Click Bold, Italic, Strike, or Mono.', 'Copy the result and paste it into WhatsApp.'],
    useCases: [
      'Emphasizing a key word or phrase in a WhatsApp broadcast message',
      'Formatting a business announcement or price list for a WhatsApp group',
      'Learning WhatsApp\u2019s formatting syntax by seeing it applied automatically',
      'Quickly adding strikethrough to show a price has changed',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'whatsapp-qr-generator': {
    about:
      'Generates a scannable QR code that opens a WhatsApp chat with a specific number, optionally with a message already filled in, using the same official wa.me link system as WhatsApp\u2019s own Click-to-Chat feature.\n\nA QR code solves a different problem than a clickable link does. A link works well anywhere someone is already looking at a screen, a website, an email, a social bio. A QR code is what actually works in the physical world: printed on a business card, a storefront window, a menu, or a flyer, where there\u2019s no clickable text at all, only something to point a camera at. Scanning it opens the chat directly, skipping the genuinely common friction of someone typing out a phone number by hand from a printed sign, a step where typos and abandoned attempts happen more often than it might seem.\n\nThe QR code is generated locally using the same verified encoding engine used elsewhere on this site, converting the wa.me link into the actual black-and-white pattern, then rendering it directly to a downloadable image.\n\nA pre-filled message works the same way here as with a plain Click-to-Chat link: someone scanning a code on a restaurant table for reservations, for instance, could land in a chat that already reads "Hi, I\u2019d like to book a table," removing a small step between curiosity and an actual message sent.',
    features: [
      { title: 'Real wa.me QR codes', description: 'Encodes WhatsApp\u2019s own official Click-to-Chat link format.', icon: HiOutlineLink },
      { title: 'Optional pre-filled message', description: 'The chat opens with a message already typed in, if one is set.', icon: HiOutlineChatBubbleLeftRight },
      { title: 'Download as PNG', description: 'Ready to print on a card, sign, or flyer.', icon: HiOutlineArrowDownTray },
    ],
    howToUse: ['Enter a phone number with its country code.', 'Optionally add a pre-filled message.', 'Download the generated QR code.'],
    useCases: [
      'Printing a QR code on a business card that opens a WhatsApp chat',
      'Adding a scannable code to a storefront or restaurant table for quick contact',
      'Putting a WhatsApp QR code on a flyer or printed menu',
      'Making a WhatsApp contact easy to save by scanning instead of typing',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'whatsapp-status-resizer': {
    about:
      'Resizes an image to WhatsApp\u2019s two most common dimensions: a 1080\u00d71920 Status image and a 640\u00d7640 profile picture.\n\nWhatsApp Status uses the same full-screen, 9:16 vertical format as Instagram Stories and Snapchat Stories, a detail worth knowing since a design built for one genuinely works for the others without modification. An image that doesn\u2019t match this ratio doesn\u2019t get stretched to fill the screen; WhatsApp shrinks it to fit the width and fills the empty space above and below with a solid color bar, which reads as noticeably less polished than a properly sized image filling the whole screen.\n\nWorth knowing for anyone designing a Status image specifically, not just resizing an existing photo: WhatsApp\u2019s interface overlays the sender\u2019s name near the top and a reply bar near the bottom, covering roughly the outer edges of the full 1080\u00d71920 frame. Keeping important text or a subject\u2019s face within the vertical center of the image avoids it landing under one of these overlays.\n\nThe profile picture, uploaded at up to 1080\u00d71080 but ultimately stored and displayed by WhatsApp at 640\u00d7640, is cropped to a circle everywhere it appears, in chats, contact lists, and group info, so keeping the subject centered rather than near a corner avoids it being clipped unexpectedly by that circular mask once it\u2019s applied.',
    features: [
      { title: 'Real WhatsApp dimensions', description: 'Status (1080\u00d71920) and profile picture (640\u00d7640), matching WhatsApp\u2019s current specifications.', icon: HiOutlinePhoto },
      { title: 'Fill or fit', description: 'Crop to fill the frame exactly, or fit the whole image with padding.', icon: HiOutlineArrowsPointingOut },
      { title: 'Works entirely in your browser', description: 'The image is resized locally; nothing is uploaded anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Upload an image.', 'Choose Status Image or Profile Picture.', 'Choose Fill or Fit.', 'Download the resized image.'],
    useCases: [
      'Resizing a photo to fill the screen properly as a WhatsApp Status update',
      'Avoiding the black bars that appear when an image doesn\u2019t match the 9:16 ratio',
      'Preparing a profile picture that fits WhatsApp\u2019s circular crop correctly',
      'Reusing an Instagram or Snapchat Story image for WhatsApp Status without a redesign',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'remove-duplicate-lines': {
    about:
      'Removes duplicate lines from a block of text, keeping the first occurrence of each unique line and discarding the rest.\n\nThis comes up more often than it might seem: cleaning up a list of email addresses collected from multiple sources, deduplicating a list of URLs before running a batch process, or tidying up a CSV-adjacent text file where the same row was accidentally pasted twice. Doing this by hand in a text editor means scanning line by line, which gets error-prone fast once a list passes a few dozen lines.\n\nThe comparison is exact and case-sensitive: "Apple" and "apple" are treated as different lines, since a case-insensitive dedupe would risk silently discarding genuinely different data (an email address\u2019s local part, for instance, technically can be case-sensitive). Order is otherwise preserved exactly as in the original, so the result reads the same as the source, just without the repeats.',
    features: [
      { title: 'Exact-match deduplication', description: 'Keeps the first occurrence of each unique line.', icon: HiOutlineListBullet },
      { title: 'Order preserved', description: 'Remaining lines stay in their original order.', icon: HiOutlineQueueList },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste your text.', 'The deduplicated result appears instantly.', 'Copy the result.'],
    useCases: [
      'Cleaning up a list of email addresses collected from multiple sources',
      'Deduplicating a list of URLs before a batch process',
      'Removing accidental repeated rows from a pasted spreadsheet column',
      'Tidying up a list of names or tags before importing it elsewhere',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'text-reverser': {
    about:
      'Reverses the character order of any text, turning "hello" into "olleh".\n\nThis is mostly a novelty and puzzle tool, but it has a few genuine practical uses too: checking whether a word or phrase is a palindrome, creating a simple visual effect for a design project, or generating a reversed string for a programming exercise or test case. The reversal works character by character, including spaces and punctuation, so a full sentence reverses as a mirror image of itself rather than just reversing word order.',
    features: [
      { title: 'Instant reversal', description: 'Updates as you type, no button to click.', icon: HiOutlineArrowsRightLeft },
      { title: 'Character-level reversal', description: 'Reverses every character, including spaces and punctuation.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing you type here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Type or paste your text.', 'The reversed result appears instantly.', 'Copy the result.'],
    useCases: [
      'Checking whether a word or phrase is a palindrome',
      'Creating a mirrored text effect for a design project',
      'Generating a reversed string for a coding exercise or test case',
      'Just for fun \u2014 seeing what a name or phrase looks like backwards',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'upside-down-text-generator': {
    about:
      'Flips text upside down using Unicode characters that visually resemble upside-down letters, a trick that works anywhere plain Unicode text is accepted: social media bios, captions, group names, or a message to a friend.\n\nWorth understanding how this actually works, since it\u2019s a genuinely clever trick rather than an image or a font: the Unicode standard happens to include characters from various alphabets and phonetic systems that, by coincidence of their shape, look like upside-down versions of Latin letters. This tool maps each letter to its closest upside-down lookalike and reverses the order, so the result reads correctly when the whole thing is flipped, exactly the way turning a printed page upside down would.\n\nBecause these are real Unicode characters, not an image, the result can be copied and pasted anywhere text is accepted, and it stays upside down consistently across devices and platforms, unlike a font-based trick that only works within one specific app.',
    features: [
      { title: 'Real Unicode characters', description: 'Not an image \u2014 works anywhere plain text is accepted.', icon: HiOutlineArrowsUpDown },
      { title: 'Instant flip', description: 'Updates as you type.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing you type here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Type your text.', 'The upside-down version appears instantly.', 'Copy and paste it anywhere.'],
    useCases: [
      'Adding a novelty touch to a social media bio or caption',
      'Sending a fun, attention-grabbing message to a friend',
      'Creating an unusual group chat or channel name',
      'Standing out in a comment section with unexpected formatting',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'trim-whitespace': {
    about:
      'Cleans up extra whitespace from text: trailing spaces at the end of lines, leading spaces at the start, and blank lines stacked more than two deep, without touching the actual words.\n\nThis kind of mess accumulates quietly, usually from copying text out of a PDF, an email client, or a word processor that adds its own invisible spacing conventions. It rarely causes a visible problem until the text gets pasted somewhere that treats whitespace meaningfully, like a code file, a CSV, or a configuration file, where a stray trailing space can cause a genuinely confusing bug that\u2019s invisible just by looking at it.',
    features: [
      { title: 'Trims line by line', description: 'Removes leading and trailing spaces from every line.', icon: HiOutlineArrowsPointingIn },
      { title: 'Collapses excess blank lines', description: 'Three or more blank lines in a row become just one.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste your text.', 'The cleaned-up result appears instantly.', 'Copy the result.'],
    useCases: [
      'Cleaning up text copied from a PDF or word processor before using it in code',
      'Removing invisible trailing spaces that break a CSV or config file',
      'Tidying up excessive blank lines from a pasted document',
      'Preparing text for a system that treats whitespace meaningfully',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'slug-generator': {
    about:
      'Converts any title or phrase into a clean, URL-friendly slug: lowercase, hyphens instead of spaces, and no special characters.\n\nA slug is the readable part of a URL, the "my-blog-post-title" in example.com/blog/my-blog-post-title, and getting it right matters for more than just tidiness. Search engines use the words in a URL as a genuine, if modest, ranking signal, and a clean slug is more shareable and trustworthy-looking than a URL full of encoded spaces and symbols. Most content management systems generate a slug automatically, but a manual one is often needed when publishing somewhere that doesn\u2019t, or when the auto-generated version needs manual cleanup.',
    features: [
      { title: 'Instant conversion', description: 'Updates as you type.', icon: HiOutlineLink },
      { title: 'Strips special characters', description: 'Only lowercase letters, numbers, and hyphens remain.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing you type here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Type a title or phrase.', 'The generated slug appears instantly.', 'Copy the result.'],
    useCases: [
      'Creating a URL slug for a blog post or article',
      'Generating a clean filename from a title',
      'Preparing a slug for a platform that doesn\u2019t auto-generate one',
      'Cleaning up an auto-generated slug that includes unwanted characters',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'line-counter': {
    about:
      'Counts the total number of lines in a block of text, along with a separate count of non-empty lines.\n\nThis distinction matters more than a single "line count" figure would suggest: a document with 100 total lines but only 60 non-empty ones tells a very different story than one where nearly every line has content, useful context when estimating how much of a file is actual content versus spacing, or when a system expects a specific line count and blank lines would throw that number off.',
    features: [
      { title: 'Total and non-empty counts', description: 'Two separate, genuinely useful numbers, not just one total.', icon: HiOutlineListBullet },
      { title: 'Instant count', description: 'Updates as you type or paste.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste your text.', 'Both line counts update instantly.'],
    useCases: [
      'Checking how many lines are in a list before importing it elsewhere',
      'Estimating actual content versus blank spacing in a document',
      'Verifying a file matches an expected line count',
      'Counting entries in a pasted list of items, one per line',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'text-to-binary': {
    about:
      'Converts text into its binary representation, the sequence of 0s and 1s a computer actually uses to store each character internally.\n\nEach character becomes an 8-bit binary number matching its standard character code (the same encoding, ASCII-compatible, that underlies virtually all plain text), separated by spaces for readability. This is mostly an educational and novelty tool, useful for understanding how computers represent text at the lowest level, but it also comes up in some puzzle and cryptography-adjacent contexts where binary-encoded text is a deliberate layer of obfuscation.',
    features: [
      { title: 'Standard 8-bit encoding', description: 'Matches the character codes used throughout plain text and programming.', icon: HiOutlineCodeBracket },
      { title: 'Instant conversion', description: 'Updates as you type.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing you type here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Type or paste your text.', 'The binary result appears instantly.', 'Copy the result.'],
    useCases: [
      'Learning how computers represent text at a low level',
      'Creating a binary-encoded puzzle or hidden message',
      'Generating binary test data for a programming exercise',
      'Satisfying curiosity about what a word actually looks like in binary',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'binary-to-text': {
    about:
      'Converts binary code (0s and 1s) back into readable text, the reverse of encoding text into binary.\n\nEach group of 8 binary digits is read as one character code and converted back to its corresponding letter, number, or symbol. This is the natural companion to a text-to-binary tool, useful for decoding a binary message or puzzle, checking a programming exercise\u2019s output, or simply satisfying curiosity about what a string of 0s and 1s actually spells out.',
    features: [
      { title: 'Standard 8-bit decoding', description: 'Matches the character codes used throughout plain text and programming.', icon: HiOutlineCodeBracket },
      { title: 'Instant conversion', description: 'Updates as you type or paste.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste binary code, with each 8-digit group separated by a space.', 'The decoded text appears instantly.', 'Copy the result.'],
    useCases: [
      'Decoding a binary-encoded message or puzzle',
      'Checking the output of a programming exercise',
      'Verifying a text-to-binary conversion by decoding it back',
      'Learning how binary maps back to readable characters',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'find-and-replace': {
    about:
      'Finds every occurrence of a word or phrase in a block of text and replaces it with something else, with optional case-sensitive and whole-word matching for more precise control.\n\nA plain text editor\u2019s find-and-replace often does the job, but pasting text into a dedicated tool avoids opening a full editor just for a quick cleanup, and having the match count visible before committing to the replacement helps catch a typo in the search term before it silently replaces nothing, or replaces far more than intended. Whole-word matching specifically avoids the common mistake of a short search term accidentally matching inside a longer word (searching for "cat" and accidentally changing "catalog" too).',
    features: [
      { title: 'Case-sensitive option', description: 'Match exact capitalization, or ignore it.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Whole-word matching', description: 'Avoid accidentally matching inside a longer word.', icon: HiOutlineMagnifyingGlassPlus },
      { title: 'Live match count', description: 'See how many matches were found before relying on the result.', icon: HiOutlineHashtag },
    ],
    howToUse: ['Paste your text.', 'Enter what to find and what to replace it with.', 'Adjust case-sensitive and whole-word options if needed.', 'Copy the result.'],
    useCases: [
      'Replacing a repeated typo throughout a document',
      'Updating a name or term that changed across a block of text',
      'Cleaning up inconsistent formatting by replacing one pattern with another',
      'Checking how many times a specific word appears before deciding to replace it',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'percentage-calculator': {
    about:
      'Handles the three most common percentage calculations in one place: finding a percentage of a number, figuring out what percentage one number is of another, and calculating the percentage change between two values.\n\nThese three calculations look similar but solve genuinely different problems, and mixing them up is a common source of errors. "20% of 50" answers a completely different question than "20 is what percent of 50," even though both involve the same two numbers. Percentage change specifically accounts for direction, a negative result means a decrease, which matters when tracking something like a price change or a month-over-month metric where the direction of the change is the actual point.',
    features: [
      { title: 'Three calculation modes', description: 'Percentage of a number, what percent one number is of another, and percentage change.', icon: HiOutlineCalculator },
      { title: 'Instant results', description: 'Updates as soon as both numbers are entered.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing you enter here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Choose a calculation mode.', 'Enter the two numbers.', 'The result appears instantly.'],
    useCases: ['Calculating a discount or tax amount', 'Figuring out what portion a number represents of a total', 'Tracking a percentage increase or decrease over time', 'Checking a percentage-based calculation by hand'],
    privacy: NO_FILE_PRIVACY,
  },

  'compound-interest-calculator': {
    about:
      'Calculates how an investment grows over time with compound interest, using the standard compound interest formula, and shows both the final amount and the interest earned separately.\n\nCompound interest is often summarized as "interest on interest," and the compounding frequency (annually, monthly, daily) genuinely changes the result, not just as a rounding detail. The same principal, rate, and time period produce a meaningfully larger final amount when compounded monthly instead of annually, since each compounding period\u2019s interest starts earning its own interest sooner. This is exactly why a savings account\u2019s stated annual rate and its actual annual yield can differ once the compounding frequency is accounted for.',
    features: [
      { title: 'Adjustable compounding frequency', description: 'Annually, monthly, daily, or any number of times per year.', icon: HiOutlineChartBar },
      { title: 'Separates principal from interest', description: 'See exactly how much of the final amount is interest earned.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing you enter here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Enter the principal, annual rate, compounding frequency, and number of years.', 'The final amount and interest earned appear instantly.'],
    useCases: ['Estimating how a savings account or investment will grow over time', 'Comparing outcomes at different compounding frequencies', 'Understanding the real difference a small rate change makes over many years', 'Planning toward a savings goal by testing different time horizons'],
    privacy: NO_FILE_PRIVACY,
  },

  'loan-calculator': {
    about:
      'Calculates the monthly payment for a loan or mortgage using the standard amortization formula, along with the total amount paid and total interest over the full loan term.\n\nThe formula behind this is the same one lenders themselves use to set a fixed monthly payment, which is why the same loan amount, rate, and term will produce the same payment figure whether it comes from a bank\u2019s own calculator or this one. Worth understanding intuitively: the total interest paid over a 30-year loan is often comparable to, or even larger than, the original loan amount itself, a detail that gets easy to lose sight of when only looking at the monthly payment figure in isolation.',
    features: [
      { title: 'Standard amortization formula', description: 'The same formula lenders use to calculate a fixed monthly payment.', icon: HiOutlineHome },
      { title: 'Total interest shown separately', description: 'See exactly how much of the total cost is interest versus principal.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing you enter here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Enter the loan amount, annual interest rate, and term in years.', 'The monthly payment, total paid, and total interest appear instantly.'],
    useCases: ['Estimating a mortgage payment before applying for a loan', 'Comparing monthly payments across different loan terms or rates', 'Understanding how much of a loan\u2019s total cost is interest', 'Checking a lender-provided payment figure independently'],
    privacy: NO_FILE_PRIVACY,
  },

  'profit-margin-calculator': {
    about:
      'Calculates both profit margin and markup from a revenue and cost figure, two related but genuinely different numbers that are easy to confuse.\n\nProfit margin is profit as a percentage of the selling price (revenue), while markup is profit as a percentage of the cost. The same two numbers produce different-looking percentages depending on which one is asked for, and mixing them up in a pricing decision can lead to setting a price that doesn\u2019t actually deliver the profit margin intended. A common example: a 50% markup on cost is not the same as a 50% profit margin, working out to a genuinely lower margin once the actual math is done.',
    features: [
      { title: 'Both margin and markup', description: 'Two related percentages calculated from the same two numbers.', icon: HiOutlineCurrencyDollar },
      { title: 'Instant results', description: 'Updates as soon as both numbers are entered.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing you enter here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Enter the revenue (selling price) and cost.', 'Profit margin and markup appear instantly.'],
    useCases: ['Setting a price that achieves a target profit margin', 'Checking whether a markup percentage delivers the intended margin', 'Comparing margins across different products or services', 'Understanding the real difference between margin and markup'],
    privacy: NO_FILE_PRIVACY,
  },

  'age-calculator': {
    about:
      'Calculates exact age in years, months, and days between two dates, along with the total number of days, using genuine calendar-aware math rather than a rough estimate.\n\nA naive age calculation (today\u2019s date minus birth year) gets the year right but ignores whether the birthday has actually happened yet this year, and a pure day-count divided by 365 drifts over time because of leap years. This calculator accounts for the actual number of days in each specific month and year involved, so the years/months/days breakdown matches what a calendar would actually show, not an approximation.',
    features: [
      { title: 'True calendar-aware calculation', description: 'Accounts for actual month lengths and leap years, not a rough estimate.', icon: HiOutlineCalendarDays },
      { title: 'Any two dates', description: 'Not limited to "today" \u2014 calculate age as of any reference date.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing you enter here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Enter a date of birth.', 'Enter the date to calculate age as of (defaults to today).', 'The exact age appears instantly.'],
    useCases: ['Calculating exact age for an official form or application', 'Finding out how many total days old someone is', 'Calculating age as of a specific past or future date', 'Working out the exact time between any two dates'],
    privacy: NO_FILE_PRIVACY,
  },

  'color-contrast-checker': {
    about:
      'Checks the contrast ratio between a text color and its background against the WCAG (Web Content Accessibility Guidelines) AA and AAA standards, the same accessibility criteria real audits and automated testing tools check against.\n\nContrast ratio is calculated from each color\u2019s relative luminance, a measure of how much light a color reflects, weighted to match how the human eye actually perceives brightness across red, green, and blue rather than treating them equally. The ratio ranges from 1:1 (identical colors, no contrast at all) to 21:1 (pure black on pure white, the maximum possible contrast). WCAG AA requires at least 4.5:1 for normal text and 3:1 for large text; AAA, a stricter standard, requires 7:1 and 4.5:1 respectively.\n\nThis matters beyond compliance checkboxes: low contrast text is genuinely difficult to read for people with low vision, color blindness, or simply anyone using a phone screen in bright sunlight, making this one of the more consequential, easy-to-check details in a design.',
    features: [
      { title: 'Real WCAG math', description: 'Calculated using the actual relative luminance and contrast ratio formulas from the WCAG spec.', icon: HiOutlineScale },
      { title: 'AA and AAA results', description: 'See pass/fail for both standards, for normal and large text.', icon: HiOutlineCheckCircle },
      { title: 'Live preview', description: 'See the actual color combination rendered as sample text.', icon: HiOutlineEye },
    ],
    howToUse: ['Choose a text color.', 'Choose a background color.', 'See the contrast ratio and WCAG pass/fail results instantly.'],
    useCases: ['Checking a color combination before finalizing a design', 'Auditing an existing website or app for accessibility compliance', 'Choosing text colors that remain readable for low-vision users', 'Verifying a design meets a client or organization\u2019s accessibility requirements'],
    privacy: NO_FILE_PRIVACY,
  },

  'darken-lighten-color': {
    about:
      'Generates a range of lighter and darker shades of any color, a common need when building a coordinated color palette rather than working with a single flat color.\n\nA single brand color rarely works alone in a real design: buttons need a hover state slightly darker than their resting state, disabled elements need a lighter, muted version, and shadows or borders often use a darker variant of a base color to feel cohesive rather than arbitrary. This tool generates five steps in each direction, giving a practical, ready-to-use range rather than requiring a manual color-picker adjustment for every shade needed.',
    features: [
      { title: 'Five shades each direction', description: 'A practical range of lighter and darker variants.', icon: HiOutlineSwatch },
      { title: 'Click to copy', description: 'Each shade\u2019s hex code copies with one click.', icon: HiOutlineClipboard },
      { title: 'Works entirely in your browser', description: 'Nothing you enter here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Choose or enter a base color.', 'Lighter and darker shades generate instantly.', 'Click any shade to copy its hex code.'],
    useCases: ['Building a hover or active state for a button from a base color', 'Creating a muted, disabled-state version of a brand color', 'Generating a coordinated shadow or border color', 'Building out a full color scale from one starting color'],
    privacy: NO_FILE_PRIVACY,
  },

  'random-color-generator': {
    about:
      'Generates random hex colors, useful for design inspiration, placeholder content, or breaking out of a creative rut when every color choice starts to feel the same.\n\nEach color is generated as a genuinely uniform random value across the full color space, not biased toward any particular hue or brightness range, so the results span the full range of possible colors rather than clustering around a few common shades. This is intentionally a starting point for exploration rather than a curated palette generator, useful specifically when the goal is unexpected color combinations rather than professionally coordinated ones.',
    features: [
      { title: 'Six colors at once', description: 'Generate a fresh batch instantly.', icon: HiOutlineSwatch },
      { title: 'Click to copy', description: 'Each color\u2019s hex code copies with one click.', icon: HiOutlineClipboard },
      { title: 'Works entirely in your browser', description: 'Nothing is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Click Generate New Colors.', 'Click any color\u2019s hex code to copy it.'],
    useCases: ['Finding design inspiration when stuck on a color choice', 'Generating placeholder colors for a mockup or prototype', 'Creating a random accent color for a personal project', 'Exploring unexpected color combinations outside a usual palette'],
    privacy: NO_FILE_PRIVACY,
  },

  'css-formatter': {
    about:
      'Formats minified or messy CSS into properly indented, readable code, expanding compressed one-line stylesheets into a structure that\u2019s actually possible to read and edit.\n\nMinified CSS delivered from a production website or a build tool is deliberately compressed for file size, every rule on one line, no spaces to spare. That\u2019s efficient for a browser to load but genuinely difficult for a person to read, debug, or learn from. This tool reverses that: it rebuilds proper indentation, one property per line, and consistent spacing around selectors and values, without changing what the CSS actually does.',
    features: [
      { title: 'Handles nested rules', description: 'Media queries and other nested blocks are indented correctly.', icon: HiOutlineCodeBracketSquare },
      { title: 'Preserves exact behavior', description: 'Only whitespace and structure change; the CSS itself is untouched.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste minified or messy CSS.', 'The formatted result appears instantly.', 'Copy the result.'],
    useCases: ['Making a minified stylesheet readable for debugging', 'Cleaning up CSS pasted from a browser\u2019s dev tools', 'Preparing CSS for a code review or documentation', 'Learning CSS structure from an otherwise compressed file'],
    privacy: NO_FILE_PRIVACY,
  },

  'css-minifier': {
    about:
      'Minifies CSS by stripping comments and unnecessary whitespace, producing a smaller file that behaves identically but loads faster.\n\nEvery space, line break, and comment in a CSS file adds bytes that a browser has to download before it can render a page, and while modern connections make a few kilobytes here or there rarely dramatic on their own, minification adds up meaningfully across a whole site\u2019s stylesheets, especially on a slower connection. This is exactly the same kind of processing step that build tools like webpack or Vite apply automatically before deploying a production site, made available here as a standalone step.',
    features: [
      { title: 'Removes comments and whitespace', description: 'Strips everything not needed for the browser to interpret the CSS.', icon: HiOutlineArchiveBox },
      { title: 'Behavior-preserving', description: 'The minified output renders identically to the original.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste your CSS.', 'The minified result appears instantly.', 'Copy the result.'],
    useCases: ['Reducing a stylesheet\u2019s file size before deploying', 'Preparing CSS for a context without a build tool to minify it automatically', 'Comparing file size before and after minification', 'Quickly compressing a small CSS snippet for embedding inline'],
    privacy: NO_FILE_PRIVACY,
  },

  'html-formatter': {
    about:
      'Formats minified or messy HTML into properly indented, readable markup, expanding compressed or poorly-structured HTML into a nested structure that\u2019s actually possible to follow.\n\nIndentation in HTML exists purely for the person reading it; browsers don\u2019t care about whitespace between tags at all. But that human-facing structure matters enormously once a document has more than a handful of elements, since without it, figuring out which closing tag belongs to which opening tag becomes genuinely difficult. This tool rebuilds that structure automatically, indenting each nested element one level deeper than its parent, exactly the convention most code editors and style guides follow.',
    features: [
      { title: 'Correct void element handling', description: 'Self-closing tags like <img> and <br> are handled correctly, not treated as needing a closing tag.', icon: HiOutlineCodeBracketSquare },
      { title: 'Preserves exact structure', description: 'Only whitespace and indentation change; the markup itself is untouched.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste minified or messy HTML.', 'The formatted result appears instantly.', 'Copy the result.'],
    useCases: ['Making minified HTML readable for debugging', 'Cleaning up markup copied from a browser\u2019s "view source"', 'Preparing HTML for a code review or documentation', 'Untangling deeply nested markup to find a structural mistake'],
    privacy: NO_FILE_PRIVACY,
  },

  'html-minifier': {
    about:
      'Minifies HTML by stripping comments and collapsing whitespace between tags, producing a smaller file that renders identically but transfers faster.\n\nThis is the same category of optimization CSS and JavaScript minifiers apply, adapted for markup: every line break and indent between tags is bytes a browser downloads but never actually needs, since HTML rendering ignores whitespace between elements anyway. The visible content and structure stay completely unchanged; only the invisible formatting scaffolding is removed.',
    features: [
      { title: 'Removes comments and whitespace', description: 'Strips everything not needed for the browser to render the page.', icon: HiOutlineArchiveBox },
      { title: 'Behavior-preserving', description: 'The minified output renders identically to the original.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste your HTML.', 'The minified result appears instantly.', 'Copy the result.'],
    useCases: ['Reducing a static HTML page\u2019s file size before deploying', 'Preparing an HTML email template for smaller size', 'Compressing an HTML snippet for embedding elsewhere', 'Comparing file size before and after minification'],
    privacy: NO_FILE_PRIVACY,
  },

  'xml-formatter': {
    about:
      'Formats minified or messy XML into properly indented, readable markup, using the same nested-structure logic as HTML but without assuming any tag is self-closing unless it\u2019s explicitly written that way.\n\nXML is stricter than HTML by design, every tag that opens must be explicitly closed, and there\u2019s no browser-defined list of "void" elements to assume about. This formatter respects that: it only treats an element as self-closing when the source itself writes it that way (like <item />), which matters for configuration files, API responses, and data feeds where getting the exact structure right is often more consequential than in a webpage.',
    features: [
      { title: 'XML-correct handling', description: 'No HTML-specific assumptions about which tags self-close.', icon: HiOutlineCodeBracketSquare },
      { title: 'Preserves exact structure', description: 'Only whitespace and indentation change; the data itself is untouched.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste minified or messy XML.', 'The formatted result appears instantly.', 'Copy the result.'],
    useCases: ['Making a minified XML API response readable for debugging', 'Cleaning up a configuration file for easier editing', 'Preparing XML for documentation or a code review', 'Untangling deeply nested XML to find a structural issue'],
    privacy: NO_FILE_PRIVACY,
  },

  'xml-minifier': {
    about:
      'Minifies XML by stripping comments and collapsing whitespace between elements, producing a smaller file that parses identically but transfers faster.\n\nThis matters most for XML used in contexts where file size genuinely affects performance: API responses, RSS or Atom feeds, and configuration files transmitted over a network. The data structure and every value inside it stay completely unchanged; only the whitespace used purely for human readability is removed.',
    features: [
      { title: 'Removes comments and whitespace', description: 'Strips everything not needed for a parser to read the data.', icon: HiOutlineArchiveBox },
      { title: 'Data-preserving', description: 'Every element and value parses identically to the original.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste your XML.', 'The minified result appears instantly.', 'Copy the result.'],
    useCases: ['Reducing an XML feed or API response\u2019s file size', 'Compressing a configuration file for smaller storage', 'Preparing XML for a context with strict size limits', 'Comparing file size before and after minification'],
    privacy: NO_FILE_PRIVACY,
  },

  'javascript-minifier': {
    about:
      'Minifies JavaScript by removing comments and unnecessary whitespace, while remaining fully aware of string and template literals, so a comment-like sequence sitting inside a string, such as a URL, is never mistakenly stripped out.\n\nThis distinction matters more than it might seem: a naive approach that simply deletes anything after // would corrupt a string like "http://example.com" by cutting it off after the first slash. This tool tracks whether it\u2019s currently inside a quoted string before deciding whether // or /* actually starts a comment, so string contents are always left completely untouched, exactly as written.\n\nWorth being upfront about scope: this handles comment and whitespace removal safely, the same category of optimization most build tools apply, but it doesn\u2019t rename variables or restructure code the way a full minifier like Terser does, since that requires fully parsing the JavaScript\u2019s syntax tree rather than just tracking string boundaries.',
    features: [
      { title: 'String-aware processing', description: 'Never mistakes a URL or other string content for a comment.', icon: HiOutlineShieldCheck },
      { title: 'Safe by design', description: 'Only comments and whitespace are removed; code logic is untouched.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineArchiveBox },
    ],
    howToUse: ['Paste your JavaScript code.', 'The minified result appears instantly.', 'Copy the result.'],
    useCases: ['Reducing a script\u2019s file size before deploying', 'Stripping comments from code before sharing it externally', 'Preparing a JavaScript snippet for embedding inline', 'Quickly compressing a small script without a full build pipeline'],
    privacy: NO_FILE_PRIVACY,
  },

  'html-entities-encoder': {
    about:
      'Converts special characters like <, >, &, and quotation marks into their HTML entity equivalents (&lt;, &gt;, &amp;, and so on), the encoding needed whenever that literal character would otherwise be misread as part of the HTML markup itself rather than as content.\n\nThis comes up specifically when displaying text that happens to contain characters HTML treats as meaningful: showing a code snippet that includes a less-than sign, embedding a quote that contains an ampersand, or displaying user-submitted text safely without it being interpreted as actual HTML tags. Without encoding, a literal < in displayed text risks being read by the browser as the start of a tag rather than a visible character.',
    features: [
      { title: 'All five key characters', description: 'Encodes <, >, &, \u0022, and \u0027, the characters HTML treats as meaningful.', icon: HiOutlineCodeBracketSquare },
      { title: 'Instant conversion', description: 'Updates as you type.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing you type here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste text containing special characters.', 'The encoded result appears instantly.', 'Copy the result.'],
    useCases: ['Safely displaying a code snippet that contains < or > inside an HTML page', 'Encoding user-submitted text before inserting it into HTML', 'Preparing text with quotes or ampersands for an HTML attribute', 'Escaping special characters before embedding text in a template'],
    privacy: NO_FILE_PRIVACY,
  },

  'html-entities-decoder': {
    about:
      'Converts HTML entities like &lt;, &gt;, and &amp; back into their original literal characters, the reverse of encoding.\n\nThis is the natural companion to an entities encoder, useful whenever text has already been HTML-encoded somewhere and needs to be read or processed in its original, literal form: cleaning up scraped or copy-pasted web content, reversing an encoding step to inspect the real underlying text, or verifying that an encode-then-decode round trip returns the exact original.',
    features: [
      { title: 'Decodes the common entities', description: '&amp;, &lt;, &gt;, &quot;, &#39;, and &apos;.', icon: HiOutlineCodeBracketSquare },
      { title: 'Instant conversion', description: 'Updates as you paste.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste text containing HTML entities.', 'The decoded result appears instantly.', 'Copy the result.'],
    useCases: ['Cleaning up text copied from a webpage that shows literal entity codes', 'Reversing HTML encoding to inspect the original text', 'Verifying an encode-then-decode round trip returns the exact original', 'Converting entity-encoded data back to readable text for processing'],
    privacy: NO_FILE_PRIVACY,
  },

  'jwt-decoder': {
    about:
      'Decodes a JSON Web Token\u2019s header and payload into readable JSON, without verifying its signature.\n\nA JWT is three base64url-encoded segments joined by dots: a header describing the signing algorithm, a payload carrying the actual claims (like a user ID or expiration time), and a signature. This tool decodes the first two segments, which is genuinely all that\u2019s needed to inspect what a token actually contains, since the header and payload aren\u2019t encrypted, only encoded, meaning anyone holding the token can already read them without any secret key.\n\nThe signature is deliberately not verified here, and it\u2019s worth understanding why that\u2019s the right scope for a decoder: verifying a signature requires the issuer\u2019s secret (for HMAC-based algorithms) or public key (for RSA/ECDSA-based ones), neither of which this tool has or should ask for. A decoder answers "what does this token claim?"; a verifier answers "can I trust that claim?", a genuinely different question requiring information this tool never has access to.',
    features: [
      { title: 'Decodes header and payload', description: 'Both segments shown as readable, formatted JSON.', icon: HiOutlineCodeBracketSquare },
      { title: 'Honest about scope', description: 'Clearly states that the signature isn\u2019t verified, not just decoded.', icon: HiOutlineExclamationTriangle },
      { title: 'Works entirely in your browser', description: 'The token is never sent anywhere, which matters since JWTs often carry sensitive claims.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste a JWT.', 'The decoded header and payload appear instantly.'],
    useCases: ['Inspecting what claims a JWT actually contains during development', 'Debugging an authentication issue by checking a token\u2019s expiration or claims', 'Verifying a token\u2019s header specifies the expected signing algorithm', 'Learning how JWTs are structured by decoding a real example'],
    privacy: NO_FILE_PRIVACY,
  },

  'md5-hash-generator': {
    about:
      'Generates an MD5 hash from any text, a fixed 32-character hexadecimal fingerprint of the input.\n\nWorth being direct about MD5\u2019s actual status: it\u2019s been cryptographically broken since 2004, when practical collision attacks (two different inputs producing the same hash) were first demonstrated, and it should never be used for password storage, digital signatures, or anything security-sensitive. MD5 remains genuinely useful for what it\u2019s NOT broken for, though: quick file integrity checks, cache-busting identifiers, and legacy system compatibility, where the goal is detecting accidental changes rather than defending against a deliberate attacker.',
    features: [
      { title: 'Instant MD5 hash', description: 'Updates as you type.', icon: HiOutlineFingerPrint },
      { title: 'Honest about MD5\u2019s limits', description: 'Clear that this isn\u2019t suitable for password or security use.', icon: HiOutlineExclamationTriangle },
      { title: 'Works entirely in your browser', description: 'Nothing you type here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Type or paste text.', 'The MD5 hash appears instantly.', 'Copy the result.'],
    useCases: ['Checking file or data integrity for accidental corruption', 'Generating a cache-busting or deduplication identifier', 'Working with a legacy system that specifically expects MD5', 'Learning how hash functions work with a simple, fast example'],
    privacy: NO_FILE_PRIVACY,
  },

  'sha1-hash-generator': {
    about:
      'Generates a SHA-1 hash from any text, a fixed 40-character hexadecimal fingerprint of the input, computed using the browser\u2019s native Web Crypto API.\n\nSHA-1 is a step up from MD5 but is also now considered cryptographically weak: a practical collision attack (the "SHAttered" attack) was demonstrated in 2017, leading major browsers and certificate authorities to phase it out for security-critical use like TLS certificates. It still shows up in legacy systems and version control (Git historically used SHA-1 for commit hashes), which is the realistic context this tool is most useful for today.',
    features: [
      { title: 'Instant SHA-1 hash', description: 'Updates as you type, using the browser\u2019s native Web Crypto API.', icon: HiOutlineFingerPrint },
      { title: 'Honest about SHA-1\u2019s limits', description: 'Clear that this is deprecated for security-critical use.', icon: HiOutlineExclamationTriangle },
      { title: 'Works entirely in your browser', description: 'Nothing you type here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Type or paste text.', 'The SHA-1 hash appears instantly.', 'Copy the result.'],
    useCases: ['Working with a legacy system or Git-era tool that expects SHA-1', 'Checking data integrity in a non-security-critical context', 'Comparing SHA-1 output against a known reference value', 'Learning the difference between hash algorithm generations'],
    privacy: NO_FILE_PRIVACY,
  },

  'sha256-hash-generator': {
    about:
      'Generates a SHA-256 hash from any text, a fixed 64-character hexadecimal fingerprint of the input, computed using the browser\u2019s native Web Crypto API.\n\nSHA-256 is part of the SHA-2 family and is currently considered cryptographically secure, the same algorithm underlying Bitcoin\u2019s proof-of-work, TLS certificate signatures, and countless password-hashing and data-integrity systems in active use today. Unlike MD5 or SHA-1, no practical collision attack against SHA-256 is currently known, which is exactly why it remains the standard, safe default choice whenever a genuinely secure hash is actually needed.',
    features: [
      { title: 'Instant SHA-256 hash', description: 'Updates as you type, using the browser\u2019s native Web Crypto API.', icon: HiOutlineFingerPrint },
      { title: 'Currently secure', description: 'No practical collision attack against SHA-256 is known.', icon: HiOutlineShieldCheck },
      { title: 'Works entirely in your browser', description: 'Nothing you type here is ever sent anywhere.', icon: HiOutlineLockClosed },
    ],
    howToUse: ['Type or paste text.', 'The SHA-256 hash appears instantly.', 'Copy the result.'],
    useCases: ['Generating a secure checksum for file or data integrity verification', 'Creating a deterministic identifier from a piece of data', 'Learning how modern, currently-secure hash functions work', 'Comparing SHA-256 output against a known reference value'],
    privacy: NO_FILE_PRIVACY,
  },

  'sha512-hash-generator': {
    about:
      'Generates a SHA-512 hash from any text, a fixed 128-character hexadecimal fingerprint of the input, computed using the browser\u2019s native Web Crypto API.\n\nSHA-512 is SHA-256\u2019s larger sibling in the SHA-2 family, operating on 64-bit words instead of 32-bit ones, which makes it noticeably faster than SHA-256 on modern 64-bit hardware despite producing a longer output. Both are currently considered cryptographically secure; SHA-512 is typically chosen specifically when a longer hash or faster performance on 64-bit systems matters more than the more commonly-seen SHA-256 length.',
    features: [
      { title: 'Instant SHA-512 hash', description: 'Updates as you type, using the browser\u2019s native Web Crypto API.', icon: HiOutlineFingerPrint },
      { title: 'Currently secure', description: 'Part of the same SHA-2 family as SHA-256, with no known practical attack.', icon: HiOutlineShieldCheck },
      { title: 'Works entirely in your browser', description: 'Nothing you type here is ever sent anywhere.', icon: HiOutlineLockClosed },
    ],
    howToUse: ['Type or paste text.', 'The SHA-512 hash appears instantly.', 'Copy the result.'],
    useCases: ['Generating a longer, secure checksum for data integrity', 'Working with a system that specifically expects SHA-512', 'Comparing hash performance characteristics on 64-bit systems', 'Comparing SHA-512 output against a known reference value'],
    privacy: NO_FILE_PRIVACY,
  },

  'json-to-csv': {
    about:
      'Converts a JSON array of objects into CSV format, the flat, spreadsheet-friendly structure most data tools and spreadsheet software expect.\n\nJSON and CSV represent data fundamentally differently: JSON naturally nests objects inside objects, while CSV is strictly flat, rows and columns, one value per cell. This converter takes the keys from your JSON objects and turns them into column headers, using every unique key found across all objects so a field that only appears in some objects still gets its own column. Values containing commas, quotes, or line breaks are automatically wrapped in quotes and properly escaped, following the standard CSV format (RFC 4180), so the result opens correctly in Excel, Google Sheets, or any other spreadsheet tool without corrupting on the first comma it encounters.',
    features: [
      { title: 'Handles all keys correctly', description: 'Every unique key across all objects becomes its own column.', icon: HiOutlineTableCells },
      { title: 'Proper CSV escaping', description: 'Values with commas, quotes, or line breaks are correctly quoted per the CSV standard.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste a JSON array of objects.', 'The CSV result appears instantly.', 'Copy the result.'],
    useCases: ['Exporting API response data into a spreadsheet-ready format', 'Converting a JSON data export for import into Excel or Google Sheets', 'Preparing JSON data for a tool that only accepts CSV', 'Flattening structured data for a simple tabular view'],
    privacy: NO_FILE_PRIVACY,
  },

  'csv-to-json': {
    about:
      'Converts CSV data into a JSON array of objects, using the first row as field names for every object that follows.\n\nThis uses a genuine, quote-aware CSV parser rather than simply splitting each line on commas, a naive approach that breaks the moment a field legitimately contains a comma inside quotes, like an address or a name with a suffix ("Smith, Jr."). Correctly handling quoted fields, including fields with embedded commas or escaped quotes, is exactly what separates a real CSV parser from one that only works on the simplest possible input.',
    features: [
      { title: 'Real CSV parsing', description: 'Correctly handles quoted fields with embedded commas, not naive comma-splitting.', icon: HiOutlineTableCells },
      { title: 'First row as field names', description: 'Column headers become the JSON object keys automatically.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste CSV data, with headers in the first row.', 'The JSON result appears instantly.', 'Copy the result.'],
    useCases: ['Converting an exported spreadsheet into JSON for an API or script', 'Preparing CSV data for a tool or database that expects JSON', 'Inspecting spreadsheet data in a more structured, nested-friendly format', 'Quickly checking CSV data for formatting issues by seeing it as JSON'],
    privacy: NO_FILE_PRIVACY,
  },

  'xml-to-json': {
    about:
      'Converts XML data into JSON format, walking the document\u2019s actual element structure rather than just extracting text.\n\nRepeated sibling elements (multiple <item> tags at the same level, for instance) are correctly recognized and converted into a JSON array, while a single occurrence becomes a plain nested object, matching how the data is genuinely structured rather than forcing everything into one shape. This is the detail that separates a real XML-to-JSON conversion from a naive one: getting arrays right for repeated elements is exactly where simplistic converters tend to fail.',
    features: [
      { title: 'Correct array detection', description: 'Repeated sibling elements become a JSON array automatically.', icon: HiOutlineTableCells },
      { title: 'Real XML parsing', description: 'Uses the browser\u2019s own XML parser, not a regex approximation.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste your XML.', 'The JSON result appears instantly.', 'Copy the result.'],
    useCases: ['Converting an XML API response into JSON for easier processing', 'Inspecting a configuration file\u2019s structure in a more familiar format', 'Preparing XML data for a tool or script that expects JSON', 'Migrating data from an XML-based system to a JSON-based one'],
    privacy: NO_FILE_PRIVACY,
  },

  'json-to-xml': {
    about:
      'Converts JSON data into XML format, turning an array under a key into repeated sibling XML elements, the reverse of how this site\u2019s XML to JSON tool interprets repeated elements.\n\nSpecial characters that would otherwise be misread as markup (<, >, and &) are automatically escaped in the output, so a value containing one of these characters doesn\u2019t produce broken, unparseable XML. The result is a genuine, well-formed XML document, not just a text approximation of one.',
    features: [
      { title: 'Correct array handling', description: 'A JSON array becomes repeated sibling XML elements.', icon: HiOutlineTableCells },
      { title: 'Proper character escaping', description: 'Special XML characters in values are automatically escaped.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste JSON data.', 'The XML result appears instantly.', 'Copy the result.'],
    useCases: ['Converting JSON data for a system that specifically requires XML', 'Preparing JSON API data for an XML-based integration', 'Migrating data from a JSON-based system to an XML-based one', 'Generating a simple XML document from structured data'],
    privacy: NO_FILE_PRIVACY,
  },

  'yaml-to-json': {
    about:
      'Converts YAML into JSON, handling the common subset of YAML most configuration files and data exports actually use: nested key-value mappings, numbers, booleans, and quoted or plain strings.\n\nWorth being upfront about scope: this covers the YAML patterns that show up in the overwhelming majority of real config files and data exports, but it doesn\u2019t attempt the complete YAML specification, which includes considerably more complex features like flow-style inline sequences, anchors and references, and multi-document files. For the common case, straightforward nested settings and values, this handles it correctly and reliably.',
    features: [
      { title: 'Handles nested mappings', description: 'Correctly parses YAML\u2019s indentation-based nesting into nested JSON objects.', icon: HiOutlineTableCells },
      { title: 'Correct type detection', description: 'Numbers, booleans, and strings are converted to their proper JSON types.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste your YAML.', 'The JSON result appears instantly.', 'Copy the result.'],
    useCases: ['Converting a YAML configuration file into JSON for a script or tool', 'Inspecting a YAML file\u2019s structure in a more familiar format', 'Preparing YAML-based settings for a JSON-only system', 'Learning YAML structure by comparing it against its JSON equivalent'],
    privacy: NO_FILE_PRIVACY,
  },

  'json-to-yaml': {
    about:
      'Converts JSON into YAML, producing clean, properly indented output using YAML\u2019s common mapping style rather than its more complex flow syntax.\n\nYAML is often preferred over JSON for configuration files specifically because it\u2019s more readable without brackets and quotes cluttering every line, which is exactly the style this converter produces: nested objects become indented mappings, and the result reads naturally as a configuration file would.',
    features: [
      { title: 'Clean, readable output', description: 'Properly indented YAML mappings, not flow-style clutter.', icon: HiOutlineTableCells },
      { title: 'Handles nested objects', description: 'JSON objects convert into correctly indented nested YAML.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste JSON data.', 'The YAML result appears instantly.', 'Copy the result.'],
    useCases: ['Converting JSON data into a YAML configuration file', 'Preparing JSON API responses for a YAML-based system', 'Making JSON data more readable for a config file or documentation', 'Migrating settings from a JSON-based system to a YAML-based one'],
    privacy: NO_FILE_PRIVACY,
  },

  'csv-to-xml': {
    about:
      'Converts CSV data into XML format by first parsing the CSV into structured rows, then building a well-formed XML document with each row as its own element.\n\nThis combines two verified conversion steps into one: the same quote-aware CSV parsing used by this site\u2019s CSV to JSON tool, followed by the same array-to-repeated-elements logic used by the JSON to XML tool, so the resulting XML correctly reflects the CSV\u2019s structure, one row per XML element, with proper escaping for any special characters in the data.',
    features: [
      { title: 'Real CSV parsing', description: 'Correctly handles quoted fields, not naive comma-splitting.', icon: HiOutlineTableCells },
      { title: 'Well-formed XML output', description: 'Special characters are properly escaped in the result.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste CSV data with headers in the first row.', 'The XML result appears instantly.', 'Copy the result.'],
    useCases: ['Converting spreadsheet data for a system that requires XML', 'Preparing CSV exports for an XML-based data feed', 'Migrating tabular data into an XML-based format', 'Generating a simple XML document from a spreadsheet'],
    privacy: NO_FILE_PRIVACY,
  },

  'xml-to-csv': {
    about:
      'Converts XML data into CSV format, extracting a repeated element structure (like multiple <row> or <item> tags) into a flat spreadsheet table.\n\nThis works best on XML that already represents a list of similar records, a common export format from APIs and databases, since CSV itself can only represent flat, tabular data. Each repeated element becomes one CSV row, with its child elements becoming columns, converting XML\u2019s nested structure into the flat table format that spreadsheet software actually expects.',
    features: [
      { title: 'Detects repeated records', description: 'Finds the repeated element structure and converts it into table rows.', icon: HiOutlineTableCells },
      { title: 'Proper CSV escaping', description: 'Values with commas or quotes are correctly escaped in the output.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste XML containing a list of similar records.', 'The CSV result appears instantly.', 'Copy the result.'],
    useCases: ['Converting an XML API response into a spreadsheet-ready format', 'Extracting tabular data from an XML export for analysis', 'Preparing XML data for import into Excel or Google Sheets', 'Flattening a list of XML records into a simple table'],
    privacy: NO_FILE_PRIVACY,
  },

  'excel-to-json': {
    about:
      'Converts an Excel spreadsheet\u2019s first sheet into a JSON array of objects, using the header row as field names for every row that follows, the same convention used by this site\u2019s CSV to JSON tool.\n\nThis reads the actual binary spreadsheet file directly in your browser, correctly handling Excel\u2019s cell types (numbers stay numbers, dates convert sensibly, text stays text) rather than treating everything as a plain string the way a naive CSV-based approach might.',
    features: [
      { title: 'Reads real Excel files', description: 'Supports both .xlsx and legacy .xls formats.', icon: HiOutlineTableCells },
      { title: 'Preserves cell types', description: 'Numbers and text are converted to their correct JSON types.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'The file is never uploaded to a server.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Upload an Excel file.', 'The JSON result from the first sheet appears automatically.', 'Copy the result.'],
    useCases: ['Converting a spreadsheet export into JSON for an API or script', 'Extracting data from an Excel report for further processing', 'Preparing spreadsheet data for a JSON-only system or database', 'Quickly inspecting an Excel file\u2019s data in a structured format'],
    supportedFormats: { input: 'XLSX, XLS', output: 'JSON', maxSize: '25 MB' },
    privacy: NO_FILE_PRIVACY,
  },

  'csv-to-excel': {
    about:
      'Converts CSV data into a genuine, downloadable Excel spreadsheet file (.xlsx), not just a renamed text file.\n\nA CSV file often opens in Excel just fine, but it\u2019s not actually an Excel file, it\u2019s plain text that Excel happens to interpret. This tool creates a real .xlsx file with proper spreadsheet formatting, useful specifically when a system or workflow requires an actual Excel file rather than a CSV that merely looks similar once opened.',
    features: [
      { title: 'Real Excel output', description: 'Generates a genuine .xlsx file, not a renamed CSV.', icon: HiOutlineTableCells },
      { title: 'Quote-aware CSV parsing', description: 'Correctly handles quoted fields with embedded commas.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste CSV data with headers in the first row.', 'Click Download as Excel.'],
    useCases: ['Converting a CSV export into a genuine Excel file for a system that requires one', 'Preparing CSV data for sharing as a proper spreadsheet', 'Converting scraped or generated CSV data into an editable Excel workbook', 'Creating a quick Excel file from pasted tabular data'],
    supportedFormats: { input: 'CSV', output: 'XLSX' },
    privacy: NO_FILE_PRIVACY,
  },

  'random-name-picker': {
    about:
      'Picks one random name from a list, useful whenever a decision needs to be made fairly among a group of people rather than by whoever happens to volunteer first or loudest.\n\nEach name gets an equal, genuinely uniform chance of being selected, regardless of the order it was entered in or how many names are on the list. This is the kind of tool that quietly settles a lot of small, low-stakes group decisions: who goes first, who gets picked for a task, or who wins a small giveaway, without any single person needing to make the call themselves.',
    features: [
      { title: 'Any list size', description: 'Works with two names or two hundred.', icon: HiOutlineUserGroup },
      { title: 'Genuinely fair selection', description: 'Every name has an equal chance regardless of list order.', icon: HiOutlineScale },
      { title: 'Works entirely in your browser', description: 'The names you enter are never sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Type each name on its own line.', 'Click Pick Random Name.'],
    useCases: ['Deciding who goes first in a game or activity', 'Randomly selecting a winner for a small giveaway', 'Assigning a task fairly among a group of people', 'Picking a random name for a raffle or drawing'],
    privacy: NO_FILE_PRIVACY,
  },

  'random-word-generator': {
    about:
      'Generates one or more random words, useful for creative writing prompts, word games, or simply needing a random word to build something around.\n\nEach word is drawn from a curated set covering a range of everyday and evocative vocabulary, giving genuinely varied results rather than the same handful of words repeating constantly.',
    features: [
      { title: 'Generate multiple at once', description: 'Choose 1, 3, 5, or 10 words per generation.', icon: HiOutlineLanguage },
      { title: 'Instant results', description: 'New words appear immediately on each click.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Choose how many words to generate.', 'Click Generate.'],
    useCases: ['Getting a writing prompt or story starter', 'Playing a word-association or charades-style game', 'Generating a random codename or placeholder name', 'Sparking creative inspiration when stuck'],
    privacy: NO_FILE_PRIVACY,
  },

  'random-number-generator': {
    about:
      'Generates a random whole number within a custom minimum and maximum range, both bounds inclusive.\n\nThis is genuine uniform randomness across the specified range, not weighted toward the middle or any particular value, verified across thousands of trial generations to confirm every result actually stays within the bounds specified, a check worth doing explicitly since an off-by-one error in a range calculation is a surprisingly easy, common mistake.',
    features: [
      { title: 'Custom range', description: 'Set any minimum and maximum, both inclusive.', icon: HiOutlineHashtag },
      { title: 'Genuinely uniform', description: 'Every number in the range has an equal chance of appearing.', icon: HiOutlineScale },
      { title: 'Works entirely in your browser', description: 'Nothing is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Enter a minimum and maximum value.', 'Click Generate.'],
    useCases: ['Picking a random number for a game or raffle', 'Generating a test value within a specific range', 'Settling a decision between two people fairly', 'Simulating a random draw for a classroom or group activity'],
    privacy: NO_FILE_PRIVACY,
  },

  'coin-flipper': {
    about:
      'Flips a virtual coin for a random heads or tails result, the digital equivalent of an actual coin toss.\n\nEach flip is a genuinely independent 50/50 chance, verified across thousands of simulated flips to land in a reasonable, unbiased distribution rather than favoring one side. Useful for the same everyday situations a real coin gets used for: settling a quick decision between two options without either side feeling like they had more control over the outcome.',
    features: [
      { title: 'Genuine 50/50 odds', description: 'Verified unbiased across thousands of simulated flips.', icon: HiOutlineScale },
      { title: 'Simple animation', description: 'A quick flip animation before the result appears.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Click Flip Coin.', 'Wait for the result.'],
    useCases: ['Settling a quick decision between two options', 'Deciding who goes first in a game', 'Simulating probability experiments for a math or statistics lesson', 'Making a call in a low-stakes decision without bias'],
    privacy: NO_FILE_PRIVACY,
  },

  'dice-roller': {
    about:
      'Rolls one or more virtual six-sided dice, each roll a genuinely independent, uniform result from 1 to 6.\n\nRolling multiple dice at once is useful for board games and tabletop role-playing that call for it, and each die\u2019s result is entirely independent of the others, matching how real physical dice behave rather than any artificial correlation between them.',
    features: [
      { title: 'Roll up to six dice', description: 'Choose how many dice to roll at once.', icon: HiOutlineCube },
      { title: 'Genuinely independent rolls', description: 'Each die\u2019s result has no bearing on the others.', icon: HiOutlineScale },
      { title: 'Works entirely in your browser', description: 'Nothing is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Choose how many dice to roll.', 'Click Roll Dice.'],
    useCases: ['Playing a board game without physical dice on hand', 'Running a tabletop role-playing session', 'Teaching probability with a hands-on random example', 'Settling a decision that calls for a dice roll'],
    privacy: NO_FILE_PRIVACY,
  },

  'choice-wheel-spinner': {
    about:
      'Spins a wheel divided into custom segments to randomly pick one option from a list, a visual, tactile way to make a random selection rather than just reading a plain text result.\n\nThe wheel spins through several full rotations before landing, and the segment that actually ends up under the pointer is calculated precisely from the final rotation angle, tested against multiple rotation scenarios (including landing exactly on a segment boundary and completing multiple full spins) to confirm the declared winner always genuinely matches where the wheel visually stopped.',
    features: [
      { title: 'Custom options', description: 'Enter any list of choices, and the wheel divides itself evenly.', icon: HiOutlineArrowPath },
      { title: 'Visually verified fairness', description: 'The declared winner is calculated precisely from the actual final rotation.', icon: HiOutlineScale },
      { title: 'Works entirely in your browser', description: 'Nothing is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Enter your options, one per line.', 'Click Spin the Wheel.', 'Wait for it to land.'],
    useCases: ['Deciding where to eat among a group of options', 'Randomly assigning tasks or turns in a game', 'Making a fun, visual decision instead of a plain coin flip', 'Running a simple prize wheel for a small event'],
    privacy: NO_FILE_PRIVACY,
  },

  'digital-signature-generator': {
    about:
      'Lets you draw a signature directly on screen using a mouse or finger, then download it as a transparent PNG image ready to drop into a document.\n\nThe drawing surface responds to both mouse and touch input, so it works the same way on a laptop trackpad, a mouse, or directly on a phone or tablet screen. The exported image has a transparent background rather than a solid white rectangle, which matters specifically for placing the signature onto an existing document or form without covering up whatever\u2019s behind it.',
    features: [
      { title: 'Mouse and touch support', description: 'Draw naturally on a trackpad, mouse, or touchscreen.', icon: HiOutlinePencil },
      { title: 'Transparent background', description: 'The downloaded PNG has no background, ready to place onto a document.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Your signature is never uploaded anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Draw your signature in the box using your mouse or finger.', 'Click Download PNG.'],
    useCases: ['Creating a signature image to insert into a PDF or Word document', 'Signing a digital form that accepts an image upload', 'Making a personal signature stamp for repeated use', 'Quickly generating a signature without a scanner'],
    privacy: NO_FILE_PRIVACY,
  },

  'aes-encryption': {
    about:
      'Encrypts or decrypts text using AES-256-GCM, a genuinely strong, currently-recommended encryption standard, the same algorithm family used to secure modern web traffic (TLS 1.3) and countless other security-critical systems.\n\nWorth understanding what actually happens here, since it\u2019s more than just "type a password, get scrambled text": your passphrase itself is never used directly as the encryption key. Instead, it\u2019s run through PBKDF2 (a deliberately slow key-derivation function) 100,000 times along with a random salt, producing the actual key used for encryption. This matters because it makes a brute-force attack against a weak passphrase meaningfully harder than if the passphrase were used directly. Each encryption also generates a fresh random salt and initialization vector, meaning encrypting the exact same text with the exact same passphrase twice produces genuinely different output each time, a real security property, not a quirk.\n\nThe salt and initialization vector are bundled together with the encrypted result, so decryption only needs the passphrase and the encrypted text, nothing else to keep track of separately.',
    features: [
      { title: 'AES-256-GCM', description: 'A currently-recommended, strong encryption standard.', icon: HiOutlineLockClosed },
      { title: 'Proper key derivation', description: 'Your passphrase is strengthened via PBKDF2 with 100,000 iterations, not used directly.', icon: HiOutlineShieldCheck },
      { title: 'Works entirely in your browser', description: 'Your text and passphrase are never sent anywhere.', icon: HiOutlineCloudArrowUp },
    ],
    howToUse: ['Choose Encrypt or Decrypt.', 'Enter the text and a passphrase.', 'Click the button to process it.'],
    useCases: ['Encrypting a sensitive note before storing or sharing it', 'Learning how modern authenticated encryption actually works', 'Encrypting a message to share through a channel you don\u2019t fully trust', 'Testing encryption/decryption behavior for a development project'],
    privacy: NO_FILE_PRIVACY,
  },

  'htpasswd-generator': {
    about:
      'Generates an Apache htpasswd entry from a username and password, using the SHA password format ({SHA} followed by a base64-encoded SHA-1 hash), one of several real, documented formats Apache\u2019s basic authentication actually accepts.\n\nWorth being direct about where this format sits today: Apache also supports bcrypt-based hashing, which is considered stronger and is generally the better choice for a new setup where the tooling to generate it is available. The SHA format used here remains genuinely useful specifically because it\u2019s simple, doesn\u2019t require a random salt to be tracked separately, and is still accepted by Apache for straightforward basic-auth setups, legacy compatibility, and situations where a bcrypt-generating tool isn\u2019t readily available.',
    features: [
      { title: 'Real Apache SHA format', description: 'Produces a genuine, documented format Apache actually accepts.', icon: HiOutlineUserCircle },
      { title: 'Instant generation', description: 'No server round trip, just your browser\u2019s native cryptography.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'The password is never sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Enter a username and password.', 'Click Generate.', 'Copy the resulting line into your .htpasswd file.'],
    useCases: ['Setting up basic authentication for an Apache-protected directory', 'Adding a new user to an existing .htpasswd file', 'Generating a quick auth entry for a staging or internal server', 'Testing Apache basic-auth configuration during development'],
    privacy: NO_FILE_PRIVACY,
  },

  'rsa-key-pair-generator': {
    about:
      'Generates a real 2048-bit RSA public/private key pair using your browser\u2019s native Web Crypto API, the same cryptographic engine browsers use for TLS and other security-critical operations, not a simulated or educational approximation.\n\n2048 bits is the current, genuinely recommended minimum key size for RSA; smaller keys are considered breakable with enough computing resources, which is exactly why modern systems have moved away from anything shorter. The public key can be shared freely and is meant to be, it\u2019s what someone else uses to encrypt something only your private key can decrypt. The private key must never be shared, and it\u2019s worth being direct about a real limitation of doing this in a browser: since the key pair exists only in this page\u2019s memory, refreshing or closing the tab loses it permanently unless you\u2019ve copied it somewhere safe first.',
    features: [
      { title: 'Real 2048-bit RSA', description: 'Generated using your browser\u2019s native, standards-based cryptography.', icon: HiOutlineKey },
      { title: 'Standard PEM format', description: 'Output in the widely-used PEM format most tools and systems expect.', icon: HiOutlineDocumentText },
      { title: 'Works entirely in your browser', description: 'The private key is never transmitted anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Click Generate Key Pair.', 'Copy the public and private keys.', 'Save the private key securely \u2014 it exists only in this page and is lost on refresh.'],
    useCases: ['Generating a key pair for testing an encryption or SSH setup', 'Learning how public-key cryptography actually works', 'Creating a quick key pair for a development or learning project', 'Generating keys for a system that accepts standard PEM-formatted RSA keys'],
    privacy: NO_FILE_PRIVACY,
  },

  'subnet-calculator': {
    about:
      'Calculates the network address, broadcast address, subnet mask, and usable host range from an IP address and CIDR prefix length, the standard set of numbers anyone configuring a network needs to know before assigning addresses within it.\n\nCIDR notation (like /24) expresses how many bits of an IP address are reserved for the network portion versus the host portion, and getting the resulting boundaries right matters concretely: assigning a device an address outside its subnet\u2019s valid range, or using the network or broadcast address for an actual device, are both genuine, common misconfigurations that cause real connectivity problems. This calculator handles the underlying binary math precisely, verified against well-known, independently checkable reference subnets before being relied on here.',
    features: [
      { title: 'Full subnet breakdown', description: 'Network, broadcast, subnet mask, and usable host range, all at once.', icon: HiOutlineCalculator },
      { title: 'Verified math', description: 'Checked against well-known, independently verifiable subnet examples.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Pure calculation \u2014 nothing is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Enter an IP address.', 'Enter the CIDR prefix length (0\u201332).', 'The full subnet breakdown appears instantly.'],
    useCases: ['Planning IP address assignments for a home or office network', 'Verifying a subnet\u2019s valid host range before configuring a device', 'Learning how CIDR notation and subnetting actually work', 'Double-checking a network configuration during troubleshooting'],
    privacy: NO_FILE_PRIVACY,
  },

  'my-ip-address': {
    about:
      'Shows your current public IP address, the address websites and services actually see when your device connects to them.\n\nThis is genuinely useful in a few specific, common situations: confirming a VPN is actually routing your traffic (your IP should change once connected), providing your IP to someone setting up remote access or a firewall rule, or simply understanding what address is visible to the outside world versus your device\u2019s local network address, which is a different, private number not visible externally at all.',
    features: [
      { title: 'Instant lookup', description: 'Your public IP appears automatically when the page loads.', icon: HiOutlineGlobeAlt },
      { title: 'Copy with one click', description: 'Quickly copy the address for sharing or configuration.', icon: HiOutlineClipboard },
    ],
    howToUse: ['Open the page \u2014 your IP address appears automatically.'],
    useCases: ['Confirming a VPN connection is actually active', 'Providing your IP address for a firewall or remote access rule', 'Checking whether your IP has changed after a router restart', 'Understanding the difference between your public and local network address'],
    privacy:
      'Determining your public IP address requires the request to reach a server, since your IP is inherently visible to whatever server responds to your request, the same way it would be for any website you visit. This tool reads that IP directly from the incoming request; it isn\u2019t logged or stored anywhere beyond what\u2019s needed to answer this one request.',
  },

  'dns-lookup': {
    about:
      'Looks up a domain\u2019s DNS records across six common types: A and AAAA (the actual IP addresses a domain points to), MX (mail server records), TXT (often used for domain verification and email security policies), NS (which nameservers manage the domain), and CNAME (an alias pointing to another domain).\n\nThis performs the same kind of query your own computer does every time it turns a domain name into a connectable address, just exposed directly and across every record type at once rather than just the one needed for a single connection.',
    features: [
      { title: 'Six record types at once', description: 'A, AAAA, MX, TXT, NS, and CNAME, checked together.', icon: HiOutlineServerStack },
      { title: 'Real DNS resolution', description: 'Genuine queries against the domain, not cached or simulated data.', icon: HiOutlineCheckCircle },
    ],
    howToUse: ['Enter a domain name.', 'Click Lookup.', 'Records that exist for the domain appear grouped by type.'],
    useCases: ['Verifying DNS records after changing a domain\u2019s nameservers', 'Checking that an email security TXT record (like SPF or DKIM) is set correctly', 'Confirming a domain\u2019s A record points to the expected server', 'Troubleshooting why a domain isn\u2019t resolving as expected'],
    privacy:
      'The domain name you enter is sent to this site\u2019s server, which performs the actual DNS lookup on your behalf, since a browser cannot make raw DNS queries directly. Only the domain itself is involved; nothing else about your device or browsing is sent or stored.',
  },

  'http-header-checker': {
    about:
      'Fetches and displays the HTTP response headers a URL actually returns: server information, caching directives, content type, security headers, and anything else the server includes in its response.\n\nHeaders carry a lot of information that never shows up in the rendered page itself, things like which server software is running, how long a browser should cache the response, or whether security headers like Content-Security-Policy are actually configured. This tool tries a lightweight HEAD request first, falling back to a full GET request for the servers that don\u2019t handle HEAD requests correctly, a real, common enough case worth handling rather than just failing.',
    features: [
      { title: 'Full header inspection', description: 'See every header a server actually returns.', icon: HiOutlineListBullet },
      { title: 'Handles HEAD-averse servers', description: 'Falls back to GET automatically if HEAD isn\u2019t supported.', icon: HiOutlineCheckCircle },
    ],
    howToUse: ['Enter a URL.', 'Click Check.', 'All response headers appear, along with the status code.'],
    useCases: ['Checking whether security headers are configured on a website', 'Verifying caching headers are set as expected', 'Identifying what server software or CDN a site is running', 'Debugging an unexpected response from an API endpoint'],
    privacy:
      'The URL you enter is sent to this site\u2019s server, which fetches it on your behalf and returns the response headers, since a browser\u2019s own security restrictions (CORS) block reading another site\u2019s headers directly. Only the URL you provide is involved in this request.',
  },

  'url-redirect-checker': {
    about:
      'Traces a URL\u2019s complete redirect chain, following each hop one at a time until it reaches a final, non-redirecting destination, showing every intermediate URL and its status code along the way.\n\nA single "short link" can genuinely hide multiple redirects stacked on top of each other, sometimes across several different domains, and each additional hop adds real latency to the final page load. This is useful for auditing exactly what a link actually does before sharing or clicking it, or diagnosing why a URL takes longer to load than it should.',
    features: [
      { title: 'Full redirect chain', description: 'Every hop shown individually, not just the final destination.', icon: HiOutlineArrowsRightLeft },
      { title: 'Status code per hop', description: 'See exactly which redirect type (301, 302, etc.) each step uses.', icon: HiOutlineCheckCircle },
    ],
    howToUse: ['Enter a URL.', 'Click Check.', 'The full chain of redirects appears, ending at the final destination.'],
    useCases: ['Auditing where a shortened or unfamiliar link actually leads before clicking it', 'Diagnosing unexpected slowness caused by multiple redirect hops', 'Verifying a URL redirect was set up correctly after a website migration', 'Checking whether a marketing link\u2019s tracking redirects are working as expected'],
    privacy:
      'The URL you enter is sent to this site\u2019s server, which follows the redirect chain on your behalf, since a browser\u2019s own security restrictions prevent reading intermediate redirect details directly from JavaScript. Only the URL you provide is involved in this request.',
  },

  'barcode-generator': {
    about:
      'Generates a real, scannable EAN-13 or UPC-A barcode from a product number, computing the checksum digit automatically using the exact algorithm defined in each format\u2019s specification, and rendering the actual bar-width pattern real scanners read, not a generic striped image that merely looks like a barcode.\n\nEAN-13 (used internationally) and UPC-A (its 12-digit counterpart, common in the US and Canada) both encode digits using a defined set of bar-width patterns per digit, arranged in a specific left-half and right-half structure with guard bars marking the start, middle, and end. Getting these patterns exactly right matters because a barcode that merely looks correct to the eye but doesn\u2019t follow the actual specification won\u2019t scan at all; this tool\u2019s encoding was checked against real, independently verifiable reference barcodes before being relied on here.\n\nThe checksum digit exists specifically to catch scanning errors: it\u2019s calculated from the other digits using a defined formula, and a barcode reader recalculates it on every scan to confirm the read was accurate. Enter just the product digits and this tool calculates that checksum for you automatically, the same way it would be assigned when a real barcode is issued.',
    features: [
      { title: 'EAN-13 and UPC-A', description: 'The two most common retail barcode formats.', icon: HiOutlineBarsArrowDown },
      { title: 'Automatic checksum', description: 'Calculated using each format\u2019s real, defined algorithm.', icon: HiOutlineCheckCircle },
      { title: 'Genuinely scannable output', description: 'Real bar-width encoding, verified against actual reference barcodes.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Choose EAN-13 or UPC-A.', 'Enter the product digits (checksum calculated automatically).', 'Download the resulting barcode as an SVG image.'],
    useCases: ['Generating a barcode for a product label or packaging mockup', 'Creating a test barcode for scanner or inventory software development', 'Learning how EAN-13 and UPC-A checksums are actually calculated', 'Producing a barcode image for a catalog or documentation'],
    privacy: NO_FILE_PRIVACY,
  },

  'barcode-scanner': {
    about:
      'Scans a barcode using your device\u2019s camera and reads its encoded value instantly, using the browser\u2019s native, standards-track barcode detection capability rather than a custom image-processing implementation.\n\nWorth being upfront about browser support: this relies on the BarcodeDetector API, which is currently available in Chrome, Edge, and other Chromium-based browsers on desktop and Android, but not yet in Firefox or Safari. Where it\u2019s available, detection happens directly through the browser\u2019s own optimized, hardware-accelerated capability rather than a slower, custom-built decoder; where it isn\u2019t, this tool says so plainly rather than pretending to work and silently failing.',
    features: [
      { title: 'Multiple barcode formats', description: 'Reads EAN-13, EAN-8, UPC-A, UPC-E, Code 128, and Code 39.', icon: HiOutlineCamera },
      { title: 'Real-time detection', description: 'Point your camera at a barcode and the result appears automatically.', icon: HiOutlineBolt },
      { title: 'Honest about browser support', description: 'Clearly states when your browser doesn\u2019t support the required capability, rather than failing silently.', icon: HiOutlineExclamationTriangle },
    ],
    howToUse: ['Click Start Scanning and allow camera access.', 'Point your camera at a barcode.', 'The decoded value appears automatically once detected.'],
    useCases: ['Quickly checking a product\u2019s barcode value without a dedicated scanner app', 'Testing barcode readability during packaging or label design', 'Looking up a product by scanning its barcode', 'Verifying a generated barcode actually decodes correctly'],
    privacy:
      'Camera video is processed entirely on your device to detect the barcode; no image or video is ever uploaded or sent anywhere.',
  },

  'qr-code-scanner': {
    about:
      'Scans a QR code using your device\u2019s camera and reads its content instantly, using the same native BarcodeDetector browser capability as this site\u2019s barcode scanner, applied specifically to the QR code format.\n\nQR codes can encode far more than barcodes typically do, a URL, a block of plain text, contact information, or a WiFi network\u2019s credentials, among other things, which is exactly why they\u2019ve become common for everything from restaurant menus to event check-ins. This tool decodes whatever content the code actually contains and displays it as plain text, ready to copy.',
    features: [
      { title: 'Real-time detection', description: 'Point your camera at a QR code and the content appears automatically.', icon: HiOutlineQrCode },
      { title: 'Reads any QR content', description: 'URLs, text, or any other data encoded in the code.', icon: HiOutlineBolt },
      { title: 'Honest about browser support', description: 'Clearly states when your browser doesn\u2019t support the required capability, rather than failing silently.', icon: HiOutlineExclamationTriangle },
    ],
    howToUse: ['Click Start Scanning and allow camera access.', 'Point your camera at a QR code.', 'The decoded content appears automatically once detected.'],
    useCases: ['Reading a QR code without a dedicated scanning app', 'Checking what a QR code actually links to before trusting it', 'Testing a generated QR code to confirm it decodes correctly', 'Reading a WiFi or contact QR code on a device without a built-in scanner'],
    privacy:
      'Camera video is processed entirely on your device to detect the QR code; no image or video is ever uploaded or sent anywhere.',
  },

  'svg-converter': {
    about:
      'Converts an SVG file into either a PNG image at any size you choose, or a real, multi-resolution .ico icon file, the two most common reasons an SVG needs to become a raster format: displaying it somewhere that doesn\u2019t support SVG, or using it as a favicon or app icon.\n\nSVG is a vector format, meaning it\u2019s defined by mathematical shapes rather than a fixed grid of pixels, and scales to any size without losing quality. That\u2019s exactly why converting it asks you to pick the output size explicitly, rather than guessing one from the file itself: an SVG\u2019s own dimensions are often meaningless or even absent, since the whole point of the format is that it doesn\u2019t need one until it\u2019s actually rendered somewhere.\n\nThe ICO output builds a genuine multi-resolution icon file bundling 16\u00d716, 32\u00d732, and 48\u00d748 versions together in one file, the standard structure browsers and Windows expect, not just a single image renamed with an .ico extension.',
    features: [
      { title: 'Choose PNG or ICO', description: 'Pick the output format that matches what you actually need it for.', icon: HiOutlineArrowsRightLeft },
      { title: 'Any PNG size', description: 'From 16\u00d716 up to 1024\u00d71024, chosen explicitly rather than guessed.', icon: HiOutlineArrowsPointingIn },
      { title: 'Real multi-resolution ICO', description: 'Bundles three standard sizes into one genuine .ico file, not a renamed PNG.', icon: HiOutlineCheckCircle },
    ],
    howToUse: ['Upload an SVG file.', 'Choose PNG or ICO as the output format.', 'For PNG, choose an output size.', 'Click Convert, then download the result.'],
    useCases: ['Converting a logo SVG into a PNG for a platform that doesn\u2019t accept SVG uploads', 'Generating a favicon.ico from a vector logo', 'Creating a specific-size PNG icon for an app or website', 'Preparing a vector graphic for a tool or document that only accepts raster images'],
    privacy: NO_FILE_PRIVACY,
  },

  'srt-to-vtt': {
    about:
      'Converts SubRip (.srt) subtitle files into the WebVTT (.vtt) format, the format modern web video players (including the HTML5 <track> element) actually expect.\n\nThe two formats are structurally very similar, both use numbered cues with start and end timestamps followed by the subtitle text, but they differ in two concrete ways this conversion handles: VTT requires a "WEBVTT" header line at the top of the file, and VTT timestamps use a period before the milliseconds (00:00:01.000) where SRT uses a comma (00:00:01,000). A file with the comma format simply won\u2019t be recognized as valid VTT by a browser.',
    features: [
      { title: 'Correct timestamp format', description: 'Converts SRT\u2019s comma-separated milliseconds to VTT\u2019s required period.', icon: HiOutlineClock },
      { title: 'Adds the required header', description: 'Prepends the WEBVTT header VTT files must start with.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste your SRT subtitle content.', 'The VTT result appears instantly.', 'Copy the result.'],
    useCases: ['Preparing subtitles for an HTML5 video player', 'Converting an existing SRT subtitle library for web use', 'Fixing a VTT file that was mistakenly saved with SRT-style timestamps', 'Adding captions to a video embedded on a website'],
    privacy: NO_FILE_PRIVACY,
  },

  'sql-to-markdown-table': {
    about:
      'Converts a SQL INSERT statement into a Markdown table, reading the column names and every row of values directly from the statement itself.\n\nThis is useful for documentation specifically: pasting a query result or seed-data statement into a README, wiki page, or pull request description as a clean, readable table instead of raw SQL. The tool reads the column list from the INSERT INTO (...) clause and pairs it with each VALUES (...) row that follows, correctly handling multiple rows in a single statement.',
    features: [
      { title: 'Reads real column names', description: 'Uses the actual column list from the INSERT statement, not guessed headers.', icon: HiOutlineTableCells },
      { title: 'Handles multiple rows', description: 'A single INSERT with several VALUES rows becomes a multi-row table.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste a SQL INSERT INTO statement.', 'The Markdown table result appears instantly.', 'Copy the result.'],
    useCases: ['Documenting seed data in a README or wiki page', 'Sharing sample query results in a pull request or ticket', 'Turning a database export into a readable table for documentation', 'Preparing sample data for a technical blog post'],
    privacy: NO_FILE_PRIVACY,
  },

  'json-to-html-table': {
    about:
      'Converts a JSON array of objects into a genuine, properly structured HTML table, using <thead> for column headers and <tbody> for the data rows, the semantically correct markup rather than a flat pile of <tr> tags.\n\nEvery unique key across all objects becomes its own column, and values are properly HTML-escaped so a value containing a character like < or & doesn\u2019t break the resulting markup.',
    features: [
      { title: 'Proper table semantics', description: 'Uses <thead> and <tbody>, not just a flat list of rows.', icon: HiOutlineTableCells },
      { title: 'HTML-escaped values', description: 'Special characters in your data won\u2019t break the resulting markup.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste a JSON array of objects.', 'The HTML table markup appears instantly.', 'Copy the result into your page.'],
    useCases: ['Turning an API response into a ready-to-use HTML table', 'Quickly previewing what JSON data looks like as a table', 'Generating table markup for a static site or email', 'Converting JSON data for a no-JavaScript display context'],
    privacy: NO_FILE_PRIVACY,
  },

  'yaml-to-toml': {
    about:
      'Converts YAML into TOML, both common configuration file formats, by first parsing the YAML into structured data and then writing it back out in TOML\u2019s key-value-and-section syntax.\n\nTOML represents nested data using bracketed section headers (like [details]) rather than YAML\u2019s indentation, which is exactly the structural difference this conversion handles, turning a nested YAML mapping into its own TOML table section. As with this site\u2019s YAML to JSON tool, this covers the common configuration-file subset of YAML \u2014 nested mappings and basic scalar types \u2014 rather than the complete specification.',
    features: [
      { title: 'Correct section structure', description: 'Nested YAML mappings become proper TOML [section] tables.', icon: HiOutlineTableCells },
      { title: 'Correct value formatting', description: 'Strings are quoted, numbers and booleans are left bare, matching TOML syntax.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste your YAML.', 'The TOML result appears instantly.', 'Copy the result.'],
    useCases: ['Migrating a configuration file from YAML to TOML', 'Converting settings for a tool that specifically expects TOML (like many Rust projects)', 'Comparing the same configuration in both formats', 'Learning TOML syntax by converting a familiar YAML file'],
    privacy: NO_FILE_PRIVACY,
  },

  'robots-txt-validator': {
    about:
      'Checks a robots.txt file for real syntax problems: unknown directives, a Disallow or Allow rule appearing before any User-agent line (which makes it ambiguous which crawler it applies to), a Disallow path missing its leading slash, and a missing User-agent entirely.\n\nA robots.txt file is one of the few places where a small syntax mistake can have an outsized, silent effect: search engines interpret the file literally, so a malformed rule might simply be ignored rather than erroring visibly, meaning a page you meant to block (or allow) quietly does the opposite of what you intended with no error message anywhere to catch it.',
    features: [
      { title: 'Checks real, common mistakes', description: 'Ordering issues, missing slashes, unknown directives, and more.', icon: HiOutlineExclamationTriangle },
      { title: 'Line-by-line results', description: 'Each issue is tied to the specific line it was found on.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste your robots.txt content.', 'Any issues found appear instantly, listed by line number.'],
    useCases: ['Checking a robots.txt file before deploying it to a live site', 'Debugging why a crawler seems to be ignoring an intended rule', 'Reviewing a robots.txt file inherited from a previous site setup', 'Learning correct robots.txt syntax by testing examples'],
    privacy: NO_FILE_PRIVACY,
  },

  'json-string-escape': {
    about:
      'Escapes or unescapes a string for safe use inside JSON, handling the encoding JSON requires for special characters like quotes, backslashes, newlines, and tabs.\n\nJSON strings can\u2019t contain a literal newline or an unescaped double quote, they have to be represented as \\n and \\" respectively, along with a handful of other escape sequences. This matters whenever a string is being manually inserted into a JSON document or hardcoded into JSON-producing code, since forgetting to escape even one special character produces invalid JSON that fails to parse.',
    features: [
      { title: 'Both directions', description: 'Escape a raw string for JSON, or unescape a JSON string back to plain text.', icon: HiOutlineCodeBracketSquare },
      { title: 'Handles all standard escapes', description: 'Quotes, backslashes, newlines, tabs, and other control characters.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Choose Escape or Unescape.', 'Paste your text.', 'The result appears instantly.'],
    useCases: ['Preparing a multi-line string to hardcode into a JSON file', 'Reading an escaped string from an API response or log file', 'Debugging a JSON parsing error caused by an unescaped character', 'Converting text with quotes into a JSON-safe string'],
    privacy: NO_FILE_PRIVACY,
  },

  'anagram-name-shuffler': {
    about:
      'Shuffles the letters of a name (or any word) into a random new arrangement, a genuine, uniformly random shuffle rather than a fixed or predictable pattern.\n\nSpaces are removed before shuffling, so a full name shuffles as one continuous set of letters rather than shuffling within each word separately, giving a more thorough scramble. This is mostly for fun and wordplay: finding a fun \u201canagram alias,\u201d generating a puzzle for someone else to unscramble, or just seeing what a familiar name looks like rearranged.',
    features: [
      { title: 'Genuinely random shuffle', description: 'A real, uniform shuffle, not a fixed or repeating pattern.', icon: HiOutlineArrowsRightLeft },
      { title: 'Instant results', description: 'Updates as you type.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing you type here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Type a name or word.', 'The shuffled anagram appears instantly.'],
    useCases: ['Creating a fun anagram alias or username', 'Generating a word-puzzle for someone to unscramble', 'Finding creative name variations for a project or story', 'Just seeing what a familiar name looks like scrambled'],
    privacy: NO_FILE_PRIVACY,
  },

  'sarcastic-text-alternator': {
    about:
      'Converts text into aLtErNaTiNg CaPs, the meme format widely recognized (thanks to the "mocking SpongeBob" meme) as conveying sarcasm or mockery in text form, where no tone of voice is available to carry it.\n\nEvery letter alternates between lowercase and uppercase in sequence, skipping over spaces and punctuation without breaking the alternating pattern, so the case genuinely alternates letter-by-letter rather than resetting at each word.',
    features: [
      { title: 'True letter-by-letter alternation', description: 'The pattern continues correctly across spaces and punctuation.', icon: HiOutlineFaceSmile },
      { title: 'Instant conversion', description: 'Updates as you type.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing you type here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Type your text.', 'The sarcastic-case result appears instantly.', 'Copy and paste it anywhere.'],
    useCases: ['Adding sarcastic emphasis to a message or comment', 'Creating the classic "mocking" meme text format', 'Making a reply stand out with an unmistakable tone', 'Just for fun \u2014 seeing what a phrase looks like in alternating caps'],
    privacy: NO_FILE_PRIVACY,
  },

  'tailwind-grid-generator': {
    about:
      'Visually builds a CSS grid layout using sliders for columns, rows, and gap size, then outputs the exact Tailwind CSS utility classes that produce it.\n\nRather than looking up Tailwind\u2019s grid-cols and gap class names and guessing at the right combination, this shows a live preview alongside the generated classes, so what you see is exactly what you\u2019ll get once pasted into a real project. Every class produced (grid-cols-1 through grid-cols-12, and Tailwind\u2019s standard gap scale) is a genuine, pre-defined Tailwind utility, not an arbitrary or invented value.',
    features: [
      { title: 'Live visual preview', description: 'See the grid layout update as you adjust columns, rows, and gap.', icon: HiOutlineTableCells },
      { title: 'Real Tailwind utilities', description: 'Every class generated is a genuine, standard Tailwind class.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Adjust columns, rows, and gap using the sliders.', 'Watch the live preview update.', 'Copy the generated Tailwind classes.'],
    useCases: ['Prototyping a grid layout before writing it into a project', 'Finding the right Tailwind gap class without checking documentation', 'Teaching or learning how Tailwind\u2019s grid utilities work', 'Quickly testing different grid configurations visually'],
    privacy: NO_FILE_PRIVACY,
  },

  'glassmorphism-builder': {
    about:
      'Visually builds a "frosted glass" UI effect (semi-transparent background, blur, and a subtle border) using sliders, then outputs the matching CSS, including the -webkit- prefixed version Safari still requires for backdrop-filter.\n\nGlassmorphism relies on backdrop-filter: blur(), a real CSS property that blurs whatever sits behind an element, combined with a translucent background so that blurred content shows through. Getting the combination of blur amount, background opacity, and border right by eye is fiddly through trial and error in dev tools; this shows the effect live against a sample background while you adjust each value.',
    features: [
      { title: 'Live visual preview', description: 'See the glass effect over a sample background as you adjust it.', icon: HiOutlineSwatch },
      { title: 'Includes the Safari prefix', description: 'Outputs both backdrop-filter and -webkit-backdrop-filter.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Adjust blur, background opacity, border opacity, and corner radius.', 'Watch the live preview update.', 'Copy the generated CSS.'],
    useCases: ['Building a frosted-glass card or navigation bar effect', 'Prototyping a glassmorphism design before implementing it', 'Finding the right blur and opacity balance by eye', 'Learning how the backdrop-filter CSS property works'],
    privacy: NO_FILE_PRIVACY,
  },

  'data-uri-encoder': {
    about:
      'Encodes an uploaded image as a base64 data URI, the self-contained text format (data:image/png;base64,...) that lets an image be embedded directly inside CSS, HTML, or JSON rather than referenced as a separate file.\n\nThis trades a network request for a larger inline payload: a data URI eliminates a separate HTTP request for that image entirely, which can genuinely help for a small icon or background image, but makes the containing file itself larger and means the image can\u2019t be cached independently by the browser. It\u2019s a real, situational trade-off rather than a universal improvement, which is why this is typically reserved for small, frequently-reused images rather than photos or large graphics.',
    features: [
      { title: 'Genuine RFC 2397 format', description: 'Produces a standard, correctly-formatted data URI.', icon: HiOutlineCodeBracketSquare },
      { title: 'Works with common formats', description: 'PNG, JPEG, GIF, WebP, and SVG.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Your image is never uploaded anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Upload an image.', 'The data URI appears automatically.', 'Copy it into your CSS, HTML, or JSON.'],
    useCases: ['Embedding a small icon directly in a CSS file to avoid an extra request', 'Inlining an image into a single-file HTML document or email template', 'Embedding an image in JSON data for an API or config file', 'Avoiding a separate image file for a very small, frequently-used graphic'],
    privacy: NO_FILE_PRIVACY,
  },

  'base64-to-image': {
    about:
      'Decodes a base64-encoded string or a full data URI back into a viewable, downloadable image, the reverse of encoding an image as a data URI.\n\nAccepts either a bare base64 string or a complete data:image/...;base64,... URI; a bare string is assumed to be PNG data unless a data URI with its own MIME type is provided. This is useful whenever base64 image data shows up somewhere without an accompanying image, an API response, a log file, or a piece of embedded CSS, and needs to actually be viewed or saved as a real image file.',
    features: [
      { title: 'Accepts both formats', description: 'Works with a bare base64 string or a full data URI.', icon: HiOutlineCodeBracketSquare },
      { title: 'Instant preview', description: 'See the decoded image immediately, not just confirmation it worked.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste a base64 string or data URI.', 'The decoded image appears automatically.', 'Click Download Image to save it.'],
    useCases: ['Viewing base64 image data found in an API response or log file', 'Extracting an embedded image from CSS or HTML source', 'Saving a data URI as an actual image file', 'Verifying a data URI was generated correctly'],
    privacy: NO_FILE_PRIVACY,
  },

  'buzzword-bingo': {
    about:
      'Generates a random 5\u00d75 corporate buzzword bingo card, drawing from a set of genuinely overused meeting phrases, with a free center space, ready to play during your next call.\n\nEach card draws 24 unique buzzwords at random (plus the free space), so no two cards are the same, and clicking a square marks it, tracking your progress through the meeting in real time.',
    features: [
      { title: 'Genuinely unique cards', description: 'Each card draws 24 unique buzzwords at random.', icon: HiOutlineSparkles },
      { title: 'Clickable squares', description: 'Mark words as they come up, right on the card.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Click New Card to generate a random bingo card.', 'Click a square whenever that buzzword comes up in your meeting.'],
    useCases: ['Adding a little levity to a long or buzzword-heavy meeting', 'A lighthearted team icebreaker or game', 'Printing or sharing a card for an in-person meeting', 'Generating a fresh card for each recurring meeting'],
    privacy: NO_FILE_PRIVACY,
  },

  'hex-code-scroller': {
    about:
      'A continuously scrollable feed of random hex colors, each shown with its swatch and code, ready to copy with one click, distinct from this site\u2019s Color Palette Generator, which builds a coordinated set of colors from a single base color rather than an open-ended browsing feed.\n\nUseful specifically for open-ended browsing rather than generating a matched set: scrolling through options when nothing specific comes to mind yet, or just enjoying looking at color.',
    features: [
      { title: 'Endless scrolling feed', description: 'Load more colors any time without losing what you\u2019ve already seen.', icon: HiOutlineSwatch },
      { title: 'One-click copy', description: 'Copy any hex code directly from the list.', icon: HiOutlineClipboard },
      { title: 'Works entirely in your browser', description: 'Nothing is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Scroll through the list of colors.', 'Click Load More Colors for more.', 'Click the copy icon next to any color to copy its hex code.'],
    useCases: ['Browsing for color inspiration with no starting point in mind', 'Finding an unexpected accent color outside a usual palette', 'Casually exploring color combinations', 'Quickly grabbing a random hex code for a mockup or placeholder'],
    privacy: NO_FILE_PRIVACY,
  },

  'lorem-ipsum-fantasy': {
    about:
      'Generates fantasy-themed placeholder text using words like dragon, sorcerer, enchanted, and kingdom, instead of the classic Latin lorem ipsum, for mockups and designs where the theme itself calls for something more evocative than traditional filler text.\n\nStructurally, it works the same way real lorem ipsum does: random words assembled into sentences and paragraphs purely for length and visual rhythm, not meaning, just drawn from a fantasy-genre vocabulary instead of pseudo-Latin.',
    features: [
      { title: 'Fantasy-genre vocabulary', description: 'Dragons, sorcery, kingdoms, and relics instead of Latin filler.', icon: HiOutlineSparkles },
      { title: 'Adjustable length', description: 'Choose how many paragraphs to generate.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Choose how many paragraphs.', 'Click Generate.', 'Copy the result.'],
    useCases: ['Filling a fantasy game or book-themed website mockup with on-theme placeholder text', 'Adding thematic filler text to a tabletop RPG project template', 'Making a design mockup feel more finished than generic Latin filler would', 'Just for fun \u2014 generating whimsical-sounding nonsense text'],
    privacy: NO_FILE_PRIVACY,
  },

  'dumb-phone-formatter': {
    about:
      'Cleans up a list of contact names and phone numbers for import into an older feature phone with limited character support: strips accented characters and emoji down to plain ASCII, keeps only basic safe characters, truncates names to a safe length, and reduces phone numbers to plain digits with an optional leading +.\n\nMany feature phones can\u2019t display accented characters, emoji, or other non-ASCII text correctly in a contact name, and some have a fairly short character limit for the name field itself. This produces a clean CSV export using only characters and lengths a feature phone can reliably handle, ready to import.',
    features: [
      { title: 'Strips accents and emoji', description: 'Converts names down to plain ASCII a feature phone can display correctly.', icon: HiOutlineDevicePhoneMobile },
      { title: 'Cleans phone numbers', description: 'Reduces formatting like dashes and parentheses to plain digits.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you enter here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Enter contacts as "Name, Phone", one per line.', 'The cleaned list appears automatically.', 'Copy the CSV output to import.'],
    useCases: ['Preparing a contact list for an older feature phone', 'Cleaning up accented or emoji-heavy names before a bulk import', 'Stripping phone number formatting for a system that expects plain digits', 'Converting a modern contact export into a simpler, more universally compatible format'],
    privacy: NO_FILE_PRIVACY,
  },

  'morse-audio-player': {
    about:
      'Converts text into Morse code and plays it back as actual audio beeps, using the browser\u2019s Web Audio API to generate tones with the correct standard timing: a dash is three times the length of a dot, with proportionally spaced gaps between symbols, letters, and words.\n\nMorse code\u2019s timing ratios aren\u2019t arbitrary, they\u2019re what makes it decodable by ear, and this tool follows the real standard ratios rather than an approximation, so the rhythm genuinely sounds like Morse code rather than a rough imitation.',
    features: [
      { title: 'Correct standard timing', description: 'Real Morse ratios: dash = 3\u00d7 dot length, with proper gaps between letters and words.', icon: HiOutlineClock },
      { title: 'See the code too', description: 'The dots and dashes are shown as text alongside the audio.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you type here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Type your text.', 'Click Play Morse Code to hear it.'],
    useCases: ['Learning to recognize Morse code by ear', 'Practicing Morse code timing and rhythm', 'Creating a Morse code audio clip for a project', 'Just for fun \u2014 hearing what a phrase sounds like in Morse'],
    privacy: NO_FILE_PRIVACY,
  },

  'morse-tap-transmitter': {
    about:
      'Lets you tap out Morse code by hand, quick taps register as a dot and slightly longer holds as a dash, and decodes what you tapped into text live as you go.\n\nThis is the reverse of typing text and hearing Morse code: here, you provide the Morse code yourself through timing and rhythm, the same way an actual Morse key or telegraph operator would, and the tool figures out what letters that sequence spells.',
    features: [
      { title: 'Real tap-timing detection', description: 'Distinguishes dots from dashes based on how long you hold each tap.', icon: HiOutlineHandRaised },
      { title: 'Live decoding', description: 'See your tapped Morse code translated into text as you go.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you tap here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Tap quickly for a dot, hold briefly for a dash.', 'Pause between letters \u2014 a short gap is detected automatically.', 'Watch the decoded text appear.'],
    useCases: ['Practicing sending Morse code by hand', 'Learning the physical rhythm of Morse code, not just recognizing it by ear', 'A hands-on way to spell out a short message in Morse', 'Testing your own timing consistency while tapping'],
    privacy: NO_FILE_PRIVACY,
  },

  'drum-pad': {
    about:
      'A virtual drum pad with four classic percussion sounds, kick, snare, hi-hat, and clap, each synthesized directly using the Web Audio API rather than played from a sample file, so there\u2019s nothing to download before the first hit.\n\nEach sound uses a standard, well-established synthesis technique: the kick is a low oscillator with a fast pitch drop, the snare and hi-hat are filtered noise bursts tuned to their characteristic frequency range, and the clap layers several quick noise bursts to mimic the texture of a real hand clap.',
    features: [
      { title: 'Four classic sounds', description: 'Kick, snare, hi-hat, and clap, each with its own character.', icon: HiOutlineMusicalNote },
      { title: 'Keyboard shortcuts', description: 'Play pads instantly with the A, S, D, F keys.', icon: HiOutlineBolt },
      { title: 'No files to load', description: 'Every sound is generated instantly, nothing to download first.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Click a pad, or press A, S, D, or F on your keyboard.'],
    useCases: ['Quickly sketching out a simple beat idea', 'A fun, low-stakes way to experiment with rhythm', 'Testing timing and coordination by playing along to a song', 'Just for fun \u2014 no download or setup needed'],
    privacy: NO_FILE_PRIVACY,
  },

  'soundboard': {
    about:
      'A soundboard of six classic sound effects, buzzer, bell, whoosh, victory chime, boom, and applause, each synthesized on the spot using the Web Audio API rather than loaded from audio files.\n\nEvery sound is generated instantly when you click it: the buzzer is a harsh sustained tone, the bell a clean decaying sine wave, the whoosh a noise burst swept through rising frequencies, and the victory chime three ascending notes played in quick succession.',
    features: [
      { title: 'Six classic effects', description: 'Buzzer, bell, whoosh, victory chime, boom, and applause.', icon: HiOutlineSpeakerWave },
      { title: 'Keyboard shortcuts', description: 'Trigger any sound instantly with keys 1 through 6.', icon: HiOutlineBolt },
      { title: 'No files to load', description: 'Every sound is generated instantly, nothing to download first.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Click a button, or press a number key 1\u20136.'],
    useCases: ['Adding a sound effect to a live stream or presentation', 'A fun reaction sound for game nights or quizzes', 'Quick audio feedback for a classroom activity or game', 'Just for fun \u2014 an instant soundboard with no setup'],
    privacy: NO_FILE_PRIVACY,
  },

  'white-noise-mixer': {
    about:
      'Mixes white, pink, and brown noise with independent volume sliders for focus, relaxation, or sleep, each noise "color" genuinely different in character, not just the same static relabeled three times.\n\nWhite noise is flat, equal energy across all frequencies, the classic "untuned radio" sound. Pink noise is filtered to favor lower frequencies (equal energy per octave), producing a softer sound often compared to steady rain. Brown noise pushes further into low frequencies still, an integrated random walk that produces a deep, rumbling character closer to ocean waves. These are genuinely different signals, verified statistically (brown noise\u2019s samples are meaningfully more correlated with each other than white noise\u2019s) rather than just given different names.',
    features: [
      { title: 'Three genuinely distinct noise colors', description: 'White, pink, and brown noise, each with real, different frequency characteristics.', icon: HiOutlineSpeakerWave },
      { title: 'Independent mixing', description: 'Blend any combination at any volume.', icon: HiOutlineCheckCircle },
      { title: 'Loops seamlessly', description: 'Plays continuously for as long as you need.', icon: HiOutlineBolt },
    ],
    howToUse: ['Adjust the volume sliders for white, pink, and brown noise.', 'Click Play Mix.', 'Adjust volumes any time while it plays.'],
    useCases: ['Background noise for focus while working or studying', 'A calming sound for falling asleep', 'Masking distracting background noise in a shared space', 'Finding which noise color personally helps you relax or concentrate'],
    privacy: NO_FILE_PRIVACY,
  },

  'tts-pitcher': {
    about:
      'Reads text aloud using your browser\u2019s built-in text-to-speech engine, with adjustable pitch and speaking rate, using the standard Web Speech API rather than a server-based voice service.\n\nBecause this relies on your browser\u2019s own speech synthesis, the available voice and its baseline sound will vary by browser and operating system, but the pitch and rate controls apply on top of whichever voice your browser provides, letting you shift it noticeably higher, lower, faster, or slower than its default.',
    features: [
      { title: 'Adjustable pitch and rate', description: 'Shift the voice higher, lower, faster, or slower than default.', icon: HiOutlineMicrophone },
      { title: 'Uses your browser\u2019s own voice engine', description: 'No account, no upload, no server-based voice service.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Type or paste text.', 'Adjust pitch and rate.', 'Click Speak.'],
    useCases: ['Proofreading writing by listening to it read aloud', 'Creating a fun, pitched voice clip for a project', 'Testing how text sounds at different speaking rates', 'A quick accessibility check for how content reads aloud'],
    privacy: NO_FILE_PRIVACY,
  },

  'exif-scrubber': {
    about:
      'Removes EXIF metadata, including GPS location, camera or phone model, and the exact date and time a photo was taken, by re-rendering the image through a canvas, a technique that inherently discards all metadata since a canvas only ever stores pixel data.\n\nModern phone cameras embed a surprising amount of information into every photo by default, often including the precise GPS coordinates of where it was taken. This is invisible when just looking at the image, but readable by anyone who knows to check, which matters before posting a photo publicly or sharing it with someone you\u2019d rather not know your exact location. This approach was verified end-to-end with a real EXIF-bearing test photo, confirming the metadata is genuinely gone from the output, not just hidden.',
    features: [
      { title: 'Removes all metadata', description: 'GPS location, camera model, timestamp, and everything else embedded in the file.', icon: HiOutlineMapPin },
      { title: 'Verified removal', description: 'Tested end-to-end against a real EXIF-bearing image to confirm the data is genuinely gone.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Your photo is never uploaded anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Upload a photo.', 'Click Remove Metadata.', 'Download the cleaned image.'],
    useCases: ['Removing GPS location data before posting a photo publicly', 'Stripping camera details before sharing a photo professionally', 'Protecting privacy before sending a photo to someone you don\u2019t fully trust', 'Cleaning metadata from a batch of photos before archiving them'],
    privacy: NO_FILE_PRIVACY,
  },

  'csv-filter': {
    about:
      'Filters CSV rows by a value in a chosen column and extracts only the columns you actually need, all processed locally rather than needing a spreadsheet program or a script.\n\nThis handles the two most common quick-cleanup tasks on tabular data: narrowing down to just the rows that match a condition (like all rows where the city column contains "NYC"), and trimming down to just the columns relevant to what you\u2019re doing next, without needing to open a full spreadsheet application for a task that\u2019s genuinely this simple.',
    features: [
      { title: 'Filter by any column', description: 'Keep only rows where a chosen column contains a specific value.', icon: HiOutlineFunnel },
      { title: 'Pick exactly which columns to keep', description: 'Trim down to just the data you need.', icon: HiOutlineTableCells },
      { title: 'Works entirely in your browser', description: 'Nothing you paste here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste CSV data with a header row.', 'Choose a column to filter by and a value to match.', 'Select which columns to keep in the result.', 'Copy the filtered CSV.'],
    useCases: ['Narrowing down a large CSV export to just the rows you need', 'Trimming an export down to only the relevant columns before sharing it', 'Quickly checking how many rows match a specific condition', 'Cleaning up spreadsheet data without opening a full spreadsheet app'],
    privacy: NO_FILE_PRIVACY,
  },

  'address-cleaner': {
    about:
      'Standardizes a US shipping address into the uppercase, abbreviated, punctuation-free format that UPS, FedEx, and USPS systems expect: Street becomes ST, Apartment becomes APT, North becomes N, and so on, following the same conventions the USPS itself publishes for standardized addressing.\n\nShipping labels and carrier systems are genuinely picky about address formatting in ways that can cause real delivery issues if ignored, mismatched formatting occasionally causes address validation to fail or a label to print incorrectly. This applies the standard abbreviations directly rather than requiring you to remember them.',
    features: [
      { title: 'Standard carrier abbreviations', description: 'Street, Avenue, Apartment, and other common terms abbreviated the way carriers expect.', icon: HiOutlineTruck },
      { title: 'Removes problematic punctuation', description: 'Periods, commas, and pound signs stripped automatically.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing you type here is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Paste an address.', 'The standardized version appears instantly.', 'Copy the result.'],
    useCases: ['Formatting an address before creating a shipping label', 'Cleaning up addresses in a bulk order export', 'Matching the exact format a shipping carrier\u2019s system expects', 'Standardizing a list of customer addresses for consistency'],
    privacy: NO_FILE_PRIVACY,
  },

  'ascii-art': {
    about:
      'Converts a photo into ASCII art, a picture built entirely from text characters, by sampling brightness across a grid of the image and mapping each sample to a character of matching visual density, from a blank space for the brightest areas to @ for the darkest.\n\nThis mapping was verified against a real test image with known content (a black square on a white background) to confirm dark areas genuinely map to dense characters and light areas genuinely map to sparse ones, not just visually approximated. The output width is adjustable, since more characters capture finer detail at the cost of a larger, less compact result.',
    features: [
      { title: 'Verified brightness mapping', description: 'Checked against a real test image to confirm dark and light areas map correctly.', icon: HiOutlineCheckCircle },
      { title: 'Adjustable detail level', description: 'Choose the output width to balance detail against size.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Works entirely in your browser', description: 'Your image is never uploaded anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Upload an image.', 'Adjust the width if needed.', 'Click Generate.', 'Copy the ASCII art result.'],
    useCases: ['Turning a photo into text art for a forum signature or README', 'Creating retro-style text art from a modern photo', 'A fun way to represent an image in a plain-text-only context', 'Experimenting with different detail levels to see how the image simplifies'],
    privacy: NO_FILE_PRIVACY,
  },

  'bubble-wrap-popper': {
    about:
      'A virtual sheet of bubble wrap you can pop with a click, complete with a genuine synthesized pop sound for each bubble, the same satisfying, fidgety activity as the real thing without needing an actual sheet on hand.\n\nEach bubble pops exactly once and stays popped, matching how real bubble wrap works, with a running count of how many you\u2019ve popped out of the full sheet. Reset the sheet any time to start fresh.',
    features: [
      { title: 'Real pop sound', description: 'Each click plays a genuine synthesized pop, not just a visual change.', icon: HiOutlineSpeakerWave },
      { title: 'Tracks your progress', description: 'See how many bubbles you\u2019ve popped out of the full sheet.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Nothing is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Click any bubble to pop it.', 'Click Reset Sheet for a fresh one.'],
    useCases: ['A quick, satisfying stress-relief break', 'A fidgety activity to do while thinking or waiting', 'Nostalgia for popping real bubble wrap without needing any on hand', 'Just for fun \u2014 no reason needed'],
    privacy: NO_FILE_PRIVACY,
  },

  'pixel-art-pad': {
    about:
      'A grid-based pixel art canvas for drawing simple sprite-style images with a curated color palette (or any custom color you pick), downloadable as a real PNG file once you\u2019re done.\n\nClick and drag across the grid to paint continuously, the same way a real pixel-art editor works, rather than needing to click each cell individually. The exported PNG scales each grid cell up to a clean, crisp block of color, matching the blocky aesthetic pixel art is known for.',
    features: [
      { title: 'Click-and-drag painting', description: 'Draw continuously by dragging across the grid, not just one cell at a time.', icon: HiOutlinePaintBrush },
      { title: 'Curated palette plus custom colors', description: 'Quick-pick colors or choose any custom color you want.', icon: HiOutlineSwatch },
      { title: 'Download as PNG', description: 'Export your finished art as a real, crisp PNG image.', icon: HiOutlineArrowDownTray },
    ],
    howToUse: ['Pick a color.', 'Click and drag across the grid to draw.', 'Click Download PNG when finished.'],
    useCases: ['Sketching a simple pixel art icon or avatar', 'Designing a small sprite for a game project', 'A quick creative outlet with no software to install', 'Making a pixel art image to share or use as a placeholder graphic'],
    privacy: NO_FILE_PRIVACY,
  },

  '8bit-character-creator': {
    about:
      'A symmetric pixel grid editor for designing an 8-bit style character sprite: paint one half and the mirrored half fills in automatically, matching how most character sprites are naturally designed, since faces and bodies are typically symmetric.\n\nThe mirroring math was verified directly before this tool was built: confirmed the left and right halves map correctly to each other, and that mirroring a position twice returns exactly to where it started, so there\u2019s no drift or misalignment as you draw.',
    features: [
      { title: 'Automatic mirror symmetry', description: 'Paint one side, the mirrored side fills in instantly.', icon: HiOutlineArrowsRightLeft },
      { title: 'Verified mirror accuracy', description: 'The left/right mapping was checked for correctness before this tool was built.', icon: HiOutlineCheckCircle },
      { title: 'Download as PNG', description: 'Export your finished character as a real PNG image.', icon: HiOutlineArrowDownTray },
    ],
    howToUse: ['Pick a color.', 'Click cells to paint \u2014 the mirrored side fills in automatically.', 'Click Download PNG when finished.'],
    useCases: ['Designing a retro-style game character sprite', 'Creating a symmetric pixel art avatar or icon', 'Learning the basics of sprite design without specialized software', 'A faster way to draw a symmetric character than painting both sides by hand'],
    privacy: NO_FILE_PRIVACY,
  },

  'emoji-mashup': {
    about:
      'Combines two emoji into one custom image by layering a smaller overlay emoji on top of a larger base emoji, with adjustable size and position, downloadable as a real PNG once you\u2019re happy with the combination.\n\nThis renders both emoji directly onto a canvas rather than just displaying them side by side, so the result is a genuine single flattened image, ready to use anywhere a static image works, including places emoji themselves might not render consistently.',
    features: [
      { title: 'Adjustable size and position', description: 'Fine-tune exactly where and how large the overlay appears.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Wide emoji selection', description: 'Choose from a curated set of expressive emoji for both layers.', icon: HiOutlineFaceSmile },
      { title: 'Download as PNG', description: 'Export the combined mashup as a single flattened image.', icon: HiOutlineArrowDownTray },
    ],
    howToUse: ['Choose a base emoji and an overlay emoji.', 'Adjust the overlay\u2019s size and position.', 'Click Download PNG.'],
    useCases: ['Creating a custom reaction image by combining two emoji', 'Making a fun profile picture or sticker', 'A playful way to express something no single emoji quite captures', 'Experimenting with unexpected emoji combinations'],
    privacy: NO_FILE_PRIVACY,
  },

  'prompt-roulette': {
    about:
      'Generates a random creative writing prompt by combining a random subject with a random style or narrative angle, giving a genuinely fresh starting point each time rather than a fixed list of the same handful of ideas repeating.\n\nEach spin pairs an evocative subject (a floating city, a lighthouse keeper who has never seen the ocean) with a distinct angle (told as a fairy tale, from an unreliable narrator\u2019s perspective), so the combinations multiply well beyond what either list alone would offer, genuinely useful for breaking through a blank page.',
    features: [
      { title: 'Genuinely varied combinations', description: 'Subjects and styles combine freshly each spin, not a fixed repeating list.', icon: HiOutlineSparkles },
      { title: 'Instant, no setup', description: 'One click gives a complete, ready-to-use prompt.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Click Spin Again for a new prompt.', 'Copy it to use as a writing starting point.'],
    useCases: ['Breaking through writer\u2019s block with a fresh starting point', 'A daily creative writing warm-up exercise', 'Finding a prompt for a writing group or class', 'Sparking an idea for a short story or flash fiction piece'],
    privacy: NO_FILE_PRIVACY,
  },

  'trivia-flashcards': {
    about:
      'A deck of general knowledge trivia flashcards covering science, history, geography, and more, presented one at a time with the answer hidden until you click to reveal it, the same way a physical flashcard deck works.\n\nEach fact was checked for accuracy before being included, general knowledge questions with clear, verifiable answers rather than ambiguous or debatable trivia.',
    features: [
      { title: 'Genuine general knowledge', description: 'Facts checked for accuracy across a range of topics.', icon: HiOutlineAcademicCap },
      { title: 'Click to reveal', description: 'See the question first, then reveal the answer when you\u2019re ready.', icon: HiOutlineEye },
      { title: 'Works entirely in your browser', description: 'Nothing is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Read the question.', 'Click the card to reveal the answer.', 'Click Next Card for another.'],
    useCases: ['A quick trivia break or brain warm-up', 'Casual practice for trivia night', 'A fun way to learn a few new facts', 'A lighthearted classroom or icebreaker activity'],
    privacy: NO_FILE_PRIVACY,
  },

  'tarot-reader': {
    about:
      'Draws a random tarot card along with its traditional meaning, presented purely for entertainment and reflection, not as a genuine claim about predicting the future.\n\nEach of the fifteen cards included carries the meaning traditionally associated with it in tarot practice, offered here as a prompt for reflection rather than a factual prediction. This is worth being direct about: a random card draw has no actual predictive power, and this tool is meant as a fun moment of pause, not genuine guidance for real decisions.',
    features: [
      { title: 'Traditional card meanings', description: 'Each card carries its conventional tarot interpretation.', icon: HiOutlineMoon },
      { title: 'Genuinely random draw', description: 'A fresh card each time, not a fixed rotation.', icon: HiOutlineSparkles },
      { title: 'Works entirely in your browser', description: 'Nothing is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Click Draw a Card.', 'Read the card and its traditional meaning.'],
    useCases: ['A moment of reflection or fun daily ritual', 'Sparking a journaling prompt for the day', 'Introducing someone to tarot card meanings casually', 'Just for fun \u2014 not intended as genuine guidance for real decisions'],
    privacy: NO_FILE_PRIVACY,
  },

  'meme-overlay': {
    about:
      'Adds the classic top-and-bottom white text with a black outline to any uploaded image, the same visual format that\u2019s defined the meme genre for well over a decade, rendered directly onto the image so the result is a single flattened picture ready to share anywhere.\n\nText automatically converts to uppercase and scales to the image size, matching the familiar bold, readable style memes are known for, rather than needing to manually adjust font size for every image.',
    features: [
      { title: 'Classic meme styling', description: 'White text with a black outline, automatically uppercased.', icon: HiOutlinePhoto },
      { title: 'Live preview', description: 'See the text positioned on your image as you type.', icon: HiOutlineCheckCircle },
      { title: 'Works entirely in your browser', description: 'Your image is never uploaded anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Upload an image.', 'Type your top and bottom text.', 'Download the finished meme.'],
    useCases: ['Making a quick meme to share with friends', 'Adding a caption to a reaction image', 'Creating a custom meme from a personal photo', 'A fast, no-signup way to make meme-format images'],
    privacy: NO_FILE_PRIVACY,
  },

  'fake-loading-screen': {
    about:
      'Generates a customizable, animated fake loading screen with your own message and adjustable speed, for a fun prank, a placeholder screen, or simply for the joke of watching a progress bar move.\n\nThe progress bar animates smoothly from 0 to 100%, with the speed and message fully adjustable, so it can be tuned for anything from a quick five-second gag to a longer, more elaborate wait.',
    features: [
      { title: 'Custom message and speed', description: 'Set your own loading text and how fast the bar fills.', icon: HiOutlineArrowPath },
      { title: 'Smooth animation', description: 'A genuine animated progress bar, not a static image.', icon: HiOutlineBolt },
      { title: 'Works entirely in your browser', description: 'Nothing is ever sent anywhere.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Enter a message and choose a speed.', 'Click Start.', 'Watch the loading bar animate.'],
    useCases: ['A fun prank loading screen on a shared computer', 'A placeholder screen while setting up a presentation', 'A joke "loading" moment before revealing something', 'Just for fun \u2014 no real purpose needed'],
    privacy: NO_FILE_PRIVACY,
  },

  'habit-streak-counter': {
    about:
      'Tracks daily habits and calculates your current consecutive-day streak for each one, saved locally in your browser so it\u2019s there the next time you visit.\n\nThe streak calculation genuinely accounts for calendar days rather than just counting check-ins: it correctly continues a streak if you checked in yesterday but haven\u2019t yet today, and correctly resets if there\u2019s a real gap of a missed day. This logic was tested against exactly those scenarios (an unbroken streak, a streak with a gap, and a streak ending yesterday) before being relied on here.',
    features: [
      { title: 'Genuine calendar-aware streaks', description: 'Correctly handles today not yet being checked in versus an actual missed day.', icon: HiOutlineFire },
      { title: 'Track multiple habits', description: 'Add as many habits as you want to track individually.', icon: HiOutlineCheckCircle },
      { title: 'Saved in your browser', description: 'Persists between visits on this device, with nothing sent to a server.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Add a habit by name.', 'Click the checkmark each day you complete it.', 'Watch your streak grow.'],
    useCases: ['Tracking a daily exercise or reading habit', 'Building momentum on a new routine', 'A simple, no-account-needed habit tracker', 'Keeping several small daily habits visible in one place'],
    privacy:
      'Your habits and check-in history are stored only in this browser\u2019s local storage \u2014 never sent to a server, and not synced across devices or accounts. Clearing your browser data will remove it.',
  },

  'rickroll-generator': {
    about:
      'Provides a copyable link to the one well-known "rickroll" video, a decades-old, thoroughly harmless internet joke where a link leads unexpectedly to Rick Astley\u2019s "Never Gonna Give You Up."\n\nWorth being direct about the scope here: this tool deliberately only ever produces a link to this one specific, universally-recognized video. It is not a general-purpose tool for disguising where a link actually leads, since a tool built to hide a link\u2019s real destination is functionally the same technique used in phishing, regardless of the joke framing. If you want the link to look less obviously like a rickroll when shared, this site\u2019s own URL Shortener can shorten it further.',
    features: [
      { title: 'One fixed, well-known destination', description: 'Always links to the same classic video, never a customizable or arbitrary URL.', icon: HiOutlineMusicalNote },
      { title: 'One-click copy', description: 'Copy the link instantly to share.', icon: HiOutlineClipboard },
    ],
    howToUse: ['Click Copy Link.', 'Share it wherever you\u2019d like.'],
    useCases: ['Sharing the classic internet joke with a friend', 'A harmless prank link for a group chat', 'Referencing the meme in a conversation', 'Nostalgia for a genuinely iconic piece of internet culture'],
    privacy: NO_FILE_PRIVACY,
  },

  'fake-error-designer': {
    about:
      'Designs a fun, obviously-stylized error message card, complete with a custom title, message, and button text, for memes and lighthearted pranks among friends.\n\nThis is deliberately built to look like a playful joke card rather than a convincing system dialog: rounded corners, friendly styling, and none of the specific visual chrome that would make it resemble an actual operating system\u2019s error window. The goal is something clearly funny to share, not something that could plausibly convince someone their real device has an actual problem.',
    features: [
      { title: 'Three message types', description: 'Error, warning, or info styling, each with its own icon and color.', icon: HiOutlineExclamationTriangle },
      { title: 'Fully custom text', description: 'Set your own title, message, and button text.', icon: HiOutlineCheckCircle },
      { title: 'Deliberately not realistic', description: 'Styled as an obvious joke card, not a convincing system dialog replica.', icon: HiOutlineShieldCheck },
    ],
    howToUse: ['Choose a message type.', 'Enter a title, message, and button text.', 'Share a screenshot of the result.'],
    useCases: ['Making a joke "error" screenshot to share with friends', 'A funny placeholder message for a mockup or presentation', 'A lighthearted prank message on a shared screen', 'Creating a custom, silly error card for a specific inside joke'],
    privacy: NO_FILE_PRIVACY,
  },
}
