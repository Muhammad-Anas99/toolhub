import * as esbuild from 'esbuild'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

// Vite's `?url` import suffix (used for the PDF.js worker file) isn't a
// real Node/esbuild convention - it's Vite-specific. Since no actual
// PDF file is ever processed during prerendering, the real URL value
// is never needed; only that the import resolves without crashing.
const urlImportPlugin = {
  name: 'url-import-stub',
  setup(build) {
    build.onResolve({ filter: /\?url$/ }, (args) => ({ path: args.path, namespace: 'url-stub' }))
    build.onLoad({ filter: /.*/, namespace: 'url-stub' }, () => ({
      contents: 'export default "/stub-worker-url.js"',
      loader: 'js',
    }))
  },
}

async function main() {
  const entryPath = path.join(__dirname, '_prerenderEntry.mjs')
  const outfile = path.join(projectRoot, '.prerender-bundle.mjs')

  await esbuild.build({
    entryPoints: [entryPath],
    bundle: true,
    format: 'esm',
    platform: 'node',
    jsx: 'automatic',
    external: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    loader: { '.png': 'dataurl', '.svg': 'dataurl', '.css': 'empty' },
    define: {
      'import.meta.env': JSON.stringify({
        VITE_API_URL: process.env.VITE_API_URL || 'https://api.trytoolhub.net/api',
      }),
    },
    plugins: [urlImportPlugin],
    banner: {
      js: "import { createRequire as __createRequire } from 'module'; const require = __createRequire(import.meta.url);",
    },
    outfile,
  })

  const { run } = await import(outfile)
  await run()

  fs.unlinkSync(outfile)
}

main().catch((err) => {
  console.error('Prerender build step failed:', err)
  process.exit(1)
})
