import JSZip from 'jszip'

/**
 * Bundles multiple { filename, blob } results into a single downloadable
 * ZIP — used by the batch Image Editor's "Download All" button so
 * processing 10 images doesn't mean 10 separate browser download prompts.
 */
export async function createZip(files) {
  const zip = new JSZip()
  files.forEach(({ filename, blob }) => {
    zip.file(filename, blob)
  })
  return zip.generateAsync({ type: 'blob' })
}
