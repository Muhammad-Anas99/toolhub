import { prerenderRoutes, cleanupPrerenderTemplate } from './prerender.mjs'
import { getAllPublicRoutes } from './routeList.mjs'

export async function run() {
  const routes = getAllPublicRoutes()
  console.log(`Prerendering ${routes.length} routes...`)
  const start = Date.now()
  const results = await prerenderRoutes(routes)
  cleanupPrerenderTemplate()
  const elapsed = ((Date.now() - start) / 1000).toFixed(1)

  const failed = results.filter((r) => !r.ok)
  const succeeded = results.filter((r) => r.ok)
  console.log(`Prerender done in ${elapsed}s: ${succeeded.length} succeeded, ${failed.length} failed`)

  if (failed.length > 0) {
    console.log('Failed routes:')
    failed.forEach((f) => console.log(`  - ${f.route}: ${f.error}`))
  }

  const avgBytes = succeeded.length > 0 ? Math.round(succeeded.reduce((sum, r) => sum + r.bytes, 0) / succeeded.length) : 0
  console.log(`Average prerendered page size: ${avgBytes} bytes`)
}
