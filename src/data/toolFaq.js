export const toolFaqs = {
  'jpg-to-png': [
    {
      id: 'lossless',
      question: 'Will converting JPG to PNG improve quality?',
      answer:
        'No. PNG is lossless, so it won\u2019t degrade the image further, but it can\u2019t restore detail already lost when the JPG was originally compressed.',
    },
    {
      id: 'transparency',
      question: 'Does the converted PNG support transparency?',
      answer:
        'JPG images don\u2019t have transparency data, so the resulting PNG will have a solid background rather than a transparent one \u2014 converting doesn\u2019t add transparency that wasn\u2019t already there.',
    },
    {
      id: 'file-size-increase',
      question: 'Why did my file get bigger after converting to PNG?',
      answer: 'This is expected \u2014 PNG\u2019s lossless compression preserves every pixel exactly, which takes more space than JPEG\u2019s lossy approach, especially for photos. A bigger file after converting is a sign the conversion worked correctly, not a problem.',
    },
    {
      id: 'when-to-use-png',
      question: 'When should I actually use PNG instead of JPG?',
      answer: 'When you need transparency, when the image will be edited and re-saved multiple times (to avoid generation loss), or when exact pixel accuracy matters \u2014 logos, screenshots with text, and graphics with sharp edges.',
    },
    {
      id: 'jpg-to-png-privacy',
      question: 'Is my photo uploaded to a server during conversion?',
      answer: 'No \u2014 the conversion happens entirely in your browser using the Canvas API. Your image is never uploaded anywhere.',
    },
  ],
  'png-to-jpg': [
    {
      id: 'transparency-loss',
      question: 'What happens to transparent areas?',
      answer:
        'JPG doesn\u2019t support transparency, so any transparent areas in your PNG will be filled with white in the converted JPG.',
    },
    {
      id: 'quality',
      question: 'Will I lose quality converting to JPG?',
      answer:
        'JPG uses lossy compression, so there can be a very slight quality reduction, though it\u2019s usually not noticeable at high quality settings.',
    },
    {
      id: 'size-comparison',
      question: 'How much smaller will the JPG be compared to the PNG?',
      answer: 'It varies by image, but for photographic content the difference can be dramatic. A lossless PNG is often several times larger than a JPG of the same photo at a quality setting where the difference is barely visible.',
    },
    {
      id: 'best-quality-setting',
      question: 'What quality setting should I use?',
      answer: 'Around 80-85% is a common sweet spot: a real, meaningful size reduction with minimal visible quality loss for most photos. Go higher if the image will be printed or closely inspected, lower if file size matters more than visual fidelity.',
    },
    {
      id: 'non-photo-content',
      question: 'Should I still use JPG if my PNG isn\u2019t a photo, like a screenshot with text?',
      answer: 'JPG can still shrink it, but the savings are usually smaller and sharp edges (like text) can pick up faint compression artifacts that photos hide much better. For a screenshot or graphic full of sharp lines, a higher quality setting or staying with PNG often gives a cleaner result.',
    },
    {
      id: 'png-to-jpg-privacy',
      question: 'Is my image uploaded to a server during conversion?',
      answer: 'No \u2014 the conversion happens entirely in your browser using the Canvas API. Your image is never uploaded anywhere.',
    },
  ],
  'webp-to-png': [
    {
      id: 'why-webp',
      question: 'Why convert WEBP to PNG?',
      answer:
        'PNG has broader compatibility with older software and design tools that don\u2019t yet support WEBP, and it\u2019s the safer choice whenever you\u2019re unsure what will open the file next.',
    },
    {
      id: 'webp-file-larger',
      question: 'Why is the PNG bigger than the original WEBP?',
      answer: 'WebP generally achieves smaller file sizes than PNG at comparable quality, so converting from WebP to PNG typically increases file size \u2014 that\u2019s an expected side effect of gaining broader compatibility, not a sign anything went wrong.',
    },
    {
      id: 'quality-preserved',
      question: 'Does converting from WEBP to PNG lose any quality?',
      answer: 'If the source WebP was created losslessly, no quality is lost in the conversion. If the source WebP used lossy compression, whatever quality it already had is preserved exactly \u2014 PNG\u2019s lossless nature won\u2019t restore detail the WebP had already discarded.',
    },
    {
      id: 'batch-convert',
      question: 'Can I convert multiple WEBP files to PNG at once?',
      answer: 'Yes \u2014 upload up to 10 images and convert them all in a single pass, then download the results individually or bundled together as a ZIP.',
    },
    {
      id: 'why-not-webp',
      question: 'If WEBP is smaller, why would I ever convert away from it?',
      answer: 'Compatibility, not quality \u2014 some older design software, certain email clients, and specific platforms still don\u2019t handle WEBP reliably, even though modern browsers support it well. PNG remains the safer bet when you genuinely don\u2019t control what opens the file next.',
    },
    {
      id: 'webp-to-png-privacy',
      question: 'Is my image uploaded to a server during conversion?',
      answer: 'No \u2014 the conversion happens entirely in your browser using the Canvas API. Your image is never uploaded anywhere.',
    },
  ],
  'webp-to-jpg': [
    {
      id: 'why-jpg',
      question: 'Why convert WEBP to JPG?',
      answer:
        'JPG remains one of the most universally supported image formats, useful when sharing to platforms or tools without WEBP support, or when working with software that predates WEBP\u2019s 2020 browser-wide adoption.',
    },
    {
      id: 'transparency-jpg',
      question: 'What happens if my WEBP has transparency?',
      answer: 'JPEG has no transparency support at all, so any transparent areas in the source WebP get filled with a solid background during conversion. If you need to keep transparency, convert to PNG instead.',
    },
    {
      id: 'quality-webp-jpg',
      question: 'Will converting to JPG reduce quality?',
      answer: 'If the source WebP was lossy, converting to JPG applies a second round of lossy compression, which can introduce a small additional quality reduction. Using a high quality setting keeps this difference minimal for most images.',
    },
    {
      id: 'batch-convert-jpg',
      question: 'Can I convert multiple WEBP files to JPG at once?',
      answer: 'Yes \u2014 upload up to 10 images and convert them all in a single pass, then download the results individually or bundled together as a ZIP.',
    },
    {
      id: 'why-jpg-over-webp',
      question: 'When does JPG actually make more sense than keeping WEBP?',
      answer: 'When the image is heading somewhere you don\u2019t control \u2014 an old device, print software, or a platform with uncertain WEBP support. JPG\u2019s decades-long universal compatibility is the real reason to convert, even though it typically means a larger file than the original WEBP.',
    },
  ],
  'convert-to-webp': [
    {
      id: 'why-webp-benefit',
      question: 'What are the benefits of WEBP?',
      answer:
        'WEBP typically produces smaller file sizes than JPG or PNG at a similar visual quality \u2014 generally 25\u201335% smaller \u2014 which helps pages load faster, and it supports both lossy and lossless compression plus transparency in one format.',
    },
    {
      id: 'browser-support',
      question: 'Is WEBP widely supported?',
      answer:
        'Yes, all modern browsers have supported WEBP since 2020, with current adoption estimates generally above 95%. Very old browsers or some non-browser software may not, which is worth checking if the image needs to work outside a web context.',
    },
    {
      id: 'seo-benefit',
      question: 'Does using WEBP actually help SEO?',
      answer: 'Indirectly, yes \u2014 smaller image files mean faster page loads, which is a real factor in Core Web Vitals metrics that Google\u2019s ranking systems take into account. It\u2019s not a direct ranking signal on its own, but genuinely faster pages tend to perform better in search.',
    },
    {
      id: 'lossy-or-lossless',
      question: 'Does this create lossy or lossless WEBP?',
      answer: 'This uses WebP\u2019s lossy encoding, controlled by the quality slider \u2014 higher settings mean less compression and higher visual fidelity, similar in spirit to a JPG quality slider. It doesn\u2019t use WebP\u2019s separate dedicated lossless mode.',
    },
  ],
  'image-compressor': [
    {
      id: 'quality-loss',
      question: 'Will compressing my image reduce its quality?',
      answer:
        'Some quality is traded for a smaller file size when using JPG or WEBP output, but you control how much through the quality slider, with a live before/after preview. PNG output is lossless, so it preserves exact quality but shrinks the file by a much smaller amount.',
    },
    {
      id: 'png-compression',
      question: 'Can I compress PNG files?',
      answer:
        'Yes \u2014 by default, this tool outputs JPG regardless of your original format, since lossy compression achieves a far bigger size reduction than PNG\u2019s lossless approach can. If you need to keep transparency or exact pixel accuracy, choose PNG explicitly from the output format option instead.',
    },
    {
      id: 'jpg-vs-webp',
      question: 'Should I compress to JPG or WEBP?',
      answer: 'WEBP generally produces a smaller file than JPG at a similar visual quality, and is well supported by modern browsers. JPG remains the safer choice for maximum compatibility with older software or systems that don\u2019t support WEBP.',
    },
    {
      id: 'how-much-smaller',
      question: 'How much smaller will my image get?',
      answer: 'It depends heavily on the image and the quality setting you choose \u2014 a detailed photo compressed to JPG at a moderate quality setting can often shrink by 70\u201390%, while a PNG re-encoded losslessly might only shrink by a small percentage. The live before/after size shown as you adjust the slider is the most reliable way to know for your specific image.',
    },
    {
      id: 'image-compressor-privacy',
      question: 'Are my photos uploaded to a server to be compressed?',
      answer: 'No \u2014 compression happens entirely on your device using your browser\u2019s built-in Canvas API. Your images are never uploaded anywhere, which also means there\u2019s no upload wait time, compression starts immediately.',
    },
  ],
  'image-resizer': [
    {
      id: 'aspect-ratio',
      question: 'Will resizing distort my image?',
      answer:
        'Not if you keep "Lock aspect ratio" enabled. It scales width and height together to avoid stretching.',
    },
    {
      id: 'upscaling',
      question: 'Can I make an image larger?',
      answer:
        'Yes, though enlarging an image beyond its original size can make it look softer since no new detail is being added. The tool has to interpolate what the extra pixels probably look like, not recover detail that was never captured.',
    },
    {
      id: 'quality-during-resize',
      question: 'Does resizing reduce image quality?',
      answer: 'Resizing down uses high-quality smoothing and stays visually sharp. Resizing up (enlarging) is where quality softness becomes noticeable, since interpolation can only estimate new pixels, not add real detail.',
    },
    {
      id: 'percentage-vs-exact',
      question: 'Should I resize by percentage or exact dimensions?',
      answer: 'Use percentage scaling when you just want a proportionally smaller or larger version. Use exact width and height when a specific platform or form requires precise pixel dimensions.',
    },
    {
      id: 'batch-resize',
      question: 'Can I resize several images to the same size at once?',
      answer: 'Yes. Upload up to 10 images and apply the same width, height, or percentage scale to all of them in one pass, then download the results individually or as a ZIP.',
    },
    {
      id: 'file-size-after-resize',
      question: 'Does resizing an image also reduce its file size?',
      answer: 'Usually, yes, since a smaller image has fewer pixels to store, but resizing and compressing are different tools for different jobs. If file size matters more than exact dimensions, running the result through the Image Compressor afterward will typically shrink it further.',
    },
    {
      id: 'image-resizer-privacy',
      question: 'Is my image uploaded to a server to be resized?',
      answer: 'No \u2014 resizing happens entirely in your browser using the Canvas API. Your images are never uploaded anywhere.',
    },
  ],
  'image-crop': [
    {
      id: 'crop-precision',
      question: 'Can I fine-tune the crop area?',
      answer:
        'Yes — drag the crop box to move it, or drag its corner handles to resize it precisely before downloading.',
    },
    {
      id: 'rotate-before-crop',
      question: 'Can I rotate the image before cropping?',
      answer:
        'Yes, use the rotate buttons above the crop area to rotate in 90\u00b0 steps before setting your crop region.',
    },
    {
      id: 'crop-quality-loss',
      question: 'Does cropping reduce image quality?',
      answer: 'No \u2014 cropping simply keeps the pixels inside your selected area and discards the rest. The kept portion retains its exact original quality, with no interpolation or estimation involved.',
    },
    {
      id: 'common-ratios',
      question: 'What crop ratio should I use for social media?',
      answer: '1:1 (square) works well for most profile pictures, 4:5 is common for an Instagram feed post, and 16:9 suits a video thumbnail or website banner \u2014 though exact requirements vary by platform and change over time, so it\u2019s worth checking the specific platform\u2019s current guidelines.',
    },
    {
      id: 'undo-crop',
      question: 'Can I adjust the crop area after making changes?',
      answer: 'Yes \u2014 the crop box stays fully adjustable until you click Crop, so you can drag, resize, and reposition it as many times as you like before finalizing the result.',
    },
    {
      id: 'crop-vs-resize',
      question: 'Should I crop or resize to change an image\u2019s dimensions?',
      answer: 'Crop when you want to remove part of the image and keep the rest at full quality. Resize when you want the entire image smaller or larger, with nothing cut out \u2014 the two solve genuinely different problems.',
    },
    {
      id: 'image-crop-privacy',
      question: 'Is my photo uploaded to a server to be cropped?',
      answer: 'No \u2014 cropping happens entirely in your browser using the Canvas API. Your image is never uploaded anywhere.',
    },
  ],
  'image-rotate': [
    {
      id: 'rotate-quality',
      question: 'Does rotating reduce image quality?',
      answer:
        'Rotating by 90\u00b0 increments doesn\u2019t reduce quality. The image is re-encoded, so very minor compression differences can occur with JPG output.',
    },
    {
      id: 'why-sideways',
      question: 'Why do phone photos sometimes appear sideways?',
      answer: 'Cameras often save the image data in its original sensor orientation and record how it should be displayed in EXIF metadata, rather than rotating the actual pixels. Different apps and browsers read that metadata inconsistently, which is why the same photo can look correct in one place and sideways in another.',
    },
    {
      id: 'why-manual-better',
      question: 'Why not just rely on the EXIF orientation tag instead of rotating manually?',
      answer: 'Because support for reading that metadata is inconsistent across apps and platforms. A real pixel rotation, like this tool performs, displays correctly everywhere regardless of whether the software viewing it bothers to read orientation metadata at all.',
    },
    {
      id: 'rotation-angles',
      question: 'Can I rotate by an angle other than 90\u00b0 increments?',
      answer: 'This tool supports 90\u00b0, 180\u00b0, and 270\u00b0 rotations specifically, the common cases for fixing orientation. For a small, precise angle correction (like straightening a slightly tilted scan), a dedicated image editor is a better fit.',
    },
    {
      id: 'batch-rotate',
      question: 'Can I rotate several images the same way at once?',
      answer: 'Yes. Upload up to 10 images and apply the same rotation to all of them in one pass, then download the results individually or as a ZIP.',
    },
    {
      id: 'rotate-vs-flip-mixup',
      question: 'I rotated my image but the text still looks backwards. What happened?',
      answer: 'Rotating turns an image around a point; it never mirrors it, so text stays readable, just at a different angle. Backwards text specifically means the image needs flipping instead, which reverses left and right the way a mirror does.',
    },
    {
      id: 'image-rotate-privacy',
      question: 'Is my photo uploaded to a server to be rotated?',
      answer: 'No \u2014 rotation happens entirely in your browser using the Canvas API. Your images are never uploaded anywhere.',
    },
  ],
  'flip-image': [
    {
      id: 'flip-vs-rotate',
      question: 'What\u2019s the difference between flip and rotate?',
      answer:
        'Flipping mirrors the image horizontally or vertically, while rotating turns it around a center point. They produce different results \u2014 any text or asymmetric detail in the image makes the difference obvious, since a flip reverses it like a mirror while a rotation keeps it readable, just at a different angle.',
    },
    {
      id: 'selfie-mirror',
      question: 'Why does my selfie look different than what I saw while taking it?',
      answer: 'Phone front cameras typically show a mirrored preview on screen while saving the actual photo unmirrored. Any text in the shot, like a shirt logo, ends up backwards in the saved file relative to what you saw in the preview \u2014 flipping corrects that mismatch.',
    },
    {
      id: 'flip-quality-loss',
      question: 'Does flipping reduce image quality?',
      answer: 'No \u2014 flipping is a pure pixel rearrangement, not a re-sampling or estimation. The image content stays exactly as sharp as the original.',
    },
    {
      id: 'both-flips',
      question: 'Can I flip both horizontally and vertically at the same time?',
      answer: 'Yes \u2014 both directions can be applied together, which produces the same visual result as rotating the image 180\u00b0.',
    },
    {
      id: 'flip-image-privacy',
      question: 'Is my photo uploaded to a server to be flipped?',
      answer: 'No \u2014 flipping happens entirely in your browser using the Canvas API. Your images are never uploaded anywhere.',
    },
  ],


  'favicon-generator': [
    {
      id: 'why-many-sizes',
      question: 'Why do I need so many different favicon sizes?',
      answer: 'Different platforms request different sizes \u2014 browser tabs use 16\u00d716 and 32\u00d732, Apple\u2019s home screen uses 180\u00d7180, and Android/PWA installs use 192\u00d7192 and 512\u00d7512. Generating all of them at once means every platform gets a correctly-sized icon instead of one image stretched or shrunk awkwardly.',
    },
    {
      id: 'is-ico-still-needed',
      question: 'Do I still need favicon.ico, or is PNG enough?',
      answer: 'Modern browsers (Chrome, Firefox, Edge, Safari) support PNG favicons directly and generally prefer them when a page links to one. favicon.ico remains the compatibility fallback some older browsers and certain non-browser software still look for at the site root, so it\u2019s worth including alongside the PNG versions rather than instead of them.',
    },
    {
      id: 'is-this-a-real-ico',
      question: 'Is the generated favicon.ico a real ICO file?',
      answer: 'Yes \u2014 it\u2019s a genuine, valid multi-resolution ICO container with the correct binary header and directory structure, bundling the 16, 32, and 48 pixel sizes together. It was verified independently against a separate image library before shipping, not just assumed to work.',
    },
    {
      id: 'transparent-source',
      question: 'What happens if I upload a transparent PNG?',
      answer: 'Transparency is preserved in every generated size \u2014 the output won\u2019t have a solid background added behind it, so it displays correctly against whatever background color the browser tab or home screen uses.',
    },
    {
      id: 'svg-input',
      question: 'Can I upload an SVG as the source image?',
      answer: 'Yes \u2014 the SVG is rendered at each target size, which works well for simple, clean vector logos. Very complex SVGs with fine detail may look better starting from a high-resolution PNG instead, since favicon sizes are small enough that intricate detail gets lost either way.',
    },
    {
      id: 'favicon-generator-privacy',
      question: 'Is my logo or source image uploaded anywhere?',
      answer: 'No \u2014 every size is generated entirely in your browser using the Canvas API. Your source image is never uploaded to a server.',
    },
  ],


  'jpg-to-pdf': [
    {
      id: 'page-size',
      question: 'What size will the PDF page be?',
      answer: 'The page is sized to match your image\u2019s exact pixel dimensions at 72 DPI \u2014 the image fills the whole page with no cropping or scaling.',
    },
    {
      id: 'multiple-images',
      question: 'Can I combine multiple images into one PDF?',
      answer: 'This tool creates a PDF from one image at a time. To combine several images, convert each to PDF first, then use Merge PDF to combine them.',
    },
    {
      id: 'quality-preserved',
      question: 'Does converting to PDF reduce my image\u2019s quality?',
      answer: 'No \u2014 the original JPG data is embedded into the PDF as-is, not re-compressed or re-encoded, so whatever quality the JPG already had is preserved exactly.',
    },
    {
      id: 'printing-issue',
      question: 'Why doesn\u2019t the PDF print at a normal page size?',
      answer: 'Since the page is sized to your image\u2019s exact dimensions rather than a standard size like A4 or Letter, some printers may need a manual scale or paper size adjustment to print it as expected.',
    },
    {
      id: 'why-pdf',
      question: 'Why convert a JPG to PDF instead of just sharing the image directly?',
      answer: 'Some forms, portals, and email systems specifically require a PDF upload rather than a raw image file, even when the content is just a single photo. This tool produces a real, standards-compliant PDF without needing separate document software.',
    },
    {
      id: 'file-size-pdf',
      question: 'Will the PDF be larger than the original JPG?',
      answer: 'Slightly. A PDF wrapper adds a small amount of overhead beyond the raw image data, but the difference is minor since the image itself isn\u2019t re-compressed.',
    },
  ],
  'png-to-pdf': [
    {
      id: 'transparency',
      question: 'What happens to transparent areas of my PNG?',
      answer: 'The PNG\u2019s transparency data is embedded into the PDF as-is, not discarded, but since a PDF page is a solid surface, transparent areas typically render against the page\u2019s own background, usually white in most viewers.',
    },
    {
      id: 'page-size',
      question: 'What size will the PDF page be?',
      answer: 'The page is sized to match your image\u2019s exact pixel dimensions at 72 DPI.',
    },
    {
      id: 'multiple-pngs',
      question: 'Can I combine multiple PNGs into one PDF?',
      answer: 'This tool creates a PDF from one image at a time. To combine several images, convert each to PDF first, then use Merge PDF to combine them into a single multi-page file.',
    },
    {
      id: 'why-not-standard-page',
      question: 'Why isn\u2019t the PDF a standard page size like A4?',
      answer: 'Sizing the page to your image\u2019s exact dimensions avoids any cropping, padding, or scaling. What gets uploaded is exactly what appears. The tradeoff is that printing may need a manual scale adjustment, since it\u2019s not a standard paper size.',
    },
    {
      id: 'quality-preserved-png',
      question: 'Does converting to PDF reduce my PNG\u2019s quality?',
      answer: 'No. The original PNG data is embedded into the PDF as-is, not re-compressed or re-encoded, so the image quality is preserved exactly.',
    },
    {
      id: 'file-size-pdf-png',
      question: 'Will the PDF be larger than the original PNG?',
      answer: 'Slightly. A PDF wrapper adds a small amount of overhead beyond the raw image data, but the difference is minor since the image itself isn\u2019t re-compressed.',
    },
    {
      id: 'edit-after-conversion',
      question: 'Can I edit the PNG image after it\u2019s embedded in the PDF?',
      answer: 'Not through this tool. The PDF holds the image as a single embedded picture, not editable layers or objects. To make changes, edit the original PNG first and then convert the updated version.',
    },
  ],
  'merge-pdf': [
    {
      id: 'order',
      question: 'Can I control the order of the merged pages?',
      answer: 'Yes. Use the up/down arrows next to each file to reorder them before merging. Pages are combined in the order shown.',
    },
    {
      id: 'limit',
      question: 'Is there a limit to how many PDFs I can merge?',
      answer: 'No fixed limit. Add as many as you need, though very large combined files will naturally take longer to process.',
    },
    {
      id: 'text-preserved',
      question: 'Will the merged PDF still have selectable text?',
      answer: 'Yes. Pages are copied faithfully, not rendered as images, so any selectable or searchable text in the source files stays exactly that way in the merged result.',
    },
    {
      id: 'quality-loss-merge',
      question: 'Does merging reduce the quality of my PDFs?',
      answer: 'No. Since pages are copied directly rather than re-rendered, there\u2019s no quality loss or re-compression involved in the merge process.',
    },
    {
      id: 'different-page-sizes',
      question: 'Can I merge PDFs that have different page sizes?',
      answer: 'Yes. Each page keeps its own original dimensions in the merged document. The result may have pages of varying sizes if the source files did, which is normal and doesn\u2019t cause any issue when viewing or printing.',
    },
    {
      id: 'bookmarks-and-metadata',
      question: 'Do bookmarks or document properties carry over from the original files?',
      answer: 'Page content, including text and formatting, carries over faithfully, but bookmarks and other document-level metadata from the original files aren\u2019t reconstructed in the merged result.',
    },
    {
      id: 'password-protected',
      question: 'Can I merge a password-protected PDF?',
      answer: 'A PDF that requires a password to open can\u2019t be read and merged without first removing that protection, since the file\u2019s content is encrypted until unlocked.',
    },
    {
      id: 'merge-pdf-privacy',
      question: 'Are my PDF files uploaded to a server to be merged?',
      answer: 'No \u2014 merging happens entirely in your browser using a PDF-processing library that runs locally. Your files, including anything confidential in them, are never uploaded anywhere.',
    },
  ],
  'split-pdf': [
    {
      id: 'range-format',
      question: 'How do I specify which pages to extract?',
      answer: 'Use page numbers and ranges separated by commas, like "1-3, 5, 8-10". Pages are 1-indexed: page 1 is the first page.',
    },
    {
      id: 'original-order',
      question: 'Do the extracted pages keep their original content?',
      answer: 'Yes. Pages are copied exactly as they appear in the source PDF, not re-rendered or flattened.',
    },
    {
      id: 'duplicate-pages',
      question: 'What happens if I list the same page number twice?',
      answer: 'It\u2019s only included once in the result. Duplicate page numbers across the entered ranges are automatically deduplicated, so the same page won\u2019t appear twice in the output.',
    },
    {
      id: 'out-of-order-input',
      question: 'What if I type the ranges out of order, like "5, 1-3"?',
      answer: 'The extracted pages always come out in ascending numeric order in the final document, regardless of the order they were typed in. "5, 1-3" and "1-3, 5" produce the identical result.',
    },
    {
      id: 'invalid-page-number',
      question: 'What happens if I enter a page number that doesn\u2019t exist in the PDF?',
      answer: 'Page numbers outside the document\u2019s actual range are simply ignored rather than causing an error. The tool extracts whatever valid pages were specified and disregards the rest.',
    },
    {
      id: 'file-size-after-split',
      question: 'Will the extracted PDF be smaller than the original?',
      answer: 'Generally, yes, since it only contains the selected pages. It won\u2019t necessarily shrink in exact proportion to the page count, though, since things like embedded fonts can affect file size in ways that don\u2019t scale linearly with the number of pages.',
    },
    {
      id: 'password-protected-split',
      question: 'Can I split a password-protected PDF?',
      answer: 'A PDF that requires a password to open can\u2019t be read and split without first removing that protection, since the file\u2019s content is encrypted until unlocked.',
    },
  ],

  'color-picker': [
    {
      id: 'accuracy',
      question: 'How accurate is the picked color?',
      answer: 'It reads the exact pixel value from the image data at the point you click \u2014 not an approximation. The hex, RGB, and HSL values shown are the true color as stored in the file.',
    },
    {
      id: 'why-varies',
      question: 'Why do I get slightly different colors clicking on what looks like one solid area?',
      answer: 'Compression artifacts, subtle lighting gradients, or anti-aliasing near edges can cause small pixel-level variation even in an area that looks uniform. For the most reliable match, sample from the flattest part of the color area, away from edges or shadows.',
    },
    {
      id: 'no-image',
      question: 'Can I use this without uploading an image?',
      answer: 'Yes \u2014 use the standalone color picker shown when no image is uploaded to pick any color directly.',
    },
    {
      id: 'transparent-pixels',
      question: 'What happens if I click a transparent part of a PNG?',
      answer: 'The sampled color reads only the RGB values at that point and doesn\u2019t factor in transparency, so clicking a fully or partially transparent area can give a color that doesn\u2019t match what you visually saw on screen. For reliable sampling, click on a fully opaque part of the image.',
    },
    {
      id: 'supported-formats',
      question: 'What image formats can I sample colors from?',
      answer: 'JPG, PNG, WEBP, and GIF all work \u2014 the tool reads the actual decoded pixel data regardless of the original file format, so the sampled color is accurate no matter which of these you upload.',
    },
    {
      id: 'color-picker-privacy',
      question: 'Is my uploaded image safe \u2014 does it get sent anywhere?',
      answer: 'Yes, it\u2019s safe \u2014 your image is read and sampled entirely in your browser using the Canvas API, and it\u2019s never uploaded to a server. Closing the tab leaves no trace of the image here.',
    },
  ],
  'hex-to-rgb': [
    {
      id: 'formats-accepted',
      question: 'What color formats can I type in?',
      answer: 'Hex (#3b6cf6), rgb(59, 108, 246), or hsl(225, 90%, 60%) \u2014 all three formats show up together as soon as one is recognized.',
    },
    {
      id: 'why-rgb-for-code',
      question: 'Why would I need RGB instead of just using hex?',
      answer: 'RGB is the more natural format when you need transparency \u2014 CSS\u2019s rgba() lets you add an alpha channel directly \u2014 or when you\u2019re adjusting individual color channels programmatically in JavaScript.',
    },
    {
      id: 'same-color',
      question: 'Do hex and RGB describe different colors?',
      answer: 'No \u2014 they describe the exact same color, just in different notation. #3B6CF6 and rgb(59, 108, 246) are identical; hex just packs the same three channel values into hexadecimal pairs instead of plain decimal.',
    },
    {
      id: 'invalid-hex',
      question: 'Why does my hex code show an error?',
      answer: 'A valid hex color needs a # followed by either 3 or 6 hexadecimal digits (0\u20139 and A\u2013F) \u2014 anything outside that, like extra characters or invalid letters (G and beyond), won\u2019t convert. Double-check for typos or an accidentally copied extra character.',
    },
    {
      id: 'case-sensitivity',
      question: 'Does it matter if my hex code is uppercase or lowercase?',
      answer: 'No \u2014 #3B6CF6 and #3b6cf6 represent the exact same color. Hex letters A through F aren\u2019t case-sensitive, so either style works and converts to the identical RGB and HSL values.',
    },
    {
      id: 'with-without-hash',
      question: 'Do I need to include the # symbol?',
      answer: 'No \u2014 both #3B6CF6 and 3B6CF6 work the same way. The # is optional here, though it\u2019s standard practice to include it when writing hex codes in actual CSS.',
    },
    {
      id: 'hex-to-rgb-privacy',
      question: 'Does this tool need an internet connection to convert colors?',
      answer: 'No \u2014 every conversion is calculated instantly with plain math in your browser. Nothing you enter is ever sent to a server.',
    },
  ],
  'rgb-to-hex': [
    {
      id: 'input-format',
      question: 'How do I enter an RGB value?',
      answer: 'Type it as rgb(59, 108, 246), or just use the color picker swatch \u2014 either way, the equivalent HEX and HSL values appear immediately.',
    },
    {
      id: 'why-hex-preferred',
      question: 'Why do design tools usually want hex instead of RGB?',
      answer: 'Hex is more compact and has been the established default in design tools and brand style guides for longer, even though it encodes the exact same color information as RGB \u2014 it\u2019s a convention rather than a technical requirement.',
    },
    {
      id: 'shorthand-hex',
      question: 'What\u2019s a hex shorthand code like #FFF?',
      answer: 'A 3-digit shorthand where each digit repeats \u2014 #FFF expands to #FFFFFF (white), #F53 expands to #FF5533. This converter outputs the full 6-digit form for maximum clarity and compatibility.',
    },
    {
      id: 'invalid-rgb',
      question: 'What RGB values are valid?',
      answer: 'Each of the three channels (red, green, blue) is meant to be a whole number from 0 to 255 \u2014 a value outside that range gets automatically clamped to the nearest valid number (255 or 0) rather than rejected.',
    },
    {
      id: 'decimal-vs-percentage',
      question: 'Can I enter RGB as percentages instead of 0\u2013255?',
      answer: 'This tool expects the standard 0\u2013255 integer format for each channel, which is by far the more common notation in code and design tools. Percentage-based RGB exists in the CSS spec but is rarely used in practice.',
    },
    {
      id: 'rgba-support',
      question: 'Does this handle rgba() with a transparency value too?',
      answer: 'The tool reads the red, green, and blue channels from an rgba() value \u2014 the alpha (transparency) component doesn\u2019t translate into a hex or HSL color value on its own, since hex and HSL don\u2019t carry transparency information the same way rgba() does.',
    },
    {
      id: 'rgb-to-hex-privacy',
      question: 'Does this tool need an internet connection to convert colors?',
      answer: 'No \u2014 every conversion is calculated instantly with plain math in your browser. Nothing you enter is ever sent to a server.',
    },
  ],
  'hex-to-hsl': [
    {
      id: 'what-is-hsl',
      question: 'What do the HSL numbers mean?',
      answer: 'Hue (0\u2013360\u00b0 on the color wheel), Saturation (0\u2013100%, how vivid), and Lightness (0\u2013100%, how light or dark).',
    },
    {
      id: 'why-use-hsl',
      question: 'Why would I use HSL instead of hex?',
      answer: 'HSL makes systematic color adjustments far easier \u2014 lighten or darken a color by changing only the lightness value, or mute it by lowering saturation, all while keeping the exact same hue. Hex requires recalculating all three channel values to achieve the same change.',
    },
    {
      id: 'hsl-limitation',
      question: 'Does equal lightness always look equally bright?',
      answer: 'Not quite \u2014 HSL\u2019s lightness value doesn\u2019t perfectly match perceived brightness. hsl(60, 100%, 50%) (yellow) and hsl(240, 100%, 50%) (blue) share the same lightness number but look noticeably different in brightness to the eye.',
    },
    {
      id: 'hsl-in-css',
      question: 'Can I use HSL directly in CSS?',
      answer: 'Yes \u2014 modern CSS supports hsl() and hsla() natively, the same as rgb() and hex. Browser support has been solid for years, so there\u2019s no compatibility reason to convert HSL back to hex unless your specific workflow or design tool requires it.',
    },
    {
      id: 'hue-range',
      question: 'Why does hue go up to 360 and not 255 like RGB?',
      answer: 'Hue represents a position around a circular color wheel, measured in degrees \u2014 0 and 360 both point to the same red, since a circle wraps back to its start. It\u2019s a completely different kind of measurement from RGB\u2019s 0\u2013255 channel intensities, which is why the ranges don\u2019t match.',
    },
  ],
  'color-converter': [
    {
      id: 'why-formats',
      question: 'Why are there different color formats at all?',
      answer: 'HEX is common in design tools and CSS, RGB maps directly to how screens render color and supports transparency via rgba(), and HSL is often more intuitive for adjusting a color\u2019s vividness or lightness by hand.',
    },
    {
      id: 'do-they-differ',
      question: 'Do hex, RGB, and HSL ever describe different colors?',
      answer: 'No \u2014 when converted correctly, all three describe the exact same underlying color. They\u2019re just different notations for communicating and manipulating it.',
    },
    {
      id: 'which-to-use',
      question: 'Which color format should I actually use in my CSS?',
      answer: 'There\u2019s no single right answer \u2014 use hex for clean, compact values and consistency with most design tools, RGB when you need alpha transparency or are manipulating channels in code, and HSL when you want intuitive, systematic control over lightness and saturation.',
    },
    {
      id: 'accepted-input',
      question: 'What exact input formats does this tool accept?',
      answer: 'Hex codes with or without the # (like #3B6CF6 or 3B6CF6), rgb()/rgba() notation, and hsl()/hsla() notation \u2014 the tool detects which format you\u2019ve typed automatically and converts to the other two.',
    },
    {
      id: 'real-time',
      question: 'Do I need to click a button to see the conversion?',
      answer: 'No \u2014 the conversion happens instantly as you type a recognized color value, with no separate convert button to click.',
    },
  ],
  'palette-generator': [
    {
      id: 'schemes',
      question: 'What do the different palette types mean?',
      answer: 'Complementary uses the opposite hue for high contrast, analogous uses neighboring hues for harmony, triadic uses three evenly-spaced hues for vibrant balance, and shades varies only the lightness of your one color.',
    },
    {
      id: 'which-scheme',
      question: 'Which palette type should I use for my project?',
      answer: 'Analogous or shades work well for a cohesive brand palette; complementary suits a call-to-action or accent color that needs to visually stand out; triadic fits designs that genuinely need several distinct colors while still feeling intentionally coordinated.',
    },
    {
      id: 'how-schemes-work',
      question: 'How are these color schemes actually calculated?',
      answer: 'Each scheme rotates the hue angle around the color wheel by a fixed amount \u2014 180\u00b0 for complementary, smaller steps for analogous, 120\u00b0 increments for triadic \u2014 while shades instead varies only the lightness value of a single fixed hue.',
    },
    {
      id: 'how-many-colors',
      question: 'How many colors does each scheme generate?',
      answer: 'Complementary generates 2 colors, analogous and triadic generate 3, and shades generates a range of lightness variations on your single base color \u2014 enough for most UI or brand palette needs without being overwhelming to choose from.',
    },
    {
      id: 'palette-generator-privacy',
      question: 'Is this tool safe to use \u2014 does it store my color choices anywhere?',
      answer: 'Yes, it\u2019s safe \u2014 every palette is calculated instantly in your browser using standard color math. Nothing you generate here is sent to or stored on a server.',
    },
  ],

  'json-formatter': [
    {
      id: 'minify-vs-format',
      question: 'What\u2019s the difference between Format and Minify?',
      answer: 'Format adds indentation and line breaks for readability. Minify strips all unnecessary whitespace to make the file as small as possible. The underlying data is identical either way, only the whitespace changes.',
    },
    {
      id: 'why-apis-minify',
      question: 'Why do APIs usually return minified JSON?',
      answer: 'Whitespace adds size with no functional benefit to a machine parsing the response, so stripping it saves real, if often small, bandwidth. That\u2019s exactly why a formatter is useful for a human reading that same response: it adds back the readability a machine never needed.',
    },
    {
      id: 'does-formatting-change-data',
      question: 'Does formatting or minifying change my actual data?',
      answer: 'No, only whitespace changes. The keys, values, and structure of your JSON stay exactly the same; formatting is purely cosmetic.',
    },
    {
      id: 'large-json',
      question: 'Is there a size limit on the JSON I can format?',
      answer: 'Very large JSON files (many megabytes) may feel slower to format in the browser, since parsing and re-serializing happens on your device rather than a server, but there\u2019s no hard limit for typical config files or API responses.',
    },
    {
      id: 'nested-json',
      question: 'Does formatting work correctly on deeply nested JSON?',
      answer: 'Yes, arbitrarily deep nested objects and arrays are indented correctly at every level, which is exactly where formatting helps most: a deeply nested minified structure is genuinely hard to read without it.',
    },
    {
      id: 'json-vs-js-object',
      question: 'Can I format a JavaScript object literal, or only valid JSON?',
      answer: 'Only valid JSON. Since a JavaScript object literal can include unquoted keys, single quotes, or trailing commas, none of which are valid JSON, pasting one in will report an error at the specific point it violates JSON\u2019s stricter syntax, rather than silently accepting it.',
    },
    {
      id: 'json-formatter-privacy',
      question: 'Is it safe to paste sensitive JSON data here, like API keys or config files?',
      answer: 'Yes \u2014 all parsing, formatting, and minifying happens entirely in your own browser. Your JSON is never uploaded or sent to a server, so it\u2019s safe to use with real config files, API responses, or other sensitive data.',
    },
  ],
  'json-validator': [
    {
      id: 'common-errors',
      question: 'What are common reasons JSON is invalid?',
      answer: 'Trailing commas, unquoted keys, single quotes instead of double quotes, missing brackets, and JavaScript-only values like undefined or a Date object are the most frequent causes \u2014 all things that are valid in a JavaScript object literal but not in strict JSON.',
    },
    {
      id: 'json-vs-js-object',
      question: 'Isn\u2019t JSON the same as a JavaScript object?',
      answer: 'They look similar but aren\u2019t the same \u2014 JSON is a stricter subset. Keys must be double-quoted, trailing commas aren\u2019t allowed, comments aren\u2019t allowed, and only strings, numbers, booleans, null, objects, and arrays are valid values.',
    },
    {
      id: 'why-strict',
      question: 'Why is JSON so strict compared to JavaScript?',
      answer: 'JSON was designed as a minimal, language-independent data format, not JavaScript syntax. That strictness is what makes it reliably parseable the same way across every programming language, with no ambiguity about what the data means.',
    },
    {
      id: 'valid-json-types',
      question: 'What data types are actually valid in JSON?',
      answer: 'Strings, numbers, booleans (true/false), null, objects, and arrays \u2014 that\u2019s the complete list. Anything else, like a JavaScript function, undefined, or a Date object, isn\u2019t valid JSON and will fail validation.',
    },
    {
      id: 'validate-vs-format',
      question: 'Should I use this or the JSON Formatter tool?',
      answer: 'Use this when you only need a quick yes/no on whether JSON is valid. Use the Formatter if you also want the result pretty-printed or minified \u2014 it validates too, and gives you a usable, reformatted output on top of that.',
    },
  ],
  'base64-encoder': [
    {
      id: 'unicode',
      question: 'Does this handle special characters and emoji correctly?',
      answer: 'Yes. Text is encoded as UTF-8 before Base64 encoding, so accented letters, non-Latin scripts and emoji all round-trip correctly.',
    },
    {
      id: 'url-safe',
      question: 'Can I use this output directly in a URL?',
      answer: 'This produces standard Base64, which uses + and / characters that have special meaning in a URL. For a URL-safe result, replace + with -, / with _, and drop any trailing = padding after encoding here. That\u2019s the URL-safe variant used in JWTs and similar contexts.',
    },
    {
      id: 'encoding-vs-encryption',
      question: 'Is Base64 a form of encryption?',
      answer: 'No. Base64 is an encoding, not encryption. Anyone can decode it back to the original text instantly with no key or password needed. It makes binary data safely representable as text; it does not make data private or secure.',
    },
    {
      id: 'why-length-increases',
      question: 'Why is my Base64 output longer than the original text?',
      answer: 'Base64 encodes every 3 bytes of input as 4 output characters, so encoded text is roughly 33% larger than the original. That\u2019s an expected tradeoff for representing binary-safe data as plain text.',
    },
    {
      id: 'why-equals-at-end',
      question: 'Why does my Base64 output sometimes end with one or two = signs?',
      answer: 'Base64 processes input in groups of 3 bytes at a time. When the total length isn\u2019t a clean multiple of 3, one or two = characters are added at the end as padding so the output still forms complete 4-character groups. It\u2019s a normal part of the format, not an error.',
    },
    {
      id: 'base64-encoder-privacy',
      question: 'Is it safe to encode or decode sensitive data here, like a token or API key?',
      answer: 'Yes \u2014 all encoding and decoding happens entirely in your browser. Nothing you paste here, including tokens, keys, or any other sensitive text, is ever sent to a server.',
    },
  ],
  'url-encoder': [
    {
      id: 'what-gets-encoded',
      question: 'What characters get encoded?',
      answer: 'Reserved and special characters (spaces, &, =, ?, /, and more) are converted to percent-encoded sequences so the text is safe to use as a URL value.',
    },
    {
      id: 'whole-url-vs-value',
      question: 'Can I paste a full URL in here to encode it?',
      answer: 'This tool is built for encoding a single value \u2014 a query parameter, a search term, a piece of user input \u2014 not a complete URL. Running a full URL through it would also encode the slashes and colons that need to stay as real URL structure, breaking it.',
    },
    {
      id: 'space-encoding',
      question: 'Why do I sometimes see %20 and sometimes a + for a space?',
      answer: '%20 is the standard percent-encoding for a space. A + specifically means space only within an older, form-submission-style encoding (application/x-www-form-urlencoded), not in general URL encoding. This tool uses %20, the more broadly correct form outside of form submissions specifically.',
    },
    {
      id: 'decode-safety',
      question: 'Is it safe to decode a URL I don\u2019t fully trust?',
      answer: 'Decoding itself just reveals the original text and doesn\u2019t execute anything \u2014 it\u2019s safe to decode and inspect a suspicious-looking encoded URL to see what it actually contains before deciding whether to visit it.',
    },
  ],
  'uuid-generator': [
    {
      id: 'version',
      question: 'What version of UUID does this generate?',
      answer: 'Version 4 \u2014 randomly generated using the browser\u2019s native cryptographically secure random number generator, not a predictable pattern.',
    },
    {
      id: 'collision-chance',
      question: 'Could two generated UUIDs ever be the same?',
      answer: 'In theory yes, in practice effectively no \u2014 the odds of two random v4 UUIDs colliding are astronomically small, far lower than the odds of unrelated hardware failures happening at the same time. Treating them as unique is standard, safe practice.',
    },
    {
      id: 'v4-vs-v7',
      question: 'What\u2019s the difference between UUID v4 and v7?',
      answer: 'v4 is entirely random. v7 (a newer version) embeds a timestamp in its leading bits, which makes v7 UUIDs sort roughly in creation order \u2014 useful for database indexing, since sequential-ish IDs index more efficiently than fully random ones. This tool generates v4, the more common general-purpose choice.',
    },
    {
      id: 'uuid-format',
      question: 'What do the hyphens and letters in a UUID mean?',
      answer: 'A UUID is 128 bits, conventionally displayed as 32 hexadecimal digits split into five groups by hyphens (8-4-4-4-12) purely for readability \u2014 the hyphens carry no meaning of their own, they just make a long string easier to read and copy correctly.',
    },
    {
      id: 'bulk-limit',
      question: 'Why is bulk generation capped at 50?',
      answer: 'It\u2019s a practical limit to keep the results easy to scan and copy \u2014 if you need more than 50, you can simply generate multiple batches.',
    },
    {
      id: 'uuid-generator-privacy',
      question: 'Are the UUIDs I generate stored or logged anywhere?',
      answer: 'No \u2014 every UUID is generated entirely in your browser using its built-in cryptographically secure random function. Nothing is sent to or stored on a server.',
    },
  ],

  'qr-code-generator': [
    {
      id: 'static-vs-dynamic',
      question: 'Is this a static or dynamic QR code?',
      answer: 'Static \u2014 the actual text or URL is encoded directly into the code itself, so it works permanently with no dependency on any external server. A dynamic QR code instead redirects through a company\u2019s server (allowing the destination to be changed later), which only keeps working as long as that service stays online, typically under a paid plan.',
    },
    {
      id: 'does-it-expire',
      question: 'Will this QR code ever expire or stop working?',
      answer: 'No \u2014 since the data is baked directly into the code with nothing external to maintain, a static QR code like this one works for as long as the destination URL or text itself remains valid. There\u2019s no subscription or service to keep active.',
    },
    {
      id: 'watermark-scan-limit',
      question: 'Are there any watermarks or scan limits?',
      answer: 'No \u2014 the output is a clean, unbranded code, and since scanning it never touches any server, there\u2019s no scan count to hit or limit to worry about.',
    },
    {
      id: 'error-correction-meaning',
      question: 'What does the error correction level actually do?',
      answer: 'It controls how much of the code can be damaged, dirty, or covered (for example, by a logo placed in the center) while still scanning correctly \u2014 from about 7% tolerance at Low up to about 30% at High. Higher levels make the code visually denser for the same amount of data.',
    },
    {
      id: 'svg-vs-png',
      question: 'Should I download PNG or SVG?',
      answer: 'PNG is simplest for everyday digital use. SVG is the better choice if the code will be printed large \u2014 like on a poster or product packaging \u2014 since it scales to any size with no pixelation, unlike a PNG stretched beyond its original resolution.',
    },
    {
      id: 'why-phone-email-sms-types',
      question: 'Why does it matter which type (Link, Email, Phone, SMS) I pick?',
      answer: 'Each type encodes its content in the specific format phones actually recognize \u2014 a phone number becomes a "tel:" link, an email becomes a "mailto:" link, and so on \u2014 so scanning the code opens the right app (the dialer, a text message, an email draft) instead of just showing plain text you\u2019d have to copy and act on manually.',
    },
    {
      id: 'qr-generator-privacy',
      question: 'Is the content I put into my QR code private?',
      answer: 'Yes \u2014 the QR code is generated entirely in your browser, and since it\u2019s a static code with the data baked directly in, no external server ever sees, logs, or stores what you encoded, not during generation and not later when it\u2019s scanned.',
    },
  ],

  'url-shortener': [
    {
      id: 'why-server-needed',
      question: 'Why does this need a server when other ToolHub tools don\u2019t?',
      answer: 'A short link has to keep working for anyone who clicks it later, on any device, at any time \u2014 which requires the destination URL to be stored somewhere accessible to everyone, not just your own browser. It\u2019s the one genuine exception to how every other tool here works, and it\u2019s disclosed upfront rather than hidden.',
    },
    {
      id: 'does-shortening-hurt-seo',
      question: 'Does shortening a URL hurt its SEO?',
      answer: 'No, when done correctly \u2014 this tool uses a genuine 301 (permanent redirect), which is what reputable URL shorteners use and what properly passes ranking value through to the actual destination page. Your destination page\u2019s search ranking isn\u2019t diluted or split by the short link.',
    },
    {
      id: 'does-it-expire',
      question: 'Will my short link ever expire?',
      answer: 'No \u2014 there\u2019s no default expiration. Many competing shorteners reserve permanent links for paid plans; this one doesn\u2019t require an account at all.',
    },
    {
      id: 'do-i-need-account',
      question: 'Do I need to create an account to use this?',
      answer: 'No \u2014 paste a URL and get a short link back immediately, with no sign-up step.',
    },
    {
      id: 'no-analytics',
      question: 'Can I see click analytics for my link?',
      answer: 'Not currently \u2014 this tool is intentionally a simple, direct utility rather than a full link-management platform. If you need click tracking, branded domains, or the ability to edit a link\u2019s destination later, a dedicated service built for that is a better fit.',
    },
  ],

  'user-agent-parser': [
    {
      id: 'why-generic-android',
      question: 'Why does a Chrome Android User-Agent show "Android 10" and device "K" for every device?',
      answer: 'This is Chrome\u2019s deliberate "User-Agent reduction" \u2014 since 2023, Chrome and Edge freeze the reported Android version and device model to generic placeholder values for privacy, regardless of the real device. The actual details have moved to a separate, opt-in mechanism (Client Hints) that a server has to explicitly request. This tool recognizes that pattern and tells you when it\u2019s looking at a reduced string.',
    },
    {
      id: 'windows-10-vs-11',
      question: 'Can this tell me if someone is using Windows 10 or Windows 11?',
      answer: 'No \u2014 and no User-Agent parser genuinely can. Both versions report identically as "Windows NT 10.0" in the User-Agent string; there\u2019s no information in the string itself that distinguishes them.',
    },
    {
      id: 'why-unknown-shown',
      question: 'Why does it say "Unknown" for some fields instead of guessing?',
      answer: 'Because guessing would be actively misleading. If a value genuinely can\u2019t be reliably determined from the string \u2014 whether because it was never included, or because the browser has deliberately generalized it \u2014 showing "Unknown" is more honest than presenting a guess as fact.',
    },
    {
      id: 'can-ua-be-faked',
      question: 'Can a User-Agent string be faked?',
      answer: 'Yes, easily \u2014 browser extensions, developer tools, and any HTTP client can send whatever User-Agent string they want. This tool tells you what a given string claims, not whether that claim is genuinely trustworthy.',
    },
    {
      id: 'bot-detection-limits',
      question: 'Will this catch every bot or crawler?',
      answer: 'It recognizes common, self-identifying bots like Googlebot and Bingbot that announce themselves in their User-Agent string. A bot deliberately disguising itself with a normal browser User-Agent won\u2019t be caught this way, since there\u2019s nothing in the string to distinguish it.',
    },
  ],

  'htaccess-generator': [
    {
      id: 'will-this-work-on-my-server',
      question: 'Will these rules work on any hosting provider?',
      answer: '.htaccess rules depend on your Apache configuration and hosting environment. Test changes before using them on a production website \u2014 a rule that needs a specific Apache module simply won\u2019t take effect if that module isn\u2019t enabled on your server, and some hosts also restrict what .htaccess is allowed to override at all.',
    },
    {
      id: 'why-not-order-deny-allow',
      question: 'Why does the IP blocking rule use "Require" instead of "Order Deny,Allow"?',
      answer: 'Because "Require" is the current, correct Apache 2.4+ syntax. Apache\u2019s own official documentation states that the older Order/Allow/Deny directives are deprecated and will eventually be removed, and explicitly advises against outdated tutorials that still recommend them.',
    },
    {
      id: 'does-this-work-on-nginx',
      question: 'Does this work for Nginx or other web servers?',
      answer: 'No \u2014 .htaccess is specifically an Apache feature. Nginx uses an entirely different configuration syntax and doesn\u2019t read .htaccess files at all.',
    },
    {
      id: 'password-protection-extra-step',
      question: 'Why is password protection just instructions instead of a ready-to-use rule?',
      answer: 'Because it genuinely can\u2019t be self-contained \u2014 .htaccess password protection requires a separate .htpasswd file with a hashed password, created using a tool like htpasswd on your own server. A web-based generator can\u2019t create that second file for you.',
    },
    {
      id: 'can-htaccess-break-site',
      question: 'Can a bad .htaccess rule break my whole website?',
      answer: 'Yes \u2014 a malformed or conflicting rule can cause a server error across your entire site, not just the specific page you were trying to change. Always keep a backup of your original .htaccess file and test changes before relying on them in production.',
    },
    {
      id: 'htaccess-generator-privacy',
      question: 'Is anything about my site or server sent anywhere when I use this?',
      answer: 'No \u2014 the rules are assembled entirely in your browser from your selections. Nothing about your site, domain, or server is ever sent to or stored on a server here.',
    },
  ],

  'cron-expression-generator': [
    {
      id: 'or-vs-and',
      question: 'Does "0 0 1 * 0" mean midnight on the 1st, only if it\u2019s a Sunday?',
      answer: 'No \u2014 when both day-of-month and day-of-week are restricted (not "*"), standard cron combines them with OR, not AND. That expression means midnight on the 1st of the month, OR every Sunday, whichever comes first \u2014 not only when both conditions happen to align.',
    },
    {
      id: 'seconds-field',
      question: 'Can I use a 6-field expression with seconds?',
      answer: 'No \u2014 this tool supports standard 5-field cron syntax (minute, hour, day-of-month, month, day-of-week), which is what cron itself and most scheduling tools use. A 6-field expression with an added seconds field is a different dialect and will show a clear error here rather than being silently misinterpreted.',
    },
    {
      id: 'next-run-accuracy',
      question: 'How accurate are the "next run" times shown?',
      answer: 'They\u2019re calculated by genuinely checking forward through real calendar time in your browser, correctly accounting for actual month lengths and weekday patterns \u2014 not an approximation. They\u2019re shown in your browser\u2019s own local time zone.',
    },
    {
      id: 'paste-existing-expression',
      question: 'Can I check what an existing cron expression I found somewhere actually does?',
      answer: 'Yes \u2014 paste the full expression into any of the five fields and it will automatically fill in all five and show you the explanation and next run times, without needing to build it from scratch.',
    },
    {
      id: 'why-not-just-trust-comment',
      question: 'The cron job I inherited has a comment explaining it, why not just trust that?',
      answer: 'Comments can be wrong or outdated in ways the actual expression isn\u2019t \u2014 someone may have changed the schedule without updating the comment next to it. Checking the real expression directly is the more reliable way to know what a cron job genuinely does.',
    },
    {
      id: 'cron-generator-privacy',
      question: 'Is the schedule I build here sent anywhere?',
      answer: 'No \u2014 every expression is built and explained entirely in your browser. Nothing you enter here is ever sent to a server.',
    },
  ],

  'schema-markup-generator': [
    {
      id: 'does-schema-boost-rankings',
      question: 'Will adding this structured data improve my search rankings?',
      answer: 'Not automatically \u2014 structured data helps search engines understand your content more precisely, but it doesn\u2019t guarantee a higher ranking or a rich result on its own. Eligibility for any specific search feature depends on Google\u2019s own current requirements and the actual content of the page.',
    },
    {
      id: 'faq-schema-still-useful',
      question: 'Is FAQPage schema still worth adding if Google dropped the rich result?',
      answer: 'Google deprecated the FAQ rich result in Search starting May 2026, so this markup no longer produces the expanded FAQ snippet it used to. It\u2019s still valid, accurate structured data if something else on your site or another system reads it, but don\u2019t add it today expecting a Google search-result benefit \u2014 that specific reason no longer applies.',
    },
    {
      id: 'howto-schema-still-useful',
      question: 'Does HowTo schema still work in Google Search?',
      answer: 'No \u2014 Google no longer supports the HowTo rich result in Search. The schema type itself is still valid, genuine structured data, just without the step-by-step search-result display it used to enable.',
    },
    {
      id: 'invisible-content-warning',
      question: 'Can I mark up content that isn\u2019t actually visible on my page?',
      answer: 'No \u2014 structured data should accurately reflect content that\u2019s genuinely visible to visitors. Marking up content that isn\u2019t actually on the page is treated as spam by Google and can result in a manual action against the site.',
    },
    {
      id: 'json-ld-vs-microdata',
      question: 'Why does this generate JSON-LD instead of microdata?',
      answer: 'JSON-LD is the format Google explicitly recommends, and it keeps the structured data in one self-contained script block rather than scattered across HTML attributes \u2014 easier to generate correctly, and easier to update later without touching your page\u2019s actual markup.',
    },
  ],

  'audio-to-wav-converter': [
    {
      id: 'why-only-wav',
      question: 'Why can\u2019t this convert to MP3?',
      answer: 'MP3 encoding is a genuinely complex piece of software this tool doesn\u2019t include. WAV is a much simpler, well-documented format \u2014 raw audio samples with a short header \u2014 which is why it\u2019s the one this tool can build correctly and reliably.',
    },
    {
      id: 'quality-loss',
      question: 'Will converting to WAV lose any audio quality?',
      answer: 'No \u2014 WAV is uncompressed, so converting to it doesn\u2019t discard anything. If your source file was already compressed (like an MP3), the quality lost during that original compression can\u2019t be recovered, but nothing further is lost in this conversion.',
    },
    {
      id: 'what-formats-work',
      question: 'What audio formats can I upload?',
      answer: 'Whatever your browser can already play \u2014 MP3, OGG, M4A, WebM and more, typically. Since your browser\u2019s own audio engine does the decoding, this tool doesn\u2019t maintain a separate list of supported formats.',
    },
    {
      id: 'file-size-limit',
      question: 'Is there a file size limit?',
      answer: 'Files up to 50 MB. Since everything happens in your browser rather than on a server, the practical limit also depends on your own device\u2019s available memory.',
    },
    {
      id: 'why-wav-bigger',
      question: 'Why is the WAV file so much bigger than my original MP3?',
      answer: 'That\u2019s expected, not a bug. MP3 is compressed and throws away audio data to save space; WAV stores every sample uncompressed. A 4-minute MP3 at a typical bitrate might be 4 MB, while the same audio as WAV is usually closer to 40 MB.',
    },
  ],

  'audio-trimmer': [
    {
      id: 'is-trim-exact',
      question: 'How precise is the trim?',
      answer: 'The sliders adjust in tenth-of-a-second steps, and the exported file contains exactly the range you selected \u2014 not an approximation, and not rounded to the nearest second.',
    },
    {
      id: 'why-wav-output',
      question: 'Why does the trimmed file download as WAV, even if I uploaded an MP3?',
      answer: 'Because WAV is the only format this tool can reliably encode \u2014 building a correct MP3 encoder from scratch is a much bigger undertaking than this tool takes on. The trimmed audio itself is unaffected in quality; only the file format changes.',
    },
    {
      id: 'multiple-clips',
      question: 'Can I cut multiple clips from the same file?',
      answer: 'Yes \u2014 trim one range, download it, then adjust the sliders and trim again from the same uploaded file.',
    },
    {
      id: 'trim-vs-cut-middle',
      question: 'Can I remove a section from the middle instead of trimming the ends?',
      answer: 'Not directly \u2014 this tool selects one continuous range to keep, from the start point to the end point. Removing a middle section while keeping both ends would need a different kind of editor.',
    },
    {
      id: 'does-trimming-affect-quality',
      question: 'Does trimming reduce the audio quality?',
      answer: 'No \u2014 the selected range is copied over sample by sample, not re-compressed. The one thing that does change is the file format: the output is always WAV, so a trimmed clip from a small MP3 will be a noticeably larger file, since WAV stores audio uncompressed.',
    },
    {
      id: 'preview-before-download',
      question: 'Can I hear the trimmed clip before downloading it?',
      answer: 'Not currently \u2014 the sliders show you the exact start and end times as you adjust them, but there\u2019s no built-in playback preview yet. Downloading and checking the file is the way to confirm the result right now.',
    },
  ],

  'video-to-gif': [
    {
      id: 'why-10-second-limit',
      question: 'Why is there a 10-second limit on clips?',
      answer: 'Every extra second means dozens more frames to extract, quantize, and compress in JavaScript running in your browser. Beyond about 10 seconds, both processing time and file size grow quickly enough that it stops being a good experience \u2014 a dedicated video editor handles longer clips better.',
    },
    {
      id: 'why-limited-colors',
      question: 'Why do the colors sometimes look slightly different from the original video?',
      answer: 'GIF only supports up to 256 colors per frame, while real video has millions. This tool reduces each frame\u2019s colors down using a standard quantization method, which keeps the result close to the original but not pixel-perfect \u2014 that\u2019s an inherent limit of the GIF format itself, not something any GIF-making tool can avoid.',
    },
    {
      id: 'does-audio-carry-over',
      question: 'Does the GIF include audio?',
      answer: 'No \u2014 GIF is a purely visual format and has never supported audio, regardless of which tool creates it.',
    },
    {
      id: 'higher-fps-worth-it',
      question: 'Should I always use the highest frame rate?',
      answer: 'Not necessarily \u2014 15 fps looks smoother but produces a larger file than 10 or 5 fps for the same clip. For simple motion or a short reaction clip, a lower frame rate often looks fine and downloads faster.',
    },
    {
      id: 'gif-file-size-expectation',
      question: 'Why is the GIF file bigger than I expected?',
      answer: 'GIF is genuinely not an efficient format for anything with a lot of visual detail or movement \u2014 every frame is stored close to independently, unlike video formats built specifically to compress motion over time. A short, simple clip stays reasonably small; a longer or busier one can add up quickly.',
    },
    {
      id: 'video-to-gif-privacy',
      question: 'Is my video uploaded to a server to make the GIF?',
      answer: 'No \u2014 every frame is extracted and converted entirely in your browser. Your video is never uploaded anywhere.',
    },
  ],

  'video-trimmer': [
    {
      id: 'why-takes-real-time',
      question: 'Why does trimming take as long as the clip itself?',
      answer: 'Because this works by actually playing through the selected range and recording it with your browser\u2019s own encoder \u2014 it\u2019s a real-time capture, not an instant file edit. A 30-second clip genuinely takes about 30 seconds to trim.',
    },
    {
      id: 'why-webm-output',
      question: 'Why does the trimmed video download as WebM, even if I uploaded an MP4?',
      answer: 'WebM is the format your browser\u2019s own built-in video encoder produces. Using the browser\u2019s real, already-tested encoder is more reliable than attempting to build a custom video encoder from scratch, which is a genuinely complex undertaking.',
    },
    {
      id: 'does-audio-carry-through',
      question: 'Does the trimmed video keep its audio?',
      answer: 'Yes \u2014 the recording captures both the video and audio tracks together, as long as the original file has audio in the first place.',
    },
    {
      id: 'why-not-instant',
      question: 'Is there a faster way to trim a video without waiting through it?',
      answer: 'Not with this tool \u2014 the real-time playback approach is what lets this work without a heavy video-codec library. A desktop video editor using dedicated codec software can trim without re-encoding, which is faster, but that\u2019s not something a browser-based tool can currently do.',
    },
    {
      id: 'keep-tab-open',
      question: 'Do I need to keep the browser tab open while it trims?',
      answer: 'Yes \u2014 the video is genuinely playing in the background to be captured, so switching away or closing the tab partway through will interrupt the recording. Keep the tab active until the progress bar reaches 100%.',
    },
  ],

  'unit-converter': [
    {
      id: 'us-vs-uk-gallon',
      question: 'What\u2019s the actual difference between a US gallon and a UK gallon?',
      answer: 'A US gallon is about 3.785 liters, while a UK (Imperial) gallon is about 4.546 liters \u2014 the UK gallon is roughly 20% larger. That\u2019s a meaningful difference, not just a rounding quirk, which is why this tool lists them as separate, clearly labeled units.',
    },
    {
      id: 'how-accurate',
      question: 'How accurate are the conversions?',
      answer: 'Every conversion uses the actual internationally-defined standard value for that unit \u2014 for example, exactly 0.45359237 kilograms per pound, not a rounded 0.45. Results are accurate to the precision shown.',
    },
    {
      id: 'why-temperature-different',
      question: 'Why does temperature work differently from the other categories?',
      answer: 'Length, weight, and volume conversions are simple multiplication \u2014 double the value, double the result. Temperature scales don\u2019t start at the same zero point, so converting between them needs an actual formula (like multiplying by 9/5 and adding 32 for Celsius to Fahrenheit) rather than a single conversion factor.',
    },
    {
      id: 'negative-forty-fact',
      question: 'Is it true that -40°C and -40°F are the same temperature?',
      answer: 'Yes \u2014 it\u2019s the one point where the Celsius and Fahrenheit scales genuinely cross. Every other temperature reads differently on the two scales.',
    },
    {
      id: 'why-metric-ton-not-just-ton',
      question: 'Why does the weight category say "metric tons" instead of just "tons"?',
      answer: 'Because plain "ton" is ambiguous \u2014 a US (short) ton, a UK (long) ton, and a metric ton are three genuinely different weights. This tool specifically uses the metric ton (1,000 kg) to avoid that ambiguity.',
    },
    {
      id: 'unit-converter-privacy',
      question: 'Does this tool need an internet connection or send my data anywhere?',
      answer: 'No \u2014 every conversion is calculated instantly with plain math directly in your browser. Nothing you type or convert here is ever sent to a server.',
    },
  ],

  'meta-tag-generator': [
    {
      id: 'updated-preview-not-showing',
      question: 'I updated my meta tags, but the old preview still shows when I share the link. Why?',
      answer: 'Social platforms cache the preview for a link the first time it\u2019s shared, and keep showing that cached version for hours or days until they re-crawl the page \u2014 that\u2019s the platform\u2019s own caching behavior, not a problem with your new tags. Most platforms (Facebook, LinkedIn, X) have a debugging tool that can force an immediate re-scrape.',
    },
    {
      id: 'why-twitter-card-required',
      question: 'Do I really need the twitter:card tag if I already have Open Graph tags?',
      answer: 'Yes \u2014 X checks its own twitter:card tag specifically and has no fallback if it\u2019s missing. Skip it, and a shared link on X shows as plain text with no image, even if the Open Graph tags are otherwise complete.',
    },
    {
      id: 'ideal-og-image-size',
      question: 'What image size should I use for the social share image?',
      answer: '1200\u00d7630 pixels is the widely-used safe choice, giving a good result across Facebook, LinkedIn, and X\u2019s large-image card format. Keep the file under about 8MB.',
    },
    {
      id: 'title-vs-og-title',
      question: 'Does the og:title need to match the page\u2019s actual title?',
      answer: 'Not necessarily \u2014 they can genuinely differ. The page title is what shows in a browser tab and search results; the Open Graph title is what shows when the link is shared socially, where a slightly more attention-grabbing phrasing often performs better.',
    },
    {
      id: 'meta-tag-generator-privacy',
      question: 'Is the information I enter here saved or sent anywhere?',
      answer: 'No \u2014 the tags are generated instantly in your browser from what you type. Nothing is sent to a server or stored, so it\u2019s safe to draft tags for a page that isn\u2019t live yet.',
    },
  ],

  'text-diff-checker': [
    {
      id: 'how-does-comparison-work',
      question: 'How does the comparison actually work?',
      answer: 'It finds the longest sequence of lines both texts have in common, then works out what was added or removed around that shared sequence \u2014 the same underlying approach the Unix diff command uses.',
    },
    {
      id: 'edited-line-shows-as-two',
      question: 'Why does an edited line show up as one removed and one added, instead of just \u201cchanged\u201d?',
      answer: 'The comparison works at the line level, not within a line, so an edit to part of a line is represented as the old full line being removed and the new full line being added \u2014 there\u2019s no separate \u201cmodified\u201d category.',
    },
    {
      id: 'ignores-whitespace',
      question: 'Does it ignore extra spaces or blank lines?',
      answer: 'No \u2014 the comparison is exact. A line that differs only by trailing whitespace or capitalization will still show as changed, since that is technically a real difference between the two texts.',
    },
    {
      id: 'line-limit-reason',
      question: 'Why is there a 2,000-line limit?',
      answer: 'The comparison algorithm does more work as texts get longer, and beyond a few thousand lines a browser tab can genuinely start to lag. For comparing large files, a dedicated diff tool built for that scale will hold up better.',
    },
    {
      id: 'reordered-lines',
      question: 'What happens if a line just moved to a different position, with no other changes?',
      answer: 'It typically shows up as removed from its old position and added at its new one, similar to how a genuine edit is shown. The comparison looks for lines that stay in the same relative order across both texts, so moving a line past other content usually breaks that match rather than being recognized as \u201cno real change.\u201d',
    },
  ],

  'audio-merger': [
    {
      id: 'different-formats',
      question: 'Can I merge files that are in different formats, like an MP3 and a WAV?',
      answer: 'Any format works. Each file is decoded independently before merging, so the source formats don\u2019t need to match each other. The final result always downloads as WAV.',
    },
    {
      id: 'mono-stereo-mix',
      question: 'What happens if I merge a mono file with a stereo file?',
      answer: 'The mono file is automatically upmixed, its single channel is duplicated into both the left and right channels, so it merges cleanly with stereo files instead of causing a channel mismatch.',
    },
    {
      id: 'file-limit',
      question: 'Is there a limit to how many files I can merge?',
      answer: 'No fixed limit, though merging many long files at once will naturally take longer to process and use more of your device\u2019s available memory.',
    },
    {
      id: 'gap-between-files',
      question: 'Is there a gap or silence added between merged files?',
      answer: 'No. Files are joined directly end to end with no added silence, so the merged file transitions immediately from one clip to the next.',
    },
    {
      id: 'why-wav-output',
      question: 'Why does the merged file always download as WAV, even if I uploaded MP3s?',
      answer: 'WAV is the only format this tool can reliably encode without a heavier codec library. The merge itself doesn\u2019t lose any quality; only the final file format changes from your originals.',
    },
    {
      id: 'sample-rate-mismatch',
      question: 'What if my files have different sample rates?',
      answer: 'Every file decoded in the same browser session goes through the browser\u2019s own default audio decoder, which naturally resamples to a consistent rate, so files with different original sample rates typically merge correctly without any manual adjustment.',
    },
  ],

  'audio-volume-changer': [
    {
      id: 'why-clamped',
      question: 'Why does the audio sound flat at the top instead of getting louder past a point?',
      answer: 'Audio samples have a hard maximum value, and pushing volume higher than that maximum has to clip (cap) rather than continue increasing, or the result would become distorted, garbled noise. This tool clamps cleanly at that limit instead.',
    },
    {
      id: 'uneven-volume',
      question: 'Can this fix a recording that\u2019s quiet in one part and loud in another?',
      answer: 'Not directly. The same volume multiplier is applied uniformly across the whole file, so it changes overall loudness but doesn\u2019t balance different sections independently the way dedicated audio-leveling software does.',
    },
    {
      id: 'best-starting-point',
      question: 'What\u2019s a reasonable volume percentage to start with?',
      answer: '120-150% is usually enough to noticeably boost a quiet recording without pushing into clipping. Go higher only if the original audio is genuinely very quiet.',
    },
    {
      id: 'percentage-vs-decibels',
      question: 'Why does this use a percentage instead of decibels?',
      answer: 'Percentage maps directly to the actual multiplication being applied to the audio samples (150% really does multiply by 1.5), which is more intuitive for most people than decibels, a logarithmic unit where the relationship to loudness isn\u2019t as immediately obvious.',
    },
    {
      id: 'can-i-mute',
      question: 'Can I use this to completely mute a file?',
      answer: 'Setting the volume to 10% (the minimum this tool allows) makes the audio very quiet but not completely silent. For fully removing sound from a video specifically, a dedicated mute tool that drops the audio track entirely is the more direct option.',
    },
  ],

  'audio-reverser': [
    {
      id: 'does-it-work-everywhere',
      question: 'Will the reversed file play backwards in any audio player, or only here?',
      answer: 'Any player. The actual sample order in the file is reversed, so it\u2019s a real, permanent change to the audio data, not something that depends on this tool to work correctly.',
    },
    {
      id: 'reverse-twice',
      question: 'What happens if I reverse an already-reversed file?',
      answer: 'It returns to the original order, since reversing a sequence twice restores it exactly.',
    },
    {
      id: 'quality-loss-reverse',
      question: 'Does reversing reduce audio quality?',
      answer: 'No. The samples are reordered, not altered or re-compressed, so nothing about the actual sound quality changes.',
    },
    {
      id: 'what-is-backmasking',
      question: 'What is backmasking?',
      answer: 'A technique where audio is deliberately recorded so a message or sound only becomes recognizable when the track is played in reverse. It\u2019s been used in music production on and off since the 1960s, most famously fueling urban legends in the 1980s about hidden messages in rock records.',
    },
    {
      id: 'reverse-vs-pitch',
      question: 'Does reversing audio also change its pitch?',
      answer: 'No, reversing and pitch-shifting are two entirely different operations. Reversing changes the order samples play in; pitch depends on the frequency of the sound wave itself, which stays the same whether the samples play forward or backward.',
    },
    {
      id: 'stereo-reverse',
      question: 'Does reversing keep left and right channels in sync on a stereo file?',
      answer: 'Yes. Each channel is reversed independently but by the exact same amount, so the stereo image and timing between the two channels stay correctly aligned throughout.',
    },
  ],

  'audio-fade': [
    {
      id: 'linear-vs-other-fades',
      question: 'What kind of fade curve does this use?',
      answer: 'A linear fade: volume changes at a constant, steady rate throughout the fade duration. Some audio software offers curved (exponential or logarithmic) fades, which can sound slightly more natural to the ear, but a linear fade is simple, predictable, and works well for most everyday use.',
    },
    {
      id: 'overlapping-fades',
      question: 'What happens if I set both fades longer than half the file?',
      answer: 'Each fade is automatically capped at half the file\u2019s total duration, so a fade-in and fade-out can\u2019t overlap and cancel each other out in a confusing way.',
    },
    {
      id: 'zero-fade',
      question: 'Can I apply a fade to only the start or only the end?',
      answer: 'Yes. Set the fade duration you don\u2019t want to 0, and only the other end will be affected.',
    },
    {
      id: 'fade-vs-crossfade',
      question: 'Can this crossfade between two different tracks?',
      answer: 'No, this fades a single file\u2019s own start and end in and out of silence. Crossfading blends the end of one track into the start of a different one, which is a separate kind of edit this tool doesn\u2019t perform.',
    },
    {
      id: 'fade-output-format',
      question: 'What format does the faded file download as?',
      answer: 'WAV, the only format this tool can reliably encode. The fade itself doesn\u2019t affect quality; only the file format changes from your original.',
    },
  ],

  'silence-trimmer': [
    {
      id: 'middle-pauses',
      question: 'Will this remove pauses in the middle of my recording, not just at the start and end?',
      answer: 'No. Only leading and trailing silence is detected and trimmed. A pause partway through the recording is left exactly as it was.',
    },
    {
      id: 'no-sound-detected',
      question: 'What does it mean if I get a message saying no sound was detected?',
      answer: 'It means nothing in the file rose above the current sensitivity threshold, treating the entire file as silence. Lowering the sensitivity value makes quieter sounds count as real audio.',
    },
    {
      id: 'background-noise',
      question: 'Will background hiss or noise prevent the silence from being detected?',
      answer: 'It can, if the noise floor is louder than the sensitivity threshold. Raising the threshold slightly usually helps the detection see past constant low-level background noise to find where the real audio content begins and ends.',
    },
    {
      id: 'is-this-noise-reduction',
      question: 'Does this also clean up background noise within the audio, not just at the edges?',
      answer: 'No. This only trims leading and trailing silence; it doesn\u2019t reduce or remove noise that runs throughout the recording. That\u2019s a genuinely different kind of processing (noise reduction), which this tool doesn\u2019t perform.',
    },
    {
      id: 'output-format-silence',
      question: 'What format does the trimmed file download as?',
      answer: 'WAV, the only format this tool can reliably encode. The trim itself is lossless; only the file format changes from your original.',
    },
  ],

  'video-to-audio': [
    {
      id: 'no-audio-track',
      question: 'What happens if my video has no audio track?',
      answer: 'The tool will show an error, since there\u2019s nothing to extract. Not every video file actually contains audio, particularly screen recordings made with sound off.',
    },
    {
      id: 'why-wav-video',
      question: 'Why does the extracted audio always download as WAV?',
      answer: 'WAV is the only format this tool can reliably encode without a much heavier MP3 encoder library. The extraction itself doesn\u2019t lose quality; only the file format is fixed.',
    },
    {
      id: 'quality-of-extraction',
      question: 'Does extracting the audio reduce its quality?',
      answer: 'No. The audio is decoded and re-encoded losslessly as WAV, so nothing about the original audio quality is lost in the extraction itself.',
    },
    {
      id: 'video-vs-audio-extract-vs-mute',
      question: 'How is this different from the Video Muter tool?',
      answer: 'They do opposite jobs. This tool keeps only the audio and discards the video. Video Muter keeps the video and discards the audio. Which one to use depends on which part of the original file is actually needed.',
    },
    {
      id: 'processing-time-extract',
      question: 'How long does extracting the audio take?',
      answer: 'This one is genuinely fast, since it decodes the audio directly rather than playing through the whole video in real time the way trimming or resizing does. Most files finish in well under the length of the video itself.',
    },
  ],

  'video-muter': [
    {
      id: 'why-takes-time-mute',
      question: 'Why does muting take as long as the video itself?',
      answer: 'Because this genuinely plays through the video to re-record it without audio, a real-time capture rather than an instant file edit. A 3-minute video takes roughly 3 minutes to process.',
    },
    {
      id: 'video-quality-mute',
      question: 'Does muting reduce the video quality?',
      answer: 'The video is re-encoded during the capture process, so there can be some quality difference compared to the original, similar to any browser-based re-recording. The visual content itself isn\u2019t cropped, cut, or altered though.',
    },
    {
      id: 'why-webm-mute',
      question: 'Why does the result download as WebM, even for an MP4 upload?',
      answer: 'WebM is what your browser\u2019s own built-in video encoder produces. Using the browser\u2019s real, already-tested encoder is more reliable than attempting to build a custom encoder from scratch.',
    },
    {
      id: 'keep-tab-active-mute',
      question: 'Do I need to keep the browser tab open while this processes?',
      answer: 'Yes. The video is genuinely playing in the background to be captured, so switching away or closing the tab partway through will interrupt the process.',
    },
    {
      id: 'why-not-just-lower-volume',
      question: 'Is this different from just turning the volume down to zero when playing the video?',
      answer: 'Yes, genuinely different. Turning volume down only affects how the video sounds during playback on your device; the file itself still has its audio track. This tool actually produces a new file with no audio track at all.',
    },
  ],

  'video-speed-changer': [
    {
      id: 'pitch-with-speed',
      question: 'Does changing the speed also change the pitch of the audio?',
      answer: 'Yes. Speeding up raises pitch, slowing down lowers it, the familiar effect of playing a recording faster or slower. This tool doesn\u2019t correct pitch independently of speed.',
    },
    {
      id: 'processing-time-speed',
      question: 'How long does processing take?',
      answer: 'Roughly the new, sped-up or slowed-down duration, not the original one. At 2x speed, a 10-minute video takes about 5 minutes to process; at 0.5x, about 20 minutes.',
    },
    {
      id: 'speed-range',
      question: 'Why only these five speed options?',
      answer: 'They cover the most common real-world use cases without cluttering the interface with too many choices. 0.5x to 2x is also a range where the audio pitch shift, while noticeable, generally stays understandable rather than becoming unrecognizable.',
    },
    {
      id: 'keep-tab-active-speed',
      question: 'Do I need to keep the browser tab open while this processes?',
      answer: 'Yes. The video is genuinely playing at the new speed in the background to be captured, so switching away or closing the tab partway through will interrupt the process.',
    },
    {
      id: 'multiple-speed-changes',
      question: 'Can I apply the speed change more than once to stack the effect?',
      answer: 'Yes, running the sped-up or slowed-down result back through this tool applies a second speed change on top of the first, though visible and audible quality can degrade slightly with each additional re-encoding pass applied.',
    },
  ],

  'video-resizer': [
    {
      id: 'why-only-percentages',
      question: 'Can I enter an exact pixel size instead of a percentage?',
      answer: 'Not currently. The percentage options keep the video\u2019s original aspect ratio intact automatically, without needing to calculate exact target dimensions by hand or risk accidentally distorting the proportions.',
    },
    {
      id: 'quality-after-resize',
      question: 'Will the resized video look blurry?',
      answer: 'Downscaling to a smaller resolution stays visually sharp, similar to resizing an image down. The video is genuinely redrawn at the smaller size, not just squeezed into a smaller display frame.',
    },
    {
      id: 'why-only-shrink',
      question: 'Can I make a video larger instead of smaller?',
      answer: 'This tool only scales down. Enlarging a video beyond its original resolution doesn\u2019t add real detail that wasn\u2019t captured, so it isn\u2019t offered here as an option.',
    },
    {
      id: 'aspect-ratio-preserved',
      question: 'Will resizing distort my video\u2019s proportions?',
      answer: 'No. Since each option scales width and height by the same percentage, the original aspect ratio is preserved automatically at every size.',
    },
    {
      id: 'resize-vs-compress-difference',
      question: 'How is this different from the Video Compressor tool?',
      answer: 'Video Resizer is specifically about changing dimensions, with three simple, straightforward percentage options. Video Compressor is built around reducing overall file size, using resolution reduction as its main technique but also requesting a lower bitrate from the encoder alongside it.',
    },
  ],

  'video-compressor': [
    {
      id: 'why-resolution-not-bitrate',
      question: 'Why does compression mainly work by reducing resolution?',
      answer: 'A lower resolution genuinely means less pixel data to store, so it reliably shrinks the file. A pure bitrate request to the browser\u2019s encoder isn\u2019t consistently honored the same way across every browser, so resolution is the dependable lever here.',
    },
    {
      id: 'which-level-to-choose',
      question: 'Which compression level should I use?',
      answer: 'Medium is a reasonable default for most videos. Use Light if visual quality matters most and some size reduction is still welcome; use Aggressive when file size matters more than anything else.',
    },
    {
      id: 'compress-again',
      question: 'Can I compress an already-compressed video further?',
      answer: 'Yes, but each additional pass reduces resolution further from an already-reduced source, so quality drops faster than compressing the true original once at a stronger setting.',
    },
    {
      id: 'why-webm-compress',
      question: 'Why does the compressed video download as WebM, even for an MP4 upload?',
      answer: 'WebM is what your browser\u2019s own built-in video encoder produces during this process. Using the browser\u2019s real, already-tested encoder is more reliable than attempting to build a custom video encoder from scratch.',
    },
    {
      id: 'audio-during-compression',
      question: 'Does the audio track get compressed too, or just the video?',
      answer: 'The video resolution reduction is what primarily drives the size savings here. The audio track is carried through the same single recording process alongside the resized video, rather than being separately re-compressed as its own distinct step.',
    },
    {
      id: 'video-compressor-privacy',
      question: 'Is my video uploaded to a server to be compressed?',
      answer: 'No \u2014 compression happens entirely on your device using your browser\u2019s own built-in video encoder. Your video file is never uploaded anywhere.',
    },
  ],

  'background-remover': [
    {
      id: 'is-this-ai',
      question: 'Is this powered by AI?',
      answer: 'No. This uses a classical color-detection technique (flood-fill from the image edges), not a trained AI model. It\u2019s labeled that way on purpose, since it\u2019s a genuinely different, less capable approach than true AI-based segmentation on a complex background.',
    },
    {
      id: 'best-photo-type',
      question: 'What kind of photo works best?',
      answer: 'A subject against a plain, fairly uniform background, a product on a solid color, a portrait against a plain wall. A busy, textured, or multi-colored background will confuse this technique in a way a real AI model wouldn\u2019t.',
    },
    {
      id: 'subject-touches-edge',
      question: 'Why did part of my subject get removed along with the background?',
      answer: 'If any part of the subject touches the outer edge of the photo, that part gets treated as background too, since the detection starts from the image\u2019s literal border. Recomposing or cropping the photo so the subject doesn\u2019t touch the edges avoids this.',
    },
    {
      id: 'adjust-sensitivity',
      question: 'The result missed some background, or removed part of my subject. What should I do?',
      answer: 'Adjust the sensitivity slider and try again. Raise it if background got left behind; lower it if the subject lost parts of itself. There\u2019s no single correct setting, since it depends on how different the subject\u2019s colors are from the background\u2019s.',
    },
    {
      id: 'why-png-only',
      question: 'Why does this only output PNG?',
      answer: 'PNG is the common image format that supports transparency. JPG has no way to represent a transparent background at all, so PNG is the only option that can actually preserve the removed background as transparent rather than filling it with a solid color.',
    },
    {
      id: 'background-remover-privacy',
      question: 'Is my photo uploaded to a server to remove the background?',
      answer: 'No \u2014 the entire process runs in your browser using the Canvas API. Your photo is never uploaded anywhere, which matters especially for personal photos or product images you don\u2019t want leaving your device.',
    },
  ],

  'length-converter': [
    {
      id: 'which-length-inch',
      question: 'How precise is the inch-to-metric conversion?',
      answer: 'Exact. An inch is officially defined as exactly 0.0254 meters, an internationally agreed value fixed by treaty, not a rounded approximation, so every conversion here carries that same precision.',
    },
    {
      id: 'combined-vs-dedicated-length',
      question: 'How is this different from the combined Unit Converter?',
      answer: 'Same underlying, verified conversion logic, just focused on length alone with its own dedicated page and URL, useful for bookmarking or linking directly to a length-only conversion without needing to select a category first.',
    },
    {
      id: 'decimal-places-length',
      question: 'Why does the result sometimes show many decimal places?',
      answer: 'Some unit pairs simply don\u2019t divide evenly (a mile isn\u2019t a round number of meters), so the exact result can have several decimal digits rather than a clean, short number.',
    },
    {
      id: 'negative-length',
      question: 'Can I convert a negative length value?',
      answer: 'The math handles it, but a negative length doesn\u2019t correspond to anything physical on its own, it\u2019s typically only meaningful as a relative change or offset in a specific context.',
    },
    {
      id: 'nautical-mile-length',
      question: 'Is a nautical mile the same as a regular mile?',
      answer: 'No, genuinely different units. A nautical mile is 1852 meters, while a standard (statute) mile is 1609.344 meters, roughly 15% shorter. This converter uses the standard mile; the nautical mile is available in the separate Speed Converter\u2019s knot unit.',
    },
    {
      id: 'why-meters-base-length',
      question: 'Why is the base unit meters instead of, say, centimeters?',
      answer: 'The meter is the standard SI base unit for length, and using it here keeps every other unit\u2019s conversion factor as a single, direct multiplication in either direction, rather than needing an intermediate conversion step in between.',
    },
  ],

  'weight-converter': [
    {
      id: 'weight-vs-mass',
      question: 'Is this actually converting weight or mass?',
      answer: 'Mass, in the everyday sense, the same sense a kitchen scale or shipping label uses. True weight depends on gravity and would differ on the Moon; a kilogram or pound here means the same physical quantity anywhere.',
    },
    {
      id: 'pound-precision',
      question: 'How precise is the pound-to-gram conversion?',
      answer: 'Exact. One pound is officially defined as exactly 453.59237 grams, agreed internationally in 1959, not a rounded estimate.',
    },
    {
      id: 'ton-type',
      question: 'Which "ton" does this use?',
      answer: 'The metric ton (1,000 kilograms), not the US short ton (2,000 pounds) or UK long ton (2,240 pounds), which are different, separately-defined units.',
    },
    {
      id: 'stone-missing',
      question: 'Why isn\u2019t "stone" included as a unit?',
      answer: 'Stone (commonly used for body weight in the UK and Ireland) wasn\u2019t included in this first set of units, though it\u2019s a straightforward addition, 1 stone equals exactly 14 pounds, if it comes up as a common request.',
    },
    {
      id: 'gram-vs-kg-default',
      question: 'Why is the base unit grams instead of kilograms?',
      answer: 'Grams keep every other unit\u2019s conversion factor as a whole or simple decimal number relative to it. Using kilograms as the base would just shift the same factors around by a factor of 1000 without changing anything meaningful about the actual math.',
    },
    {
      id: 'ounce-troy-vs-avoirdupois',
      question: 'Is the ounce here the same as a troy ounce used for precious metals?',
      answer: 'No, different units. This converter uses the standard avoirdupois ounce (the everyday one, about 28.35 grams). A troy ounce, used for gold, silver, and other precious metals, is heavier, about 31.1 grams, a separate historical measurement system.',
    },
  ],

  'volume-converter': [
    {
      id: 'why-gallons-separate-vol',
      question: 'Why are US and UK gallons shown separately instead of one "gallon"?',
      answer: 'Because they\u2019re genuinely different sizes, a US gallon is about 3.785 liters, a UK gallon about 4.546 liters, roughly 20% larger. Combining them into one option would silently give a wrong answer depending on which one someone actually meant.',
    },
    {
      id: 'which-cup',
      question: 'Which "cup" measurement does this use?',
      answer: 'The US customary cup (about 236.6 mL). Some countries define a cup differently, so if converting a recipe from a source using a different regional cup size, that difference is worth checking separately.',
    },
    {
      id: 'ml-vs-cc',
      question: 'Is a milliliter the same as a cubic centimeter?',
      answer: 'Yes, exactly the same volume, just different naming conventions, one common in everyday and medical contexts, the other in engineering and automotive contexts.',
    },
    {
      id: 'pint-missing',
      question: 'Why isn\u2019t "pint" included?',
      answer: 'Pints weren\u2019t included in this first set, and since US and UK pints are also genuinely different sizes (like gallons), adding them the right way means labeling both explicitly, the same care taken with gallons here.',
    },
    {
      id: 'why-ml-base-volume',
      question: 'Why is the base unit milliliters instead of liters?',
      answer: 'Milliliters keep the metric side of this converter as whole numbers (1 liter = 1000 mL exactly) and give the smallest common reference point across both the metric and US customary units used here.',
    },
    {
      id: 'liquid-vs-dry-volume',
      question: 'Does this account for the difference between liquid and dry measurements?',
      answer: 'No, this converter handles liquid (fluid) volume units specifically. US dry measure (used historically for produce like grain) uses a separate, differently-sized gallon and quart, a distinction this tool doesn\u2019t cover.',
    },
  ],

  'temperature-converter': [
    {
      id: 'why-offset-needed',
      question: 'Why can\u2019t temperature just be converted by multiplying, like other units?',
      answer: 'Because Celsius, Fahrenheit and Kelvin don\u2019t share the same zero point. Length or weight units all start at zero together; temperature scales don\u2019t, so an offset has to be added or subtracted alongside any scaling.',
    },
    {
      id: 'negative-forty',
      question: 'Is it true that -40\u00b0C and -40\u00b0F are the same temperature?',
      answer: 'Yes, exactly. It\u2019s a genuine mathematical coincidence of where the two scales\u2019 conversion formulas cross, and a handy way to sanity-check that a conversion is working correctly.',
    },
    {
      id: 'kelvin-negative',
      question: 'Can Kelvin ever be negative?',
      answer: 'No. Kelvin starts at absolute zero, the physical limit of how cold anything can get, so a negative Kelvin value has no physical meaning and would indicate an input error.',
    },
    {
      id: 'why-kelvin-science',
      question: 'Why do scientists use Kelvin instead of Celsius?',
      answer: 'Kelvin\u2019s zero point is an unambiguous physical limit, absolute zero, rather than an arbitrary reference like water freezing (Celsius) or a historical brine mixture (Fahrenheit), which makes it the natural choice for physics and chemistry calculations.',
    },
    {
      id: 'who-uses-fahrenheit',
      question: 'Why does the US still use Fahrenheit when most of the world uses Celsius?',
      answer: 'Largely historical: the US adopted Fahrenheit widely before the international push toward metric standardization, and everyday infrastructure (weather reporting, home thermostats, cooking) never fully switched over, unlike most other English-speaking countries.',
    },
    {
      id: 'temperature-converter-privacy',
      question: 'Does this tool need an internet connection to convert?',
      answer: 'No \u2014 every conversion is calculated instantly with a formula directly in your browser. Nothing you enter here is ever sent to a server.',
    },
  ],

  'area-converter': [
    {
      id: 'hectare-vs-acre',
      question: 'How big is a hectare compared to an acre?',
      answer: 'One hectare is about 2.471 acres, meaning a hectare is the larger of the two. They come from different systems (hectare is a clean metric unit, acre traces back to old English land measurement), so the ratio between them isn\u2019t a tidy round number.',
    },
    {
      id: 'why-area-squares',
      question: 'Why do area conversion factors look so different from length ones?',
      answer: 'Because area scales by the square of the underlying length ratio. A unit that\u2019s 10 times longer covers 100 times the area, not 10 times, which is why area conversion factors grow much faster than length ones between the same units.',
    },
    {
      id: 'square-vs-cubic',
      question: 'Does this handle volume (cubic) units too?',
      answer: 'No, this is specifically for two-dimensional area (square units). For three-dimensional volume, ToolHub\u2019s separate Volume Converter is the right tool.',
    },
    {
      id: 'hectare-familiar-size',
      question: 'How big is a hectare in more familiar terms?',
      answer: 'A hectare is exactly 10,000 square meters, roughly a 100m \u00d7 100m square. A standard soccer pitch is somewhat smaller, typically in the 6,000-8,000 square meter range depending on the specific regulation size used.',
    },
    {
      id: 'why-m2-base-area',
      question: 'Why is the base unit square meters instead of hectares?',
      answer: 'Square meters give the smallest common reference point across both the metric units here (square millimeters through square kilometers) and the imperial ones (square feet, acres, square miles), keeping every conversion factor a single multiplication rather than a chain of unit changes.',
    },
  ],

  'speed-converter': [
    {
      id: 'why-knots-navigation',
      question: 'Why do ships and planes use knots instead of mph or km/h?',
      answer: 'A knot is based on the nautical mile, which was historically defined to correspond to one minute of latitude, making navigation calculations more direct when plotting a course on a nautical chart. It\u2019s a practical convention from navigation, not an arbitrary unit choice.',
    },
    {
      id: 'knot-precision',
      question: 'How precise is the knot conversion?',
      answer: 'Exact. One knot is defined as exactly 1852 meters per hour, based on the internationally standardized nautical mile, not an approximation.',
    },
    {
      id: 'negative-speed',
      question: 'Can I convert a negative speed value?',
      answer: 'The math works the same either way, but a negative speed doesn\u2019t correspond to anything physical, it\u2019s typically only meaningful in a context like velocity with direction, which this tool doesn\u2019t track.',
    },
    {
      id: 'mach-missing',
      question: 'Why isn\u2019t Mach (speed of sound) included?',
      answer: 'Mach isn\u2019t a fixed unit, it depends on the speed of sound at the specific altitude and temperature involved, which varies. That makes it a genuinely different kind of conversion than the fixed-ratio units here.',
    },
    {
      id: 'why-mps-base-speed',
      question: 'Why is the base unit meters per second instead of km/h?',
      answer: 'Meters per second is the standard SI unit for speed, and using it as the base keeps every other unit\u2019s conversion factor as a single, direct multiplication rather than needing to convert through an intermediate unit first.',
    },
    {
      id: 'speed-vs-velocity',
      question: 'Is this the same as converting velocity?',
      answer: 'For the numeric magnitude, yes. Velocity technically also includes direction, which this tool doesn\u2019t track, so it converts speed (how fast) rather than full velocity (how fast, in which direction).',
    },
  ],

  'time-converter': [
    {
      id: 'time-vs-timestamp',
      question: 'Can this convert a date or timestamp, not just a duration?',
      answer: 'No, this converts a length of time (how long something lasts), not a specific point in time. For an actual date or Unix timestamp, ToolHub\u2019s separate Timestamp Converter is the right tool.',
    },
    {
      id: 'why-60-24',
      question: 'Why don\u2019t time units follow a clean base-10 pattern like metric units?',
      answer: 'Seconds-to-minutes and minutes-to-hours both use base 60, a legacy of ancient Babylonian counting; hours-to-days uses 24, tied to the Earth\u2019s actual rotation. None of that was designed as a clean system the way metric units were.',
    },
    {
      id: 'month-year-missing',
      question: 'Why aren\u2019t months or years included as units?',
      answer: 'Because they don\u2019t have one fixed length, a month can be 28 to 31 days, and a year is about 365.25 days on average. Converting to or from those units meaningfully requires a specific calendar date, which is outside what a plain duration converter can do accurately.',
    },
    {
      id: 'why-different-bases',
      question: 'Why does an hour have 60 minutes but a day has 24 hours?',
      answer: 'They come from different historical origins. The 60-based minute and hour trace back to ancient Babylonian base-60 counting; the 24-hour day traces back to ancient Egyptian timekeeping. Neither was designed to match the other cleanly.',
    },
    {
      id: 'why-seconds-base-time',
      question: 'Why is the base unit seconds instead of minutes or hours?',
      answer: 'The second is the standard SI base unit for time, and using it here keeps every other unit\u2019s conversion factor as a single, direct multiplication, milliseconds down, minutes and hours up, without needing an intermediate conversion step.',
    },
  ],

  'data-converter': [
    {
      id: 'why-drive-shows-less',
      question: 'Why does my hard drive show less space than what\u2019s printed on the box?',
      answer: 'Manufacturers label drives using the decimal definition (1 TB = 1,000,000,000,000 bytes), while most operating systems display capacity using binary units (1024-based). The same 1 TB drive shows as roughly 931 GiB in that binary counting, even though no storage is actually missing.',
    },
    {
      id: 'which-one-to-use',
      question: 'Which should I use, the decimal or binary units?',
      answer: 'Match whatever the number is already being compared against. A manufacturer\u2019s spec or an internet speed figure is usually decimal (KB/MB/GB); a file size shown by an operating system\u2019s file manager is usually binary (KiB/MiB/GiB), even when it\u2019s labeled with the decimal-looking name.',
    },
    {
      id: 'bits-vs-bytes',
      question: 'Does this handle bits as well as bytes?',
      answer: 'No, this specifically converts between byte-based units. Internet speeds are commonly quoted in bits per second (a different unit, 8 bits per byte), which is worth keeping in mind when comparing a download speed to a file size.',
    },
    {
      id: 'why-binary-default',
      question: 'Why do operating systems still use binary (1024-based) units if the "correct" IEC name is different?',
      answer: 'Mostly historical inertia. Computers work naturally in powers of two, so early systems adopted 1024-based counting and labeled it with the familiar decimal prefixes (KB, MB) rather than the newer IEC names (KiB, MiB), which weren\u2019t standardized until 1998, long after the convention was already widespread.',
    },
  ],

  'pressure-converter': [
    {
      id: 'why-so-many-units',
      question: 'Why are there so many different pressure units?',
      answer: 'Each comes from a different context: Pascal is the formal SI unit, PSI comes from the US customary pound and inch, bar is the practical everyday unit used across most of the world, atmosphere is a fixed reference value, and Torr traces back to the original mercury barometer.',
    },
    {
      id: 'torr-vs-mmhg',
      question: 'Is Torr the same as mmHg?',
      answer: 'For practical purposes, yes, they\u2019re functionally identical, both descending from Evangelista Torricelli\u2019s original mercury-column barometer. mmHg is still the unit used on blood pressure monitors today.',
    },
    {
      id: 'why-atmosphere-fixed',
      question: 'Why is "atmosphere" a fixed number instead of a real measurement?',
      answer: 'It\u2019s defined as exactly 101,325 Pascals, a standardized reference value representing typical sea-level pressure, rather than something that varies with actual weather conditions on a given day.',
    },
    {
      id: 'why-pascal-tiny',
      question: 'Why does the Pascal feel like such a small, impractical unit?',
      answer: 'Because it\u2019s defined as just one newton of force per square meter, a genuinely small amount of pressure. Everyday atmospheric pressure works out to over 100,000 Pascals, which is exactly why kilopascals and bar exist as more convenient everyday sizes.',
    },
  ],

  'energy-converter': [
    {
      id: 'calorie-vs-calorie',
      question: 'Is a food "Calorie" the same as a scientific "calorie"?',
      answer: 'No, a food label\u2019s Calorie (capitalized) is actually a kilocalorie, equal to 1,000 of the lowercase calories used in chemistry. It\u2019s a genuinely confusing but real distinction, not just a stylistic difference.',
    },
    {
      id: 'why-kwh-on-bills',
      question: 'Why do electricity bills use kilowatt-hours instead of joules?',
      answer: 'A kilowatt-hour is a practically-sized unit for household energy use, it\u2019s the energy used by a 1,000-watt device running for one hour. The equivalent number of joules would be a much larger, less intuitive figure for a monthly bill.',
    },
    {
      id: 'btu-rate-or-amount',
      question: 'Is BTU an amount of energy or a rate?',
      answer: 'BTU by itself is an amount of energy. BTU per hour, commonly seen on air conditioner specs, is a rate describing how quickly that unit can move heat, which is why converting a BTU/hour rating meaningfully involves thinking about it alongside time, not as a standalone energy amount.',
    },
  ],

  'power-converter': [
    {
      id: 'imperial-vs-metric-hp',
      question: 'Is horsepower the same in every country?',
      answer: 'No. Imperial (mechanical) horsepower is about 745.7 watts, while metric horsepower (PS) is about 735.5 watts, a real, if small, difference between the two definitions. Car specifications don\u2019t always clarify which one is being used, so a direct number comparison between regions can end up being slightly misleading.',
    },
    {
      id: 'why-called-horsepower',
      question: 'Why is power measured in "horsepower" at all?',
      answer: 'James Watt popularized the unit as a marketing comparison for selling his steam engines, letting factory owners understand how many horses one engine could realistically replace. It stuck as a standard unit of measurement long after horses stopped being the actual point of comparison for anything.',
    },
    {
      id: 'btuh-meaning',
      question: 'What does BTU/hour actually describe?',
      answer: 'The rate of heat transfer, commonly seen on air conditioner and furnace ratings, describing how much heating or cooling capacity the unit delivers per hour rather than a one-time energy amount.',
    },
    {
      id: 'watt-vs-horsepower-usage',
      question: 'Why do some things get rated in watts and others in horsepower?',
      answer: 'Largely tradition specific to each industry: automotive and engine-related power tends to stay in horsepower for historical reasons, while electrical devices and modern engineering contexts default to watts, the actual SI unit. Both genuinely describe the exact same physical quantity.',
    },
  ],

  'angle-converter': [
    {
      id: 'why-code-uses-radians',
      question: 'Why do sine and cosine functions in code expect radians, not degrees?',
      answer: 'Mathematics treats the radian as the fundamental angle unit, defined by the relationship between arc length and radius. Passing a degree value into a function expecting radians is a very common source of bugs that look mysterious but are the function working correctly on unexpected units.',
    },
    {
      id: 'why-360-degrees',
      question: 'Why does a circle have 360 degrees specifically?',
      answer: 'It traces back to ancient Babylonian mathematics, which used a base-60 number system, the same root that gives a clock 60 minutes and 60 seconds, rather than being derived from any particular geometric necessity.',
    },
    {
      id: 'what-are-gradians',
      question: 'What are gradians actually used for?',
      answer: 'Mostly surveying and some European engineering contexts. A gradian divides a full circle into 400 units instead of 360, specifically chosen so a right angle comes out to a clean 100 gradians.',
    },
    {
      id: 'what-is-a-turn',
      question: 'What is a "turn" used for as an angle unit?',
      answer: 'It expresses a full 360-degree rotation as simply "1," which is a natural way to describe rotational quantities like how many complete turns a wheel, motor shaft, or gear makes, rather than tracking degrees that keep climbing past 360.',
    },
  ],

  'hash-generator': [
    {
      id: 'which-algorithm',
      question: 'Which hash algorithm should I use?',
      answer: 'SHA-256 or higher for anything security-relevant \u2014 it\u2019s the current practical standard for checksums, digital signatures, and integrity verification. MD5 and SHA-1 are still common for file checksums and compatibility with older systems, but both are cryptographically broken and shouldn\u2019t be relied on for anything security-sensitive.',
    },
    {
      id: 'is-md5-broken',
      question: 'Is MD5 actually broken, or is that outdated advice?',
      answer: 'It\u2019s genuinely broken, not outdated caution \u2014 collisions (two different inputs producing the same MD5 hash) can be computed quickly on modern hardware. It\u2019s still fine for non-security uses like deduplication or cache keys, where no one is deliberately trying to forge a match, but not for anything where a malicious collision would matter.',
    },
    {
      id: 'hash-for-passwords',
      question: 'Can I use SHA-256 to hash and store passwords?',
      answer: 'No \u2014 this is a common and understandable mistake. SHA-256 and every algorithm here are deliberately fast, which is exactly what makes them weak for password storage: an attacker with leaked hashes can try billions of guesses per second against a fast hash. Password storage needs a deliberately slow algorithm built for that purpose, like bcrypt, scrypt, or Argon2.',
    },
    {
      id: 'same-input-same-hash',
      question: 'Will the same text always produce the same hash?',
      answer: 'Yes \u2014 a given input always produces the same hash with the same algorithm, which is what makes hashes useful for verifying content hasn\u2019t changed. Even a single-character difference in the input produces a completely different, unrelated-looking hash.',
    },
    {
      id: 'hash-generator-privacy',
      question: 'Is the text I hash here sent to a server?',
      answer: 'No \u2014 every hash is computed entirely in your browser using the Web Crypto API. Nothing you type here, including sensitive text you\u2019re checking or comparing, is ever transmitted anywhere.',
    },
  ],
  'timestamp-converter': [
    {
      id: 'what-is-unix-time',
      question: 'What is a Unix timestamp?',
      answer: 'The number of seconds elapsed since midnight UTC on January 1, 1970 \u2014 a fixed reference point called the Unix epoch. It\u2019s a compact, timezone-independent way to represent a single point in time as one number.',
    },
    {
      id: 'seconds-vs-milliseconds',
      question: 'My timestamp has 13 digits \u2014 why doesn\u2019t it work?',
      answer: 'This tool works with timestamps in seconds (10 digits for current dates). A 13-digit number is in milliseconds \u2014 common in JavaScript and some APIs. Divide it by 1000 to get the equivalent seconds-based timestamp, then paste that in.',
    },
    {
      id: 'why-timezone-independent',
      question: 'Why is a Unix timestamp the same number everywhere in the world?',
      answer: 'Because it counts seconds since a fixed UTC reference point rather than describing a local calendar date and time. The number 1700000000 refers to the exact same instant everywhere \u2014 only the human-readable date and time shown for it changes depending on which timezone you\u2019re viewing it in.',
    },
    {
      id: 'year-2038-problem',
      question: 'What is the Year 2038 problem?',
      answer: 'Many older systems store Unix time as a signed 32-bit integer, which runs out of room on January 19, 2038. It doesn\u2019t affect this converter, but it\u2019s a real, still-relevant limitation in some legacy systems and embedded devices that haven\u2019t moved to 64-bit timestamps.',
    },
    {
      id: 'timestamp-converter-privacy',
      question: 'Does this tool need to know my actual timezone or location?',
      answer: 'It reads your browser\u2019s local timezone setting to display conversions in your local time, entirely on your device \u2014 nothing about your location or timezone is ever sent to a server.',
    },
  ],
  'regex-tester': [
    {
      id: 'flags',
      question: 'What do the flags (g, i, m, s) do?',
      answer: 'g finds all matches instead of just the first; i ignores letter case; m makes ^ and $ match the start/end of each line instead of only the whole string; s lets . match newline characters too, which it doesn\u2019t by default.',
    },
    {
      id: 'no-matches',
      question: 'Why isn\u2019t my pattern matching anything?',
      answer: 'The most common causes: forgetting the global (g) flag when you expect multiple matches, case sensitivity catching you off guard (add the i flag), or special regex characters in your test text (like . or *) being interpreted as pattern syntax rather than literal characters.',
    },
    {
      id: 'invalid-pattern',
      question: 'Why does my pattern show an error instead of matching?',
      answer: 'An unclosed bracket, an invalid escape sequence, or mismatched parentheses will cause the pattern itself to fail to compile \u2014 the error shown reflects a genuine syntax problem in the regex, not the test text.',
    },
    {
      id: 'greedy-vs-lazy',
      question: 'Why does my pattern match more text than I expected?',
      answer: 'Quantifiers like * and + are greedy by default \u2014 they match as much as possible. Adding a ? after them (like *? or +?) makes them lazy instead, matching as little as possible, which often fixes patterns that grab too much text.',
    },
    {
      id: 'regex-tester-privacy',
      question: 'Is my test text and pattern sent anywhere?',
      answer: 'No \u2014 matching happens entirely in your browser using JavaScript\u2019s native regex engine. Neither your pattern nor your test text is ever sent to a server, so it\u2019s safe to test against real, sensitive sample data.',
    },
  ],

  'pdf-to-jpg': [
    {
      id: 'multi-page',
      question: 'Can I convert every page at once?',
      answer: 'This converts one page at a time \u2014 pick the page number and convert, then change it to grab another page.',
    },
    {
      id: 'quality',
      question: 'What resolution is the output image?',
      answer: 'Pages are rendered at roughly 2x the PDF\u2019s native size, giving a sharp result suitable for screen viewing and most printing.',
    },
    {
      id: 'why-jpg-here',
      question: 'When should I use JPG instead of PNG for a PDF page?',
      answer: 'JPG makes sense for pages that are mostly a photo or continuous-tone image, where its lossy compression is barely noticeable and produces a meaningfully smaller file. For text-heavy or line-art pages, PNG usually looks cleaner.',
    },
    {
      id: 'scanned-pdf',
      question: 'Does this work on a scanned PDF (one made of images already)?',
      answer: 'Yes \u2014 it renders whatever is visually on the page, whether that\u2019s real text and vector graphics or an already-scanned image embedded in the PDF.',
    },
    {
      id: 'text-selectable-after',
      question: 'Will the text in the resulting JPG still be selectable?',
      answer: 'No \u2014 the page is rendered as a flat image, so any text that was selectable in the original PDF becomes part of the picture rather than real text. If you need to keep text selectable, this isn\u2019t the right tool for that purpose.',
    },
    {
      id: 'password-protected-img',
      question: 'Can I convert a page from a password-protected PDF?',
      answer: 'A PDF that requires a password to open can\u2019t be rendered without first removing that protection, since the file\u2019s content is encrypted until unlocked.',
    },
  ],
  'pdf-to-png': [
    {
      id: 'multi-page',
      question: 'Can I convert every page at once?',
      answer: 'This converts one page at a time. Pick the page number and convert, then change it to grab another page.',
    },
    {
      id: 'why-png',
      question: 'Why choose PNG instead of JPG here?',
      answer: 'PNG is lossless, which matters most for pages with sharp text or line art. For photo-heavy pages, JPG usually gives a smaller file with no visible difference.',
    },
    {
      id: 'file-size-png',
      question: 'Will the PNG be a large file?',
      answer: 'It depends on the page content. A text-heavy or simple page tends to produce a reasonably compact PNG, while a page with a lot of continuous-tone imagery can produce a noticeably larger file than the equivalent JPG would.',
    },
    {
      id: 'resolution-png',
      question: 'What resolution is the PNG output?',
      answer: 'Like the JPG converter, pages are rendered at roughly 2x the PDF\u2019s native size, giving a sharp, detailed result.',
    },
    {
      id: 'text-selectable-after-png',
      question: 'Will the text in the resulting PNG still be selectable?',
      answer: 'No. The page is rendered as a flat image, so any text that was selectable in the original PDF becomes part of the picture rather than real text. If you need to keep text selectable, this isn\u2019t the right tool for that purpose.',
    },
    {
      id: 'password-protected-img-png',
      question: 'Can I convert a page from a password-protected PDF?',
      answer: 'A PDF that requires a password to open can\u2019t be rendered without first removing that protection, since the file\u2019s content is encrypted until unlocked.',
    },
    {
      id: 'png-vs-jpg-choice',
      question: 'How do I decide between the PNG and JPG converters for the same page?',
      answer: 'If the page is mostly text, a diagram, or line art, PNG keeps every edge crisp. If the page is a photo or has a lot of gradients and continuous color, JPG usually produces a noticeably smaller file with no visible quality difference for that kind of content.',
    },
  ],
  'gradient-generator': [
    {
      id: 'linear-vs-radial',
      question: 'What\u2019s the difference between a linear and radial gradient?',
      answer: 'A linear gradient transitions in a straight line across a chosen direction or angle \u2014 useful for backgrounds, buttons, and hero sections. A radial gradient spreads outward from a center point in a circle or ellipse instead, which works well for spotlight effects, glows, and soft vignettes.',
    },
    {
      id: 'color-stops',
      question: 'What are color stops in a CSS gradient?',
      answer: 'Each stop is a color placed at a specific position, from 0% to 100%, along the gradient. Two stops create a simple two-color blend; add more stops for a multi-color gradient, and adjust each stop\u2019s position slider to control exactly where each color starts and ends.',
    },
    {
      id: 'gradient-direction',
      question: 'How do I set the direction or angle of a linear gradient?',
      answer: 'Linear gradient direction is set either with a keyword (like \u201cto right\u201d or \u201cto bottom\u201d) or an exact angle in degrees, where 0deg points bottom-to-top and 90deg points left-to-right. This tool lets you set the direction visually and generates the correct CSS automatically, so you don\u2019t need to memorize the angle system.',
    },
    {
      id: 'gradient-css-code',
      question: 'How do I add the generated gradient to my website?',
      answer: 'Copy the generated code and paste it directly as the background or background-image value in your CSS \u2014 for example, background: linear-gradient(90deg, #667eea, #764ba2). No image file, build step, or extra HTTP request is needed since the gradient renders natively in the browser.',
    },
    {
      id: 'gradient-vs-image-performance',
      question: 'Is a CSS gradient actually faster than a gradient background image?',
      answer: 'Yes, genuinely \u2014 a CSS gradient adds zero extra HTTP requests and is calculated directly by the browser\u2019s rendering engine, while an image file needs to be downloaded and decoded. It also scales perfectly at any resolution without needing multiple exported sizes for different screen densities.',
    },
    {
      id: 'gradient-generator-privacy',
      question: 'Is it safe to use this tool \u2014 is my data sent anywhere?',
      answer: 'Yes, it\u2019s completely safe. Every gradient is built and rendered entirely in your own browser using standard CSS \u2014 nothing you create here is ever uploaded, stored, or sent to a server. You can close the tab and nothing about what you built is retained anywhere.',
    },
  ],

  'code-minifier': [
    {
      id: 'what-it-does',
      question: 'Does this rename variables or do aggressive optimization?',
      answer: 'No \u2014 this strips comments and unnecessary whitespace, but deliberately doesn\u2019t rename variables or remove dead code. Those transformations need a full parser to do safely, and getting them wrong can break working code. This tool prioritizes never breaking your code over squeezing out every possible byte.',
    },
    {
      id: 'is-it-safe',
      question: 'Will this break my code?',
      answer: 'It\u2019s built to correctly recognize strings, template literals, and regex literals so it never strips something that only looks like a comment inside one of those \u2014 a common bug in simpler minifiers. Still, always keep your original, unminified source as the version you edit.',
    },
    {
      id: 'why-not-more-aggressive',
      question: 'Why doesn\u2019t this shrink files as much as tools like Terser?',
      answer: 'Aggressive minifiers rename variables and eliminate dead code, which requires fully parsing and understanding the code\u2019s structure to do safely. This tool intentionally sticks to comment and whitespace removal \u2014 a smaller, guaranteed-safe scope, rather than risk breaking working code for a larger size reduction.',
    },
    {
      id: 'which-language',
      question: 'How do I minify HTML that contains inline JavaScript or CSS?',
      answer: 'Use the HTML option \u2014 it correctly leaves the contents of <script> and <style> tags untouched rather than applying HTML whitespace rules to code that follows entirely different syntax.',
    },
  ],

  'compress-pdf': [
    {
      id: 'how-it-works',
      question: 'How does this actually shrink the file size?',
      answer: 'Each page is rendered as an image and recompressed at your chosen quality, the same technique the Image Compressor uses. This works best on scanned or image-heavy PDFs, since that\u2019s usually what makes a PDF large in the first place.',
    },
    {
      id: 'text-selectable',
      question: 'Will the text still be selectable and searchable after compressing?',
      answer: 'No. Since each page becomes a single image, any text in the original PDF is no longer selectable, searchable, or copyable in the compressed version. If you need to keep text selectable, this tool isn\u2019t the right fit for that PDF.',
    },
    {
      id: 'quality-setting',
      question: 'What compression level should I use?',
      answer: 'Around 65% is a solid starting point for most PDFs, noticeably smaller with minimal visible quality loss. Go lower for maximum size reduction if the PDF is mostly for reference, or higher if visual quality matters more than file size.',
    },
    {
      id: 'not-getting-smaller',
      question: 'Why isn\u2019t my PDF shrinking much after compressing?',
      answer: 'If the original PDF is mostly text with few or no images, there\u2019s often very little to compress, since text takes up minimal space to begin with. This tool\u2019s real value is for scanned documents and image-heavy PDFs, where the images are what\u2019s actually making the file large.',
    },
    {
      id: 'multiple-passes',
      question: 'Can I compress an already-compressed PDF again for an even smaller file?',
      answer: 'Yes, but each additional pass re-compresses images that are already lossy, so quality degrades further each time. One careful pass at a reasonable quality setting usually gives a better result than compressing the same file repeatedly.',
    },
    {
      id: 'compress-pdf-privacy',
      question: 'Is my PDF uploaded to a server to be compressed?',
      answer: 'No \u2014 compression happens entirely in your browser. Your PDF, including anything sensitive in it, is never uploaded anywhere.',
    },
  ],

  'pdf-to-word': [
    {
      id: 'what-it-does',
      question: 'Does this preserve the original PDF\u2019s formatting and layout?',
      answer: 'No. This extracts the actual text content and reconstructs paragraph breaks, giving you an editable starting point. Fonts, images, tables, columns and exact positioning aren\u2019t preserved. True layout-perfect conversion is a much harder problem that even paid tools don\u2019t solve perfectly.',
    },
    {
      id: 'scanned-pdfs',
      question: 'Why does it say no text was found in my PDF?',
      answer: 'That means your PDF is a scanned document, essentially a picture of text rather than real, selectable text. This tool extracts existing text; it doesn\u2019t perform OCR (optical character recognition) to read text out of an image.',
    },
    {
      id: 'multi-page',
      question: 'Does it handle multi-page PDFs?',
      answer: 'Yes. Every page\u2019s text is extracted and included, with a page break inserted between each page\u2019s content in the resulting Word document.',
    },
    {
      id: 'why-not-perfect-conversion',
      question: 'Why don\u2019t any tools, even paid ones, do a perfect PDF-to-Word conversion?',
      answer: 'Because a PDF doesn\u2019t actually store a document the way Word does. It stores drawing instructions for where each character should appear on the page. Rebuilding real paragraphs, tables and headings from that means making educated guesses, and those guesses break down on anything visually complex, regardless of how good the tool is.',
    },
  ],

  'pdf-to-powerpoint': [
    {
      id: 'what-it-does',
      question: 'Are the slides editable text, or images?',
      answer: 'Each slide is a full-size image of that PDF page \u2014 this preserves exactly how the page looks, but you can\u2019t click into the slide and edit individual words or shapes the way you could with a slide built from scratch in PowerPoint.',
    },
    {
      id: 'why-images',
      question: 'Why not extract editable text and shapes instead?',
      answer: 'Reliably reconstructing a PDF page\u2019s exact layout as editable PowerPoint shapes is a very hard problem \u2014 text position, wrapping and formatting rarely survive that translation accurately. Using an image of the actual page guarantees it looks right.',
    },
    {
      id: 'page-count',
      question: 'Is there a limit on how many pages it can convert?',
      answer: 'No hard page limit, but very large PDFs will take longer to process since every page is rendered as a high-resolution image before being placed into the presentation.',
    },
    {
      id: 'file-valid',
      question: 'Will the .pptx file actually open correctly in PowerPoint?',
      answer: 'Yes \u2014 this generates the real OOXML structure a valid PowerPoint file requires (not just a renamed zip of images), and the output has been verified to open and read correctly, not just assumed to work because the conversion completed without an error.',
    },
  ],

  'powerpoint-to-pdf': [
    {
      id: 'looks-different',
      question: 'Why doesn\u2019t the PDF look exactly like my slides?',
      answer: 'This extracts the real text and images from your presentation rather than visually rendering it, since no browser-based tool can fully reproduce an arbitrary PowerPoint slide\u2019s exact design. Colors, fonts, and shape positions aren\u2019t preserved \u2014 the actual words and images on each slide are.',
    },
    {
      id: 'why-not-render',
      question: 'Why not just render the slides as images, the way PDF to PowerPoint does?',
      answer: 'That direction works because PDF.js, a mature, complete PDF-rendering engine, already exists and runs in the browser. There\u2019s no equivalent engine for rendering an arbitrary PowerPoint slide\u2019s exact visual layout, so that approach genuinely isn\u2019t available here.',
    },
    {
      id: 'slide-order',
      question: 'Will the slides be in the wrong order if I reordered them in PowerPoint?',
      answer: 'No \u2014 slide order is resolved through the presentation file\u2019s own internal relationships, not through file naming, so reordered slides come through in their real, current order.',
    },
    {
      id: 'formatted-text',
      question: 'What happens to bold or italic text?',
      answer: 'The words themselves come through correctly even when part of a sentence has different formatting, since PowerPoint stores that as separate text runs internally that get joined back into the full sentence. The bold or italic styling itself isn\u2019t preserved in the PDF text.',
    },
  ],

  'excel-to-pdf': [
    {
      id: 'what-it-does',
      question: 'Does this preserve charts, images, or cell formatting?',
      answer: 'No. This converts your data into a clean table of text and numbers. Charts, images, merged cells, colors and custom number formatting aren\u2019t reproduced. It works best for straightforward data you want to share or print as a simple table.',
    },
    {
      id: 'which-sheet',
      question: 'Which sheet does it convert if my file has multiple sheets?',
      answer: 'Only the first sheet in your workbook is converted. If you need another sheet, reorder your sheets in Excel so the one you want is first, or save just that sheet as its own file.',
    },
    {
      id: 'large-sheets',
      question: 'What happens with a very large spreadsheet?',
      answer: 'Rows are automatically split across multiple PDF pages as needed. Extremely wide sheets with many columns will have narrower columns to fit the page, and very long cell values are shortened with an ellipsis to keep the table readable.',
    },
    {
      id: 'formulas',
      question: 'Do formulas convert correctly, or just their results?',
      answer: 'The calculated result of each formula is what gets converted, the same value shown displayed in the cell in Excel. The underlying formula itself isn\u2019t preserved, since a PDF table has no concept of a live formula.',
    },
    {
      id: 'empty-cells-and-rows',
      question: 'What happens with empty rows or columns in my spreadsheet?',
      answer: 'They\u2019re included as blank space in the table, matching the actual layout of the sheet, rather than being automatically removed. If a sheet has a lot of unused empty space, it\u2019s worth trimming that in Excel first for a cleaner-looking result.',
    },
  ],

  'word-to-pdf': [
    {
      id: 'what-it-does',
      question: 'Does this preserve tables, images, and my document\u2019s exact formatting?',
      answer: 'No \u2014 this extracts your document\u2019s text, headings, and bold formatting into a clean PDF. Tables, images, columns, custom fonts, and styles beyond headings/bold aren\u2019t reproduced. It works best for text-focused documents like reports, letters, and articles.',
    },
    {
      id: 'doc-vs-docx',
      question: 'Does it work with older .doc files?',
      answer: 'No, only the modern .docx format is supported. If you have an older .doc file, open and re-save it as .docx in Word first (or a free alternative like Google Docs or LibreOffice), then upload the .docx version here.',
    },
    {
      id: 'why-docx-only',
      question: 'Why does this only support .docx and not the older .doc format?',
      answer: '.docx is a modern, well-documented XML-based format that can be parsed directly and reliably. The older .doc format uses a completely different, more complex binary structure that\u2019s genuinely harder to parse accurately in a browser-based tool.',
    },
    {
      id: 'italic-underline',
      question: 'Does italic or underlined text carry over too?',
      answer: 'Currently only bold formatting is preserved within paragraphs, alongside heading styles. Italic, underline, and other character-level formatting aren\u2019t reproduced in this version.',
    },
    {
      id: 'page-breaks-word',
      question: 'Does the PDF paginate the same way as the original Word document?',
      answer: 'Text reflows and paginates naturally based on the PDF\u2019s own page size, similar to how a document flows in Word \u2014 but exact page breaks may land in slightly different places than the original, since layout-affecting elements like tables and images aren\u2019t part of the conversion.',
    },
  ],


  'youtube-thumbnail-downloader': [
    {
      id: 'which-url',
      question: 'What URL formats work?',
      answer: 'Standard youtube.com/watch?v= links, youtu.be short links, Shorts links, embed links, or just the raw 11-character video ID.',
    },
    {
      id: 'why-missing-quality',
      question: 'Why don\u2019t I see a Max Resolution option for every video?',
      answer: 'The highest resolution thumbnail (1280\u00d7720) only exists for videos uploaded at sufficient source resolution. When it\u2019s not available, that option is automatically hidden. The other sizes are generated for every video.',
    },
    {
      id: 'is-this-allowed',
      question: 'Is it okay to use a downloaded thumbnail?',
      answer: 'The thumbnail image itself is already publicly served by YouTube for embedding purposes. That said, the thumbnail\u2019s content (like a photo or artwork within it) may still be under copyright, so how it gets used, particularly for anything commercial or republished, is worth thinking through separately from whether the file is technically downloadable.',
    },
    {
      id: 'private-videos',
      question: 'Does this work on private or unlisted videos?',
      answer: 'It only works for videos where YouTube has generated a publicly accessible thumbnail, which is the case for standard public and unlisted videos. Fully private videos generally won\u2019t have an accessible thumbnail this way.',
    },
    {
      id: 'thumbnail-changes-later',
      question: 'What if the video owner changes the thumbnail after I download it?',
      answer: 'The downloaded file stays exactly as it was at the moment it was saved. Re-checking the same video later would show the updated thumbnail, since this tool always fetches whatever YouTube is currently serving, not a cached copy.',
    },
  ],

  'word-counter': [
    {
      id: 'how-sentences-counted',
      question: 'How are sentences counted?',
      answer: 'By counting groups of text ending in a period, exclamation mark, or question mark. Text with no ending punctuation at all still counts as one sentence.',
    },
    {
      id: 'reading-time',
      question: 'How is reading time calculated?',
      answer: 'Based on an average reading speed of 200 words per minute, a common estimate for adult silent reading of straightforward text. Actual reading speed varies by person and by how dense the text is, so treat it as a helpful ballpark, not an exact figure.',
    },
    {
      id: 'why-two-char-counts',
      question: 'Why are there two different character counts?',
      answer: 'Different platforms and forms count characters differently. Some limits include spaces, others don\u2019t. Showing both numbers means always knowing which one applies to whatever limit is being worked against.',
    },
    {
      id: 'paragraph-counting',
      question: 'How are paragraphs counted?',
      answer: 'Each block of text separated by a line break is counted as one paragraph, matching how most word processors and text editors treat paragraph breaks.',
    },
    {
      id: 'why-count-matters',
      question: 'Why do word count requirements exist for essays and articles?',
      answer: 'A word count target is usually a proxy for depth, enough length to actually develop an argument or cover a topic properly, without padding. Checking the count while writing helps gauge that without waiting until the end to find out it\u2019s short or over.',
    },
    {
      id: 'live-vs-paste',
      question: 'Does it count text I paste in, or only text I type?',
      answer: 'Both. The stats update the moment text appears in the box, whether it was typed directly or pasted in from somewhere else.',
    },
    {
      id: 'spaces-only-text',
      question: 'What does it count if I paste text that\u2019s mostly whitespace or blank lines?',
      answer: 'Blank lines don\u2019t count as words or sentences, but they do factor into the paragraph count if they\u2019re being used to separate blocks of text. A block of pure whitespace with no actual words shows a word count of zero.',
    },
    {
      id: 'word-counter-privacy',
      question: 'Is the text I paste here private?',
      answer: 'Yes \u2014 all counting happens instantly in your own browser as you type or paste. Your text is never sent to a server or stored anywhere, including drafts, essays, or anything else you check here.',
    },
  ],
  'case-converter': [
    {
      id: 'which-cases',
      question: 'Which case styles are supported?',
      answer: 'UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case \u2014 covering both everyday writing styles and the naming conventions used in code.',
    },
    {
      id: 'camelcase-where',
      question: 'Where is camelCase actually used?',
      answer: 'It\u2019s the standard naming convention for variables and functions in JavaScript, Java, and several other programming languages \u2014 the first word stays lowercase, and each following word starts with a capital letter.',
    },
    {
      id: 'kebab-vs-snake',
      question: 'When should I use kebab-case instead of snake_case?',
      answer: 'kebab-case is the standard for URL slugs and CSS class names, since URLs and CSS don\u2019t treat underscores the same way. snake_case is more common inside code itself, particularly in Python and Ruby variable names.',
    },
    {
      id: 'title-vs-sentence',
      question: 'What\u2019s the difference between Title Case and Sentence case?',
      answer: 'Title Case capitalizes the first letter of most words (common for headings), while Sentence case only capitalizes the very first letter of the whole text, like normal prose.',
    },
    {
      id: 'multiple-words-input',
      question: 'Does this work on multiple words or a whole sentence at once?',
      answer: 'Yes \u2014 paste any length of text, from a single word to several paragraphs, and every case style converts the entire input at once.',
    },
    {
      id: 'numbers-symbols',
      question: 'What happens to numbers and symbols in my text?',
      answer: 'Numbers and symbols pass through unchanged \u2014 case conversion only affects letters, since numbers and symbols don\u2019t have an uppercase or lowercase form to begin with.',
    },
    {
      id: 'undo',
      question: 'Can I convert text back to its original form?',
      answer: 'Your original input stays visible in the input box the whole time, unchanged \u2014 the seven converted versions appear alongside it as separate results, so you never lose the original.',
    },
    {
      id: 'case-converter-privacy',
      question: 'Is my text sent anywhere when I convert it?',
      answer: 'No \u2014 every conversion happens instantly in your browser. Nothing you paste here, including drafts or code, is ever sent to a server.',
    },
  ],
  'lorem-ipsum-generator': [
    {
      id: 'why-lorem-ipsum',
      question: 'Why is placeholder text always "Lorem ipsum"?',
      answer: 'It\u2019s scrambled, non-meaningful Latin-derived text that\u2019s been the design industry\u2019s standard placeholder for centuries \u2014 precisely because it looks like real text (roughly the right word lengths and letter patterns) without being distractingly readable, so it doesn\u2019t pull attention away from the layout it\u2019s filling.',
    },
    {
      id: 'units',
      question: 'What\u2019s the difference between words, sentences and paragraphs?',
      answer: 'They control how the count applies \u2014 e.g. asking for 5 "sentences" gives you 5 individual sentences, while 5 "paragraphs" gives you 5 full paragraphs, each made up of several sentences.',
    },
    {
      id: 'origin',
      question: 'Where does lorem ipsum text actually come from?',
      answer: 'It\u2019s traceable to a scrambled passage of Cicero\u2019s "de Finibus Bonorum et Malorum," a real Latin philosophical text written in 45 BC. The words are altered and rearranged enough that it isn\u2019t meaningful Latin, but the origin is genuinely documented, not an urban legend.',
    },
    {
      id: 'is-it-latin',
      question: 'Is Lorem Ipsum actual, readable Latin?',
      answer: 'No \u2014 while it\u2019s derived from real Latin text, the words have been altered, truncated, and rearranged to the point that it doesn\u2019t form coherent, readable Latin sentences. That\u2019s intentional, since genuinely readable text (in any language) would distract from the design it\u2019s meant to be filling.',
    },
    {
      id: 'when-to-use',
      question: 'When should I use placeholder text versus real draft content?',
      answer: 'Lorem ipsum is genuinely useful early on, when you\u2019re testing layout and typography before real content exists. Once real content is available, swapping it in is worthwhile \u2014 actual text often has different natural lengths than placeholder text, which can reveal layout issues placeholder text hides.',
    },
    {
      id: 'lorem-ipsum-privacy',
      question: 'Does this tool need an internet connection to generate text?',
      answer: 'No \u2014 the text is generated instantly in your browser from a built-in word list. Nothing is sent to or stored on a server.',
    },
  ],

  'password-generator': [
    {
      id: 'how-random',
      question: 'How random are these passwords, really?',
      answer: 'They\u2019re generated using your browser\u2019s cryptographically secure random number generator (the same class of API used for real security purposes elsewhere), not a simple pseudo-random function \u2014 and nothing about the password is ever sent anywhere, it\u2019s generated entirely on your device.',
    },
    {
      id: 'strength-meaning',
      question: 'What does the strength indicator mean?',
      answer: 'It\u2019s a real entropy calculation (bits of randomness) based on your password\u2019s length and which character types you\u2019ve included \u2014 not a cosmetic bar. More length and more character types both increase it.',
    },
    {
      id: 'how-long-should-be',
      question: 'How long should a strong password be?',
      answer: 'Modern guidance generally recommends at least 14\u201316 characters for a standard account, and 20 or more for anything critical like your email or a password manager\u2019s master password. Length matters more than clever character substitutions \u2014 attackers\u2019 tools already check common swaps like "a" to "@".',
    },
    {
      id: 'password-vs-passphrase',
      question: 'Should I use a password or a passphrase?',
      answer: 'Both are legitimate. A passphrase (several random, unrelated words strung together) is easier to type and remember; a fully random character-based password maximizes entropy for a given length. This tool generates the character-based kind \u2014 use whichever you\u2019ll actually type correctly and won\u2019t be tempted to reuse.',
    },
    {
      id: 'password-generator-privacy',
      question: 'Is it safe to generate my password here \u2014 could it be seen or stored anywhere?',
      answer: 'Yes, it\u2019s safe. Your password is generated entirely on your own device using your browser\u2019s built-in cryptographically secure random function \u2014 it\u2019s never transmitted over the network, logged, or stored anywhere, including by this site. Closing the tab leaves no trace of it here.',
    },
    {
      id: 'password-generator-wifi',
      question: 'Can I use this to generate a Wi-Fi password?',
      answer: 'Yes \u2014 a long, fully random password is an excellent choice for a Wi-Fi network, since it\u2019s typically entered once per device and then saved, so its length and randomness matter far more than how easy it is to type or remember.',
    },
  ],

  'password-strength-checker': [
    {
      id: 'is-it-safe-to-type',
      question: 'Is it safe to type my real password into this?',
      answer: 'Yes \u2014 the check happens entirely in your browser using JavaScript. The password is never sent to ToolHub\u2019s servers or anywhere else, not even briefly, and nothing about it is stored.',
    },
    {
      id: 'why-not-just-entropy',
      question: 'Why isn\u2019t this just a simple entropy calculation?',
      answer: 'Entropy math alone is genuinely misleading \u2014 a password like "Password123!" has decent character variety and scores well on character-count math, but it\u2019s also a well-known, commonly used real-world pattern that automated cracking tools check for immediately. This tool combines entropy with a real check against common passwords and predictable patterns, so the result reflects how a password would actually perform, not just an abstract formula.',
    },
    {
      id: 'online-vs-offline-attack',
      question: 'What\u2019s the difference between an online and offline password attack?',
      answer: 'An online attack tries logging into your actual account and is usually rate-limited, since the service can block repeated failed attempts. An offline attack works against a stolen password database on the attacker\u2019s own hardware, with no rate limit \u2014 billions of guesses per second are realistic. A genuinely strong password needs to hold up against the offline case, not just seem unguessable to a person.',
    },
    {
      id: 'checker-vs-generator',
      question: 'How is this different from the Password Generator tool?',
      answer: 'Password Generator creates a brand-new random password for you. This tool instead evaluates a password you already have or are considering, and explains specifically what\u2019s wrong with it if anything is \u2014 two different jobs.',
    },
  ],
  'instagram-post-resizer': [
    {
      id: 'fill-vs-fit',
      question: 'What\u2019s the difference between Fill and Fit?',
      answer: 'Fill scales your image to completely cover the target size, cropping any excess from the edges \u2014 no empty space, but some of the image may be cut off. Fit scales it to fit entirely within the target size, adding padding around it if needed \u2014 nothing is cropped, but there may be visible bars.',
    },
    {
      id: 'which-size',
      question: 'Which size should I use?',
      answer: 'Square (1080\u00d71080) for standard feed posts, Portrait (1080\u00d71350) for taller feed posts that take up more screen space, Landscape (1080\u00d7566) for wide photos, Story/Reel (1080\u00d71920) for Stories and Reels, and Profile Picture (320\u00d7320) for your account photo.',
    },
    {
      id: 'why-not-just-upload',
      question: 'Why not just upload my original photo directly and let Instagram resize it?',
      answer: 'Instagram will resize or crop it automatically, but using its own logic \u2014 which doesn\u2019t always frame the subject the way you intended. Resizing yourself beforehand means you control exactly what gets kept and what gets cropped.',
    },
    {
      id: 'quality-loss-resize',
      question: 'Will resizing to these dimensions reduce image quality?',
      answer: 'Resizing down to a smaller size stays sharp using high-quality smoothing. If your original photo is smaller than the target dimensions, it will need to be enlarged, which can look softer since no new detail can be added.',
    },
  ],

  'image-upscaler': [
    {
      id: 'is-this-ai',
      question: 'Does this use AI to upscale images?',
      answer: 'No. This uses high-quality interpolation combined with sharpening, both real, classical image-processing techniques, not a trained AI model. It\u2019s labeled that way on purpose.',
    },
    {
      id: 'can-it-add-detail',
      question: 'Can this add detail that wasn\u2019t in the original photo?',
      answer: 'No genuine upscaling technique, AI included, can perfectly reconstruct detail that was never captured. This tool makes a larger image look as clean and sharp as reasonably possible at the new size, it doesn\u2019t invent new information.',
    },
    {
      id: 'best-scale',
      question: 'What scale factor should I use?',
      answer: '2x gives the cleanest result with the least visible softness. Going to 3x or 4x enlarges further but makes any softening or artifacts in the original more noticeable, since there\u2019s proportionally more image to estimate.',
    },
    {
      id: 'why-png-output-upscale',
      question: 'Why does this only output PNG?',
      answer: 'PNG is lossless, so the upscaled result isn\u2019t immediately degraded by a second round of compression on top of the enlargement itself.',
    },
  ],

  'image-enhancer': [
    {
      id: 'is-this-ai-enhancer',
      question: 'Does this use AI?',
      answer: 'No. Sharpening uses a real technique called unsharp masking, and noise reduction uses a real Gaussian blur, both classical, well-established image-processing methods, not a trained AI model.',
    },
    {
      id: 'denoise-tradeoff',
      question: 'Why does increasing noise reduction make my photo look softer?',
      answer: 'Because reducing noise and preserving fine detail genuinely pull in opposite directions, noise and fine detail look similar to a simple filter. Start with a low denoise value and increase it only as much as the photo actually needs.',
    },
    {
      id: 'sharpen-too-much',
      question: 'Why does my image look like it has outlines or halos around edges at high sharpen values?',
      answer: 'That\u2019s a real, expected effect of unsharp-mask sharpening at strong settings, not a bug. Lowering the sharpen amount reduces it.',
    },
    {
      id: 'order-of-operations-enhance',
      question: 'Does it matter whether I apply denoise or sharpen first?',
      answer: 'This tool denoises first, then sharpens, since sharpening a noisy image tends to amplify the noise itself along with real detail. Denoising first gives the sharpening step cleaner information to work with.',
    },
  ],

  'twitter-image-resizer': [
    {
      id: 'why-post-image-cropped',
      question: 'Why does my shared image or link preview look cropped?',
      answer: 'The post image size is 1200\u00d7675, a 16:9 ratio. An image with a different aspect ratio gets cropped or padded to fit that shape when the preview card is generated, which is exactly what this tool\u2019s presets are sized to avoid.',
    },
    {
      id: 'why-circular-profile',
      question: 'Why does my profile picture look cut off at the edges?',
      answer: 'Profile pictures display as a circle everywhere on the platform. Anything positioned close to a corner of the square image gets clipped once that circular mask is applied, so centering the subject matters more than it looks like it should from the square original.',
    },
    {
      id: 'header-vs-post',
      question: 'What\u2019s the difference between the header and post image sizes?',
      answer: 'The header (1500\u00d7500) is the wide banner behind your profile picture and bio, a 3:1 ratio. The post image (1200\u00d7675) is for images shared in individual posts, a 16:9 ratio. They\u2019re genuinely different shapes, not just different sizes of the same crop.',
    },
    {
      id: 'fill-vs-fit-explained',
      question: 'What\u2019s the actual difference between Fill and Fit?',
      answer: 'Fill crops your image to exactly match the target dimensions, cutting off whatever doesn\u2019t fit. Fit resizes the whole image to stay visible, adding padding around the edges if the proportions don\u2019t match exactly. Fill usually looks more polished; Fit guarantees nothing important gets cropped out.',
    },
  ],

  'facebook-image-resizer': [
    {
      id: 'why-1200x630',
      question: 'Why is 1200\u00d7630 specifically the standard size?',
      answer: 'It\u2019s become the de facto link-preview image size shared across Facebook, X, and LinkedIn alike, since all three converged on a very similar ratio. Using this size covers link previews on all three platforms at once.',
    },
    {
      id: 'cover-mobile-desktop',
      question: 'Why does my cover photo look different on mobile versus desktop?',
      answer: 'Facebook\u2019s cover photo genuinely crops differently depending on the device, sometimes cutting the top and bottom more aggressively on a phone screen. Keeping the most important part of the image centered vertically, not just horizontally, helps it survive both crops.',
    },
    {
      id: 'why-circular-profile-fb',
      question: 'Why does my profile picture look cut off at the edges?',
      answer: 'It displays as a circle, so anything close to a corner of the square original gets clipped by that circular crop. Centering the subject avoids this.',
    },
    {
      id: 'fill-vs-fit-explained-fb',
      question: 'What\u2019s the actual difference between Fill and Fit?',
      answer: 'Fill crops your image to exactly match the target dimensions, cutting off whatever doesn\u2019t fit. Fit resizes the whole image to stay visible, adding padding around the edges if the proportions don\u2019t match exactly. Fill tends to look more polished for social posts; Fit guarantees nothing important gets cut off.',
    },
  ],

  'linkedin-image-resizer': [
    {
      id: 'square-vs-landscape',
      question: 'Should I use the square post or the landscape post size?',
      answer: 'Square images tend to take up more visible vertical space scrolling past on mobile, which is part of why square posts often get more attention in the feed. Landscape (1200\u00d7627) is more traditional and works well for link-preview-style images.',
    },
    {
      id: 'banner-vs-other-platforms',
      question: 'Can I use my Facebook or X cover photo as my LinkedIn banner?',
      answer: 'Not without recropping. LinkedIn\u2019s banner is a 4:1 ratio, notably wider and shorter than other platforms\u2019 cover images, so a photo sized for another platform will need different cropping, not just a resize, to look right.',
    },
    {
      id: 'personal-vs-company-banner',
      question: 'Is a personal profile banner the same as a Company Page cover image?',
      answer: 'They\u2019re technically separate assets with their own upload locations on LinkedIn, even though they use similar dimensions. Worth double-checking which one you\u2019re updating if you manage both a personal profile and a company page.',
    },
    {
      id: 'why-square-post-included',
      question: 'Why offer a square post size at all if LinkedIn\u2019s standard is landscape?',
      answer: 'Because square images genuinely perform differently in the feed, often taking up more vertical mobile screen space than a landscape image with identical content, which is worth having as a deliberate option rather than only supporting the traditional shape.',
    },
  ],

  'pinterest-pin-resizer': [
    {
      id: 'why-vertical',
      question: 'Why does Pinterest favor a tall, vertical image shape?',
      answer: 'Pinterest\u2019s masonry-style grid is built around vertical images from the ground up, unlike the landscape or square defaults most other platforms favor. A standard Pin\u2019s 2:3 portrait ratio consistently takes up more visible space and draws more attention in that grid than a square or landscape image would.',
    },
    {
      id: 'square-pin-when',
      question: 'When should I use the square Pin size instead of the standard one?',
      answer: 'For content like quote graphics or product shots specifically, where the extra vertical space a standard Pin provides would just be empty padding rather than genuinely useful content worth showing.',
    },
    {
      id: 'pinterest-profile-crop',
      question: 'Why does my Pinterest profile picture look cropped?',
      answer: 'Like most platforms, it displays as a circle. Keeping the subject centered rather than close to an edge avoids an awkward crop once the circular mask is applied.',
    },
    {
      id: 'pinterest-vs-others',
      question: 'Can I reuse an image sized for Instagram or Facebook as a Pinterest Pin?',
      answer: 'Not directly without recropping first. Most other platforms default to square or landscape shapes, while Pinterest\u2019s grid is built around tall, vertical images specifically, so a square or landscape original will need genuine recropping, not just a plain resize, to actually use the space well.',
    },
  ],

  'video-converter': [
    {
      id: 'why-mp4-not-available',
      question: 'Why did I ask for MP4 but get a WebM file?',
      answer: 'MP4 recording is supported in Chromium-based browsers like Chrome and Edge, but generally not in Firefox. This tool checks what your specific browser actually supports and honestly falls back to WebM with a clear note, rather than silently failing or pretending it delivered MP4.',
    },
    {
      id: 'mp4-vs-webm-difference',
      question: 'What\u2019s the actual difference between MP4 and WebM?',
      answer: 'MP4 typically wraps the H.264 codec, historically patent-encumbered (those patents have since expired) and now near-universally supported. WebM was built specifically as a royalty-free, open alternative around the VP8/VP9 codecs, which is why browsers default to it for native recording.',
    },
    {
      id: 'how-long-conversion-takes',
      question: 'Why does conversion take so long for a long video?',
      answer: 'This works by playing the video through in real time and capturing the output, similar to how a recording device can\u2019t work faster than the material it\u2019s recording plays. A longer video takes proportionally longer to convert.',
    },
    {
      id: 'audio-preserved',
      question: 'Does the audio track survive the conversion?',
      answer: 'Yes, the original audio track is captured and re-recorded along with the video, staying in sync with the newly converted output rather than being dropped or requiring a separate step.',
    },
  ],

  'audio-speed-changer': [
    {
      id: 'why-pitch-changes',
      question: 'Why does the audio sound higher or lower pitched after changing speed?',
      answer: 'Speed and pitch are changed together here, the same effect as playing a vinyl record faster or slower than intended. Keeping pitch independent of speed requires more complex processing (a phase vocoder) that this tool doesn\u2019t attempt, in favor of a simpler, honestly-described approach.',
    },
    {
      id: 'why-these-speed-presets',
      question: 'Why only these six speed options?',
      answer: 'They cover the range most people genuinely reach for in practice, from half speed up to double speed, while still letting you land on an exact, repeatable value each time rather than fine-tuning a slider back to the same setting over and over.',
    },
    {
      id: 'good-for-transcription',
      question: 'Is slowing audio down useful for transcription?',
      answer: 'Yes, slowing spoken audio down is a common, practical use, even with the pitch drop that comes with it, since intelligibility usually matters more than pitch accuracy for that particular task.',
    },
    {
      id: 'why-wav-output',
      question: 'Why does this download as a WAV file?',
      answer: 'WAV is an uncompressed format that every browser, phone, and audio program can open reliably without extra plugins, avoiding any additional quality loss from a second layer of lossy compression stacked on top of the speed change itself.',
    },
  ],

  'whatsapp-link-generator': [
    {
      id: 'link-not-working',
      question: 'Why doesn\u2019t my wa.me link work?',
      answer: 'The most common cause is the number format: WhatsApp expects the full international number as plain digits, no +, spaces, or leading zero. This tool cleans up whatever format is typed in automatically, so a manually-built link without that cleanup is the usual culprit.',
    },
    {
      id: 'is-this-official',
      question: 'Is Click-to-Chat an official WhatsApp feature?',
      answer: 'Yes, wa.me links are WhatsApp\u2019s own official Click-to-Chat system, built specifically for this purpose, not a third-party workaround.',
    },
    {
      id: 'need-saved-contact',
      question: 'Does the person need to have my number saved already?',
      answer: 'No, that\u2019s the specific point of a Click-to-Chat link: it opens a chat with that number directly, without either side needing to save the other as a contact first.',
    },
    {
      id: 'works-without-whatsapp-web',
      question: 'Does this work on both phones and desktop computers?',
      answer: 'Yes, on a phone with WhatsApp installed it opens the app directly, while on a desktop computer it opens WhatsApp Web instead, using whichever setup the visitor\u2019s own device already has in place.',
    },
  ],

  'whatsapp-text-formatter': [
    {
      id: 'why-not-showing-formatted',
      question: 'Why does my formatted text show asterisks instead of bold when I paste it elsewhere?',
      answer: 'This formatting only renders inside WhatsApp itself. Pasted into an email, document, or another app, the literal asterisks, underscores, or tildes show as plain characters, since those other places don\u2019t interpret WhatsApp\u2019s specific markup.',
    },
    {
      id: 'is-this-real-whatsapp-syntax',
      question: 'Is this really how WhatsApp formatting works, or is this a workaround?',
      answer: 'It\u2019s WhatsApp\u2019s own real, documented formatting syntax; the same characters anyone could type by hand directly into the WhatsApp app itself. This tool just adds them correctly around whatever text is selected.',
    },
    {
      id: 'multiple-formats-at-once',
      question: 'Can I combine bold and italic on the same text?',
      answer: 'Yes, apply one format, then select the same text again (now including the markup characters) and apply the second one, the same way it would work typing the characters manually.',
    },
    {
      id: 'works-on-mobile-whatsapp',
      question: 'Does this formatting work the same way on WhatsApp mobile and desktop?',
      answer: 'Yes, the markup characters are interpreted identically everywhere WhatsApp itself runs, whether that\u2019s a phone, WhatsApp Web, or the desktop app, since it\u2019s the same underlying formatting system across all of them.',
    },
  ],

  'whatsapp-qr-generator': [
    {
      id: 'qr-vs-link',
      question: 'What\u2019s the point of a QR code instead of just sharing the link?',
      answer: 'A link works well anywhere someone is already on a screen. A QR code is what actually works printed on a business card, storefront, or flyer, where there\u2019s nothing clickable, only something to scan with a phone camera.',
    },
    {
      id: 'does-scanning-need-whatsapp',
      question: 'Does the person scanning need WhatsApp already installed?',
      answer: 'Yes, scanning opens the link in WhatsApp, so the app needs to be installed on the device doing the scanning, the same requirement as clicking a wa.me link directly.',
    },
    {
      id: 'qr-message-included',
      question: 'Does the pre-filled message carry over into the QR code?',
      answer: 'Yes, the QR code encodes the complete wa.me link, message included, so scanning it opens a chat with that message already typed in, exactly like clicking the link would.',
    },
    {
      id: 'qr-expire',
      question: 'Does the QR code expire or stop working after a while?',
      answer: 'No, it encodes a fixed wa.me link tied to the phone number and message provided, so it keeps working indefinitely unless that number itself stops using WhatsApp.',
    },
  ],

  'whatsapp-status-resizer': [
    {
      id: 'why-black-bars',
      question: 'Why does my Status image show black bars on the sides?',
      answer: 'WhatsApp Status uses a 9:16 vertical format (1080\u00d71920). An image with a different aspect ratio gets shrunk to fit the width, with the empty space above and below filled by a solid color bar rather than the image stretching to cover it.',
    },
    {
      id: 'safe-zone-explained',
      question: 'What is the "safe zone" for a Status image?',
      answer: 'WhatsApp\u2019s interface overlays the sender\u2019s name near the top of the screen and a reply bar near the bottom, covering roughly the outer edges of the full frame. Keeping important text or a subject centered vertically avoids it landing under either overlay.',
    },
    {
      id: 'reuse-instagram-story',
      question: 'Can I use an Instagram Story image for WhatsApp Status?',
      answer: 'Yes, both use the same 1080\u00d71920, 9:16 vertical format, so an image designed for one works directly for the other without any redesign needed.',
    },
    {
      id: 'video-status-dimensions',
      question: 'Do WhatsApp Status videos use the same dimensions as images?',
      answer: 'Yes, video Status updates use that same 1080\u00d71920 vertical frame as well, though this particular tool specifically handles image resizing rather than video files.',
    },
  ],

  'remove-duplicate-lines': [
    { id: 'case-sensitive-dupes', question: 'Is duplicate detection case-sensitive?', answer: 'Yes, "Apple" and "apple" are treated as different lines, since a case-insensitive match risks discarding genuinely different data.' },
    { id: 'which-copy-kept', question: 'Which copy of a duplicate line gets kept?', answer: 'The first occurrence is kept; every later repeat of that exact line is removed.' },
  ],
  'text-reverser': [
    { id: 'reverses-words-or-chars', question: 'Does this reverse word order or character order?', answer: 'Character order \u2014 the entire string is reversed as a mirror image, not just the order of the words within it.' },
  ],
  'upside-down-text-generator': [
    { id: 'is-it-an-image', question: 'Is this an image or a font trick?', answer: 'Neither \u2014 it uses real Unicode characters that happen to resemble upside-down letters, so it works as plain text anywhere, not just in one specific app.' },
    { id: 'why-not-perfect', question: 'Why do some letters look slightly different upside down?', answer: 'Unicode doesn\u2019t have a true upside-down version of every letter, so the closest visual lookalike is used instead.' },
  ],
  'trim-whitespace': [
    { id: 'does-it-change-words', question: 'Does this change any of the actual words?', answer: 'No, only whitespace (spaces and blank lines) is affected; the words themselves are untouched.' },
  ],
  'slug-generator': [
    { id: 'what-is-a-slug', question: 'What exactly is a "slug"?', answer: 'The readable part of a URL, like "my-post-title" in example.com/blog/my-post-title \u2014 lowercase, hyphenated, no special characters.' },
    { id: 'why-hyphens-not-underscores', question: 'Why hyphens instead of underscores?', answer: 'Search engines have historically treated a hyphen as a word separator, while an underscore was, for a long period, treated as joining two words into one. Hyphens are also easier to read at a glance in a URL bar.' },
    { id: 'numbers-and-slugs', question: 'What happens to numbers and existing hyphens in my title?', answer: 'Numbers are kept as-is, and any existing hyphens are preserved rather than duplicated \u2014 only spaces and special characters get converted, and everything is lowercased for consistency.' },
    { id: 'slug-generator-privacy', question: 'Is the title I enter here sent anywhere?', answer: 'No \u2014 the slug is generated instantly in your browser. Nothing you type here is ever sent to a server.' },
  ],
  'line-counter': [
    { id: 'why-two-counts', question: 'Why show two different line counts?', answer: 'Total lines and non-empty lines tell different stories \u2014 a document that\u2019s mostly blank lines looks very different from one that\u2019s mostly content, even with the same total count.' },
  ],
  'text-to-binary': [
    { id: 'binary-encoding-used', question: 'What encoding does this use?', answer: 'Standard 8-bit character codes, the same ASCII-compatible encoding used throughout plain text and programming.' },
  ],
  'binary-to-text': [
    { id: 'binary-format-expected', question: 'What format should the binary input be in?', answer: '8-digit groups separated by spaces, matching the output of this site\u2019s Text to Binary tool.' },
  ],
  'find-and-replace': [
    { id: 'whole-word-explained', question: 'What does "whole word only" actually do?', answer: 'It prevents a short search term from matching inside a longer word \u2014 searching "cat" won\u2019t also change "catalog" when this is enabled.' },
  ],

  'percentage-calculator': [
    { id: 'mode-difference', question: 'What\u2019s the difference between "20% of 50" and "20 is what % of 50"?', answer: 'They answer different questions using the same two numbers \u2014 the first finds a portion of a value, the second finds what portion one value is of another. Mixing them up is a common source of errors.' },
    { id: 'negative-change', question: 'Why does percentage change show a negative number sometimes?', answer: 'A negative result means the value decreased \u2014 the sign carries real information about direction, not just magnitude.' },
    { id: 'percentage-point-vs-percent', question: 'Is a "percentage point" different from a "percent"?', answer: 'Yes, and mixing them up is a common source of confusion. Going from 20% to 25% is a 5 percentage point increase, but it\u2019s actually a 25% relative increase (5 is 25% of the original 20). Both are correct, they\u2019re just answering different questions.' },
    { id: 'percentage-calculator-privacy', question: 'Are the numbers I enter here saved or sent anywhere?', answer: 'No \u2014 every calculation happens instantly in your browser. Nothing you enter is ever sent to a server.' },
  ],
  'compound-interest-calculator': [
    { id: 'compounding-frequency-matters', question: 'Does compounding frequency really make a meaningful difference?', answer: 'Yes \u2014 the same rate compounded monthly produces a genuinely larger final amount than compounded annually, since each period\u2019s interest starts earning its own interest sooner.' },
    { id: 'simple-vs-compound', question: 'How is this different from simple interest?', answer: 'Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus all previously earned interest, which is why it grows faster over time.' },
    { id: 'why-early-years-slow', question: 'Why does growth look slow at first and then accelerate?', answer: 'Compounding needs time to build momentum \u2014 early on, the accumulated interest is still small relative to the principal, so its own contribution is modest. As earned interest itself grows large enough to generate meaningful additional interest, the growth curve visibly steepens.' },
    { id: 'compound-interest-privacy', question: 'Are my financial figures, like my savings amount, sent anywhere?', answer: 'No \u2014 every calculation happens instantly in your browser. The numbers you enter are never sent to or stored on a server.' },
  ],
  'loan-calculator': [
    { id: 'why-total-interest-so-high', question: 'Why is the total interest sometimes close to the loan amount itself?', answer: 'Over a long term like 30 years, interest accumulates on the remaining balance every month, and early payments go mostly toward interest rather than principal, which is why the total can add up to a substantial share of the original loan.' },
    { id: 'matches-bank-calculator', question: 'Will this match what my bank quotes me?', answer: 'It uses the same standard amortization formula lenders use for a fixed-rate loan, so the numbers should match closely, though a real quote may include fees this calculator doesn\u2019t account for.' },
    { id: 'what-not-included', question: 'What does this calculator not include?', answer: 'It calculates principal and interest only \u2014 it doesn\u2019t include property taxes, homeowners insurance, PMI, or loan origination fees, all of which a real mortgage payment typically includes on top of principal and interest.' },
    { id: 'loan-calculator-privacy', question: 'Are my loan details, like the amount or rate, sent anywhere?', answer: 'No \u2014 every calculation happens instantly in your browser. The numbers you enter, including your loan amount and rate, are never sent to or stored on a server.' },
  ],
  'profit-margin-calculator': [
    { id: 'margin-vs-markup', question: 'Is a 50% markup the same as a 50% profit margin?', answer: 'No \u2014 a 50% markup on cost actually works out to a 33.3% profit margin, since margin is calculated against revenue while markup is calculated against cost. They\u2019re genuinely different numbers.' },
    { id: 'what-is-good-margin', question: 'What\u2019s considered a "good" profit margin?', answer: 'It varies enormously by industry \u2014 a grocery store might operate on a 2-3% margin, while a software company might see 70-80%. There\u2019s no universal target; comparing your margin against others in your specific industry is more meaningful than a general benchmark.' },
    { id: 'profit-margin-privacy', question: 'Are my revenue and cost figures sent anywhere?', answer: 'No \u2014 every calculation happens instantly in your browser. Your business figures are never sent to or stored on a server.' },
  ],
  'age-calculator': [
    { id: 'why-not-just-subtract-years', question: 'Why not just subtract the birth year from the current year?', answer: 'That ignores whether the birthday has happened yet this year, which can be off by one. This calculator checks the actual month and day too, matching what a calendar would show.' },
    { id: 'leap-year-handling', question: 'Does this account for leap years correctly?', answer: 'Yes, it uses each specific month and year\u2019s actual number of days rather than a fixed 365-day assumption, so leap years don\u2019t cause any drift in the result.' },
    { id: 'born-feb-29', question: 'What happens if someone was born on February 29th (a leap day)?', answer: 'Their age still counts correctly in years \u2014 the calculator checks whether their birth month and day have occurred yet in the current year, and February 29th is treated as occurring on the last day of February in non-leap years for that comparison.' },
    { id: 'age-calculator-privacy', question: 'Are the dates I enter stored anywhere?', answer: 'No \u2014 the calculation happens instantly in your browser. The dates you enter are never sent to or stored on a server.' },
  ],

  'color-contrast-checker': [
    { id: 'aa-vs-aaa', question: 'What\u2019s the difference between AA and AAA compliance?', answer: 'AAA is a stricter standard requiring higher contrast (7:1 for normal text versus AA\u2019s 4.5:1). AA is the more commonly targeted baseline; AAA is recommended where possible but not always required.' },
    { id: 'large-text-different', question: 'Why does large text have a lower contrast requirement?', answer: 'Larger text is inherently easier to read at lower contrast, so WCAG sets a more lenient threshold (3:1 for AA) for text above a certain size and weight.' },
  ],
  'darken-lighten-color': [
    { id: 'how-shades-calculated', question: 'How are the shades actually calculated?', answer: 'Darker shades scale each RGB channel toward zero by the given percentage; lighter shades scale each channel toward 255 (white) by the same percentage.' },
  ],
  'random-color-generator': [
    { id: 'truly-random', question: 'Are the colors genuinely random, or biased toward certain hues?', answer: 'Each color is generated as a uniform random value across the full color space, so no particular hue or brightness range is favored over another.' },
  ],

  'css-formatter': [
    { id: 'changes-behavior', question: 'Does formatting change how the CSS actually works?', answer: 'No, only whitespace and indentation change. The selectors, properties, and values are completely untouched.' },
    { id: 'handles-media-queries', question: 'Does this handle nested rules like media queries correctly?', answer: 'Yes, nested blocks are indented one level deeper than their parent, matching standard formatting conventions.' },
  ],
  'css-minifier': [
    { id: 'reversible', question: 'Can I get the original formatting back after minifying?', answer: 'Not automatically \u2014 minification removes whitespace and comments permanently, though running the result through a CSS Formatter will make it readable again, just without the original comments.' },
    { id: 'how-much-smaller', question: 'How much smaller does minifying actually make a file?', answer: 'It varies by how the original was written, but a 20-40% reduction is typical for CSS with generous indentation and comments. Files that were already compact see a smaller gain.' },
    { id: 'css-minifier-privacy', question: 'Is my CSS code sent to a server to be minified?', answer: 'No \u2014 minification happens entirely in your browser. Your code is never sent to or stored on a server.' },
  ],
  'html-formatter': [
    { id: 'void-elements', question: 'How does this handle tags like <img> and <br> that don\u2019t have a closing tag?', answer: 'They\u2019re recognized as void elements and formatted correctly without expecting or adding an unnecessary closing tag.' },
  ],
  'html-minifier': [
    { id: 'html-minify-safe', question: 'Is it safe to minify HTML that has inline JavaScript or CSS?', answer: 'This tool focuses on whitespace and comments in the HTML structure itself; content inside <script> and <style> tags should generally be minified separately with the dedicated JS or CSS tools for the safest result.' },
    { id: 'html-whitespace-matters', question: 'Can removing whitespace ever break how a page displays?', answer: 'In rare cases \u2014 CSS\u2019s white-space: pre or similar properties can make whitespace inside specific elements visually significant. For ordinary HTML content this is very uncommon, but it\u2019s worth previewing the minified result if a page relies on preserved whitespace anywhere.' },
    { id: 'html-minifier-privacy', question: 'Is my HTML code sent to a server?', answer: 'No \u2014 minification happens entirely in your browser. Your code is never sent to or stored on a server.' },
  ],
  'xml-formatter': [
    { id: 'xml-vs-html-formatting', question: 'Why use this instead of the HTML Formatter for XML?', answer: 'XML doesn\u2019t have HTML\u2019s built-in list of self-closing tags, so this formatter only treats an element as self-closing when the source explicitly writes it that way, matching XML\u2019s stricter rules.' },
  ],
  'xml-minifier': [
    { id: 'xml-minify-data-safe', question: 'Will minifying change any of my actual data values?', answer: 'No, only whitespace between elements and comments are removed. Every element and value parses identically to the original.' },
  ],
  'javascript-minifier': [
    { id: 'js-minify-url-safe', question: 'Will this break a URL or string that contains //?', answer: 'No \u2014 this tool tracks whether it\u2019s currently inside a string before deciding whether // starts a real comment, so a URL like http://example.com inside a string is always preserved intact.' },
    { id: 'js-minify-vs-terser', question: 'Does this rename variables or restructure code like a full build-tool minifier?', answer: 'No, this handles comment and whitespace removal safely, but doesn\u2019t rename variables or restructure logic, since that requires fully parsing the code\u2019s syntax tree rather than just tracking string boundaries.' },
    { id: 'js-minifier-privacy', question: 'Is my JavaScript code sent to a server?', answer: 'No \u2014 minification happens entirely in your browser. Your code, including anything proprietary, is never sent to or stored on a server.' },
  ],

  'html-entities-encoder': [
    { id: 'why-encode-needed', question: 'Why can\u2019t I just type < directly into HTML?', answer: 'Because HTML interprets < as the start of a tag, not as a visible character. Encoding it as &lt; tells the browser to display the literal character instead of trying to parse it as markup.' },
  ],
  'html-entities-decoder': [
    { id: 'which-entities-supported', question: 'Which entities does this decode?', answer: '&amp;, &lt;, &gt;, &quot;, &#39;, and &apos; \u2014 the common entities corresponding to the characters HTML treats as meaningful.' },
  ],
  'jwt-decoder': [
    { id: 'is-jwt-encrypted', question: 'Is the information inside a JWT encrypted?', answer: 'No, by default it\u2019s only encoded (base64url), not encrypted. Anyone holding the token can read its header and payload without any secret key, which is exactly why this tool can decode it without needing one.' },
    { id: 'why-no-verify', question: 'Why doesn\u2019t this verify the signature?', answer: 'Verifying requires the issuer\u2019s secret or public key, which this tool never has. A decoder answers what the token claims; verifying whether those claims are trustworthy is a genuinely different task requiring information only the issuer has.' },
  ],
  'md5-hash-generator': [
    { id: 'md5-safe-for-passwords', question: 'Is MD5 safe to use for storing passwords?', answer: 'No \u2014 MD5 has been cryptographically broken since 2004 and should never be used for passwords or anything security-sensitive. It remains fine for non-security uses like file integrity checks or cache-busting identifiers.' },
  ],
  'sha1-hash-generator': [
    { id: 'sha1-still-used', question: 'Is SHA-1 still safe to use?', answer: 'Not for security-critical purposes \u2014 a practical collision attack was demonstrated in 2017. It still appears in legacy systems and older Git repositories, which is the realistic context this tool is most useful for today.' },
  ],
  'sha256-hash-generator': [
    { id: 'sha256-vs-md5', question: 'Why use SHA-256 instead of MD5?', answer: 'SHA-256 is currently considered cryptographically secure with no known practical collision attack, unlike MD5, which has been broken since 2004. SHA-256 is the standard choice whenever a genuinely secure hash is needed.' },
  ],
  'sha512-hash-generator': [
    { id: 'sha512-vs-sha256', question: 'Should I use SHA-512 or SHA-256?', answer: 'Both are currently secure. SHA-512 is often faster on modern 64-bit hardware and produces a longer hash; SHA-256 is more commonly expected by existing systems. Either is a safe choice unless something specific requires one over the other.' },
  ],

  'json-to-csv': [
    { id: 'nested-objects-csv', question: 'What happens to nested objects when converting to CSV?', answer: 'Since CSV can\u2019t represent nested structure, a nested object or array within a field is converted to its JSON text representation inside that cell, rather than being flattened into separate columns.' },
  ],
  'csv-to-json': [
    { id: 'why-not-split-comma', question: 'Why not just split each line on commas?', answer: 'Because a field can legitimately contain a comma inside quotes, like an address or "Smith, Jr." A naive split would break on that comma; this tool uses a real, quote-aware parser instead.' },
    { id: 'first-row-headers', question: 'Does the first row have to be column headers?', answer: 'Yes \u2014 the first row is treated as field names, which become the keys in each resulting JSON object. If your CSV doesn\u2019t have a header row, add one before converting.' },
    { id: 'csv-to-json-privacy', question: 'Is my CSV data uploaded anywhere?', answer: 'No \u2014 parsing and conversion happen entirely in your browser. Your data is never sent to or stored on a server.' },
  ],
  'xml-to-json': [
    { id: 'how-arrays-detected', question: 'How does this decide what becomes a JSON array?', answer: 'Any XML element that appears more than once at the same level under its parent becomes an array in the JSON output; a single occurrence stays a plain object.' },
  ],
  'json-to-xml': [
    { id: 'special-chars-xml', question: 'What happens to characters like < or & in my data?', answer: 'They\u2019re automatically escaped (as &lt; and &amp;) so the resulting XML stays well-formed and doesn\u2019t break on a value that happens to contain a markup-like character.' },
  ],
  'yaml-to-json': [
    { id: 'yaml-scope-limit', question: 'Does this handle every YAML feature?', answer: 'It covers the common subset used by most real config files \u2014 nested mappings, numbers, booleans, and strings \u2014 but not the full spec\u2019s more advanced features like anchors, references, or inline flow sequences.' },
    { id: 'yaml-indentation-sensitive', question: 'Why does indentation matter so much in YAML?', answer: 'YAML uses indentation itself to represent nesting, rather than braces or brackets like JSON does \u2014 so inconsistent indentation (mixing tabs and spaces, or misaligned levels) is a genuine structural error, not just a style issue, and will produce an incorrect conversion.' },
    { id: 'yaml-to-json-privacy', question: 'Is my YAML data uploaded anywhere?', answer: 'No \u2014 parsing and conversion happen entirely in your browser. Your data, including config files that may contain sensitive settings, is never sent to a server.' },
  ],
  'json-to-yaml': [
    { id: 'why-yaml-over-json', question: 'Why would I want YAML instead of JSON?', answer: 'YAML is often considered more readable for configuration files specifically, since it uses indentation instead of brackets and quotes for structure.' },
  ],
  'csv-to-xml': [
    { id: 'csv-xml-row-structure', question: 'How is each CSV row represented in the XML output?', answer: 'Each row becomes its own XML element, with the column values as that element\u2019s child elements, named after the CSV headers.' },
  ],
  'xml-to-csv': [
    { id: 'xml-csv-best-input', question: 'What kind of XML works best with this tool?', answer: 'XML that already represents a list of similar records, like multiple <row> or <item> elements, since CSV can only represent flat, tabular data.' },
  ],
  'excel-to-json': [
    { id: 'which-sheet-used', question: 'Which sheet does this convert if my file has multiple sheets?', answer: 'The first sheet in the workbook. If you need a different sheet, reordering it to be first in Excel before uploading will get it converted instead.' },
  ],
  'csv-to-excel': [
    { id: 'is-this-a-real-xlsx', question: 'Is the downloaded file a genuine Excel file, not just a renamed CSV?', answer: 'Yes, it\u2019s a real .xlsx file built with proper spreadsheet formatting, not a CSV file that\u2019s simply been renamed with an Excel extension.' },
  ],

  'random-name-picker': [
    { id: 'is-selection-fair', question: 'Does the order I type names in affect the odds?', answer: 'No, every name has an equal chance of being picked regardless of where it appears in the list.' },
  ],
  'random-word-generator': [
    { id: 'word-source', question: 'Where do the words come from?', answer: 'A curated set of everyday and evocative vocabulary, giving varied results rather than the same handful of words repeating constantly.' },
  ],
  'random-number-generator': [
    { id: 'bounds-inclusive', question: 'Are the minimum and maximum values included as possible results?', answer: 'Yes, both bounds are inclusive \u2014 setting a range of 1 to 10 means both 1 and 10 can genuinely appear as results.' },
  ],
  'coin-flipper': [
    { id: 'genuinely-random-coin', question: 'Is this actually 50/50, or is it biased somehow?', answer: 'It\u2019s a genuine, independent 50/50 chance on every flip, verified across thousands of simulated flips to land in an unbiased distribution.' },
  ],
  'dice-roller': [
    { id: 'dice-independent', question: 'If I roll multiple dice, does one result affect the others?', answer: 'No, each die is rolled completely independently, exactly like rolling separate physical dice.' },
  ],
  'choice-wheel-spinner': [
    { id: 'wheel-winner-accuracy', question: 'How do you know the declared winner actually matches where the wheel stopped?', answer: 'The winning segment is calculated directly from the wheel\u2019s final rotation angle, tested against several rotation scenarios including landing exactly on a boundary and completing multiple full spins, to confirm the math always matches the visual result.' },
  ],
  'digital-signature-generator': [
    { id: 'works-on-mobile', question: 'Can I draw a signature on my phone?', answer: 'Yes, the drawing area supports touch input directly, so it works the same way on a phone or tablet screen as it does with a mouse.' },
  ],

  'aes-encryption': [
    { id: 'passphrase-vs-key', question: 'Why isn\u2019t my passphrase used directly as the encryption key?', answer: 'It\u2019s run through PBKDF2 100,000 times with a random salt first, which makes brute-forcing a weak passphrase meaningfully harder than using it directly as the key.' },
    { id: 'same-text-different-output', question: 'Why does encrypting the same text twice give different results?', answer: 'Each encryption uses a fresh random salt and initialization vector, a genuine security property that prevents patterns from showing up across multiple encryptions of similar data.' },
  ],
  'htpasswd-generator': [
    { id: 'sha-vs-bcrypt', question: 'Is the SHA format the strongest option for htpasswd?', answer: 'No, Apache also supports bcrypt, which is considered stronger for new setups. The SHA format here remains useful for simplicity and legacy compatibility.' },
  ],
  'rsa-key-pair-generator': [
    { id: 'key-pair-persistence', question: 'Will my key pair still be here if I refresh the page?', answer: 'No, it exists only in this page\u2019s memory. Refreshing or closing the tab loses it permanently unless you\u2019ve already copied and saved both keys somewhere secure.' },
    { id: 'why-2048-bits', question: 'Why 2048 bits specifically?', answer: 'It\u2019s the current, genuinely recommended minimum key size for RSA \u2014 shorter keys are considered breakable with enough computing resources.' },
  ],

  'subnet-calculator': [
    { id: 'network-vs-broadcast', question: 'Can I assign a device the network or broadcast address?', answer: 'No, both are reserved \u2014 the network address identifies the subnet itself, and the broadcast address is used to reach every device on it at once. Neither should be assigned to an individual device.' },
    { id: 'cidr-explained', question: 'What does the /24 in an address like 192.168.1.0/24 mean?', answer: 'It means the first 24 bits of the address are the network portion, leaving 8 bits for host addresses \u2014 256 total addresses, 254 of them usable.' },
    { id: 'why-254-not-256', question: 'Why does a /24 subnet have 254 usable hosts instead of 256?', answer: 'Out of the 256 total addresses, one is reserved as the network address and one as the broadcast address, neither of which can be assigned to a device \u2014 leaving 254 genuinely usable addresses.' },
    { id: 'subnet-calculator-privacy', question: 'Is the IP address I enter sent anywhere?', answer: 'No \u2014 every calculation happens instantly in your browser using plain binary math. Nothing you enter is ever sent to a server.' },
  ],
  'my-ip-address': [
    { id: 'public-vs-local-ip', question: 'Is this the same as the IP address shown in my computer\u2019s network settings?', answer: 'No, your computer\u2019s network settings usually show a private, local address only visible on your own network. This tool shows your public IP, the address visible to the outside internet.' },
  ],
  'dns-lookup': [
    { id: 'why-some-types-empty', question: 'Why do some record types show nothing?', answer: 'Not every domain has every record type \u2014 a domain without email, for instance, simply won\u2019t have MX records. An empty result for one type isn\u2019t an error, just a genuinely accurate reflection of what that domain has configured.' },
  ],
  'http-header-checker': [
    { id: 'head-vs-get', question: 'Why does this sometimes use a GET request instead of HEAD?', answer: 'A HEAD request is tried first since it\u2019s lighter, but some servers don\u2019t handle HEAD requests correctly, so this falls back to a full GET request automatically in that case.' },
  ],
  'url-redirect-checker': [
    { id: 'max-hops', question: 'Is there a limit to how many redirects this will follow?', answer: 'Yes, up to 10 hops, which comfortably covers virtually any real-world redirect chain while still protecting against a genuinely broken, infinitely-looping redirect.' },
  ],

  'barcode-generator': [
    { id: 'will-it-actually-scan', question: 'Will this barcode actually scan with a real scanner?', answer: 'Yes, it follows the real EAN-13/UPC-A bar-width specification exactly, verified against genuine reference barcodes, not just a striped image that looks like a barcode.' },
    { id: 'why-checksum-automatic', question: 'Why do I only enter 11 or 12 digits instead of the full code?', answer: 'The final digit is a checksum calculated from the others using each format\u2019s defined formula, the same way it would be assigned when a real barcode is issued, so it\u2019s calculated for you rather than needing to be supplied.' },
  ],

  'barcode-scanner': [
    { id: 'why-not-working', question: 'Why doesn\u2019t this work in my browser?', answer: 'It relies on the BarcodeDetector API, currently available in Chrome, Edge, and other Chromium-based browsers, but not yet in Firefox or Safari. The tool tells you directly if your browser doesn\u2019t support it.' },
    { id: 'camera-privacy', question: 'Is my camera video sent anywhere?', answer: 'No, detection happens entirely on your device using your browser\u2019s own capability. No video or image is ever uploaded.' },
  ],
  'qr-code-scanner': [
    { id: 'what-can-qr-contain', question: 'What kinds of content can a QR code contain?', answer: 'Far more than a typical barcode \u2014 URLs, plain text, contact details, WiFi credentials, and more. This tool decodes whatever is actually encoded and shows it as plain text.' },
    { id: 'qr-browser-support', question: 'Does this work on all browsers?', answer: 'It relies on the BarcodeDetector API, currently available in Chrome, Edge, and other Chromium-based browsers, but not yet in Firefox or Safari.' },
  ],

  'svg-converter': [
    { id: 'why-choose-size', question: 'Why do I need to pick a size instead of it just using the SVG\u2019s own size?', answer: 'An SVG is scalable by design and often doesn\u2019t have a meaningful fixed size of its own \u2014 choosing the size explicitly gives a predictable, correct result instead of guessing.' },
    { id: 'ico-real-multi-res', question: 'Is the ICO file a real multi-resolution icon, or just one image renamed?', answer: 'It\u2019s a genuine multi-resolution .ico file bundling 16\u00d716, 32\u00d732, and 48\u00d748 versions together, the standard structure browsers and Windows actually expect.' },
    { id: 'svg-conversion-fails', question: 'Why did my SVG fail to convert?', answer: 'Some SVG files need explicit width and height attributes on the root <svg> element (not just a viewBox) to render reliably \u2014 adding those to the file usually resolves it.' },
  ],

  'srt-to-vtt': [
    { id: 'why-comma-vs-period', question: 'Why does the timestamp format matter?', answer: 'VTT requires a period before milliseconds (00:00:01.000); SRT uses a comma. A browser won\u2019t recognize a file with the wrong separator as valid VTT.' },
  ],
  'sql-to-markdown-table': [
    { id: 'multiple-values-rows', question: 'Does this handle an INSERT with multiple rows?', answer: 'Yes, every VALUES (...) group in the statement becomes its own row in the resulting table.' },
  ],
  'json-to-html-table': [
    { id: 'missing-keys-html-table', question: 'What happens if some objects are missing a key others have?', answer: 'That cell is simply left empty in the table \u2014 every unique key across all objects still gets its own column.' },
  ],
  'yaml-to-toml': [
    { id: 'toml-scope-limit', question: 'Does this handle every TOML feature?', answer: 'It covers the common config-file case \u2014 flat keys and nested tables \u2014 not the full spec\u2019s more advanced features like arrays of tables or inline tables.' },
  ],
  'robots-txt-validator': [
    { id: 'silent-failures', question: 'Why does a robots.txt mistake matter if there\u2019s no error message?', answer: 'Search engines interpret the file literally and don\u2019t report errors back to you \u2014 a malformed rule is often just silently ignored, which can mean a page you meant to block or allow quietly does the opposite with no warning anywhere.' },
  ],
  'json-string-escape': [
    { id: 'which-characters-escaped', question: 'Which characters actually get escaped?', answer: 'The standard JSON escape set: quotes, backslashes, newlines, tabs, and other control characters that aren\u2019t allowed literally inside a JSON string.' },
  ],
  'anagram-name-shuffler': [
    { id: 'spaces-in-shuffle', question: 'What happens to spaces in a full name?', answer: 'They\u2019re removed before shuffling, so a full name scrambles as one continuous set of letters rather than shuffling separately within each word.' },
  ],
  'sarcastic-text-alternator': [
    { id: 'why-called-sarcastic', question: 'Why is this called "sarcastic" text?', answer: 'aLtErNaTiNg CaPs is a widely recognized meme format (popularized by the "mocking SpongeBob" meme) used specifically to convey sarcasm or mockery in text.' },
  ],

  'tailwind-grid-generator': [
    { id: 'live-preview-accuracy', question: 'Does the live preview match what I\u2019ll actually get with the copied classes?', answer: 'Yes \u2014 the copied classes are real, standard Tailwind utilities that produce the same layout shown in the preview once pasted into a project where Tailwind can detect them.' },
  ],
  'glassmorphism-builder': [
    { id: 'safari-support', question: 'Will this work in Safari?', answer: 'Yes \u2014 the generated CSS includes the -webkit-backdrop-filter prefix Safari still requires alongside the standard backdrop-filter property.' },
  ],
  'data-uri-encoder': [
    { id: 'when-to-use-data-uri', question: 'When does it actually make sense to use a data URI instead of a normal image file?', answer: 'Mainly for small, frequently-reused images like icons, where avoiding an extra HTTP request outweighs the downside of a larger file and losing independent browser caching for that image.' },
  ],
  'base64-to-image': [
    { id: 'bare-string-format', question: 'What format does this assume if I paste a bare base64 string without a data URI prefix?', answer: 'PNG. If your data is a different format, pasting the full data URI (starting with data:image/...) ensures it\u2019s decoded correctly.' },
  ],
  'buzzword-bingo': [
    { id: 'unique-cards', question: 'Can two people get the same card?', answer: 'It\u2019s extremely unlikely \u2014 each card draws 24 unique buzzwords at random from the word bank, so the odds of an identical card are very low.' },
  ],
  'hex-code-scroller': [
    { id: 'scroller-vs-generator', question: 'How is this different from the Color Palette Generator?', answer: 'This is an open-ended scrolling feed of unrelated random colors; the Color Palette Generator builds a coordinated set of colors from one base color you choose.' },
  ],
  'lorem-ipsum-fantasy': [
    { id: 'fantasy-vs-classic-lorem', question: 'How is this different from regular Lorem Ipsum?', answer: 'It works the same way structurally (random filler text for length, not meaning) but draws from fantasy-genre vocabulary instead of pseudo-Latin, which fits a fantasy-themed design better.' },
  ],
  'dumb-phone-formatter': [
    { id: 'why-strip-accents', question: 'Why does this remove accented characters?', answer: 'Many older feature phones can\u2019t display accented characters or emoji correctly in a contact name, so they\u2019re converted to their closest plain-ASCII equivalent to display reliably.' },
  ],

  'morse-audio-player': [
    { id: 'why-timing-matters', question: 'Why does the exact timing matter?', answer: 'Morse code\u2019s standard timing ratios (a dash is 3\u00d7 a dot\u2019s length, with specific gaps between letters and words) are what make it genuinely decodable by ear \u2014 an approximate rhythm wouldn\u2019t actually read as real Morse code.' },
  ],
  'morse-tap-transmitter': [
    { id: 'tap-timing-threshold', question: 'How does it decide if a tap is a dot or a dash?', answer: 'By how long you hold it \u2014 a quick tap under about a quarter second registers as a dot, anything held longer registers as a dash.' },
  ],
  'drum-pad': [
    { id: 'why-no-samples', question: 'Why doesn\u2019t this use real drum samples?', answer: 'Every sound is synthesized directly with the Web Audio API using standard techniques (a pitch-dropping oscillator for the kick, filtered noise for the snare and hi-hat), so there\u2019s nothing to download before you can start playing.' },
  ],
  'soundboard': [
    { id: 'soundboard-vs-drumpad', question: 'How is this different from the Drum Pad?', answer: 'The Drum Pad focuses on four core percussion sounds for rhythm; this Soundboard has six broader sound effects (buzzer, bell, whoosh, victory chime, and more) for reactions and cues.' },
  ],
  'white-noise-mixer': [
    { id: 'noise-colors-really-different', question: 'Are white, pink, and brown noise actually different, or just relabeled?', answer: 'Genuinely different \u2014 they\u2019re generated with different algorithms and verified to have measurably different statistical characteristics, not the same static under three names.' },
  ],
  'tts-pitcher': [
    { id: 'voice-varies-by-browser', question: 'Why does the voice sound different than I expected?', answer: 'This uses your browser\u2019s own built-in text-to-speech engine, so the available voice and its baseline sound depend on your browser and operating system \u2014 the pitch and rate controls adjust on top of whichever voice that is.' },
  ],

  'exif-scrubber': [
    { id: 'how-verified-removal', question: 'How do you know the metadata is actually removed, not just hidden?', answer: 'This was tested end-to-end with a real photo containing genuine EXIF data \u2014 confirmed the metadata was completely absent from the output file, not just invisible in a preview.' },
  ],
  'csv-filter': [
    { id: 'filter-case-sensitive', question: 'Is the filter match case-sensitive?', answer: 'No, it matches regardless of case, so filtering for "nyc" will match "NYC", "Nyc", or "nyc" in the data.' },
  ],
  'address-cleaner': [
    { id: 'international-addresses', question: 'Does this work for international addresses?', answer: 'It\u2019s built around US shipping conventions and USPS-style abbreviations, so it\u2019s most accurate for US addresses specifically.' },
  ],
  'ascii-art': [
    { id: 'how-brightness-verified', question: 'How do you know the brightness mapping is actually correct?', answer: 'It was checked against a real test image with known content \u2014 confirmed dark areas genuinely map to dense characters like @ and light areas map to sparse characters or blank space, not just visually estimated.' },
  ],

  'bubble-wrap-popper': [
    { id: 'can-bubbles-repop', question: 'Can I pop the same bubble twice?', answer: 'No, once a bubble is popped it stays popped, just like real bubble wrap \u2014 click Reset Sheet to start over with a fresh one.' },
  ],
  'pixel-art-pad': [
    { id: 'grid-size', question: 'How big is the drawing grid?', answer: '16\u00d716 pixels, exported at a larger scale so each pixel becomes a clean, crisp block of color in the downloaded PNG.' },
  ],
  '8bit-character-creator': [
    { id: 'why-symmetric', question: 'Why does this only draw symmetric characters?', answer: 'Most character sprites are naturally symmetric (faces, bodies), so mirroring lets you draw a full character by only painting half of it \u2014 for a fully asymmetric design, the free-draw Pixel Art Pad is the better fit.' },
  ],
  'emoji-mashup': [
    { id: 'is-result-a-real-image', question: 'Is the downloaded result a real image, or just two emoji displayed together?', answer: 'A genuine flattened PNG image \u2014 both emoji are drawn directly onto a canvas and combined into one file, not just positioned next to each other as text.' },
  ],

  'prompt-roulette': [
    { id: 'how-many-combinations', question: 'How many different prompts can this generate?', answer: 'Subjects and styles combine independently, so the number of genuinely distinct combinations is well beyond either list\u2019s size on its own.' },
  ],
  'trivia-flashcards': [
    { id: 'trivia-accuracy', question: 'Are the trivia facts actually accurate?', answer: 'Each one was checked before being included \u2014 these are general knowledge questions with clear, verifiable answers, not ambiguous or debatable trivia.' },
  ],
  'tarot-reader': [
    { id: 'is-tarot-real-prediction', question: 'Does this actually predict anything?', answer: 'No \u2014 a random card draw has no genuine predictive power. This is offered purely for entertainment and reflection, not as real guidance for decisions.' },
  ],
  'meme-overlay': [
    { id: 'text-auto-uppercase', question: 'Why does my text automatically become uppercase?', answer: 'That\u2019s the classic meme text convention this tool matches \u2014 bold, uppercase text with a black outline is the recognizable format the genre is known for.' },
  ],
  'fake-loading-screen': [
    { id: 'does-it-actually-load-anything', question: 'Does this actually load or install anything?', answer: 'No, it\u2019s purely a visual animation for fun or as a prank \u2014 nothing real happens in the background.' },
  ],
  'habit-streak-counter': [
    { id: 'streak-logic-accuracy', question: 'How does the streak count handle today not being checked in yet?', answer: 'It correctly continues your streak from yesterday if today simply hasn\u2019t been checked in yet, but resets if there\u2019s a genuine gap of a missed day \u2014 tested against exactly these scenarios before being relied on.' },
    { id: 'where-is-data-stored', question: 'Where is my habit data stored?', answer: 'Only in this browser\u2019s local storage \u2014 never sent to a server, and not synced across devices. Clearing your browser data will remove it.' },
  ],
  'rickroll-generator': [
    { id: 'can-i-change-destination', question: 'Can I make this link to something else instead?', answer: 'No, and that\u2019s intentional \u2014 this tool only ever produces a link to the one well-known video, since a tool that could disguise a link as going anywhere else would be functionally a phishing technique.' },
  ],
  'fake-error-designer': [
    { id: 'could-this-fool-someone', question: 'Could this be used to convince someone their computer is actually broken?', answer: 'It\u2019s deliberately styled as an obvious joke card rather than a realistic system dialog, specifically to avoid that \u2014 it\u2019s meant to look clearly funny, not convincingly real.' },
  ],
}
