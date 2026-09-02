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
