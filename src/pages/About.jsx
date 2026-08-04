import React from 'react'
import { motion } from 'framer-motion'
import { HiOutlineBolt, HiOutlineShieldCheck, HiOutlineHeart } from 'react-icons/hi2'
import Container from '../components/ui/Container.jsx'
import SEO from '../components/ui/SEO.jsx'
import { tools } from '../data/tools.js'
import { categories } from '../data/categories.js'

const VALUES = [
  {
    title: 'Speed first',
    description:
      'Every tool is built to feel instant. Most processing happens directly in your browser.',
    icon: HiOutlineBolt,
  },
  {
    title: 'Privacy by default',
    description:
      'We design tools to keep your files on your device wherever possible, and we are upfront when a tool needs to upload anything.',
    icon: HiOutlineShieldCheck,
  },
  {
    title: 'Built for everyone',
    description:
      'No account, no paywall for core tools. If a task is common enough, it belongs on ToolHub.',
    icon: HiOutlineHeart,
  },
]

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="Learn about ToolHub's mission to provide free, fast and private online tools for everyday tasks."
        canonicalPath="/about"
      />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 -top-32 -z-10 blur-3xl" aria-hidden="true">
          <div className="mx-auto h-64 w-[32rem] rounded-full bg-brand-200/40 dark:bg-brand-900/30" />
        </div>
        <Container className="py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Tools that get out of your way
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
              ToolHub started with a simple idea: everyday tasks like converting an image or
              formatting a block of JSON shouldn&apos;t require an account, a download, or a
              subscription.
            </p>
          </motion.div>
        </Container>
      </section>

      <section>
        <Container className="pb-16">
          <div className="mx-auto max-w-3xl space-y-5 text-slate-600 dark:text-slate-300">
            <p>
              We&apos;re building ToolHub as a single home for the small utilities people reach
              for constantly &mdash; image conversion, compression, resizing, and cropping to
              start, with PDF, developer, text, AI, color, security and social media tools on the
              roadmap.
            </p>
            <p>
              Currently, ToolHub offers {tools.length} tools across {categories.length}{' '}
              categories, and we&apos;re adding more as they&apos;re built. Every tool is designed
              to be fast, free to use, and clear about how it handles your files.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
        <Container className="py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              What we care about
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {VALUES.map((value) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                  <value.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
