import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineCalendar, HiOutlineClock, HiOutlineArrowLeft, HiArrowRight } from 'react-icons/hi2'
import Container from '../components/ui/Container.jsx'
import SEO, { SITE_URL } from '../components/ui/SEO.jsx'
import Breadcrumb from '../components/tools/Breadcrumb.jsx'
import ErrorMessage from '../components/tools/ErrorMessage.jsx'
import { api } from '../lib/api.js'
import { tools } from '../data/tools.js'
import { categories } from '../data/categories.js'

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setPost(null)
    setError(null)
    api
      .getBlogPost(slug)
      .then(({ data }) => setPost(data))
      .catch((err) => setError(err.message || 'This post could not be found.'))
  }, [slug])

  // Real internal linking, not decorative — the tools that actually match
  // this post's own category, so a reader can go straight from the
  // article to a relevant tool.
  const relatedCategory = categories.find(
    (c) => c.name.toLowerCase() === post?.category?.toLowerCase()
  )
  const relatedTools = relatedCategory
    ? tools.filter((t) => t.category === relatedCategory.slug && !t.comingSoon).slice(0, 3)
    : []

  if (error) {
    return (
      <Container className="py-16 text-center">
        <SEO title="Post Not Found" description="This blog post could not be found." canonicalPath="/blog" noIndex />
        <ErrorMessage message={error} />
        <Link to="/blog" className="btn-primary mt-6 inline-flex">
          Back to Blog
        </Link>
      </Container>
    )
  }

  if (!post) {
    return (
      <Container className="py-16 text-center">
        <p className="text-sm text-slate-400 dark:text-slate-500">Loading...</p>
      </Container>
    )
  }

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.createdAt,
      dateModified: post.updatedAt || post.createdAt,
      author: { '@type': 'Organization', name: post.author || 'ToolHub Team' },
      publisher: { '@type': 'Organization', name: 'ToolHub' },
      mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
      ...(post.image ? { image: post.image } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
      ],
    },
  ]

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
        type="article"
        image={post.image || undefined}
        structuredData={structuredData}
      />

      <Container className="py-12">
        <Breadcrumb items={[{ label: 'Blog', to: '/blog' }, { label: post.title }]} />

        <motion.article
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto mt-8 max-w-2xl"
        >
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-950 dark:text-brand-400">
            {post.category}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-slate-400 dark:text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <HiOutlineCalendar className="h-4 w-4" />
              {formatDate(post.createdAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <HiOutlineClock className="h-4 w-4" />
              {post.readTime}
            </span>
            <span>{post.author}</span>
          </div>

          {post.image && (
            <img src={post.image} alt={post.title} className="mt-8 w-full rounded-2xl object-cover" />
          )}

          <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">{post.content}</p>
          </div>

          {relatedTools.length > 0 && (
            <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Relevant tools
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {relatedTools.map((tool) => (
                  <Link
                    key={tool.id}
                    to={tool.path}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 hover:border-brand-200 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-900 dark:hover:text-brand-400"
                  >
                    {tool.name}
                    <HiArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <Link
            to="/blog"
            className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400"
          >
            <HiOutlineArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </motion.article>
      </Container>
    </>
  )
}
