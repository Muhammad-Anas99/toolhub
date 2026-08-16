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
  HiOutlineDocumentText,
  HiOutlineSwatch,
  HiOutlineCommandLine,
  HiOutlineArrowUpTray,
  HiOutlineCog6Tooth,
  HiOutlineArrowDownTray,
  HiOutlineCheckCircle,
  HiOutlineXMark,
  HiOutlineSquares2X2,
  HiArrowRight,
} from 'react-icons/hi2'
import Container from '../components/ui/Container.jsx'
import ToolCard from '../components/ui/ToolCard.jsx'
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
import { api } from '../lib/api.js'
import { getCategoryBySlug } from '../data/categories.js'

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

  const featuredTools = tools.filter((tool) => tool.badge === 'popular').slice(0, 6)
  const recentPosts = blogPosts.slice(0, 3)

  useEffect(() => {
    api
      .getPublicStats()
      .then(({ data }) => setPublicStats(data))
      .catch(() => setPublicStats({ topTools: [], totalConversions: 0, totalUsers: 0 }))
  }, [])

  // Real usage data first; if there isn't enough of it yet (a fresh
  // deployment, or just not many conversions logged so far), fall back to
  // a sensible static selection instead — deliberately not overlapping
  // with Featured Tools above, and never showing a usage count either
  // way, so there's nothing here that could look like an invented number.
  const featuredSlugs = new Set(featuredTools.map((t) => t.slug))
  const MIN_REAL_POPULAR_TOOLS = 4
  const realPopularTools =
    publicStats?.topTools
      ?.map((row) => tools.find((t) => t.slug === row.toolSlug))
      .filter((tool) => tool && !tool.comingSoon && !featuredSlugs.has(tool.slug)) || []

  const popularTools =
    realPopularTools.length >= MIN_REAL_POPULAR_TOOLS
      ? realPopularTools.slice(0, 5)
      : tools.filter((tool) => !tool.comingSoon && !featuredSlugs.has(tool.slug)).slice(0, 5)

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
          },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute left-1/2 top-[-10rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-300/40 via-fuchsia-200/30 to-transparent blur-3xl dark:from-brand-900/40 dark:via-fuchsia-900/20" />
          <div className="absolute right-[-8rem] top-32 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-300/30 to-transparent blur-3xl dark:from-fuchsia-900/20" />
          <div className="absolute left-[-6rem] bottom-0 h-64 w-64 rounded-full bg-gradient-to-tr from-brand-200/30 to-transparent blur-3xl dark:from-brand-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.slate.300)_1px,transparent_0)] bg-[size:32px_32px] opacity-[0.15] dark:bg-[radial-gradient(circle_at_1px_1px,theme(colors.slate.700)_1px,transparent_0)]" />

          {/* Floating tool-category glyphs — purely decorative, hidden on
              small screens so they never compete with the hero content or
              cause overflow on narrow viewports. */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-[8%] top-24 hidden h-14 w-14 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-brand-500 shadow-lg backdrop-blur-sm lg:flex dark:border-slate-800/80 dark:bg-slate-900/80"
          >
            <HiOutlinePhoto className="h-6 w-6" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute right-[10%] top-16 hidden h-12 w-12 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-fuchsia-500 shadow-lg backdrop-blur-sm lg:flex dark:border-slate-800/80 dark:bg-slate-900/80"
          >
            <HiOutlineDocumentText className="h-5 w-5" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute right-[6%] bottom-10 hidden h-14 w-14 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-emerald-500 shadow-lg backdrop-blur-sm lg:flex dark:border-slate-800/80 dark:bg-slate-900/80"
          >
            <HiOutlineSwatch className="h-6 w-6" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute left-[12%] bottom-16 hidden h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-amber-500 shadow-lg backdrop-blur-sm lg:flex dark:border-slate-800/80 dark:bg-slate-900/80"
          >
            <HiOutlineCommandLine className="h-5 w-5" />
          </motion.div>
        </div>

        <Container className="py-20 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs font-medium text-slate-600 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
              <span className="mr-1.5 flex h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
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

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link to="/tools" className="btn-primary px-5 py-2.5 shadow-lg shadow-brand-500/20">
                Browse all tools
                <HiArrowRight className="h-4 w-4" />
              </Link>
              <a href="#how-it-works" className="btn-secondary px-5 py-2.5">
                See how it works
              </a>
            </div>

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

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </Container>
      </section>

      {/* Popular Tools — ranked list style, deliberately different from
          Featured Tools' grid above so the page doesn't repeat itself.
          Backed by real usage data (see the Popular Tools data-fetch at
          the top of this component) with a sensible non-overlapping
          fallback when there isn't enough usage data yet — no usage
          counts are ever shown on the cards themselves, so there's
          nothing here that could look like an invented statistic. */}
      <section className="scroll-mt-20">
        <Container className="py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Popular right now
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              What people are actually reaching for on ToolHub.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {popularTools.map((tool, index) => {
              const category = getCategoryBySlug(tool.category)
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    to={tool.path}
                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-brand-200 hover:shadow-card-hover sm:p-5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-900"
                  >
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                      {index + 1}
                    </span>
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-transform duration-200 group-hover:scale-110 dark:bg-brand-950 dark:text-brand-400">
                      <tool.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{tool.name}</h3>
                        {category && (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                            {category.name}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-sm text-slate-500 dark:text-slate-400">
                        {tool.description}
                      </p>
                    </div>
                    <span className="hidden flex-shrink-0 items-center gap-1 text-sm font-medium text-brand-600 transition-transform duration-200 group-hover:translate-x-0.5 sm:inline-flex dark:text-brand-400">
                      Open
                      <HiArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </motion.div>
              )
            })}
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
              <AbstractIllustration variant="stack" className="mx-auto w-full max-w-md text-slate-900 dark:text-white" />
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

      {/* Subscription plans — UI only. Premium and Pro are not active: no
          payment integration, no billing, nothing here calls any backend
          endpoint. Their buttons are disabled, not links, so there's no
          way to accidentally "start" a plan that doesn't exist yet. */}
      <section id="pricing" className="scroll-mt-20">
        <Container className="py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Simple, honest pricing
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Every tool works fully on the Free plan today. Premium and Pro are on the way.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              {
                name: 'Free',
                price: '$0',
                cadence: 'forever',
                description: 'Everything you need for everyday file conversion and editing.',
                features: [
                  'Every tool, unlimited use',
                  'No file size gimmicks',
                  'Favorites & conversion history',
                  'Files never leave your browser',
                ],
                cta: 'Get Started',
                highlighted: false,
                available: true,
              },
              {
                name: 'Premium',
                price: '$4',
                cadence: '/month',
                description: 'Faster workflows for people using ToolHub every day.',
                features: [
                  'Everything in Free',
                  'Batch processing at higher limits',
                  'Priority tool updates',
                  'No ads, ever',
                ],
                cta: 'Coming Soon',
                highlighted: true,
                available: false,
              },
              {
                name: 'Pro',
                price: '$12',
                cadence: '/month',
                description: 'Built for teams and heavier day-to-day use.',
                features: [
                  'Everything in Premium',
                  'Team sharing & shared history',
                  'Early access to new tools',
                  'Priority support',
                ],
                cta: 'Coming Soon',
                highlighted: false,
                available: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className={`relative flex flex-col rounded-2xl border p-7 ${
                  plan.highlighted
                    ? 'border-brand-300 bg-white shadow-xl shadow-brand-500/10 dark:border-brand-800 dark:bg-slate-900'
                    : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    Most popular (soon)
                  </span>
                )}
                {!plan.available && (
                  <span className="absolute right-5 top-5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                    Coming soon
                  </span>
                )}

                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{plan.name}</h3>
                <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{plan.description}</p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-sm text-slate-400 dark:text-slate-500">{plan.cadence}</span>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                      <HiOutlineCheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.available ? (
                  <Link
                    to="/register"
                    className={`btn-primary mt-7 justify-center ${plan.highlighted ? '' : ''}`}
                  >
                    {plan.cta}
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="mt-7 flex cursor-not-allowed items-center justify-center gap-1.5 rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                  >
                    {plan.cta}
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
            Premium and Pro are not yet available for purchase — pricing shown is provisional and
            subject to change before launch.
          </p>
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
