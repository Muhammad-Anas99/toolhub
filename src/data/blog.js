export const blogPosts = [
  {
    id: 'jpg-vs-png-vs-webp',
    slug: 'jpg-vs-png-vs-webp',
    title: 'JPG vs PNG vs WEBP: Which Image Format Should You Use?',
    excerpt:
      'A practical breakdown of the three most common image formats, when to use each one, and how they affect quality and file size.',
    category: 'Image Tools',
    date: '2026-06-02',
    readTime: '6 min read',
    author: 'ToolHub Team',
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

For a photograph destined for the web: WebP first, JPEG as the universally-safe fallback. For anything needing transparency, a logo, an icon, a graphic with a see-through background: PNG, or WebP if the file only needs to work in modern browsers. For a screenshot, a diagram, or anything with sharp text and fine lines where exactness matters: PNG, since JPEG's compression would visibly soften those sharp edges.

None of these formats is universally "best". Each one was built to solve a different problem, and the right choice depends entirely on what the image actually contains and where it's going to be used.`,
  },
  {
    id: 'reduce-image-file-size',
    slug: 'how-to-reduce-image-file-size-without-losing-quality',
    title: 'How to Reduce Image File Size Without Losing Quality',
    excerpt:
      'Compression techniques, format choices and simple habits that shrink your images while keeping them sharp.',
    category: 'Image Tools',
    date: '2026-05-18',
    readTime: '5 min read',
    author: 'ToolHub Team',
    content: `A large image slows down a website, eats up storage, and makes email attachments bounce. The good news is that shrinking a file usually doesn't require sacrificing visible quality, as long as the right technique is used for the right reason. The mistake most people make is treating "make it smaller" as one problem, when it's actually at least three different ones.

## Resizing and compressing are not the same thing

This distinction matters more than almost anything else here. Resizing changes an image's pixel dimensions, how many pixels wide and tall it is. Compressing changes how efficiently those pixels are stored, without necessarily changing how many there are. A 4000-pixel-wide photo displayed at 800 pixels on a webpage is carrying nearly 25 times more pixel data than it needs to, regardless of how well-compressed the file already is.

That makes resizing the first and often the biggest win. If an image is only ever going to be viewed at a specific size, there is no reason to store it at native camera resolution. Cutting it down to the size it's actually displayed at reduces file size dramatically, before compression is even considered.

## Compression: the real quality tradeoff

Once an image is at the right dimensions, compression is the next lever. Lossy compression (used by JPEG and one of WebP's two modes) discards some image data permanently to shrink the file, targeting detail that's least noticeable to the eye. At a well-chosen quality setting, typically somewhere in the 70 to 85 percent range for JPEG, the size reduction is substantial while the visual difference is close to invisible at normal viewing size.

Push the quality setting too low and the tradeoff becomes visible: blocky artifacts around sharp edges, smudged detail in busy areas, banding in smooth gradients. The right approach is incremental: reduce quality, compare the result at actual viewing size, and stop before artifacts become noticeable rather than applying the same aggressive setting to every image regardless of content.

## Choosing the right format actually matters

Format choice by itself can be a bigger factor than compression quality. A photograph saved as PNG is typically several times larger than the same photo saved as a reasonably-compressed JPEG, since PNG's lossless approach has to store every pixel exactly rather than approximating. For anything that's genuinely a photograph, not a screenshot or a graphic with sharp text, JPEG or WebP will almost always beat PNG on file size by a wide margin.

WebP specifically is worth defaulting to for web use: independently verified benchmarks put it 25 to 35% smaller than an equivalent-quality JPEG, and it's been supported by every major browser since 2020.

## A habit worth avoiding: repeated re-saving

Every time a JPEG is opened, edited, and re-saved, lossy compression gets reapplied on top of whatever was already discarded in previous saves. This effect, called generation loss, compounds with each round trip. A photo that's been opened and re-saved a dozen times over the years can look noticeably softer than the same photo saved once at a sensible quality setting, even if no one intentionally changed the quality level. When repeated editing is expected, working from a lossless master (PNG, or the original unedited file) and only exporting to JPEG once, at the end, avoids this compounding effect entirely.

## Putting it together

For most images headed to a website: resize to the actual display dimensions first, then export as WebP or a well-compressed JPEG, checking the result at real viewing size rather than trusting a percentage number alone. For anything with sharp text, transparency, or fine line detail, stick with PNG despite the larger file size, since compression artifacts would be more noticeable there than the size savings are worth. Getting the order right, dimensions first, then format and compression, tends to matter more than any single setting.`,
  },
  {
    id: 'best-practices-social-media-image-sizes',
    slug: 'social-media-image-size-guide-2026',
    title: 'The 2026 Social Media Image Size Guide',
    excerpt:
      'Up-to-date dimensions for Instagram, YouTube, and other platforms, plus tips for exporting crisp images every time.',
    category: 'Social Media Tools',
    date: '2026-04-27',
    readTime: '7 min read',
    author: 'ToolHub Team',
    content: `Every social platform crops, compresses, or stretches an image that doesn't match its expected dimensions, which is exactly why a photo that looked sharp on your device can come out blurry, cropped strangely, or letterboxed once it's actually posted. These are the current recommended sizes for the platforms people upload to most, current as of 2026.

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
  },
  {
    id: 'json-formatting-tips',
    slug: 'json-formatting-and-validation-tips-for-developers',
    title: 'JSON Formatting and Validation Tips for Developers',
    excerpt:
      'Common JSON mistakes, how to catch them early, and habits that keep your data clean across a project.',
    category: 'Developer Tools',
    date: '2026-04-09',
    readTime: '4 min read',
    author: 'ToolHub Team',
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
  },
  {
    id: 'pdf-document-upload-safety',
    slug: 'is-it-safe-to-upload-contracts-financial-documents-online-pdf-tools',
    title: 'Is It Safe to Upload Contracts and Financial Documents to Online PDF Tools?',
    excerpt:
      'Most free PDF tools work by uploading your file to a server first. For a client contract or a financial statement, that step is worth understanding before you use one.',
    category: 'PDF Tools',
    date: '2026-03-22',
    readTime: '5 min read',
    author: 'ToolHub Team',
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

For everyday, non-sensitive files, the distinction genuinely doesn't matter much. For anything above, it's worth choosing a tool that processes locally — not because every upload-based tool is doing something wrong, but because there's no reason to accept even a small, well-intentioned risk when a browser-based alternative exists and costs nothing extra to use.`,
  },
]

export function getBlogPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug) || null
}
