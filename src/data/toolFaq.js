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
      answer: 'It varies by image, but for photographic content the difference can be dramatic \u2014 a lossless PNG is often several times larger than a JPG of the same photo at a quality setting where the difference is barely visible.',
    },
    {
      id: 'best-quality-setting',
      question: 'What quality setting should I use?',
      answer: 'Around 80-85% is a common sweet spot \u2014 a real, meaningful size reduction with minimal visible quality loss for most photos. Go higher if the image will be printed or closely inspected, lower if file size matters more than visual fidelity.',
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
  ],
  'image-resizer': [
    {
      id: 'aspect-ratio',
      question: 'Will resizing distort my image?',
      answer:
        'Not if you keep "Lock aspect ratio" enabled — it scales width and height together to avoid stretching.',
    },
    {
      id: 'upscaling',
      question: 'Can I make an image larger?',
      answer:
        'Yes, though enlarging an image beyond its original size can make it look softer since no new detail is being added \u2014 the tool has to interpolate what the extra pixels probably look like, not recover detail that was never captured.',
    },
    {
      id: 'quality-during-resize',
      question: 'Does resizing reduce image quality?',
      answer: 'Resizing down uses high-quality smoothing and stays visually sharp. Resizing up (enlarging) is where quality softness becomes noticeable, since interpolation can only estimate new pixels, not add genuine detail.',
    },
    {
      id: 'percentage-vs-exact',
      question: 'Should I resize by percentage or exact dimensions?',
      answer: 'Use percentage scaling when you just want a proportionally smaller or larger version. Use exact width and height when a specific platform or form requires precise pixel dimensions.',
    },
    {
      id: 'batch-resize',
      question: 'Can I resize several images to the same size at once?',
      answer: 'Yes \u2014 upload up to 10 images and apply the same width, height, or percentage scale to all of them in one pass, then download the results individually or as a ZIP.',
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
      answer: 'Because support for reading that metadata is inconsistent across apps and platforms. A genuine pixel rotation, like this tool performs, displays correctly everywhere regardless of whether the software viewing it bothers to read orientation metadata at all.',
    },
    {
      id: 'rotation-angles',
      question: 'Can I rotate by an angle other than 90\u00b0 increments?',
      answer: 'This tool supports 90\u00b0, 180\u00b0, and 270\u00b0 rotations specifically \u2014 the common cases for fixing orientation. For a small, precise angle correction (like straightening a slightly tilted scan), a dedicated image editor is a better fit.',
    },
    {
      id: 'batch-rotate',
      question: 'Can I rotate several images the same way at once?',
      answer: 'Yes \u2014 upload up to 10 images and apply the same rotation to all of them in one pass, then download the results individually or as a ZIP.',
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
      answer: 'Some forms, portals, and email systems specifically require a PDF upload rather than a raw image file, even when the content is just a single photo. This tool gets you a genuine, standards-compliant PDF without needing separate document software.',
    },
    {
      id: 'file-size-pdf',
      question: 'Will the PDF be larger than the original JPG?',
      answer: 'Slightly \u2014 a PDF wrapper adds a small amount of overhead beyond the raw image data, but the difference is minor since the image itself isn\u2019t re-compressed.',
    },
  ],
  'png-to-pdf': [
    {
      id: 'transparency',
      question: 'What happens to transparent areas of my PNG?',
      answer: 'The PNG\u2019s transparency data is embedded into the PDF as-is, not discarded \u2014 but since a PDF page is a solid surface, transparent areas typically render against the page\u2019s own background, usually white in most viewers.',
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
      answer: 'Sizing the page to your image\u2019s exact dimensions avoids any cropping, padding, or scaling \u2014 what you uploaded is exactly what appears. The tradeoff is that printing may need a manual scale adjustment, since it\u2019s not a standard paper size.',
    },
    {
      id: 'quality-preserved-png',
      question: 'Does converting to PDF reduce my PNG\u2019s quality?',
      answer: 'No \u2014 the original PNG data is embedded into the PDF as-is, not re-compressed or re-encoded, so the image quality is preserved exactly.',
    },
    {
      id: 'file-size-pdf-png',
      question: 'Will the PDF be larger than the original PNG?',
      answer: 'Slightly \u2014 a PDF wrapper adds a small amount of overhead beyond the raw image data, but the difference is minor since the image itself isn\u2019t re-compressed.',
    },
  ],
  'merge-pdf': [
    {
      id: 'order',
      question: 'Can I control the order of the merged pages?',
      answer: 'Yes \u2014 use the up/down arrows next to each file to reorder them before merging. Pages are combined in the order shown.',
    },
    {
      id: 'limit',
      question: 'Is there a limit to how many PDFs I can merge?',
      answer: 'No fixed limit \u2014 add as many as you need, though very large combined files will naturally take longer to process.',
    },
    {
      id: 'text-preserved',
      question: 'Will the merged PDF still have selectable text?',
      answer: 'Yes \u2014 pages are copied faithfully, not rendered as images, so any selectable or searchable text in the source files stays exactly that way in the merged result.',
    },
    {
      id: 'quality-loss-merge',
      question: 'Does merging reduce the quality of my PDFs?',
      answer: 'No \u2014 since pages are copied directly rather than re-rendered, there\u2019s no quality loss or re-compression involved in the merge process.',
    },
    {
      id: 'different-page-sizes',
      question: 'Can I merge PDFs that have different page sizes?',
      answer: 'Yes \u2014 each page keeps its own original dimensions in the merged document. The result may have pages of varying sizes if the source files did, which is normal and doesn\u2019t cause any issue when viewing or printing.',
    },
    {
      id: 'password-protected',
      question: 'Can I merge a password-protected PDF?',
      answer: 'A PDF that requires a password to open can\u2019t be read and merged without first removing that protection, since the file\u2019s content is encrypted until unlocked.',
    },
  ],
  'split-pdf': [
    {
      id: 'range-format',
      question: 'How do I specify which pages to extract?',
      answer: 'Use page numbers and ranges separated by commas, like "1-3, 5, 8-10". Pages are 1-indexed \u2014 page 1 is the first page.',
    },
    {
      id: 'original-order',
      question: 'Do the extracted pages keep their original content?',
      answer: 'Yes \u2014 pages are copied exactly as they appear in the source PDF, not re-rendered or flattened.',
    },
    {
      id: 'duplicate-pages',
      question: 'What happens if I list the same page number twice?',
      answer: 'It\u2019s only included once in the result \u2014 duplicate page numbers across your entered ranges are automatically deduplicated, so you don\u2019t end up with the same page twice in the output.',
    },
    {
      id: 'out-of-order-input',
      question: 'What if I type the ranges out of order, like "5, 1-3"?',
      answer: 'The extracted pages always come out in ascending numeric order in the final document, regardless of what order you typed the ranges in \u2014 "5, 1-3" and "1-3, 5" produce the identical result.',
    },
    {
      id: 'invalid-page-number',
      question: 'What happens if I enter a page number that doesn\u2019t exist in the PDF?',
      answer: 'Page numbers outside the document\u2019s actual range are simply ignored rather than causing an error \u2014 the tool extracts whatever valid pages you specified and disregards the rest.',
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
  ],

  'json-formatter': [
    {
      id: 'minify-vs-format',
      question: 'What\u2019s the difference between Format and Minify?',
      answer: 'Format adds indentation and line breaks for readability; Minify strips all unnecessary whitespace to make the file as small as possible \u2014 the underlying data is identical either way, only the whitespace changes.',
    },
    {
      id: 'why-apis-minify',
      question: 'Why do APIs usually return minified JSON?',
      answer: 'Whitespace adds size with no functional benefit to a machine parsing the response, so stripping it saves real (if often small) bandwidth. That\u2019s exactly why a formatter is useful for a human reading that same response \u2014 it adds back the readability a machine never needed.',
    },
    {
      id: 'does-formatting-change-data',
      question: 'Does formatting or minifying change my actual data?',
      answer: 'No \u2014 only whitespace changes. The keys, values, and structure of your JSON stay exactly the same; formatting is purely cosmetic.',
    },
    {
      id: 'large-json',
      question: 'Is there a size limit on the JSON I can format?',
      answer: 'Very large JSON files (many megabytes) may feel slower to format in the browser, since parsing and re-serializing happens on your device rather than a server \u2014 but there\u2019s no hard limit for typical config files or API responses.',
    },
    {
      id: 'nested-json',
      question: 'Does formatting work correctly on deeply nested JSON?',
      answer: 'Yes \u2014 arbitrarily deep nested objects and arrays are indented correctly at every level, which is exactly where formatting helps most: a deeply nested minified structure is genuinely hard to read without it.',
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
      answer: 'Yes \u2014 text is encoded as UTF-8 before Base64 encoding, so accented letters, non-Latin scripts and emoji all round-trip correctly.',
    },
    {
      id: 'url-safe',
      question: 'Can I use this output directly in a URL?',
      answer: 'This produces standard Base64, which uses + and / characters that have special meaning in a URL. For a URL-safe result, replace + with -, / with _, and drop any trailing = padding after encoding here \u2014 that\u2019s the URL-safe variant used in JWTs and similar contexts.',
    },
    {
      id: 'encoding-vs-encryption',
      question: 'Is Base64 a form of encryption?',
      answer: 'No \u2014 Base64 is an encoding, not encryption. Anyone can decode it back to the original text instantly with no key or password needed. It makes binary data safely representable as text; it does not make data private or secure.',
    },
    {
      id: 'why-length-increases',
      question: 'Why is my Base64 output longer than the original text?',
      answer: 'Base64 encodes every 3 bytes of input as 4 output characters, so encoded text is roughly 33% larger than the original \u2014 a real, expected tradeoff for representing binary-safe data as plain text.',
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
      answer: 'This converts one page at a time \u2014 pick the page number and convert, then change it to grab another page.',
    },
    {
      id: 'why-png',
      question: 'Why choose PNG instead of JPG here?',
      answer: 'PNG is lossless, which matters most for pages with sharp text or line art. For photo-heavy pages, JPG usually gives a smaller file with no visible difference.',
    },
    {
      id: 'file-size-png',
      question: 'Will the PNG be a large file?',
      answer: 'It depends on the page content \u2014 a text-heavy or simple page tends to produce a reasonably compact PNG, while a page with a lot of continuous-tone imagery can produce a noticeably larger file than the equivalent JPG would.',
    },
    {
      id: 'resolution-png',
      question: 'What resolution is the PNG output?',
      answer: 'Like the JPG converter, pages are rendered at roughly 2x the PDF\u2019s native size, giving a sharp, detailed result.',
    },
    {
      id: 'text-selectable-after-png',
      question: 'Will the text in the resulting PNG still be selectable?',
      answer: 'No \u2014 the page is rendered as a flat image, so any text that was selectable in the original PDF becomes part of the picture rather than real text. If you need to keep text selectable, this isn\u2019t the right tool for that purpose.',
    },
    {
      id: 'password-protected-img-png',
      question: 'Can I convert a page from a password-protected PDF?',
      answer: 'A PDF that requires a password to open can\u2019t be rendered without first removing that protection, since the file\u2019s content is encrypted until unlocked.',
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
      answer: 'Each page is rendered as an image and recompressed at your chosen quality \u2014 the same technique the Image Compressor uses. This works best on scanned or image-heavy PDFs, since that\u2019s usually what makes a PDF large in the first place.',
    },
    {
      id: 'text-selectable',
      question: 'Will the text still be selectable and searchable after compressing?',
      answer: 'No \u2014 since each page becomes a single image, any text in the original PDF is no longer selectable, searchable, or copyable in the compressed version. If you need to keep text selectable, this tool isn\u2019t the right fit for that PDF.',
    },
    {
      id: 'quality-setting',
      question: 'What compression level should I use?',
      answer: 'Around 65% is a solid starting point for most PDFs \u2014 noticeably smaller with minimal visible quality loss. Go lower for maximum size reduction if the PDF is mostly for reference, or higher if visual quality matters more than file size.',
    },
    {
      id: 'not-getting-smaller',
      question: 'Why isn\u2019t my PDF shrinking much after compressing?',
      answer: 'If the original PDF is mostly text with few or no images, there\u2019s often very little to compress \u2014 text takes up minimal space to begin with. This tool\u2019s real value is for scanned documents and image-heavy PDFs, where the images are what\u2019s actually making the file large.',
    },
  ],

  'pdf-to-word': [
    {
      id: 'what-it-does',
      question: 'Does this preserve the original PDF\u2019s formatting and layout?',
      answer: 'No \u2014 this extracts the actual text content and reconstructs paragraph breaks, giving you an editable starting point. Fonts, images, tables, columns and exact positioning aren\u2019t preserved. True layout-perfect conversion is a much harder problem that even paid tools don\u2019t solve perfectly.',
    },
    {
      id: 'scanned-pdfs',
      question: 'Why does it say no text was found in my PDF?',
      answer: 'That means your PDF is a scanned document \u2014 essentially a picture of text rather than real, selectable text. This tool extracts existing text; it doesn\u2019t perform OCR (optical character recognition) to read text out of an image.',
    },
    {
      id: 'multi-page',
      question: 'Does it handle multi-page PDFs?',
      answer: 'Yes \u2014 every page\u2019s text is extracted and included, with a page break inserted between each page\u2019s content in the resulting Word document.',
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

  'excel-to-pdf': [
    {
      id: 'what-it-does',
      question: 'Does this preserve charts, images, or cell formatting?',
      answer: 'No \u2014 this converts your data into a clean table of text and numbers. Charts, images, merged cells, colors and custom number formatting aren\u2019t reproduced. It works best for straightforward data you want to share or print as a simple table.',
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
      answer: 'The calculated result of each formula is what gets converted \u2014 the same value you\u2019d see displayed in the cell in Excel. The underlying formula itself isn\u2019t preserved, since a PDF table has no concept of a live formula.',
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
      answer: 'The highest resolution thumbnail (1280\u00d7720) only exists for videos uploaded at sufficient source resolution. When it\u2019s not available, that option is automatically hidden \u2014 the other sizes are generated for every video.',
    },
    {
      id: 'is-this-allowed',
      question: 'Is it okay to use a downloaded thumbnail?',
      answer: 'The thumbnail image itself is already publicly served by YouTube for embedding purposes. That said, the thumbnail\u2019s content (like a photo or artwork within it) may still be under copyright, so how you use it \u2014 particularly for anything commercial or republished \u2014 is worth thinking through separately from whether the file is technically downloadable.',
    },
    {
      id: 'private-videos',
      question: 'Does this work on private or unlisted videos?',
      answer: 'It only works for videos where YouTube has generated a publicly accessible thumbnail, which is the case for standard public and unlisted videos. Fully private videos generally won\u2019t have an accessible thumbnail this way.',
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
      answer: 'Based on an average reading speed of 200 words per minute \u2014 a common estimate for adult silent reading of straightforward text. Actual reading speed varies by person and by how dense the text is, so treat it as a helpful ballpark, not an exact figure.',
    },
    {
      id: 'why-two-char-counts',
      question: 'Why are there two different character counts?',
      answer: 'Different platforms and forms count characters differently \u2014 some limits include spaces, others don\u2019t. Showing both numbers means you always know which one applies to whatever limit you\u2019re working against.',
    },
    {
      id: 'paragraph-counting',
      question: 'How are paragraphs counted?',
      answer: 'Each block of text separated by a line break is counted as one paragraph, matching how most word processors and text editors treat paragraph breaks.',
    },
    {
      id: 'why-count-matters',
      question: 'Why do word count requirements exist for essays and articles?',
      answer: 'A word count target is usually a proxy for depth \u2014 enough length to actually develop an argument or cover a topic properly, without padding. Checking your count as you write helps you gauge that without waiting until the end to find out you\u2019re short or over.',
    },
    {
      id: 'live-vs-paste',
      question: 'Does it count text I paste in, or only text I type?',
      answer: 'Both \u2014 the stats update the moment text appears in the box, whether you typed it directly or pasted it in from somewhere else.',
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

  'ai-background-remover': [
    {
      id: 'when-available',
      question: 'When will this be available?',
      answer: 'This tool is prepared but not yet connected to an AI processing service. There\u2019s no fixed date \u2014 check back, or explore ToolHub\u2019s other working image tools in the meantime.',
    },
  ],
  'ai-image-upscaler': [
    {
      id: 'when-available',
      question: 'When will this be available?',
      answer: 'This tool is prepared but not yet connected to an AI processing service. There\u2019s no fixed date \u2014 check back, or explore ToolHub\u2019s other working image tools in the meantime.',
    },
  ],
  'ai-image-enhancer': [
    {
      id: 'when-available',
      question: 'When will this be available?',
      answer: 'This tool is prepared but not yet connected to an AI processing service. There\u2019s no fixed date \u2014 check back, or explore ToolHub\u2019s other working image tools in the meantime.',
    },
  ],
}
