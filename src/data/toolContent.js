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
      'JPG to PNG converts your JPEG photos into the PNG format, which supports transparency and lossless compression. It\u2019s the tool to reach for when you need an image that won\u2019t lose any more quality on repeated saves, or when you need to add transparency later.\n\nWorth understanding clearly: converting a JPG to PNG doesn\u2019t undo or improve whatever compression the original JPG already went through \u2014 JPEG is a lossy format, so any detail it already discarded when the file was first saved is gone for good. What PNG\u2019s lossless nature actually gets you is protection from *further* loss going forward: once converted, the image can be opened, edited, and re-saved as PNG repeatedly with zero additional quality loss, unlike JPEG, which loses a small amount of quality every time it\u2019s re-saved (a real effect known as generation loss).\n\nPNG is also the format to reach for when you specifically need transparency \u2014 JPEG has no way to represent a transparent background at all, so any workflow that needs a transparent or semi-transparent image (a logo overlay, a graphic meant to sit on different colored backgrounds) genuinely requires PNG or a similarly transparency-capable format.',
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
      'Avoiding further generation loss on an image that will be re-saved multiple times',
    ],
    supportedFormats: { input: 'JPG / JPEG', output: 'PNG', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'png-to-jpg': {
    about:
      'PNG to JPG converts PNG images into the widely-supported JPEG format, typically producing a much smaller file. It\u2019s the right choice when file size matters more than pixel-perfect transparency \u2014 photos, web images, and anything you plan to share or upload elsewhere.\n\nFor photographic content specifically, the size difference between PNG and JPG can be dramatic \u2014 a PNG storing a photo losslessly is often several times larger than a JPG of the same image at a quality setting where the difference is barely visible, since PNG\u2019s lossless approach has to preserve every pixel exactly, while JPG\u2019s lossy compression can discard the fine detail human vision doesn\u2019t register.\n\nOne thing worth knowing before converting: JPEG has no transparency support at all, so any transparent areas in your PNG get filled with a solid white background during conversion, since there\u2019s no other way to represent them in a format that doesn\u2019t support an alpha channel. If your PNG has meaningful transparency you need to keep, converting to JPG isn\u2019t the right move \u2014 stick with PNG, or convert to WebP instead, which supports both small file sizes and transparency together.',
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
      'Converting a photo saved as PNG down to a realistic file size',
    ],
    supportedFormats: { input: 'PNG', output: 'JPG', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'webp-to-png': {
    about:
      'WEBP to PNG converts modern WEBP images into the universally-supported PNG format. WEBP offers great compression but isn\u2019t accepted everywhere \u2014 this tool gets you a format that opens correctly in any image viewer, editor, or older software.\n\nWebP was developed by Google and has been supported by every major browser since 2020, with current adoption estimates generally above 95% of browsers in active use. Despite that, real compatibility gaps still show up in practice \u2014 some older desktop software, certain email clients, specific CMS plugins, and print workflows either don\u2019t recognize WebP at all or handle it inconsistently. PNG remains the safer choice whenever you genuinely don\u2019t know what will open the file next.\n\nConverting WebP to PNG specifically preserves transparency correctly, since both formats support a full alpha channel \u2014 unlike converting to JPG, which has no way to represent transparency at all and would need to flatten it onto a solid background instead.',
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
      'Converting a WEBP graphic that needs to keep its transparent background',
    ],
    supportedFormats: { input: 'WEBP', output: 'PNG', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'webp-to-jpg': {
    about:
      'WEBP to JPG converts modern WEBP images into the widely-supported JPEG format \u2014 useful when you need an image that opens anywhere, from photo software to social platforms that don\u2019t yet handle WEBP well.\n\nJPEG has been the default photo format since 1992 and is recognized by essentially every piece of software, camera, printer, and platform ever built \u2014 a much longer and more universal track record than WebP\u2019s, even with WebP\u2019s strong current browser support. For photographs specifically, converting to JPG makes practical sense: JPEG\u2019s lossy compression was purpose-built for photographic content, so the visual difference at a reasonable quality setting is typically negligible.\n\nOne real tradeoff worth knowing: JPEG has no transparency support, so any transparent areas in the source WebP get filled with a solid background during conversion. If the image needs to keep its transparency, converting to PNG instead is the right call \u2014 this tool is specifically for cases where universal compatibility matters more than preserving an alpha channel.',
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
      'Preparing a WEBP photo for printing or a workflow that expects JPEG',
    ],
    supportedFormats: { input: 'WEBP', output: 'JPG', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'convert-to-webp': {
    about:
      'Convert to WEBP turns JPG or PNG images into the modern WEBP format, which typically produces noticeably smaller files at the same visual quality \u2014 ideal for faster-loading websites and reduced storage.\n\nWebP was built by Google specifically for the web, and consistently benchmarks 25\u201335% smaller than an equivalent-quality JPG, and around 25\u201335% smaller than a comparable lossless PNG. Unlike JPG or PNG individually, WebP supports both lossy and lossless compression in the same format, plus a full alpha transparency channel \u2014 meaning a single format can replace the role both JPG and PNG previously played, depending on which mode you use.\n\nFor a website specifically, switching images to WebP is one of the more reliable, low-effort ways to improve real page load performance, which in turn affects Core Web Vitals metrics that factor into how Google ranks a page. Browser support has been essentially universal across modern browsers since 2020, making WebP a safe default for a website\u2019s own images \u2014 the main remaining caution is for images that might be downloaded and opened in older, non-browser software, where compatibility is less certain than JPG or PNG.',
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
      'Improving page load speed and Core Web Vitals scores with lighter images',
    ],
    supportedFormats: { input: 'JPG / PNG', output: 'WEBP', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'image-compressor': {
    about:
      'Image Compressor reduces your image\u2019s file size using an adjustable quality slider, so you can shrink large photos down for faster uploads and page loads without a visible drop in quality.\n\nImage compression comes in two fundamentally different kinds. Lossy compression achieves large size reductions by selectively discarding image data that\u2019s least noticeable to the eye \u2014 the process is irreversible, and pushing the quality slider lower trades more file size for slightly more visible quality loss. Lossless compression shrinks a file by re-encoding the data more efficiently without discarding anything, which typically saves far less space \u2014 often just a small percentage, rather than the large reductions lossy compression can achieve.\n\nBecause lossy compression is so much more effective at reducing file size, this tool outputs JPG by default regardless of your original format, since that gets the biggest genuine size reduction for the common case of compressing a photo. If you specifically need to preserve transparency or exact pixel accuracy \u2014 a logo, an icon, or a screenshot with text \u2014 you can explicitly choose PNG as the output format instead, though keep in mind PNG\u2019s lossless approach won\u2019t shrink the file nearly as dramatically as JPG or WEBP will. WEBP is also available as an output option and generally achieves smaller files than JPG at a similar visual quality, though it\u2019s a newer format with slightly less universal compatibility in older software.\n\nAs a rule of thumb: use JPG or WEBP for photographs and complex images with lots of color variation, where a moderate quality reduction is genuinely invisible to the eye. Choose PNG only when exact pixel accuracy or transparency actually matters for the image\u2019s purpose.',
    features: [
      { title: 'Adjustable quality', description: 'Drag the slider and see the size trade-off before committing.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Choice of output format', description: 'JPG by default for maximum compression, or explicitly choose PNG or WEBP.', icon: HiOutlineArrowsRightLeft },
      { title: 'Live before/after size', description: 'See exactly how much smaller your file gets at each setting.', icon: HiOutlineScale },
      { title: 'Batch friendly', description: 'Compress up to 10 images at once, download individually or as a ZIP.', icon: HiOutlineSquares2X2 },
      { title: 'Instant results', description: 'Compression happens locally in your browser \u2014 no wait, no upload.', icon: HiOutlineBolt },
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
      'Image Resizer changes your image\u2019s pixel dimensions \u2014 either to an exact width and height, or by a percentage scale \u2014 while keeping it sharp and correctly proportioned.\n\nResizing down (making an image smaller) is straightforward and essentially lossless in terms of the information that matters \u2014 the resizer combines groups of original pixels into each new, smaller pixel using high-quality smoothing, producing a clean, sharp result. Resizing up (making an image larger) works fundamentally differently: there\u2019s no real detail to recover that wasn\u2019t already in the original, so the tool has to interpolate \u2014 estimate what the in-between pixels probably look like based on their neighbors. This is why upscaling a small image significantly tends to look soft or blurry rather than genuinely sharper; no resizing algorithm can add detail that was never captured in the first place.\n\nLocking the aspect ratio (width-to-height proportion) keeps an image looking natural during a resize \u2014 changing width and height by different amounts independently distorts the image, stretching or squashing it in a way that\u2019s usually visually obvious and rarely desired.',
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
      'Image Cropper lets you select and cut out exactly the part of an image you want, with a draggable, resizable crop box you control directly on the image \u2014 no guessing at coordinates.\n\nUnlike resizing, cropping doesn\u2019t need to interpolate or estimate anything \u2014 it simply keeps the pixels inside your selected area and discards the rest, so the kept portion retains its exact original quality with zero loss. This makes cropping a genuinely safe operation to experiment with, since the result is never blurrier or lower quality than the source, just smaller in extent.\n\nDifferent platforms and use cases often call for specific aspect ratios: 1:1 (square) for most profile pictures, 4:5 for an Instagram feed post, 16:9 for a video thumbnail or website hero banner. Cropping to a specific target ratio before uploading avoids a platform\u2019s own automatic crop, which won\u2019t always frame the subject the way you intended.',
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
      'Framing a specific detail from a larger image precisely, with no quality loss',
    ],
    supportedFormats: { input: 'JPG / PNG / WEBP', output: 'Same format', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'image-rotate': {
    about:
      'Image Rotator turns your image to any 90\u00b0 increment \u2014 useful for fixing a sideways photo or reorienting a scanned document.\n\nPhotos taken on phones often end up sideways for a specific, common reason: the camera saves the image data in its original sensor orientation, then records which way it should be displayed in a piece of metadata called an EXIF orientation tag, rather than actually rotating the pixels. Different apps, browsers, and operating systems read that metadata inconsistently \u2014 which is exactly why the same photo can appear right-side-up in one app and sideways in another.\n\nThis tool sidesteps that inconsistency entirely by performing a real, direct pixel rotation rather than relying on metadata \u2014 the output image is genuinely rotated, so it displays correctly everywhere, in any app or browser, regardless of how that particular software handles orientation flags.',
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
      'Fixing a photo that displays correctly in one app but sideways in another',
    ],
    supportedFormats: { input: 'JPG / PNG / WEBP', output: 'Same format', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'flip-image': {
    about:
      'Flip Image mirrors your image horizontally or vertically \u2014 different from rotating, since it reverses the image rather than turning it around a point.\n\nRotating and flipping are often confused but produce genuinely different results. Rotating turns an image around a center point, like spinning a photo on a table \u2014 a rotated square photo of a word would still show that word the right way round, just at a different angle. Flipping instead mirrors the image, reversing left and right (or top and bottom) \u2014 the same photo of a word would show it backwards, like reading it in a mirror. Any real text or asymmetric detail in the image makes this difference immediately obvious.\n\nA specific, common real-world case: phone front cameras typically show a mirrored preview on screen while actually saving the photo unmirrored, which is why a selfie sometimes looks like it has your face oriented differently than what you saw while taking it \u2014 particularly noticeable if there\u2019s any text in the shot, like a shirt logo, which comes out backwards in the saved photo relative to what you saw in the mirrored preview. Flipping corrects that mismatch after the fact.',
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
      'Correcting a mirrored selfie or webcam photo, especially one with visible text',
      'Creating a mirrored version of a graphic for design purposes',
      'Fixing the orientation of a scanned image',
      'Reversing an image to face the opposite direction for a layout or composition',
    ],
    supportedFormats: { input: 'JPG / PNG / WEBP', output: 'Same format', maxSize: '25 MB per image, up to 10 images at once' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'jpg-to-pdf': {
    about:
      'JPG to PDF turns a JPG image into a single-page PDF document, sized to match your image exactly \u2014 useful whenever you need a photo delivered as a proper PDF file.\n\nUnlike some converters that place your image onto a standard paper size like A4 or Letter (potentially leaving margins or requiring the image to be scaled to fit), this tool sizes the PDF page to your image\u2019s exact pixel dimensions. The result is a PDF that shows your image at its true size and aspect ratio with nothing cropped, stretched, or padded \u2014 what you uploaded is exactly what appears on the page.\n\nOne practical implication worth knowing: since the page isn\u2019t a standard paper size, printing the resulting PDF may not align with a printer\u2019s default page settings the way a standard Letter or A4 document would \u2014 you may need to adjust the print scale or paper size setting depending on your printer and the image\u2019s own dimensions. For on-screen use, sharing, or uploading to a system that expects a PDF, this isn\u2019t a concern at all.',
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
      'Meeting a system requirement that only accepts PDF uploads, not raw images',
    ],
    supportedFormats: { input: 'JPG', output: 'PDF', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'png-to-pdf': {
    about:
      'PNG to PDF turns a PNG image into a single-page PDF document, sized to match your image exactly \u2014 handy for turning a screenshot, graphic, or scan into a shareable PDF.\n\nLike the JPG to PDF converter, this sizes the resulting page to your image\u2019s exact pixel dimensions rather than a standard paper size, so the image appears at its true size and aspect ratio with nothing cropped or padded.\n\nOne question worth answering specifically for PNG: what happens to transparency? The PNG\u2019s alpha channel is embedded into the PDF along with the rest of the image data, so the transparency information itself isn\u2019t discarded the way converting to JPG would discard it. In practice, since a PDF page is a solid surface rather than something that can itself be transparent, any transparent areas typically render against the page\u2019s own background \u2014 usually white in most PDF viewers \u2014 producing a similar visual result to how the same image looks against a white webpage background.',
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
      'Converting a design export or logo into a PDF for a client deliverable',
    ],
    supportedFormats: { input: 'PNG', output: 'PDF', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'compress-pdf': {
    about:
      'Compress PDF reduces a PDF\u2019s file size entirely in your browser \u2014 no upload to a server \u2014 by rendering each page and recompressing it as an image at your chosen quality, the same core technique the Image Compressor uses.\n\nA PDF is typically large because of the images embedded in it, not the text \u2014 plain text takes up very little space, so a text-only PDF rarely needs compressing in the first place. This tool targets that real cause directly: each page is rendered, recompressed at an adjustable quality level, and reassembled into a new, smaller PDF.\n\nThere\u2019s one honest, deliberate tradeoff worth knowing upfront: because each page becomes a single compressed image, any text in the original PDF is no longer selectable, searchable, or copyable in the compressed output. For a scanned document or an image-heavy PDF \u2014 the case that actually makes a PDF large enough to want compressing \u2014 this is rarely a real loss, since there often wasn\u2019t genuine selectable text to begin with. For a text-heavy PDF where staying searchable matters, this tool isn\u2019t the right fit, since that tradeoff would cost more than the size savings are worth.',
    features: [
      { title: 'Adjustable compression level', description: 'Choose how aggressively to compress, trading file size against visual quality.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Entirely client-side', description: 'Your PDF is never uploaded \u2014 processing happens fully in your browser.', icon: HiOutlineShieldCheck },
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
      'Merge PDF combines multiple PDF files into a single document, in whatever order you choose \u2014 every page copied exactly as it appears in the source files, with nothing re-rendered or flattened.\n\n"Copied exactly" is a meaningful technical distinction, not just marketing language. Some PDF tools work by rendering each page as an image and reassembling those images into a new PDF \u2014 which loses any selectable text, shrinks quality, and bloats file size. This tool instead copies each page\u2019s actual underlying content \u2014 text, vector graphics, embedded fonts, and all \u2014 directly into the merged document, so a page with selectable, searchable text stays exactly that way in the result, and nothing about visual quality is degraded in the process.\n\nThe order you arrange your files in before merging becomes the exact page order of the final document, which matters when assembling something like a report from separate sections or combining scanned pages that need to read in sequence.',
    features: [
      { title: 'Reorder before merging', description: 'Move files up or down to control the exact page order of the result.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Faithful page copying', description: 'Pages are copied exactly as they appear in the source \u2014 not re-rendered, so text stays selectable and quality is untouched.', icon: HiOutlineDocumentDuplicate },
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
      'Combining several single-page PDFs (like ones made with JPG to PDF) into one multi-page document',
    ],
    supportedFormats: { input: 'PDF (multiple files)', output: 'PDF', maxSize: '25 MB per file' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'split-pdf': {
    about:
      'Split PDF extracts specific pages or page ranges from a PDF into a brand new document \u2014 tell it which pages you want (like "1-3, 5, 8-10") and it builds a new PDF from exactly those.\n\nThe page selector accepts a flexible mix of individual page numbers and ranges in one entry, separated by commas \u2014 "1-3, 5, 8-10" pulls pages 1 through 3, page 5, and pages 8 through 10 into a single new document. A couple of genuinely helpful behaviors worth knowing: if a page number appears more than once across your entered ranges, it\u2019s only included once in the result rather than duplicated, and the extracted pages always come out in ascending numeric order in the final document, regardless of what order you typed the ranges in.\n\nLike Merge PDF, extracted pages are copied faithfully from the source \u2014 not re-rendered as images \u2014 so any selectable text and original visual quality carry over exactly as they were in the source document.',
    features: [
      { title: 'Flexible page ranges', description: 'Specify individual pages, ranges, or a mix of both in one go.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Faithful page copying', description: 'Extracted pages are copied exactly as they appear in the source, text and quality untouched.', icon: HiOutlineDocumentDuplicate },
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
      'Creating a smaller PDF from just the pages a specific recipient needs',
    ],
    supportedFormats: { input: 'PDF', output: 'PDF', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'pdf-to-jpg': {
    about:
      'PDF to JPG renders a page from your PDF into a real JPG image \u2014 genuine pixel rendering of that page\u2019s actual content, not a placeholder or text extraction.\n\nThis works by rendering the selected page at roughly double its native resolution before encoding it as JPG, producing a noticeably sharper result than a naive one-to-one render \u2014 text and fine details stay crisp rather than looking soft, which matters when the output image will be viewed at a larger size than the original page or used somewhere detail matters, like a presentation slide.\n\nOne thing worth knowing about the workflow: this converts one specific page at a time, chosen from a page selector, rather than automatically batch-converting every page in a multi-page PDF into a folder of images. For extracting an image from just one or two specific pages, this is exactly the more direct workflow; if you need every page of a longer PDF as separate images, you\u2019d repeat the process per page.',
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
      'Creating a thumbnail image representing a specific document page',
    ],
    supportedFormats: { input: 'PDF', output: 'JPG (one page at a time)', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'pdf-to-png': {
    about:
      'PDF to PNG renders a page from your PDF into a real PNG image \u2014 genuine pixel rendering of that page\u2019s actual content, ideal when you need a lossless image, like for a page with sharp text or line art.\n\nPDF pages containing text, diagrams, tables, or line art tend to have a lot of sharp edges and high-contrast detail \u2014 exactly the kind of content where JPEG\u2019s lossy compression can introduce visible artifacts around edges (a slight blur or ringing effect near sharp transitions), while PNG\u2019s lossless approach preserves it exactly. For a page that\u2019s mostly a photo or continuous-tone image, this difference matters less; for a page of text or a technical diagram, it can be genuinely noticeable.\n\nLike the JPG converter, this renders the selected page at roughly double its native resolution before encoding, and works on one specific page at a time via a page selector, rather than batch-converting an entire multi-page document automatically.',
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
      'Capturing a page of line art or a technical drawing without compression artifacts',
    ],
    supportedFormats: { input: 'PDF', output: 'PNG (one page at a time)', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'pdf-to-word': {
    about:
      'PDF to Word extracts the actual text content from your PDF and reconstructs it into an editable Word document \u2014 a genuine starting point for editing, not a fake conversion. It intentionally does not claim to preserve the original layout, fonts, images or tables, since that\u2019s a much harder problem even paid tools don\u2019t solve perfectly.\n\nThe reason this is genuinely hard, for any PDF-to-Word tool, comes down to what a PDF actually is under the hood: a page-layout format that records where each individual character or shape should be drawn on the page, not a structured document format that understands the concept of a paragraph, a table, or a heading the way DOCX does. A Word document is built from real structural elements; a PDF is closer to a set of precise drawing instructions. Reconstructing genuine document structure from those drawing instructions means guessing at paragraph boundaries, table cells, and formatting \u2014 guesses that are usually right for simple text but frequently wrong for anything visually complex.\n\nGiven that, this tool focuses on doing the reliable part well: extracting the actual text accurately and reconstructing sensible paragraph breaks based on real spacing patterns in the source, rather than attempting a full layout reconstruction and quietly getting it wrong. What you get is genuinely edit-ready text, not a pixel-perfect replica \u2014 which is an honest tradeoff, not a shortcut.',
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
      'PDF to PowerPoint turns every page of your PDF into a slide, rendering each page as a real image so it looks exactly like the original \u2014 an honest approach, since reliably rebuilding editable slide layouts from a PDF isn\u2019t something that can be done accurately.\n\nGenerating a genuinely valid .pptx file is a harder problem than it might sound like. A .pptx is actually a zip archive containing a specific structure of XML files, and PowerPoint is notably strict about that structure \u2014 files that look valid on inspection can still fail to open correctly if the relationship IDs between slides, layouts, and content types aren\u2019t exactly right. Building this reliably meant hand-constructing that OOXML structure correctly and then independently verifying the output actually opens and reads correctly, rather than assuming it would work just because the code ran without an error.\n\nEach page is rendered at high resolution before being placed into its own slide, which is why the result looks visually identical to the source PDF rather than an approximation \u2014 the tradeoff, honestly stated, is that the slide content is a picture, not editable text or shapes you could click into and change.',
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
      'Excel to PDF reads your spreadsheet\u2019s actual cell data and lays it out as a clean table in a PDF \u2014 genuinely useful for sharing or printing simple data, though it doesn\u2019t attempt to reproduce charts, images, or complex formatting.\n\nThis tool specifically converts the first sheet in your workbook, not every sheet. That\u2019s a deliberate scope decision: a spreadsheet with multiple sheets often has very different content and purposes on each one (a summary, raw data, calculations), and automatically stacking all of them into one PDF table would frequently produce a confusing, unusable result rather than a genuinely useful one. If you specifically need a different sheet, moving it to the first position in the workbook before converting will do that.\n\nLong sheets are automatically paginated across multiple PDF pages rather than being cut off or shrunk to fit \u2014 the table continues cleanly onto additional pages exactly the way a printed spreadsheet normally would. Cell values that are too long for their column also truncate cleanly with an ellipsis rather than overlapping into the next column, keeping the table genuinely readable rather than visually broken.',
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
      'Word to PDF extracts your document\u2019s real text, headings, and bold formatting and lays it out as a proper, paginated PDF \u2014 a genuine conversion for text-focused documents, not a fake preview.\n\nA .docx file, like .pptx and .xlsx, is actually a zip archive containing a specific set of XML files describing the document\u2019s content and structure. This tool reads that XML directly \u2014 parsing paragraphs, paragraph styles (to detect headings), text runs, and bold formatting \u2014 rather than relying on a heavyweight document-rendering engine that a browser-based tool doesn\u2019t have access to.\n\nThe scope here is deliberately focused: tables, images, columns, and styling beyond headings and bold aren\u2019t reproduced, since reliably reconstructing those from raw XML with consistent visual fidelity is a substantially harder problem than accurately extracting structured text \u2014 and getting it wrong would produce a worse result than being upfront about the limitation. For a text-focused document like a letter, a report body, or a set of notes, this covers the content that actually matters; for a heavily designed document with tables and images, the source .docx remains the better format to share directly.',
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
      'Color Picker lets you sample the exact color at any point on an uploaded image, reading the real pixel value directly \u2014 or pick a color directly with no image at all.\n\nSampling a color this way reads the actual stored pixel data at the exact coordinate you click, rather than an estimate \u2014 so the hex, RGB, and HSL values shown are the true, exact color as it exists in the image file, not a visual approximation. This matters for tasks like matching a brand color precisely: eyeballing a color from a screenshot and typing a close guess almost never matches exactly, while sampling the actual pixel does.\n\nOne thing worth knowing when color-matching from a photo specifically: the exact pixel color can vary slightly across what looks like a single solid area, due to compression artifacts, lighting gradients, or anti-aliasing at edges. For the most reliable match, sample from the flattest, most uniform part of the color area rather than near an edge or a shadow.',
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
      'Matching a brand color from a logo or photo exactly',
      'Picking a color from a design mockup to reuse in CSS',
      'Identifying the exact shade used somewhere in an image',
      'Extracting a color from a screenshot to match in a new design',
    ],
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'hex-to-rgb': {
    about:
      'HEX to RGB converts hex color codes into their RGB equivalent instantly, alongside HSL, so you never have to look up a conversion by hand.\n\nA hex color code represents red, green, and blue as three two-digit hexadecimal pairs \u2014 for example, #3B6CF6 breaks down into red 3B (59), green 6C (108), and blue F6 (246). RGB notation writes out those same three channel values in plain decimal instead (0\u2013255 each), which is why hex and RGB always describe exactly the same underlying color, just in a different notation.\n\nRGB is generally the more useful format when you\u2019re manipulating colors programmatically or need transparency \u2014 CSS\u2019s rgba() notation lets you add an alpha channel directly (rgba(59, 108, 246, 0.5) for 50% opacity), and individual RGB channels are simpler to adjust in JavaScript than parsing a hex string. Hex remains the more common format in design tools and style guides simply because it\u2019s shorter and more established, even though it encodes the identical color information.',
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
      'RGB to HEX converts RGB color values into their hex equivalent instantly, alongside HSL \u2014 useful whenever your source gives you RGB but you need a hex code for CSS or design tools.\n\nRGB and hex describe the exact same color information in different notations: RGB writes red, green, and blue as three decimal numbers from 0 to 255, while hex packs those same three values into a compact six-digit code using base-16 notation, prefixed with #. For example, rgb(59, 108, 246) and #3B6CF6 are the identical color \u2014 59 in decimal is 3B in hexadecimal, and so on for each channel.\n\nHex tends to be the preferred format in design tools, brand style guides, and most CSS written by hand, largely because it\u2019s shorter and more established as the default. If you\u2019re working from a color picked in an image editor or returned by a JavaScript color API in RGB form, converting it to hex is a common step before dropping it into a stylesheet or design file.',
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
      'HEX to HSL converts hex color codes into HSL (Hue, Saturation, Lightness) values instantly \u2014 useful when you want to adjust a color\u2019s vividness or lightness in a way that\u2019s more intuitive than raw RGB.\n\nUnlike hex and RGB, which describe a color as a mix of red, green, and blue light, HSL describes it the way people naturally think about color: a hue (the base color, as an angle from 0 to 360 degrees around a color wheel), a saturation percentage (how vivid or muted it is), and a lightness percentage (how close to black or white it is). This makes HSL genuinely convenient for generating color variations \u2014 lighten or darken a color by changing only the lightness value, or create a muted version by lowering saturation, all while keeping the same underlying hue.\n\nWorth knowing: HSL\u2019s lightness value doesn\u2019t perfectly match how bright a color actually looks to the eye \u2014 hsl(60, 100%, 50%) (yellow) and hsl(240, 100%, 50%) (blue) share the same lightness number but look noticeably different in perceived brightness. It\u2019s still a genuinely useful, intuitive format for theming and generating color scales, just not a perfectly uniform one.',
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
      'Color Converter is a universal color tool \u2014 enter a color in any format (hex, RGB or HSL) and see it converted to all three at once, with a visual picker and live swatch preview.\n\nHex, RGB, and HSL all describe the exact same underlying colors, just through different notation, each suited to different situations. Hex (#3B6CF6) is compact and the most common format in design tools and style guides. RGB (rgb(59, 108, 246)) writes out the same red/green/blue channels in plain decimal, and is the more natural choice when you need transparency via rgba() or are adjusting channels programmatically. HSL (hsl(226, 89%, 60%)) describes color the way people intuitively think about it \u2014 hue, saturation, and lightness \u2014 making it the easiest format for generating consistent tints, shades, and theme variations.\n\nBecause design tools, codebases, and style guides don\u2019t all standardize on the same format, converting between all three is a genuinely common need \u2014 this tool accepts any of the three as input and always shows the other two immediately, so there\u2019s no need to remember which conversion tool handles which specific direction.',
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
      'Avoiding the need to remember which single-direction converter to use',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'palette-generator': {
    about:
      'Color Palette Generator builds a set of related colors from one base color, using real HSL hue and lightness math \u2014 choose complementary, analogous, triadic or shade-based schemes.\n\nEach scheme follows a genuine color-theory rule based on positions around the color wheel, defined by hue angle in HSL. A complementary scheme pairs a color with the one directly opposite it on the wheel (180 degrees away) \u2014 high contrast, often used for accent colors that need to stand out against a primary color. An analogous scheme picks colors sitting close together on the wheel, producing a harmonious, low-contrast palette that feels cohesive rather than attention-grabbing. A triadic scheme picks three colors evenly spaced around the wheel (120 degrees apart), giving vibrant variety while still maintaining balance. Shades simply vary the lightness of a single hue, useful for UI states like hover and active colors that need to feel related to a base color without introducing a second hue at all.\n\nThere\u2019s no universally \u201ccorrect\u201d scheme \u2014 the right choice depends on what the palette is for. A brand palette often benefits from analogous or shade-based harmony; a call-to-action button that needs to visually pop against its background is a classic complementary use case; triadic works well when a design genuinely needs several distinct colors that still feel intentionally chosen together, rather than random.',
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
      'Finding a high-contrast complementary accent color for a call-to-action',
      'Generating a range of shades from one base color for UI hover/active states',
      'Exploring triadic color combinations for a design that needs several distinct colors',
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
      'JSON Formatter beautifies or minifies JSON data instantly, with clear error messages (including the exact line and column) if something\u2019s not valid.\n\nFormatting (also called pretty-printing) adds consistent indentation and line breaks to JSON data, turning a dense, single-line blob into a structure you can actually read and navigate \u2014 nested objects and arrays become visually clear, and it\u2019s far easier to spot where one object ends and another begins. Minifying does the opposite: it strips all unnecessary whitespace to produce the smallest possible representation of the same data, which matters for production use, where every byte transferred over the network has a real (if usually small) cost.\n\nAPIs commonly return minified JSON by default, since there\u2019s no reason to waste bandwidth on formatting whitespace a machine doesn\u2019t need \u2014 which is exactly why a formatter tool is useful for a human trying to actually read that response while debugging. The reverse direction matters too: a formatted, human-edited JSON config file is often minified before being bundled into production, shaving a small amount of size off the final build.',
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
      'JSON Validator checks whether your JSON is syntactically correct, telling you immediately whether it\u2019s valid \u2014 and if not, exactly where the problem is.\n\nJSON looks similar to a JavaScript object literal, but the two aren\u2019t the same thing, and the differences are exactly where most invalid JSON actually goes wrong. JSON requires every key to be wrapped in double quotes \u2014 not single quotes, and not left unquoted the way plain JavaScript object keys can be. JSON also doesn\u2019t allow a trailing comma after the last item in an object or array, doesn\u2019t support comments at all, and can\u2019t represent JavaScript-specific values like undefined, functions, or Date objects \u2014 only strings, numbers, booleans, null, objects, and arrays are valid JSON values.\n\nThese rules exist because JSON was designed as a strict, minimal, language-independent data format, not a subset of JavaScript syntax that happens to look familiar. That strictness is a real feature, not a limitation \u2014 it\u2019s exactly what makes JSON reliably parseable the same way across every programming language, with no ambiguity about what a given piece of data means.',
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
      'Checking JSON copied from a JavaScript codebase for values that aren\u2019t actually valid JSON',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'base64-encoder': {
    about:
      'Base64 Encoder/Decoder converts text to and from Base64, with full Unicode support \u2014 accented letters, non-Latin scripts and emoji all round-trip correctly.\n\nBase64 is a binary-to-text encoding scheme that represents arbitrary data using only 64 printable ASCII characters (A\u2013Z, a\u2013z, 0\u20139, +, and /, with = used for padding). It exists because many older systems and protocols \u2014 email, some URL contexts, certain config formats \u2014 were built to handle plain text safely, not arbitrary binary bytes. Base64 shows up constantly in modern development too: embedding small images directly in HTML or CSS as data URLs, encoding the header and payload of a JWT, and attaching files in email all rely on it.\n\nThis tool produces standard Base64 output, using + and / as its two special characters. Worth knowing if you\u2019re working with JWTs or Base64 in a URL specifically: those contexts typically use a URL-safe variant instead, which replaces + with -, / with _, and often drops the = padding entirely, since + and / have special meaning inside a URL. If you need URL-safe output, you\u2019ll need to substitute those characters manually after encoding here.\n\nOne genuinely useful thing to remember: Base64 is an encoding, not an encryption \u2014 anyone can decode it back to the original text instantly, with no key or password required. It makes binary-safe data readable as text; it does not make data private or secure in any way.',
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
      'URL Encoder/Decoder converts text and URLs to and from percent-encoded form, so special characters like spaces and ampersands are safely represented in a URL.\n\nPercent-encoding (also called URL encoding) replaces characters that aren\u2019t safe to use directly in a URL with a % followed by their hexadecimal byte value \u2014 a space becomes %20, an ampersand becomes %26, and so on. This is necessary because certain characters have structural meaning in a URL: & separates query parameters, = separates a parameter\u2019s name from its value, and / separates path segments, so a literal one of these characters inside a value would be misread as part of the URL\u2019s structure rather than actual data.\n\nThis tool specifically encodes each value the way you\u2019d encode a single query parameter or path segment, escaping characters like &, =, ?, and / along with spaces and other unsafe characters. That\u2019s a genuinely important, commonly confused distinction: encoding a full, already-structured URL is different from encoding one individual value that will be placed inside a URL \u2014 encoding an entire URL this way would also escape the slashes and colons that are supposed to remain as real URL structure, breaking it. Use this tool on individual values (a search term, a parameter, a piece of user input) that you\u2019re inserting into a URL, not on a complete URL you already have.',
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
      'UUID Generator creates random, RFC-compliant version 4 UUIDs using your browser\u2019s cryptographically secure random number generator \u2014 one at a time or in bulk.\n\nA UUID (Universally Unique Identifier) is a 128-bit identifier, conventionally written as 32 hexadecimal digits split into five groups by hyphens, like 550e8400-e29b-41d4-a716-446655440000. The point of a UUID is that it can be generated independently, by different systems, with no central coordination or database lookup, while still being safe to treat as effectively unique \u2014 the chance of two randomly generated version 4 UUIDs colliding is astronomically small, far lower than the odds of a hardware failure happening at the same moment.\n\nVersion 4, which this tool generates, is entirely random except for a few fixed bits that identify it as a v4 UUID. It\u2019s the most common version for general-purpose unique IDs. A newer version, UUID v7, has also gained adoption \u2014 it embeds a timestamp in the leading bits, which makes v7 UUIDs sort roughly in creation order, something v4\u2019s pure randomness can\u2019t do. Databases sometimes prefer v7 specifically because sequentially-ish ordered IDs index more efficiently than fully random ones. If your system doesn\u2019t specifically require time-ordering, v4 remains a simple, solid default.',
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

  'hash-generator': {
    about:
      'Hash Generator produces MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes from text \u2014 SHA hashes use your browser\u2019s native Web Crypto API, and MD5 (not included in Web Crypto since it\u2019s cryptographically broken for security purposes) uses a standard, verified implementation for file-checksum and compatibility use cases.\n\nA hash function takes input of any length and produces a fixed-length output, called a hash or digest. The same input always produces the same hash, and even a tiny, single-character change in the input produces a completely different result \u2014 a property that makes hashes useful for verifying that a piece of text or a file hasn\u2019t been altered, without needing to compare the full content directly.\n\nMD5 and SHA-1 are both considered cryptographically broken \u2014 collisions (two different inputs producing the same hash) can be computed quickly with modern hardware, which makes them unsuitable for anything security-sensitive. They\u2019re still commonly used for non-security purposes like file checksums, cache keys, and deduplication, where the risk of a deliberate, malicious collision doesn\u2019t apply. SHA-256 is the current practical standard for real security-relevant work \u2014 it\u2019s what software projects typically publish alongside a download so users can verify the file wasn\u2019t corrupted or tampered with, and it\u2019s a building block in TLS, Git\u2019s newer object format, and Bitcoin\u2019s proof-of-work.\n\nOne important distinction worth being explicit about: none of these algorithms should be used to store passwords, even SHA-512. They\u2019re deliberately fast to compute, which is exactly what makes them weak for password storage \u2014 an attacker with a list of leaked hashes can try billions of guesses per second against a fast hash. Password storage needs a deliberately slow algorithm designed for that purpose, like bcrypt, scrypt, or Argon2, not a general-purpose hash function.',
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
    supportedFormats: { notes: 'SHA-256 or higher is recommended for anything security-relevant; MD5 and SHA-1 are best treated as checksums only, not for security purposes. None of these algorithms are appropriate for storing passwords \u2014 use bcrypt, scrypt, or Argon2 for that instead.' },
    privacy: NO_FILE_PRIVACY,
  },

  'timestamp-converter': {
    about:
      'Timestamp Converter converts between Unix timestamps and human-readable dates in both directions, showing the result in local time, UTC, ISO 8601, and relative form.\n\nA Unix timestamp (also called epoch time or POSIX time) is the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC \u2014 a fixed reference point known as the Unix epoch. It represents an absolute point in time as a single number, independent of timezone: the timestamp 1700000000 refers to the exact same instant whether you\u2019re in Karachi, New York, or Tokyo, even though the human-readable date and time shown for it will differ by timezone. That single-number simplicity is why timestamps are used everywhere in software \u2014 databases store them, APIs return them, and server logs are full of them, because comparing two integers or subtracting one from another is far simpler than comparing calendar dates across timezones.\n\nThis tool works with timestamps in seconds, which is the standard Unix format. Some systems and APIs (including JavaScript\u2019s own Date.now()) use milliseconds instead \u2014 a 13-digit number rather than 10 digits. If you have a millisecond value, divide it by 1000 before pasting it in here to get the equivalent seconds-based timestamp.\n\nWorth knowing if you work with timestamps regularly: many older systems store Unix time as a signed 32-bit integer, which can only count up to a certain point before it overflows \u2014 known as the Year 2038 problem, since that\u2019s when 32-bit timestamps run out of room. It doesn\u2019t affect this converter, but it\u2019s a real, still-relevant limitation in some legacy systems and embedded devices.',
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
      'Regex Tester lets you build and debug regular expressions against real text, with matches highlighted live as you type \u2014 no more guessing whether your pattern actually works.\n\nA regular expression (regex) is a pattern that describes a set of strings \u2014 used for validating input (checking whether something looks like an email address), extracting data (pulling all phone numbers out of a block of text), or find-and-replace operations far more powerful than a literal text search. Regex syntax is notoriously easy to get subtly wrong, since small changes in a pattern can change what it matches in ways that aren\u2019t obvious just by reading it \u2014 testing against real, representative text before using a pattern in actual code is genuinely the reliable way to know it behaves as intended.\n\nThe four flags supported here each change matching behavior in a specific way. Global (g) finds every match in the text instead of stopping at the first one. Case-insensitive (i) makes the pattern match regardless of letter case. Multiline (m) changes how ^ and $ behave, making them match the start and end of each individual line rather than only the very start and end of the whole string. Dot-matches-newline (s) makes the . character also match newline characters, which it doesn\u2019t by default \u2014 useful when a pattern needs to match across multiple lines.',
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
      'Word Counter gives you live word, character, sentence and paragraph counts as you type or paste text, plus an estimated reading time.\n\nThe reading time estimate is based on 200 words per minute, a commonly-cited average adult silent-reading speed \u2014 useful as a genuine estimate, though actual reading speed varies a fair amount by person and by how dense or technical the text is. Treat it as a reasonable ballpark for planning purposes (how long a blog post or speech will take to read), not an exact prediction for any specific reader.\n\nThe character counts, shown both with and without spaces, matter because different platforms and forms count differently \u2014 some character limits count every character including spaces, others exclude them, and the difference can matter for text close to a hard limit. Having both numbers visible at once means you don\u2019t have to guess which one a specific platform is actually enforcing.',
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
      'Case Converter transforms your text into seven different case styles at once \u2014 covering everyday writing conventions and the naming styles used in code.\n\nThe programming-focused styles each have a real, specific home: camelCase (like myVariableName) is the standard convention for variable and function names in JavaScript, Java, and several other languages. snake_case (like my_variable_name) is the idiomatic convention in Python and Ruby. kebab-case (like my-variable-name) is the standard for URL slugs and CSS class names, since underscores and camelCase aren\u2019t valid in a URL and CSS class names are conventionally hyphenated. Using the wrong convention in the wrong context won\u2019t break anything technically in most cases, but it does stand out as inconsistent with a codebase or platform\u2019s established style.\n\nThe everyday styles \u2014 UPPERCASE, lowercase, Title Case, and Sentence case \u2014 cover the more familiar writing conventions: Title Case for headings, Sentence case for normal prose, and the other two for emphasis or specific formatting needs.',
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
      'Lorem Ipsum Generator produces classic placeholder text \u2014 by words, sentences, or paragraphs \u2014 for filling mockups and designs before real content is ready.\n\nThe text itself has a genuinely traceable origin: it\u2019s derived from a scrambled, altered passage of Cicero\u2019s "de Finibus Bonorum et Malorum," a real Latin philosophical text written in 45 BC. The words are garbled and rearranged enough that the result isn\u2019t meaningful Latin, which is actually the point \u2014 placeholder text needs to look like real, natural language text at a glance without being readable, so a viewer\u2019s attention stays on the layout and typography rather than getting pulled into reading the actual words.\n\nThat\u2019s the real reason lorem ipsum remains the standard choice over just using repeated "text text text" or random keyboard mashing: real language has natural variation in word length and letter frequency that placeholder gibberish doesn\u2019t, so it gives a genuinely more realistic preview of how actual content will look in a layout.',
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
      'Code Minifier strips comments and unnecessary whitespace from JavaScript, CSS, and HTML to reduce file size \u2014 built to never break your code, even at the cost of a slightly smaller size reduction than a more aggressive minifier would achieve.\n\nMost minifiers built with simple text-replacement rules run into a well-known problem: a naive search for "//" to strip a JavaScript comment will also match "//" inside a URL string like "https://example.com", or inside a regex literal, silently corrupting working code. This tool is built as a proper character-by-character scanner that tracks whether it\u2019s currently inside a string, a template literal, or a regex literal before touching anything \u2014 so a URL or regex containing // is correctly left alone, while a genuine comment is correctly removed.\n\nThis tool deliberately does not rename variables or remove unused code. Those transformations can meaningfully shrink a file further, but doing them safely requires a full parser that understands the code\u2019s structure \u2014 getting it wrong risks silently breaking working code, which is a worse outcome than a more modest size reduction. For CSS specifically, the same care applies to content strings (like a CSS content: "/* not a comment */" property) and url() values, which are preserved exactly rather than having their contents mistaken for syntax to strip.',
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
      'Understanding the real, genuine size savings minification offers for a specific file',
      'Preparing a smaller HTML snippet for embedding somewhere with limited space',
    ],
    privacy: NO_FILE_PRIVACY,
  },

  'password-generator': {
    about:
      'Password Generator creates strong, random passwords using your browser\u2019s cryptographically secure random number generator \u2014 with adjustable length and character types, plus a real entropy-based strength indicator, not a cosmetic strength bar.\n\nModern security guidance generally recommends at least 14\u201316 characters for a standard account password, and 20 or more characters for anything critical, like your email account, banking, or a password manager\u2019s own master password. Length matters more than clever substitutions \u2014 a longer random password is harder to crack than a shorter one with symbols swapped in for letters, since attackers already check common substitution patterns like replacing "a" with "@" or "e" with "3" as a standard part of password-cracking tools.\n\nThe strength indicator here is based on entropy, measured in bits \u2014 a real, calculable measure of how unpredictable a password actually is, based on its length and the size of the character set it draws from. This is a meaningfully different (and more honest) approach than the cosmetic red/yellow/green bars many sites show, which often reward things like mixed case or a single symbol without actually reflecting how hard the password would be to guess or brute-force.\n\nA password generated this way is different from a passphrase (a string of random, unrelated words, like the well-known "correct horse battery staple" example) \u2014 both are legitimate approaches to a strong credential, but a passphrase trades some randomness for being easier to type and remember, while a fully random character-based password maximizes entropy for a given length. This tool generates the traditional character-based kind.\n\nThe most common password mistakes are worth knowing even with a generator in hand: reusing the same password across multiple accounts (so a single breach exposes everything), using dictionary words or common keyboard patterns like "qwerty", and relying on security questions with real, guessable answers. A generated, unique password for every account avoids the first and second of these directly.',
    features: [
      { title: 'Cryptographically secure', description: 'Uses the browser\u2019s native secure random generator (crypto.getRandomValues), never Math.random() or another weak pseudo-random function.', icon: HiOutlineKey },
      { title: 'Adjustable length & charset', description: 'Choose length from 6\u201364 characters and which character types to include \u2014 uppercase, lowercase, numbers, and symbols.', icon: HiOutlineAdjustmentsHorizontal },
      { title: 'Real entropy calculation', description: 'A genuine bits-of-entropy strength calculation based on length and character set size, not a cosmetic bar.', icon: HiOutlineShieldCheck },
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
      'Passwords are generated entirely on your device using your browser\u2019s cryptographically secure random number generator. Nothing about the password you generate is ever sent to ToolHub\u2019s servers, and nothing is stored \u2014 if you close the tab without copying it, it\u2019s gone.',
  },

  'instagram-post-resizer': {
    about:
      'Instagram Post Resizer fits your image to Instagram\u2019s exact post, story and profile picture dimensions \u2014 choose to crop-to-fill with no empty space, or fit-with-padding so nothing gets cropped.\n\nEach preset targets Instagram\u2019s real, specific dimensions: Square Post at 1080\u00d71080, Portrait Post at 1080\u00d71350, Landscape Post at 1080\u00d7566, Story/Reel at 1080\u00d71920, and Profile Picture at 320\u00d7320. Instagram itself will resize or crop an image that doesn\u2019t already match these dimensions when you upload it, using its own logic \u2014 which doesn\u2019t always frame the subject the way you intended. Resizing to the exact target dimensions yourself beforehand means you control the framing, not the platform.\n\nThe choice between Fill and Fit matters for how your image actually ends up looking. Fill crops the image to completely cover the target frame with no empty space, which can cut off parts of the image near the edges if the aspect ratio doesn\u2019t already match. Fit instead scales the image down to fit entirely within the frame, adding padding around it rather than cropping anything \u2014 the right choice when nothing in the image can be cropped without losing something important.',
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
      'Controlling exactly how a photo gets cropped instead of leaving it to Instagram\u2019s own auto-crop',
    ],
    supportedFormats: { input: 'JPG / PNG / WEBP', output: 'JPG or PNG', maxSize: '25 MB' },
    privacy: BROWSER_ONLY_PRIVACY,
  },

  'youtube-thumbnail-downloader': {
    about:
      'YouTube Thumbnail Downloader lets you view and download the thumbnail images YouTube generates for any public video, at every resolution that video actually has available.\n\nYouTube automatically generates a video\u2019s thumbnail at several fixed resolutions: Max Resolution (1280\u00d7720), Standard Definition (640\u00d7480), High Quality (480\u00d7360), Medium Quality (320\u00d7180), and Default (120\u00d790). Not every video actually has all of these available \u2014 Max Resolution specifically depends on the video\u2019s own upload resolution and isn\u2019t generated for lower-resolution or very old uploads, so this tool checks which resolutions genuinely exist for the specific video you enter rather than showing options that would just fail to load.\n\nThese thumbnail images are already publicly accessible directly from YouTube\u2019s own image servers for any public video \u2014 that\u2019s how thumbnails display correctly when a video is embedded or linked anywhere across the web. This tool simply makes them easy to browse and download in one place, rather than requiring you to know YouTube\u2019s specific image URL pattern yourself.',
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
      notes: 'Works only with thumbnails YouTube already makes publicly available for a video \u2014 not the video itself.',
    },
    privacy:
      'This tool fetches thumbnail images directly from YouTube\u2019s own public image servers (img.youtube.com) \u2014 the same publicly accessible thumbnails YouTube serves for embedding anywhere. No video content, account data, or anything beyond the video ID you provide is involved.',
  },
}
