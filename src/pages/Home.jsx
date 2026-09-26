import React, { useState, useEffect } from 'react'
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
  HiOutlinePhoto,
  HiOutlineCodeBracket,
  HiOutlineLink,
  HiOutlineArrowUpTray,
  HiOutlineCog6Tooth,
  HiOutlineArrowDownTray,
  HiOutlineXMark,
  HiOutlineSquares2X2,
  HiOutlinePlus,
  HiChevronRight,
  HiArrowRight,
} from 'react-icons/hi2'
import { FaFilePdf } from 'react-icons/fa6'
import Container from '../components/ui/Container.jsx'
import CategoryCard from '../components/ui/CategoryCard.jsx'
import StatCounter from '../components/ui/StatCounter.jsx'
import TestimonialCard from '../components/ui/TestimonialCard.jsx'
import BlogCard from '../components/ui/BlogCard.jsx'
import FAQAccordion from '../components/ui/FAQAccordion.jsx'
import SEO, { SITE_URL } from '../components/ui/SEO.jsx'
import { useTools } from '../hooks/useTools.js'
import { useCategories } from '../hooks/useCategories.js'
import { useBlogPosts } from '../hooks/useBlogPosts.js'
import { testimonials } from '../data/testimonials.js'
import { faqs } from '../data/faq.js'
import AbstractIllustration from '../components/ui/AbstractIllustration.jsx'
import homepageHeroImage from '../assets/homepage-hero.png'
import { api } from '../lib/api.js'

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

// Benefit-focused content for the Trust section, shown alongside real
// numbers rather than as a replacement for them — genuinely true
// regardless of how much usage data exists yet.
const TRUST_BENEFITS = [
  { label: 'Always free', icon: HiOutlineSparkles },
  { label: 'Fast, in-browser processing', icon: HiOutlineBolt },
  { label: 'Privacy-focused', icon: HiOutlineShieldCheck },
  { label: 'Works on any device', icon: HiOutlineDevicePhoneMobile },
  { label: 'Multiple tool categories', icon: HiOutlineSquares2X2 },
]

// A real usage count only gets shown as a headline stat once it clears
// this bar — below it, a count like "3+" would look sparse rather than
// trustworthy, so the benefit-focused fallback stat is used instead.
// Never invents a number either way; this only decides which true
// numbers are substantial enough to lead with.
const STAT_MIN_THRESHOLD = 10

function roundStatDown(count) {
  if (count >= 1000) return Math.floor(count / 1000) * 1000
  if (count >= 100) return Math.floor(count / 100) * 100
  return Math.floor(count / 10) * 10
}

export default function Home() {
  const navigate = useNavigate()
  const [heroQuery, setHeroQuery] = useState('')
  const [publicStats, setPublicStats] = useState(null)

  // Data comes from the API (src/hooks/), with an automatic fallback to
  // the local data files in src/data/ if the backend isn't reachable —
  // see each hook for details.
  const { tools } = useTools()
  const { categories } = useCategories()
  const { posts: blogPosts } = useBlogPosts()

  const recentPosts = blogPosts.slice(0, 3)

  useEffect(() => {
    api
      .getPublicStats()
      .then(({ data }) => setPublicStats(data))
      .catch(() => setPublicStats({ topTools: [], totalConversions: 0, totalUsers: 0 }))
  }, [])

  // Real usage data first (the backend's getPublicStats already returns
  // the top 8 tools by actual usage, sorted descending); if there isn't
  // enough of it yet (a fresh deployment, or just not many conversions
  // logged so far), fall back to a sensible static selection instead —
  // never showing a usage count either way, so there's nothing here
  // that could look like an invented number.
  const MIN_REAL_POPULAR_TOOLS = 4
  const realPopularTools =
    publicStats?.topTools?.map((row) => tools.find((t) => t.slug === row.toolSlug)).filter((tool) => tool && !tool.comingSoon) || []

  const popularTools =
    realPopularTools.length >= MIN_REAL_POPULAR_TOOLS
      ? realPopularTools.slice(0, 8)
      : tools.filter((tool) => !tool.comingSoon).slice(0, 8)

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
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'ToolHub',
            url: SITE_URL,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${SITE_URL}/tools?query={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'ToolHub',
            url: SITE_URL,
            logo: `${SITE_URL}/icon-512.png`,
            // Confirms this specific ToolHub, at this specific domain, as
            // a distinct, verifiable entity - genuinely useful given how
            // generic "ToolHub" is as a name (an unrelated inventory
            // management SaaS and a Python package share the exact same
            // name). Only real, existing profiles belong here; a sameAs
            // link that doesn't actually represent this site would
            // actively undermine the disambiguation it's meant to help.
            sameAs: [
              'https://www.indiehackers.com/product/toolhub-free-online-tools',
              'https://saasbrowser.com/saas/417836/toolhub',
            ],
          },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.slate.300)_1px,transparent_0)] bg-[size:32px_32px] opacity-[0.15] dark:bg-[radial-gradient(circle_at_1px_1px,theme(colors.slate.700)_1px,transparent_0)]" />
          <div className="absolute right-[-10rem] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-200/50 via-fuchsia-100/40 to-transparent blur-3xl dark:from-brand-900/30 dark:via-fuchsia-900/20" />
        </div>

        <Container className="pb-16 pt-6 sm:pb-20 sm:pt-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs font-medium text-slate-600 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <HiOutlineBolt className="mr-1.5 h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
                100% Free &bull; No Installation &bull; Works in Your Browser
              </span>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
                All the Tools You Need,
                <br />
                <span className="bg-gradient-to-r from-brand-600 to-fuchsia-500 bg-clip-text text-transparent">
                  in One Place
                </span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-500 dark:text-slate-400 lg:mx-0">
                ToolHub provides free, fast, and easy-to-use online tools for everyday tasks.
                Convert, compress, resize, edit and more &mdash; all in your browser.
              </p>

              <form onSubmit={handleHeroSearch} className="mt-8">
                <div className="relative">
                  <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={heroQuery}
                    onChange={(event) => setHeroQuery(event.target.value)}
                    placeholder="Search for a tool (e.g. image compressor, PDF converter...)"
                    aria-label="Search for a tool"
                    className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-28 text-sm text-slate-900 shadow-card placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="btn-primary absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 text-sm"
                  >
                    <HiOutlineMagnifyingGlass className="h-4 w-4 sm:hidden" />
                    <span className="hidden sm:inline">Search</span>
                  </button>
                </div>
              </form>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm lg:justify-start">
                <span className="text-slate-400 dark:text-slate-500">Popular:</span>
                {[
                  { label: 'Image Compressor', to: '/tools/image-compressor' },
                  { label: 'Image Resizer', to: '/tools/image-resizer' },
                  { label: 'JPG to PNG', to: '/tools/jpg-to-png' },
                  { label: 'PDF Tools', to: '/tools?category=pdf-tools' },
                  { label: 'JSON Formatter', to: '/tools/json-formatter' },
                  { label: 'Password Generator', to: '/tools/password-generator' },
                  { label: 'URL Shortener', to: '/tools/url-shortener' },
                ].map((chip) => (
                  <Link
                    key={chip.label}
                    to={chip.to}
                    className="text-slate-500 underline-offset-2 hover:text-brand-600 hover:underline dark:text-slate-400 dark:hover:text-brand-400"
                  >
                    {chip.label}
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative mx-auto w-full max-w-sm lg:max-w-none"
            >
              <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-100/60 to-fuchsia-100/40 blur-2xl dark:from-brand-950/40 dark:to-fuchsia-950/20" />

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-2 top-2 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-lg sm:h-24 sm:w-24 dark:border-slate-700 dark:bg-slate-800"
                >
                  <HiOutlinePhoto className="h-9 w-9 text-brand-500" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  className="absolute right-2 top-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-lg sm:h-20 sm:w-20 dark:border-slate-700 dark:bg-slate-800"
                >
                  <FaFilePdf className="h-7 w-7 text-rose-500" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                  className="absolute bottom-4 left-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-lg sm:h-24 sm:w-24 dark:border-slate-700 dark:bg-slate-800"
                >
                  <HiOutlineCodeBracket className="h-9 w-9 text-emerald-500" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
                  className="absolute bottom-2 right-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-lg sm:h-20 sm:w-20 dark:border-slate-700 dark:bg-slate-800"
                >
                  <HiOutlineLink className="h-7 w-7 text-violet-500" />
                </motion.div>

                <span className="absolute right-8 top-0 h-2 w-2 rounded-full bg-brand-400" aria-hidden="true" />
                <span className="absolute bottom-10 left-2 h-1.5 w-1.5 rounded-full bg-fuchsia-400" aria-hidden="true" />
                <span className="absolute right-2 top-1/2 h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* "Handling something sensitive?" section — the sharper,
          audience-specific version of the privacy story, per the
          positioning feedback from real Indie Hackers/Dev.to comments. */}
      <section>
        <Container className="py-8">
          <div className="flex flex-col items-center gap-6 rounded-2xl bg-emerald-50 p-8 dark:bg-emerald-950/40 sm:flex-row sm:items-start">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400">
              <HiOutlineShieldCheck className="h-6 w-6" />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Handling something sensitive?
              </h2>
              <p className="mt-1.5 max-w-2xl text-slate-600 dark:text-slate-300">
                Client contracts, financial statements, anything you wouldn&apos;t want sitting on
                a random server &mdash; most ToolHub tools process your file entirely in your
                browser. It never gets uploaded, not even briefly.
              </p>
              <Link
                to="/blog/is-it-safe-to-upload-contracts-financial-documents-online-pdf-tools"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400"
              >
                Read more about how this works
                <HiArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="relative overflow-hidden border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
        <AbstractIllustration
          variant="grid"
          className="pointer-events-none absolute -right-10 -top-10 -z-0 h-64 w-64 opacity-40 dark:opacity-20"
        />
        <Container className="relative py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Browse by category
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              From image editing to developer utilities, find the right tool fast.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </Container>
      </section>

      {/* Popular Tools — card-grid style. Backed by real usage data (see
          the Popular Tools data-fetch at the top of this component,
          which already sorts by actual conversion count and returns the
          top 8) with a sensible non-overlapping fallback when there
          isn't enough usage data yet — no usage counts are ever shown
          on the cards themselves, so there's nothing here that could
          look like an invented statistic. */}
      <section className="scroll-mt-20 border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
        <Container className="py-16">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Popular Tools
              </h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Most used tools by our community
              </p>
            </div>
            <Link
              to="/tools"
              className="hidden items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 sm:inline-flex dark:text-brand-400"
            >
              View All Tools
              <HiArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {popularTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  to={tool.path}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-900"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-transform duration-200 group-hover:scale-110 dark:bg-brand-950 dark:text-brand-400">
                      <tool.icon className="h-5 w-5" />
                    </div>
                    <HiChevronRight className="h-4 w-4 flex-shrink-0 text-slate-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-500 dark:text-slate-600" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">{tool.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {tool.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/tools" className="btn-secondary">
              View All Tools
              <HiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Simple Tools, Big Possibilities */}
      <section className="overflow-hidden">
        <Container className="py-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center lg:text-left"
            >
              <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                Powerful &amp; Easy to Use
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                Simple Tools,
                <br />
                Big Possibilities
              </h2>
              <p className="mx-auto mt-4 max-w-md text-slate-500 dark:text-slate-400 lg:mx-0">
                ToolHub gives you the power to work smarter, not harder. Whether you&apos;re a
                student, developer, designer or business owner &mdash; our tools are here to help
                you get things done, quickly and efficiently.
              </p>
              <Link to="/tools" className="btn-primary mt-6 px-6 py-3 text-base">
                Explore All Tools
                <HiArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mx-auto w-full max-w-md lg:max-w-none"
            >
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-brand-900/10 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/40">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <div className="ml-3 flex items-center gap-1.5 rounded-md bg-white px-3 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    Image Compressor
                    <HiOutlinePlus className="h-3 w-3 text-slate-300 dark:text-slate-600" />
                  </div>
                </div>

                <div className="flex">
                  <div className="hidden w-36 flex-shrink-0 border-r border-slate-100 p-3 sm:block dark:border-slate-800">
                    {[
                      { label: 'Image Tools', active: true },
                      { label: 'PDF Tools', active: false },
                      { label: 'Code Tools', active: false },
                      { label: 'Text Tools', active: false },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`mb-1.5 rounded-lg px-3 py-2 text-xs font-medium ${
                          item.active
                            ? 'bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>

                  <div className="flex-1 p-6">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Image Compressor</h3>
                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                      Reduce file size without losing quality.
                    </p>
                    <div className="mt-4 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center dark:border-slate-700 dark:bg-slate-800/50">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                        <HiOutlinePhoto className="h-5 w-5" />
                      </div>
                      <p className="mt-3 text-xs font-medium text-slate-600 dark:text-slate-300">
                        Drop your image here
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400 dark:text-slate-500">or click to browse</p>
                    </div>
                    <div className="btn-primary mt-4 w-full justify-center py-2 text-xs">
                      Compress Image
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Why ToolHub */}
      <section className="overflow-hidden">
        <Container className="py-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Why ToolHub
              </h2>
              <p className="mt-3 text-slate-500 dark:text-slate-400">
                Built to be simple, fast, and trustworthy — every time you use it.
              </p>

              <div className="mt-8 space-y-6">
                {FEATURES.map((feature) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-4"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-brand-100/60 to-fuchsia-100/40 blur-3xl dark:from-brand-950/40 dark:to-fuchsia-950/20" />
              <img
                src={homepageHeroImage}
                alt="ToolHub's image, PDF, color and developer tools shown as a stack of cards"
                className="mx-auto w-full max-w-lg"
                width="1500"
                height="1000"
                loading="lazy"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative scroll-mt-20 overflow-hidden border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
        <AbstractIllustration
          variant="flow"
          className="pointer-events-none absolute -bottom-6 left-1/2 hidden h-24 w-72 -translate-x-1/2 opacity-[0.15] sm:block dark:opacity-10"
        />
        <Container className="relative py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              How it works
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Three steps, every time. No accounts, no installs, no waiting.
            </p>
          </div>

          <div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
            {/* Connecting line between steps on larger screens — purely
                decorative, sits behind the step circles. */}
            <div
              className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent sm:block dark:via-slate-700"
              aria-hidden="true"
            />

            {[
              {
                icon: HiOutlineArrowUpTray,
                title: 'Choose a tool',
                description: 'Pick from image, PDF, color, developer and text tools — search or browse by category.',
              },
              {
                icon: HiOutlineCog6Tooth,
                title: 'Upload & adjust',
                description: 'Drop in your file, tweak the settings you need, and let ToolHub do the work in your browser.',
              },
              {
                icon: HiOutlineArrowDownTray,
                title: 'Download instantly',
                description: 'Get your result immediately — no waiting on a server, no email, no watermark.',
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white text-brand-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-brand-400">
                  <step.icon className="h-7 w-7" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                <p className="mx-auto mt-1.5 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Trust / Usage — real numbers where they're substantial enough to
          be meaningful (tools and categories always are; conversions and
          users only render when the real count clears a reasonable bar,
          per the "don't invent numbers" requirement — see
          formatStatCount below), combined with benefit-focused content
          so the section still feels complete even before usage numbers
          are impressive on their own. */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[size:24px_24px]" aria-hidden="true" />
        <Container className="relative py-16">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="[&_p]:text-white [&_p:last-child]:text-brand-100">
              <StatCounter value={tools.length} suffix="+" label="Tools available" />
            </div>
            <div className="[&_p]:text-white [&_p:last-child]:text-brand-100">
              <StatCounter value={categories.length} label="Tool categories" />
            </div>
            {publicStats?.totalConversions >= STAT_MIN_THRESHOLD ? (
              <div className="[&_p]:text-white [&_p:last-child]:text-brand-100">
                <StatCounter value={roundStatDown(publicStats.totalConversions)} suffix="+" label="Conversions run" />
              </div>
            ) : (
              <div className="[&_p]:text-white [&_p:last-child]:text-brand-100">
                <StatCounter value={100} suffix="%" label="Free to use" />
              </div>
            )}
            {publicStats?.totalUsers >= STAT_MIN_THRESHOLD ? (
              <div className="[&_p]:text-white [&_p:last-child]:text-brand-100">
                <StatCounter value={roundStatDown(publicStats.totalUsers)} suffix="+" label="People using ToolHub" />
              </div>
            ) : (
              <div className="[&_p]:text-white [&_p:last-child]:text-brand-100">
                <StatCounter value={0} label="Sign-up required" />
              </div>
            )}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-5">
            {TRUST_BENEFITS.map((benefit) => (
              <div key={benefit.label} className="flex items-center gap-3 text-white">
                <benefit.icon className="h-6 w-6 flex-shrink-0 text-brand-200" />
                <span className="text-sm font-medium">{benefit.label}</span>
              </div>
            ))}
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
      {/* Final CTA */}
      <section>
        <Container className="pb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-fuchsia-700 px-6 py-16 text-center sm:px-16"
          >
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:28px_28px]" />
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full border border-white/10 bg-white/5" />
              <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full border border-white/10 bg-white/5" />
              <div className="absolute right-12 top-8 hidden h-3 w-3 rounded-full bg-white/30 sm:block" />
              <div className="absolute bottom-10 left-16 hidden h-2 w-2 rounded-full bg-white/20 sm:block" />
            </div>
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-brand-100">
                Create a free account to save favorites and track your history — or just dive
                straight into a tool, no sign-up required.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/register"
                  className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  Create free account
                </Link>
                <Link
                  to="/tools"
                  className="rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  Browse tools
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
