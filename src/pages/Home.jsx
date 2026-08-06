import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  HiOutlineBolt,
  HiOutlineShieldCheck,
  HiOutlineDevicePhoneMobile,
  HiOutlineSparkles,
  HiOutlineArrowPath,
  HiOutlineUserGroup,
  HiOutlineMagnifyingGlass,
  HiArrowRight,
} from 'react-icons/hi2'
import Container from '../components/ui/Container.jsx'
import ToolCard from '../components/ui/ToolCard.jsx'
import CategoryCard from '../components/ui/CategoryCard.jsx'
import StatCounter from '../components/ui/StatCounter.jsx'
import TestimonialCard from '../components/ui/TestimonialCard.jsx'
import BlogCard from '../components/ui/BlogCard.jsx'
import FAQAccordion from '../components/ui/FAQAccordion.jsx'
import SEO from '../components/ui/SEO.jsx'
import { useTools } from '../hooks/useTools.js'
import { useCategories } from '../hooks/useCategories.js'
import { useBlogPosts } from '../hooks/useBlogPosts.js'
import { testimonials } from '../data/testimonials.js'
import { faqs } from '../data/faq.js'

const FEATURES = [
  {
    title: 'Fast by design',
    description: 'Tools run in your browser, so results are near-instant with no server round trips.',
    icon: HiOutlineBolt,
  },
  {
    title: 'Private by default',
    description: 'Your files stay on your device. Nothing is uploaded unless a tool explicitly says so.',
    icon: HiOutlineShieldCheck,
  },
  {
    title: 'Works everywhere',
    description: 'A responsive layout that works just as well on your phone as it does on desktop.',
    icon: HiOutlineDevicePhoneMobile,
  },
  {
    title: 'Always free',
    description: 'No paywalls or hidden fees on core tools. Use what you need, whenever you need it.',
    icon: HiOutlineSparkles,
  },
  {
    title: 'No sign-up required',
    description: 'Open a tool and start using it immediately — no accounts, no friction.',
    icon: HiOutlineUserGroup,
  },
  {
    title: 'Constantly expanding',
    description: 'New tools and categories are added regularly, from PDFs to AI-powered utilities.',
    icon: HiOutlineArrowPath,
  },
]

export default function Home() {
  const navigate = useNavigate()
  const [heroQuery, setHeroQuery] = useState('')

  // Data comes from the API (src/hooks/), with an automatic fallback to
  // the local data files in src/data/ if the backend isn't reachable —
  // see each hook for details.
  const { tools } = useTools()
  const { categories } = useCategories()
  const { posts: blogPosts } = useBlogPosts()

  const featuredTools = tools.filter((tool) => tool.badge === 'popular').slice(0, 6)
  const recentPosts = blogPosts.slice(0, 3)

  function handleHeroSearch(event) {
    event.preventDefault()
    const params = heroQuery.trim() ? `?query=${encodeURIComponent(heroQuery.trim())}` : ''
    navigate(`/tools${params}`)
  }

  return (
    <>
      <SEO
        title="Free Online Tools for Images, PDFs, Text and More"
        description="Convert, compress, resize, crop and rotate images for free with ToolHub. Fast, private, and works right in your browser."
        canonicalPath="/"
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute left-1/2 top-[-10rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-300/40 via-fuchsia-200/30 to-transparent blur-3xl dark:from-brand-900/40 dark:via-fuchsia-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.slate.300)_1px,transparent_0)] bg-[size:32px_32px] opacity-[0.15] dark:bg-[radial-gradient(circle_at_1px_1px,theme(colors.slate.700)_1px,transparent_0)]" />
        </div>

        <Container className="py-20 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs font-medium text-slate-600 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
              8 categories &middot; {tools.length}+ tools and growing
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
              Every tool you need,{' '}
              <span className="bg-gradient-to-r from-brand-600 to-fuchsia-500 bg-clip-text text-transparent">
                in one place
              </span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-500 dark:text-slate-400">
              Convert, compress, resize, and edit images — with PDF, developer, text, AI, color,
              security and social media tools on the way. No installs, no sign-up.
            </p>

            <form onSubmit={handleHeroSearch} className="mx-auto mt-8 max-w-xl">
              <div className="relative">
                <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={heroQuery}
                  onChange={(event) => setHeroQuery(event.target.value)}
                  placeholder="Search for a tool, e.g. 'compress image'"
                  aria-label="Search for a tool"
                  className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-28 text-sm text-slate-900 shadow-card placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="btn-primary absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 text-sm"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {categories.slice(0, 5).map((category) => (
                <Link
                  key={category.id}
                  to={`/tools?category=${category.slug}`}
                  className="rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-slate-800 dark:text-slate-400 dark:hover:border-brand-800 dark:hover:text-brand-400"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Featured tools */}
      <section id="featured-tools" className="scroll-mt-20">
        <Container className="py-16">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Featured tools
              </h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Our most popular tools, ready to use right now.
              </p>
            </div>
            <Link
              to="/tools"
              className="hidden items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 sm:inline-flex dark:text-brand-400"
            >
              View all tools
              <HiArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/tools" className="btn-secondary">
              View all tools
            </Link>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
        <Container className="py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Browse by category
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              From image editing to developer utilities, find the right tool fast.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </Container>
      </section>

      {/* Why ToolHub */}
      <section>
        <Container className="py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Why ToolHub
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Built to be simple, fast, and trustworthy — every time you use it.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="text-center sm:text-left"
              >
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 sm:mx-0 dark:bg-brand-950 dark:text-brand-400">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-br from-brand-600 to-brand-800">
        <Container className="py-16">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="[&_p]:text-white [&_p:last-child]:text-brand-100">
              <StatCounter value={tools.length} suffix="+" label="Tools available" />
            </div>
            <div className="[&_p]:text-white [&_p:last-child]:text-brand-100">
              <StatCounter value={categories.length} label="Tool categories" />
            </div>
            <div className="[&_p]:text-white [&_p:last-child]:text-brand-100">
              <StatCounter value={100} suffix="%" label="Free to use" />
            </div>
            <div className="[&_p]:text-white [&_p:last-child]:text-brand-100">
              <StatCounter value={0} label="Sign-up required" />
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section>
        <Container className="py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              What people are saying
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Early feedback from people using ToolHub for real work.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
        <Container className="py-20">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Frequently asked questions
              </h2>
              <p className="mt-3 text-slate-500 dark:text-slate-400">
                Can&apos;t find what you&apos;re looking for?{' '}
                <Link to="/contact" className="font-medium text-brand-600 dark:text-brand-400">
                  Contact us
                </Link>
                .
              </p>
            </div>
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-900">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </Container>
      </section>

      {/* Latest blog posts */}
      <section>
        <Container className="py-20">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                From the blog
              </h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Guides and tips on getting the most out of your files.
              </p>
            </div>
            <Link
              to="/blog"
              className="hidden items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 sm:inline-flex dark:text-brand-400"
            >
              View all posts
              <HiArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <Link key={post.id} to="/blog">
                <BlogCard post={post} />
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/blog" className="btn-secondary">
              View all posts
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
