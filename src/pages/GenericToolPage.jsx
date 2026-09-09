import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import SEO from '../components/ui/SEO.jsx'
import ComingSoonTool from '../components/tools/ComingSoonTool.jsx'
import NotFound from './NotFound.jsx'
import { api } from '../lib/api.js'

/**
 * Matches any /tools/:slug not already claimed by a specific, hand-built
 * tool page (this route is registered after all of those, so React
 * Router only reaches it for a slug with no dedicated page - typically
 * a tool added through the admin panel that hasn't been built in code
 * yet). Shows the same honest "Coming Soon" UI already used for the AI
 * tools, with this tool's real title and description, rather than a
 * dead-end 404 for a tool that genuinely exists in the database.
 */
export default function GenericToolPage() {
  const { slug } = useParams()
  const [tool, setTool] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false
    setTool(null)
    setNotFound(false)

    api
      .getToolBySlug(slug)
      .then(({ data }) => {
        if (!cancelled) setTool(data)
      })
      .catch(() => {
        if (!cancelled) setNotFound(true)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  if (notFound) {
    return <NotFound />
  }

  if (!tool) {
    return (
      <Container className="py-16">
        <p className="text-sm text-slate-400 dark:text-slate-500">Loading...</p>
      </Container>
    )
  }

  return (
    <>
      <SEO title={tool.name} description={tool.description} canonicalPath={tool.path} />
      <Container className="py-10">
        <ComingSoonTool
          toolName={tool.name}
          whatItWillDo={tool.description}
          whyNotYet="This tool is still being built and isn't available yet. Check back soon."
          exploreCategorySlug={tool.category}
        />
      </Container>
    </>
  )
}
