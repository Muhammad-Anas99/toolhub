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
}
