import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineBolt, HiOutlineShieldCheck, HiOutlineDevicePhoneMobile } from 'react-icons/hi2'
import Container from '../components/ui/Container.jsx'
import ToolCard from '../components/ui/ToolCard.jsx'
import SEO from '../components/ui/SEO.jsx'
import { tools } from '../data/tools.js'

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
]

export default function Home() {
  const featuredTools = tools.slice(0, 6)

  return (
    <>
      <SEO
        title="Free Online Image Tools"
        description="Convert, compress, resize, crop and rotate images for free with ToolHub. Fast, private, and works right in your browser."
        canonicalPath="/"
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu blur-3xl"
          aria-hidden="true"
        >
          <div className="mx-auto h-72 w-[36rem] rounded-full bg-brand-200/50 opacity-40 dark:bg-brand-900/30" />
        </div>

        <Container className="py-20 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
              Image tools, right in your browser
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Free online tools for your everyday tasks
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-500 dark:text-slate-400">
              Convert, compress, resize, crop and rotate your images in seconds. No installs,
              no sign-up, no watermarks.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link to="/tools" className="btn-primary">
                Browse all tools
              </Link>
              <a href="#featured-tools" className="btn-outline">
                See featured tools
              </a>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Features */}
      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
        <Container className="py-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="text-center sm:text-left">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 sm:mx-0 dark:bg-brand-950 dark:text-brand-400">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured tools */}
      <section id="featured-tools" className="scroll-mt-20">
        <Container className="py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Image tools
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Our first set of tools. Each one runs entirely in your browser.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/tools" className="btn-secondary">
              View all tools
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
