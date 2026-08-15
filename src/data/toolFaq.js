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
        'JPG images don\u2019t have transparency data, so the resulting PNG will have a solid background rather than a transparent one.',
    },
    {
      id: 'file-size',
      question: 'Why is the PNG file larger than the original JPG?',
      answer:
        'PNG uses lossless compression, which typically produces larger files than JPG\u2019s lossy compression, especially for photos.',
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
  ],
  'webp-to-png': [
    {
      id: 'why-webp',
      question: 'Why convert WEBP to PNG?',
      answer:
        'PNG has broader compatibility with older software and design tools that don\u2019t yet support WEBP.',
    },
  ],
  'webp-to-jpg': [
    {
      id: 'why-jpg',
      question: 'Why convert WEBP to JPG?',
      answer:
        'JPG remains one of the most universally supported image formats, useful when sharing to platforms or tools without WEBP support.',
    },
  ],
  'convert-to-webp': [
    {
      id: 'why-webp-benefit',
      question: 'What are the benefits of WEBP?',
      answer:
        'WEBP typically produces smaller file sizes than JPG or PNG at a similar visual quality, which helps pages load faster.',
    },
    {
      id: 'browser-support',
      question: 'Is WEBP widely supported?',
      answer:
        'Yes, all modern browsers support WEBP. Very old browsers or some legacy software may not.',
    },
  ],
  'image-compressor': [
    {
      id: 'quality-loss',
      question: 'Will compressing my image reduce its quality?',
      answer:
        'Some quality is traded for a smaller file size, but you control how much through the quality slider, with a live before/after preview.',
    },
    {
      id: 'png-compression',
      question: 'Can I compress PNG files?',
      answer:
        'Yes. For maximum size reduction, PNGs are re-encoded as JPG during compression, which works best for photos rather than images needing transparency.',
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
        'Yes, though enlarging an image beyond its original size can make it look softer since no new detail is being added.',
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
  ],
  'image-rotate': [
    {
      id: 'rotate-quality',
      question: 'Does rotating reduce image quality?',
      answer:
        'Rotating by 90\u00b0 increments doesn\u2019t reduce quality. The image is re-encoded, so very minor compression differences can occur with JPG output.',
    },
  ],
  'flip-image': [
    {
      id: 'flip-vs-rotate',
      question: 'What\u2019s the difference between flip and rotate?',
      answer:
        'Flipping mirrors the image horizontally or vertically, while rotating turns it around a center point. They produce different results.',
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
  ],
  'png-to-pdf': [
    {
      id: 'transparency',
      question: 'What happens to transparent areas of my PNG?',
      answer: 'PDF pages don\u2019t support transparency the way PNGs do \u2014 transparent areas will typically render as white in the resulting PDF.',
    },
    {
      id: 'page-size',
      question: 'What size will the PDF page be?',
      answer: 'The page is sized to match your image\u2019s exact pixel dimensions at 72 DPI.',
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
  ],

  'color-picker': [
    {
      id: 'accuracy',
      question: 'How accurate is the picked color?',
      answer: 'It reads the exact pixel value from the image data at the point you click \u2014 not an approximation.',
    },
    {
      id: 'no-image',
      question: 'Can I use this without uploading an image?',
      answer: 'Yes \u2014 use the standalone color picker shown when no image is uploaded to pick any color directly.',
    },
  ],
  'hex-to-rgb': [
    {
      id: 'formats-accepted',
      question: 'What color formats can I type in?',
      answer: 'Hex (#3b6cf6), rgb(59, 108, 246), or hsl(225, 90%, 60%) \u2014 all three formats show up together as soon as one is recognized.',
    },
  ],
  'rgb-to-hex': [
    {
      id: 'input-format',
      question: 'How do I enter an RGB value?',
      answer: 'Type it as rgb(59, 108, 246), or just use the color picker swatch \u2014 either way, the equivalent HEX and HSL values appear immediately.',
    },
  ],
  'hex-to-hsl': [
    {
      id: 'what-is-hsl',
      question: 'What do the HSL numbers mean?',
      answer: 'Hue (0\u2013360\u00b0 on the color wheel), Saturation (0\u2013100%, how vivid), and Lightness (0\u2013100%, how light or dark).',
    },
  ],
  'color-converter': [
    {
      id: 'why-formats',
      question: 'Why are there different color formats at all?',
      answer: 'HEX is common in design tools and CSS, RGB maps directly to how screens render color, and HSL is often more intuitive for adjusting a color\u2019s vividness or lightness by hand.',
    },
  ],
  'palette-generator': [
    {
      id: 'schemes',
      question: 'What do the different palette types mean?',
      answer: 'Complementary uses the opposite hue for contrast, analogous uses neighboring hues for harmony, triadic uses three evenly-spaced hues, and shades varies only the lightness of your one color.',
    },
  ],

  'json-formatter': [
    {
      id: 'minify-vs-format',
      question: 'What\u2019s the difference between Format and Minify?',
      answer: 'Format adds indentation and line breaks for readability; Minify strips all unnecessary whitespace to make the file as small as possible.',
    },
  ],
  'json-validator': [
    {
      id: 'common-errors',
      question: 'What are common reasons JSON is invalid?',
      answer: 'Trailing commas, unquoted keys, single quotes instead of double quotes, and missing brackets are the most frequent causes.',
    },
  ],
  'base64-encoder': [
    {
      id: 'unicode',
      question: 'Does this handle special characters and emoji correctly?',
      answer: 'Yes \u2014 text is encoded as UTF-8 before Base64 encoding, so accented letters, non-Latin scripts and emoji all round-trip correctly.',
    },
  ],
  'url-encoder': [
    {
      id: 'what-gets-encoded',
      question: 'What characters get encoded?',
      answer: 'Reserved and special characters (spaces, &, =, ?, and more) are converted to percent-encoded sequences so the text is safe to use in a URL.',
    },
  ],
  'uuid-generator': [
    {
      id: 'version',
      question: 'What version of UUID does this generate?',
      answer: 'Version 4 \u2014 randomly generated using the browser\u2019s native cryptographically secure random number generator, not a predictable pattern.',
    },
  ],
  'hash-generator': [
    {
      id: 'which-algorithm',
      question: 'Which hash algorithm should I use?',
      answer: 'SHA-256 or higher for anything security-related. MD5 and SHA-1 are still common for file checksums and compatibility, but are not considered secure for security purposes.',
    },
  ],
  'timestamp-converter': [
    {
      id: 'what-is-unix-time',
      question: 'What is a Unix timestamp?',
      answer: 'The number of seconds elapsed since midnight UTC on January 1, 1970 \u2014 a compact, timezone-independent way to represent a point in time.',
    },
  ],
  'regex-tester': [
    {
      id: 'flags',
      question: 'What do the flags (g, i, m, s) do?',
      answer: 'g finds all matches instead of just the first; i ignores letter case; m makes ^ and $ match the start/end of each line; s lets . match newline characters too.',
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
  ],
  'gradient-generator': [
    {
      id: 'linear-vs-radial',
      question: 'What\u2019s the difference between linear and radial?',
      answer: 'Linear gradients transition in a straight line across a chosen direction; radial gradients spread outward from a center point in a circle.',
    },
    {
      id: 'color-stops',
      question: 'What are color stops?',
      answer: 'Each stop is a color placed at a specific position (0\u2013100%) along the gradient. Add more stops for a multi-color blend, and drag their position sliders to adjust where each color starts.',
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
      answer: 'Based on an average reading speed of 200 words per minute \u2014 a common estimate for adult silent reading of straightforward text.',
    },
  ],
  'case-converter': [
    {
      id: 'which-cases',
      question: 'Which case styles are supported?',
      answer: 'UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case \u2014 covering both everyday writing styles and the naming conventions used in code.',
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
  ],
}
